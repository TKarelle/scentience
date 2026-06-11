import { randomUUID } from "crypto";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import { sendContactEmails, sendOrderConfirmationEmails } from "./email.js";
import { loadOrder, markOrderPaid, saveOrder } from "./store.js";

dotenv.config();

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  console.error("Missing STRIPE_SECRET_KEY in environment.");
  process.exit(1);
}

const stripe = new Stripe(stripeSecret);
const app = express();
const PORT = Number(process.env.PORT) || 4242;
const CLIENT_URL = (
  process.env.CLIENT_URL ||
  process.env.VITE_SITE_ORIGIN ||
  "http://localhost:5173"
).replace(/\/$/, "");

const JOURNAL_ADD_ON_GBP = 25;
const BUNDLE_DISCOUNT_GBP = 10;

function buildLineItems({ withJournal, totalGbp }) {
  const baseGbp = withJournal
    ? totalGbp - (JOURNAL_ADD_ON_GBP - BUNDLE_DISCOUNT_GBP)
    : totalGbp;

  const items = [
    {
      price_data: {
        currency: "gbp",
        unit_amount: Math.round(baseGbp * 100),
        product_data: {
          name: "MADELEINE Original Bespoke",
          description:
            "30 ml bespoke fragrance composed from your questionnaire",
        },
      },
      quantity: 1,
    },
  ];

  if (withJournal) {
    items.push({
      price_data: {
        currency: "gbp",
        unit_amount: Math.round(
          (JOURNAL_ADD_ON_GBP - BUNDLE_DISCOUNT_GBP) * 100,
        ),
        product_data: {
          name: "Memory journal (20 pp.)",
          description: "Bundle add-on for your Original Bespoke order",
        },
      },
      quantity: 1,
    });
  }

  return items;
}

function isValidEmail(email) {
  return (
    typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  );
}

function validateCheckoutBody(body) {
  const { answers, withJournal, totalGbp } = body ?? {};
  if (!answers || typeof answers !== "object") {
    return "Missing questionnaire answers.";
  }
  if (
    !answers.labelNames?.trim() ||
    !answers.journey?.trim() ||
    !answers.journeyDate
  ) {
    return "Journey details are incomplete.";
  }
  if (!isValidEmail(answers.email)) {
    return "A valid email is required.";
  }
  if (typeof withJournal !== "boolean") {
    return "Journal selection is required.";
  }
  if (typeof totalGbp !== "number" || totalGbp <= 0) {
    return "Invalid order total.";
  }
  return null;
}

app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.warn("STRIPE_WEBHOOK_SECRET not set — webhook ignored.");
      return res.status(200).json({ received: true });
    }

    const signature = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret,
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;
      if (orderId) {
        markOrderPaid(orderId, session.id);
        await sendOrderConfirmationEmails(orderId);
      }
    }

    res.json({ received: true });
  },
);

app.use(
  cors({
    origin: [CLIENT_URL, "http://localhost:5173", "http://127.0.0.1:5173"],
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

function isValidContactEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body ?? {};

  if (!name?.trim() || name.trim().length < 2) {
    return res.status(400).json({ error: "Please enter your name." });
  }
  if (!isValidContactEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid email." });
  }
  if (!subject?.trim() || subject.trim().length < 3) {
    return res.status(400).json({ error: "Please enter a subject." });
  }
  if (!message?.trim() || message.trim().length < 10) {
    return res.status(400).json({ error: "Please write a longer message." });
  }

  try {
    const result = await sendContactEmails({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    if (!result.sent) {
      return res.status(503).json({
        error: "Unable to send your message right now. Please try again shortly.",
      });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

app.post("/api/checkout", async (req, res) => {
  const error = validateCheckoutBody(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const { answers, withJournal, totalGbp } = req.body;
  const orderId = randomUUID();

  try {
    saveOrder(orderId, {
      status: "pending",
      answers,
      withJournal,
      totalGbp,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: answers.email.trim(),
      line_items: buildLineItems({ withJournal, totalGbp }),
      metadata: { orderId },
      success_url: `${CLIENT_URL}/order/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/product/original-bespoke`,
    });

    res.json({ url: session.url, sessionId: session.id, orderId });
  } catch (err) {
    console.error("Checkout session error:", err);
    res
      .status(500)
      .json({ error: "Unable to start checkout. Please try again." });
  }
});

app.get("/api/checkout/session", async (req, res) => {
  const sessionId = req.query.session_id;
  if (!sessionId || typeof sessionId !== "string") {
    return res.status(400).json({ error: "Missing session_id." });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const order = loadOrder(session.metadata?.orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    if (session.payment_status === "paid" && order.status !== "paid") {
      markOrderPaid(order.orderId, session.id);
    }

    const refreshed = loadOrder(order.orderId) ?? order;
    let emailSent = refreshed.confirmationEmailSent ?? false;

    if (session.payment_status === "paid" && !emailSent) {
      const result = await sendOrderConfirmationEmails(order.orderId);
      emailSent = result.sent || result.already;
    }

    res.json({
      paymentStatus: session.payment_status,
      email: session.customer_details?.email ?? refreshed.answers?.email,
      emailSent,
      totalGbp: refreshed.totalGbp,
      withJournal: refreshed.withJournal,
      labelNames: refreshed.answers?.labelNames,
      journey: refreshed.answers?.journey,
      journeyDate: refreshed.answers?.journeyDate,
      orderId: refreshed.orderId,
    });
  } catch (err) {
    console.error("Session retrieve error:", err);
    res.status(500).json({ error: "Unable to load order confirmation." });
  }
});

app.listen(PORT, () => {
  console.log(`MADELEINE API listening on http://localhost:${PORT}`);
  console.log(`Client URL: ${CLIENT_URL}`);
});
