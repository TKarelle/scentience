import {
  BESPOKE_INGREDIENTS,
  BESPOKE_INFLUENCE_FACTORS,
} from "../config/bespokeQuestionnaire";

const INGREDIENT_LABELS = Object.fromEntries(
  BESPOKE_INGREDIENTS.map((i) => [i.id, i.label]),
);

export function createInitialQuestionnaireAnswers() {
  return {
    labelNames: "",
    journey: "",
    journeyDate: "",
    influenceRanks: {
      destination: null,
      emotion: null,
      preference: null,
    },
    countries: [],
    emotions: [],
    experiences: [],
    familiesEnjoy: [],
    familiesAvoid: [],
    ingredientPrefs: {},
    email: "",
  };
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function formatJourneyDate(isoDate) {
  if (!isoDate?.trim()) return "";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${isoDate.trim()}T12:00:00`));
  } catch {
    return isoDate;
  }
}

/** Étape 0 = voyage · 1–7 = Q1–Q7 · 8 = récap · 9 = email */
export function isQuestionnaireStepValid(stepIndex, answers) {
  switch (stepIndex) {
    case 0:
      return (
        answers.labelNames.trim().length > 0 &&
        answers.journey.trim().length > 0 &&
        answers.journeyDate.trim().length > 0
      );
    case 1: {
      const ranks = Object.values(answers.influenceRanks);
      return ranks.every((r) => r != null) && new Set(ranks).size === 3;
    }
    case 2:
      return answers.countries.length >= 1;
    case 3:
      return answers.emotions.length >= 1 && answers.emotions.length <= 3;
    case 4:
      return answers.experiences.length >= 1 && answers.experiences.length <= 3;
    case 5:
      return (
        answers.familiesEnjoy.length >= 1 && answers.familiesEnjoy.length <= 5
      );
    case 6:
      return answers.familiesAvoid.length <= 3;
    case 7:
      return true;
    case 8:
      return true;
    case 9:
      return isValidEmail(answers.email);
    default:
      return false;
  }
}

export function formatInfluenceRanks(ranks) {
  return BESPOKE_INFLUENCE_FACTORS.map((f) => ({
    factor: f.title,
    rank: ranks[f.id],
  }))
    .sort((a, b) => a.rank - b.rank)
    .map((r) => `${r.rank}. ${r.factor}`)
    .join("\n");
}

export function formatIngredientPrefs(prefs) {
  const loved = [];
  const disliked = [];
  for (const [id, value] of Object.entries(prefs)) {
    const label = INGREDIENT_LABELS[id] ?? id;
    if (value === "love") loved.push(label);
    if (value === "dislike") disliked.push(label);
  }
  return {
    loved: loved.length ? loved.join(", ") : "(none)",
    disliked: disliked.length ? disliked.join(", ") : "(none)",
  };
}
