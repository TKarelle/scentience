import { SITE_ORIGIN } from "./seoMeta";

/** FAQ page « The process » — alignée 3 étapes, Original Bespoke & journal optionnel. */

export const THE_PROCESS_PAGE_CANONICAL = `${SITE_ORIGIN}/the-process`;

export const THE_PROCESS_FAQ_INTRO =
  "Clear answers on the three steps, how your formula is composed, and what Original Bespoke includes.";

/**
 * @typedef {{ id: string, question: string, answerParagraphs: string[] }} ProcessFaqItem
 */

/** @type {ProcessFaqItem[]} */
export const THE_PROCESS_FAQ_ITEMS = [
  {
    id: "three-steps",
    question: "What are the three steps?",
    answerParagraphs: [
      "1 — Order before you leave: commission Original Bespoke and complete the guided questionnaire (journey first, then scent preferences). Your formula is composed before you smell it.",
      "2 — Wear it on the journey: live the moment in your bespoke scent — one formula, never replicated. Optionally write in the memory journal when you return.",
      "3 — Encode the memory: years later, one inhalation can bring the whole journey back.",
    ],
  },
  {
    id: "buy-before-smell",
    question: "Why is the perfume composed before I smell it?",
    answerParagraphs: [
      "So the scent stays empty of meaning until you wear it on the journey. That blank canvas creates a clean memory association with that moment alone — not with a shop trial or everyday wear.",
    ],
  },
  {
    id: "how-fragrance-created",
    question: "How is my fragrance actually created?",
    answerParagraphs: [
      "Your destination and moment are the brief. We compose from your questionnaire answers — emotions, note preferences, and materials inspired by the place and season — not from a catalogue.",
      "The formula is distilled once for you and never remade for anyone else.",
    ],
  },
  {
    id: "formula-unique",
    question: "Is my formula truly unique?",
    answerParagraphs: [
      "Yes. Each composition is built for one journey and one person. It will not be replicated or offered to anyone else.",
    ],
  },
  {
    id: "consultation",
    question: "What is the questionnaire?",
    answerParagraphs: [
      "A guided brief on the site: journey details (names, destination, date), then scent preferences. You review your answers and confirm by email. We shape your Original Bespoke formula from that brief alone.",
    ],
  },
  {
    id: "memory-journal",
    question: "Do I need the memory journal?",
    answerParagraphs: [
      "No — it is optional. The 20-page journal can travel with your bottle so you can write what photographs cannot hold after the journey.",
      "With the journal, the memory is encoded twice: in the fragrance you wore, and in your own words.",
    ],
  },
  {
    id: "who-for",
    question: "Who is this process for?",
    answerParagraphs: [
      "For people who want a bespoke fragrance tied to a specific life chapter — honeymoons, weddings, anniversaries, milestone trips — not everyday compliments or mass-market personalization.",
    ],
  },
  {
    id: "pre-order",
    question: "How do I commission Original Bespoke?",
    answerParagraphs: [
      "Pre-orders are open. Choose Original Bespoke, complete the questionnaire, and confirm your order. We compose your formula from your answers. Free shipping to the UK — typically 5–7 business days from dispatch. Made to order: returns are not accepted once production begins.",
    ],
  },
];
