import { formatPrice } from "../config/bespokeProduct";
import {
  BESPOKE_ORDER_EMAIL,
  BESPOKE_ORDER_SUBJECT,
} from "../config/bespokeOrderForm";
import {
  formatInfluenceRanks,
  formatIngredientPrefs,
  formatJourneyDate,
} from "./questionnaireState";

export function buildBespokeOrderMailto({
  answers,
  withJournal,
  totalEur,
}) {
  const { loved, disliked } = formatIngredientPrefs(
    answers.ingredientPrefs ?? {},
  );

  const body = [
    "--- Original Bespoke order ---",
    "",
    "--- Your journey (label) ---",
    `Name(s): ${answers.labelNames.trim()}`,
    `Journey: ${answers.journey.trim()}`,
    `Date: ${formatJourneyDate(answers.journeyDate) || answers.journeyDate}`,
    "",
    "--- Q1 · Influence (rank 1–3) ---",
    formatInfluenceRanks(answers.influenceRanks),
    "",
    "--- Q2 · Destination countries ---",
    answers.countries.join(", ") || "(none)",
    "",
    "--- Q3 · Emotions (up to 3) ---",
    answers.emotions.join(", ") || "(none)",
    "",
    "--- Q4 · Meaningful experiences (up to 3) ---",
    answers.experiences.join(", ") || "(none)",
    "",
    "--- Q5 · Fragrance families enjoyed (up to 5) ---",
    answers.familiesEnjoy.join(", ") || "(none)",
    "",
    "--- Q6 · Families to avoid (up to 3) ---",
    answers.familiesAvoid.join(", ") || "(none)",
    "",
    "--- Q7 · Ingredient preferences ---",
    `Love: ${loved}`,
    `Dislike: ${disliked}`,
    "",
    "--- Order ---",
    `Memory journal: ${withJournal ? "yes" : "no"}`,
    `Total: ${formatPrice(totalEur)}`,
    "",
    "Customer email:",
    answers.email.trim(),
  ].join("\n");

  const params = new URLSearchParams();
  params.set("subject", BESPOKE_ORDER_SUBJECT);
  params.set("body", body);
  return `mailto:${BESPOKE_ORDER_EMAIL}?${params.toString()}`;
}
