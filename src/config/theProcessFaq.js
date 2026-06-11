import { SITE_ORIGIN } from "./seoMeta";

/** FAQ page « The process » — contenu visible + données structurées JSON-LD (cohérent avec theProcessCopy). */

export const THE_PROCESS_PAGE_CANONICAL = `${SITE_ORIGIN}/the-process`;

export const THE_PROCESS_FAQ_INTRO =
  "Clear answers about how MADELEINE turns your journey into a one-of-a-kind fragrance — for search, readers, and assistants.";

/**
 * @typedef {{ id: string, question: string, answerParagraphs: string[] }} ProcessFaqItem
 */

/** @type {ProcessFaqItem[]} */
export const THE_PROCESS_FAQ_ITEMS = [
  {
    id: "five-steps",
    question: "What are the five steps from order to encoded memory?",
    answerParagraphs: [
      "Order your bottle before you leave, complete your consultation online (emotions, local raw materials, preferences), wear your bespoke fragrance through the journey, write in the memory journal when you return, and keep an encoded memory — years later, a single inhalation can bring the whole journey back.",
    ],
  },
  {
    id: "how-fragrance-created",
    question: "How is my personalized fragrance actually created?",
    answerParagraphs: [
      "We treat your destination and moment as the creative brief. Raw materials are chosen to reflect that place, season, and emotional intention — not a catalogue pick list.",
      "Your formula is distilled once for you; the work is listening, composing, and refining until the scent matches the memory you want to preserve.",
    ],
  },
  {
    id: "formula-unique",
    question: "Is my formula truly unique — will it ever be sold to someone else?",
    answerParagraphs: [
      "Yes. Each composition is built for one journey and one person. It will not be replicated or offered to anyone else.",
    ],
  },
  {
    id: "consultation",
    question: "What happens during the MADELEINE consultation?",
    answerParagraphs: [
      "You complete your brief on the website: destination, emotions, note preferences, and the raw materials of the place. We read every answer and shape your unique formula around the trip — not a catalogue.",
    ],
  },
  {
    id: "memory-journal",
    question: "What is the memory journal ritual?",
    answerParagraphs: [
      "After your journey, you write in the journal — anchoring what photographs cannot hold in your own hand.",
      "The memory is encoded twice: in the bespoke fragrance you wore through the trip, and in the words you leave on the page.",
    ],
  },
  {
    id: "smell-and-memory",
    question: "How does smell connect to memory and emotion?",
    answerParagraphs: [
      "Smell is routed differently from other senses: it links straight to the amygdala, central to emotional memory, without the same cognitive filtering as vision or language.",
      "That is why a single note can feel like teleportation — the feeling returns whole. MADELEINE uses that biology intentionally as part of Project Proust.",
    ],
  },
  {
    id: "who-for",
    question: "Who is this process for?",
    answerParagraphs: [
      "It is for people who want a serious, bespoke fragrance tied to a specific life chapter — honeymoons, anniversaries, milestones, or nights that refuse to end — not mass-market personalization.",
    ],
  },
  {
    id: "pre-order",
    question: "How do I commission Original Bespoke?",
    answerParagraphs: [
      "Pre-orders are open on the site. Choose Original Bespoke, complete the guided questionnaire — journey details first, then your scent brief — and place your order by email. We compose your formula from your answers and ship within the week.",
    ],
  },
];
