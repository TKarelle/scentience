/** FAQ page « The process » — contenu visible + données structurées JSON-LD (cohérent avec theProcessCopy). */

export const THE_PROCESS_PAGE_CANONICAL = "https://scentience.com/the-process";

export const THE_PROCESS_FAQ_INTRO =
  "Clear answers about how Scentience turns your journey into a one-of-a-kind fragrance — for search, readers, and assistants.";

/**
 * @typedef {{ id: string, question: string, answerParagraphs: string[] }} ProcessFaqItem
 */

/** @type {ProcessFaqItem[]} */
export const THE_PROCESS_FAQ_ITEMS = [
  {
    id: "five-steps",
    question: "What are the five steps from my journey to the bottle?",
    answerParagraphs: [
      "The process moves from your journey (destination, date, and what you refuse to forget) through a personal consultation, the distillation of your unique formula, the ritual where you complete the label by hand, and finally the living memory you keep — one breath can bring the whole journey back years later.",
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
    question: "What happens during the Scentience consultation?",
    answerParagraphs: [
      "It is a direct exchange: we read your brief carefully and shape the formula from your story. There is no generic questionnaire — the dialogue steers the blend.",
    ],
  },
  {
    id: "incomplete-label",
    question: "Why does the bottle arrive with an “incomplete” label?",
    answerParagraphs: [
      "The clock face is intentional; you complete it after the journey — drawing the hands to the date and adding ink when the moment has truly ended.",
      "The memory is then encoded twice: in the scent and in your handwriting on the label.",
    ],
  },
  {
    id: "smell-and-memory",
    question: "How does smell connect to memory and emotion?",
    answerParagraphs: [
      "Smell is routed differently from other senses: it links straight to the amygdala, central to emotional memory, without the same cognitive filtering as vision or language.",
      "That is why a single note can feel like teleportation — the feeling returns whole. Scentience uses that biology intentionally as part of Project Proust.",
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
    id: "waiting-list",
    question: "How do I start or join the waiting list?",
    answerParagraphs: [
      "Use the waiting list on the site to register your interest. We use it to open consultations fairly as capacity allows and to keep you informed when your turn approaches.",
    ],
  },
];
