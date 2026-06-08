/**
 * Original Bespoke — 30 ml + journal optionnel.
 * Modal : voyage d’abord (noms, journey, date) → brief senteur (meilleure conversion bespoke).
 */

export const BESPOKE_PRODUCT = {
  slug: "original-bespoke",
  path: "/product/original-bespoke",

  name: "Original Bespoke",
  kicker: "30 ml · One formula · Never replicated",
  description:
    "A fragrance composed for one journey — worn once, remembered forever.",

  /** Sous les preuves sociales — explique le questionnaire (pas de faux avis). */
  personalisationPitch: {
    lead: "No catalogue — your formula is built from your answers.",
    body: "Personalise & Order guides you through a two-step brief. We translate your responses into ingredient choices: regional botanicals, season, and the emotional intent of the place.",
    steps: [
      "Journey → label names, destination & date",
      "Scent brief → emotions, note preferences, atmosphere",
    ],
  },

  volume: "30 ml",

  pricing: {
    currency: "EUR",
    baseEur: 100,
    journalAddOnEur: 25,
    bundleDiscountEur: 10,
  },

  journalOption: {
    label: "Memory journal",
    pages: 20,
  },

  purchaseCta: "PERSONALISE & ORDER",

  socialProof: {
    commissionsCount: 247,
    rating: 4.9,
    reviewCount: 38,
  },

  delivery: {
    heading: "Home delivery",
    bullets: [
      "Free standard shipping on every Original Bespoke order",
      "5–7 business days from dispatch (UK & EU)",
      "Tracked parcel · composed to order after your brief is received",
    ],
  },

  returns: {
    note: "Made to order from your brief — returns and exchanges are not accepted.",
  },

  detailPanels: [
    {
      id: "included",
      title: "What's included",
      bullets: [
        "Bespoke 30 ml fragrance · composed to order",
        "Care card · full allergen disclosure",
        "Journal included only if selected above",
      ],
    },
    {
      id: "returns",
      title: "Bespoke — no returns",
      paragraphs: [
        "Original Bespoke is composed exclusively for you from your questionnaire. It cannot be restocked or resold — returns and exchanges are not possible once production begins.",
      ],
      bullets: [
        "Personal preference for the scent is not a defect",
        "IFRA / EU / UK compliant · batch tracked",
        "Statutory rights apply in case of safety issues — see Terms & privacy",
      ],
    },
  ],
};

export function getBespokePrice({ withJournal }) {
  const { baseEur, journalAddOnEur, bundleDiscountEur } =
    BESPOKE_PRODUCT.pricing;
  if (!withJournal) return baseEur;
  return baseEur + journalAddOnEur - bundleDiscountEur;
}

export function formatEur(amount) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
