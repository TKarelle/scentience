import { loadOrder, saveOrder } from "./store.js";

const RESEND_API = "https://api.resend.com/emails";

function formatGbp(amount) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildCustomerEmailHtml(order) {
  const { answers, withJournal, totalGbp, orderId } = order;

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4efe4;font-family:Georgia,'Times New Roman',serif;color:#120d0a;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6b1a1a;margin:0 0 24px;">
      MADELEINE · Original Bespoke
    </p>
    <h1 style="font-family:monospace;font-size:22px;font-weight:400;text-transform:uppercase;color:#6b1a1a;margin:0 0 16px;">
      Your pre-order is confirmed
    </h1>
    <p style="font-size:15px;line-height:1.6;margin:0 0 24px;">
      Thank you — payment received. We are reviewing your brief and will be in touch as your formula enters production.
    </p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.5;">
      <tr><td style="padding:8px 0;color:#6b1a1a;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;">Label</td></tr>
      <tr><td style="padding:0 0 16px;">${escapeHtml(answers.labelNames)}</td></tr>
      <tr><td style="padding:8px 0;color:#6b1a1a;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;">Journey</td></tr>
      <tr><td style="padding:0 0 16px;">${escapeHtml(answers.journey)}<br>${escapeHtml(answers.journeyDate)}</td></tr>
      <tr><td style="padding:8px 0;color:#6b1a1a;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;">Total paid</td></tr>
      <tr><td style="padding:0 0 16px;">${formatGbp(totalGbp)}${withJournal ? " · incl. memory journal" : ""}</td></tr>
      <tr><td style="padding:8px 0;color:#6b1a1a;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;">Reference</td></tr>
      <tr><td style="padding:0 0 16px;font-family:monospace;font-size:12px;">${escapeHtml(orderId)}</td></tr>
    </table>
    <p style="font-size:14px;line-height:1.6;margin:24px 0 0;">
      Standard delivery: 5–7 business days from dispatch · tracked parcel.<br>
      Questions? Contact Info@madeleine.uk and quote your reference.
    </p>
  </div>
</body>
</html>`;
}

async function sendViaResend({ to, subject, html, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "MADELEINE <orders@madeleine.uk>";

  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping email to", to);
    return false;
  }

  const payload = { from, to: [to], subject, html };
  if (replyTo) payload.reply_to = replyTo;

  const res = await fetch(RESEND_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return false;
  }

  return true;
}

export async function sendOrderConfirmationEmails(orderId) {
  const order = loadOrder(orderId);
  if (!order || order.status !== "paid") return { sent: false };
  if (order.confirmationEmailSent) return { sent: true, already: true };

  const customerEmail = order.answers?.email?.trim();
  if (!customerEmail) return { sent: false };

  const html = buildCustomerEmailHtml(order);

  const customerOk = await sendViaResend({
    to: customerEmail,
    subject: "Your MADELEINE Original Bespoke pre-order is confirmed",
    html,
  });

  const teamEmail = process.env.ORDERS_EMAIL_TO || "Info@madeleine.uk";
  await sendViaResend({
    to: teamEmail,
    subject: `[Order] Original Bespoke — ${order.answers.labelNames}`,
    html,
  });

  if (customerOk) {
    saveOrder(orderId, {
      ...order,
      confirmationEmailSent: true,
      confirmationEmailSentAt: new Date().toISOString(),
    });
  }

  return { sent: customerOk };
}

function buildContactTeamHtml({ name, email, subject, message }) {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4efe4;font-family:Georgia,serif;color:#120d0a;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6b1a1a;">
      MADELEINE · Contact form
    </p>
    <h1 style="font-family:monospace;font-size:18px;font-weight:400;text-transform:uppercase;color:#6b1a1a;margin:16px 0;">
      ${escapeHtml(subject)}
    </h1>
    <p style="font-size:14px;line-height:1.6;margin:0 0 8px;"><strong>From:</strong> ${escapeHtml(name)}</p>
    <p style="font-size:14px;line-height:1.6;margin:0 0 24px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
    <div style="border-top:1px solid #6b1a1a33;padding-top:16px;font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</div>
  </div>
</body>
</html>`;
}

function buildContactReceiptHtml({ name }) {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4efe4;font-family:Georgia,serif;color:#120d0a;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6b1a1a;">
      MADELEINE
    </p>
    <h1 style="font-family:monospace;font-size:20px;font-weight:400;text-transform:uppercase;color:#6b1a1a;margin:16px 0;">
      Message received
    </h1>
    <p style="font-size:15px;line-height:1.6;">
      Thank you${name ? `, ${escapeHtml(name)}` : ""} — we have your message and will reply within 2 business days.
    </p>
  </div>
</body>
</html>`;
}

export async function sendContactEmails({ name, email, subject, message }) {
  const teamEmail =
    process.env.CONTACT_EMAIL_TO ||
    process.env.ORDERS_EMAIL_TO ||
    "Info@madeleine.uk";

  const teamHtml = buildContactTeamHtml({ name, email, subject, message });

  const teamOk = await sendViaResend({
    to: teamEmail,
    replyTo: email,
    subject: `[Contact] ${subject}`,
    html: teamHtml,
  });

  if (!teamOk) {
    return { sent: false };
  }

  await sendViaResend({
    to: email,
    subject: "We received your message — MADELEINE",
    html: buildContactReceiptHtml({ name }),
  });

  return { sent: true };
}
