import citrusImg from "../image/citrus.jpg";
import coconutImg from "../image/coconut.jpg";
import incenseImg from "../image/Incense.jpg";
import lavenderImg from "../image/lavender.jpg";
import mintImg from "../image/mint.jpg";
import oudImg from "../image/oud.jpg";
import patchouliImg from "../image/Patchouli.jpg";
import pineImg from "../image/pine.jpg";
import rainImg from "../image/rain.jpg";
import roseImg from "../image/rose.jpg";
import sandalwoodImg from "../image/Sandalwood.jpg";
import smokeImg from "../image/smoke.jpg";
import teaImg from "../image/tea.jpg";
import vanillaImg from "../image/Vanilla.jpg";

/** Questionnaire Original Bespoke — une question par écran. */

export const BESPOKE_QUESTIONNAIRE_TOTAL = 10;

export const BESPOKE_JOURNEY_STEP = {
  id: "journey",
  shortLabel: "Journey",
  title: "Your journey",
  subtitle: "These details are engraved on your label — start with the moment itself.",
  type: "journey",
};

export const BESPOKE_INFLUENCE_FACTORS = [
  {
    id: "destination",
    title: "Destination",
    hint: "How important that your fragrance reflects the place where this memory will be created.",
  },
  {
    id: "emotion",
    title: "Emotion",
    hint: "How important that your fragrance creates the feelings you want to experience.",
  },
  {
    id: "preference",
    title: "Personal preference",
    hint: "How important that your fragrance reflects the scent families and ingredients you naturally enjoy.",
  },
];

export const BESPOKE_DESTINATION_COUNTRIES = [
  "France",
  "Italy",
  "Spain",
  "Portugal",
  "Greece",
  "United Kingdom",
  "Ireland",
  "Germany",
  "Switzerland",
  "Austria",
  "Netherlands",
  "Belgium",
  "Morocco",
  "Turkey",
  "Japan",
  "Thailand",
  "Indonesia",
  "India",
  "United States",
  "Mexico",
  "Canada",
  "Brazil",
  "Argentina",
  "Australia",
  "New Zealand",
  "South Africa",
  "Maldives",
  "United Arab Emirates",
  "Iceland",
  "Norway",
  "Sweden",
  "Croatia",
  "Malta",
  "Cyprus",
  "Vietnam",
  "Singapore",
  "South Korea",
  "China",
  "Egypt",
  "Kenya",
];

export const BESPOKE_EMOTIONS = [
  "Love & romance",
  "Emotional connection",
  "Nostalgia",
  "Comfort & security",
  "Presence & mindfulness",
  "Wonder & awe",
  "Adventure & freedom",
  "Joy & celebration",
  "Confidence",
  "Optimism",
  "New beginnings",
  "Peace & calm",
];

export const BESPOKE_EXPERIENCES = [
  "Walking through a forest after rainfall",
  "Falling in love",
  "Sitting beside a fire on a cold evening",
  "Waking up to fresh mountain air",
  "Celebrating a lasting relationship",
  "Escaping to a tropical paradise",
  "Experiencing a spiritual or sacred moment",
  "Remembering carefree childhood evenings",
  "Relaxing beside the sea",
  "Beginning a new chapter in life",
];

export const BESPOKE_FRAGRANCE_FAMILIES = [
  "Fresh & clean",
  "Green & natural",
  "Woody",
  "Floral",
  "Warm & cosy",
  "Spicy",
  "Marine & oceanic",
  "Sweet & gourmand",
  "Resinous & incense-like",
  "Citrusy & bright",
];

export const BESPOKE_INGREDIENTS = [
  { id: "rain", label: "Rain", image: rainImg },
  { id: "pine", label: "Pine", image: pineImg },
  { id: "lavender", label: "Lavender", image: lavenderImg },
  { id: "tea", label: "Tea", image: teaImg },
  { id: "coconut", label: "Coconut", image: coconutImg },
  { id: "citrus", label: "Citrus", image: citrusImg },
  { id: "sandalwood", label: "Sandalwood", image: sandalwoodImg },
  { id: "vanilla", label: "Vanilla", image: vanillaImg },
  { id: "rose", label: "Rose", image: roseImg },
  { id: "smoke", label: "Smoke", image: smokeImg },
  { id: "oud", label: "Oud", image: oudImg },
  { id: "incense", label: "Incense", image: incenseImg },
  { id: "patchouli", label: "Patchouli", image: patchouliImg },
  { id: "mint", label: "Mint", image: mintImg },
];

export const BESPOKE_QUESTIONNAIRE_STEPS = [
  BESPOKE_JOURNEY_STEP,
  {
    id: "q1-influence",
    shortLabel: "Priority",
    title: "What should influence your fragrance most?",
    subtitle: "Tap 1st, 2nd, and 3rd — one rank per card.",
    type: "rank",
  },
  {
    id: "q2-destination",
    shortLabel: "Destination",
    title: "Where is the destination?",
    subtitle: "Select every country that fits your journey.",
    type: "countries",
    min: 1,
  },
  {
    id: "q3-emotions",
    shortLabel: "Emotions",
    title: "Which emotions should this fragrance evoke?",
    subtitle: "Choose up to 3.",
    type: "multi",
    options: BESPOKE_EMOTIONS,
    min: 1,
    max: 3,
  },
  {
    id: "q4-experiences",
    shortLabel: "Experiences",
    title: "Which experiences feel most meaningful to you?",
    subtitle: "Choose up to 3.",
    type: "multi",
    options: BESPOKE_EXPERIENCES,
    min: 1,
    max: 3,
  },
  {
    id: "q5-families-enjoy",
    shortLabel: "Families",
    title: "Which fragrance families do you naturally enjoy?",
    subtitle: "Choose up to 5.",
    type: "multi",
    options: BESPOKE_FRAGRANCE_FAMILIES,
    min: 1,
    max: 5,
  },
  {
    id: "q6-families-avoid",
    shortLabel: "Avoid",
    title: "Which families would you prefer to avoid?",
    subtitle: "Choose up to 3 — or skip if none.",
    type: "multi",
    options: BESPOKE_FRAGRANCE_FAMILIES,
    min: 0,
    max: 3,
  },
  {
    id: "q7-ingredients",
    shortLabel: "Notes",
    title: "Any notes you particularly love or dislike?",
    subtitle: "Tap ♥ or ✗ on each ingredient — or continue if unsure.",
    type: "ingredients",
  },
  {
    id: "summary",
    shortLabel: "Review",
    title: "Your brief",
    subtitle: "Check everything looks right before you send.",
    type: "summary",
  },
  {
    id: "contact",
    shortLabel: "Send",
    title: "Almost done",
    subtitle: "Enter your email — your order summary opens ready to send.",
    type: "contact",
  },
];
