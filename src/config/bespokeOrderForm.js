/** Questionnaire commande — étape 1 : voyage · étape 2 : senteur. */

export const BESPOKE_ORDER_STEPS = [
  {
    id: "journey",
    title: "Your journey",
    subtitle: "Encoded on the label — start with the moment itself.",
  },
  {
    id: "scent",
    title: "Your scent brief",
    subtitle: "Emotions, note preferences, and atmosphere guide the blend.",
  },
];

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

export const BESPOKE_ORDER_EMAIL = "Info@scentience.uk";
export const BESPOKE_ORDER_SUBJECT = "[Order] Original Bespoke";
