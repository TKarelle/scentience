/** Questionnaire commande — étape 1 : voyage · étape 2 : senteur. */

export const BESPOKE_ORDER_MOMENT_MIN_CHARS = 20;

export const BESPOKE_ORDER_STEPS = [
  {
    id: "journey",
    navLabel: "Journey",
    title: "Your journey",
    subtitle: "These details are engraved on your label.",
    continueLabel: "Continue",
  },
  {
    id: "scent",
    navLabel: "Scent brief",
    title: "Your scent brief",
    subtitle: "We compose from your answers — not a catalogue.",
    submitLabel: "Place order",
  },
];

export const BESPOKE_ORDER_CONFIRMATION = {
  title: "Redirecting to payment",
  body: "You will be taken to our secure Stripe checkout to complete your pre-order.",
  closeLabel: "Close",
};

export const ORDER_CONFIRMATION_COPY = {
  loadingEyebrow: "Confirming payment",
  loadingTitle: "One moment…",
  errorEyebrow: "Order issue",
  errorTitle: "We could not confirm your order",
  missingSession: "No payment session was found. Please try again from the product page.",
  pendingPayment: "Payment is still pending. If you completed checkout, wait a moment and refresh.",
  loadError: "Something went wrong while loading your confirmation.",
  successEyebrow: "Pre-order confirmed",
  successTitle: "Thank you — your commission is underway",
  successBody:
    "Payment received. A confirmation email is on its way with your order reference and next steps.",
  successEmailNote:
    "Didn't receive it within a few minutes? Check your spam folder or contact Info@madeleine.uk with your reference below.",
  nextSteps:
    "Your fragrance is composed to order after we review your brief. Standard delivery is 5–7 business days from dispatch.",
};

export const BESPOKE_JOURNEY_FIELDS = {
  labelNames: {
    label: "Name(s) for the label",
    placeholder: "e.g. Elena & Marco",
  },
  journey: {
    label: "Journey",
    placeholder: "e.g. Honeymoon — Amalfi Coast",
  },
  journeyDate: {
    label: "Date of the journey",
  },
};

export const BESPOKE_SCENT_FIELDS = {
  moment: {
    label: "Emotions & memory",
    placeholder: "What should you feel when you wear this scent?",
  },
  mood: {
    label: "Atmosphere",
    options: [
      "Romantic",
      "Celebratory",
      "Quiet & intimate",
      "Adventurous",
      "Nostalgic",
    ],
  },
  references: {
    label: "Additional note preferences (optional)",
    placeholder: "Citrus, smoke, skin, or anything to avoid…",
  },
  email: {
    label: "Email for order confirmation",
    placeholder: "you@example.com",
  },
};

export const BESPOKE_ORDER_EMAIL = "Info@madeleine.uk";
export const BESPOKE_ORDER_SUBJECT = "[Order] Original Bespoke";
