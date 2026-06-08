/**
 * Original Bespoke — 30 ml + journal optionnel.
 * Modal : questionnaire 10 écrans (voyage · Q1–Q7 · récap · email).
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
    body: "Personalise & Order walks you through ten guided screens — one at a time. Your journey first, then scent preferences, a full review, and email to confirm.",
    steps: [
      "Journey → label names, destination & date",
      "7 scent questions · review · email to confirm",
    ],
  },

  volume: "30 ml",

  pricing: {
    currency: "GBP",
    baseGbp: 100,
    journalAddOnGbp: 25,
    bundleDiscountGbp: 10,
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
  const { baseGbp, journalAddOnGbp, bundleDiscountGbp } =
    BESPOKE_PRODUCT.pricing;
  if (!withJournal) return baseGbp;
  return baseGbp + journalAddOnGbp - bundleDiscountGbp;
}

/** Prix en livres sterling (GBP). */
export function formatPrice(amount) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** @deprecated Utiliser formatPrice */
export const formatEur = formatPrice;
