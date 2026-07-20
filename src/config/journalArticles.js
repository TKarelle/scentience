import lemonPerfumeImage from "../image/lemon+perfume.webp";
import libraryImage from "../image/library.webp";
import bagImage from "../image/bag.webp";
import scienceImage from "../image/science.webp";
import justMarriedImage from "../image/justmarried.webp";

let bodiesModulePromise = null;

function loadBodiesModule() {
  if (!bodiesModulePromise) {
    bodiesModulePromise = import("./journalArticleBodies.js");
  }
  return bodiesModulePromise;
}

function buildArticleFromMeta(meta, body) {
  return {
    id: meta.slug,
    ...meta,
    ...body,
    heroImage: meta.image,
    seoDescription: meta.seoDescription ?? meta.excerpt,
  };
}

/**
 * Source unique des articles journal — métadonnées + helpers.
 * Corps (subtitle, author, content) : `journalArticleBodies.js`.
 * @typedef {{ slug: string, title: string, excerpt: string, seoDescription?: string, date: string, datePublished: string, image: string, imageAlt: string, category: string }} JournalEntryMeta
 */

/** @type {JournalEntryMeta[]} */
export const JOURNAL_ENTRIES_ALL = [
  {
    slug: "the-proust-project-how-scent-encodes-memory-forever",
    title: "The Proust Project: How Scent Encodes Memory Forever",
    excerpt:
      "From Swann's Way to the limbic system: Proust named a neurological collision—proof that scent replays memory in its original purity, not as document.",
    date: "April 2026",
    datePublished: "2026-04-01",
    category: "Science",
    image: libraryImage,
    imageAlt:
      "MADELEINE memory library — engraved bottles and scent archive",
  },
  {
    slug: "why-we-always-wanted-to-bottle-our-memories",
    title: "Why we always wanted to bottle our memories",
    excerpt:
      "I once looked at a photo of a trip I loved and felt absolutely nothing. Images preserved the forms, but allowed the breath to evaporate — until scent-mapping offered another path.",
    date: "February 12, 2026",
    datePublished: "2026-02-12",
    category: "Editorial",
    image: bagImage,
    imageAlt: "Travel bag and journey essentials — MADELEINE editorial",
    seoDescription:
      "Why photography stops where scent-mapping begins — and what Rebecca already knew about bottling the instant.",
  },
  {
    slug: "amalfi-coast-golden-hour-building-scent-from-a-coastline",
    title: "The Amalfi Coast at Golden Hour: Building a Scent from a Coastline",
    excerpt:
      "Sun-warmed lemon, wild rosemary, sea salt at dawn. How the raw materials of a specific place become the olfactory coordinates of a memory that will last a lifetime.",
    date: "April 2026",
    datePublished: "2026-04-01",
    category: "Journal",
    image: lemonPerfumeImage,
    imageAlt: "Amalfi Coast lemon and perfume — coastal scent mapping",
  },
  {
    slug: "why-smell-is-the-only-sense-that-bypasses-the-brains-filter",
    title: "Why Smell Is the Only Sense That Bypasses the Brain's Filter",
    excerpt:
      "Every other sense passes through the thalamus. Smell does not. Here is what that means for memory — and for MADELEINE.",
    date: "April 2026",
    datePublished: "2026-04-01",
    category: "Science",
    image: scienceImage,
    imageAlt: "Neuroscience of smell and memory — MADELEINE science",
    seoDescription:
      "Here is what that means for emotional memory — and for why MADELEINE trusts scent above the feed.",
  },
  {
    slug: "how-to-choose-the-perfume-for-your-honeymoon",
    title: "How to Choose the Perfume for Your Honeymoon",
    excerpt:
      "Not notes or accords—a protocol for encoding. Your preference matters less than the virgin molecule and the geography of your emotion.",
    date: "April 2026",
    datePublished: "2026-04-01",
    category: "Journal",
    image: justMarriedImage,
    imageAlt: "Honeymoon couple — choosing a memory fragrance",
    seoDescription:
      "Before the trip becomes a story you tell instead of a moment you feel.",
  },
];

/** Slug de la une (cover story). */
export const JOURNAL_FEATURED_SLUG =
  "the-proust-project-how-scent-encodes-memory-forever";

/**
 * Les plus lus — colonne droite, **3 maximum** (ordre = priorité d’affichage).
 */
export const JOURNAL_POPULAR_SLUGS = [
  "why-we-always-wanted-to-bottle-our-memories",
  "how-to-choose-the-perfume-for-your-honeymoon",
  "why-smell-is-the-only-sense-that-bypasses-the-brains-filter",
];

export function getJournalEntryBySlug(slug) {
  return JOURNAL_ENTRIES_ALL.find((e) => e.slug === slug);
}

/** Charge le corps à la demande (code-split). */
export async function loadArticleBySlug(slug) {
  const meta = getJournalEntryBySlug(slug);
  if (!meta) return null;
  const { JOURNAL_ARTICLE_BODIES: bodies } = await loadBodiesModule();
  const body = bodies[slug];
  if (!body) return null;
  return buildArticleFromMeta(meta, body);
}

/** Vignettes + related stories — sans charger les corps. */
export function getArticleSummaries() {
  return JOURNAL_ENTRIES_ALL.map((meta) => ({
    id: meta.slug,
    ...meta,
    heroImage: meta.image,
    seoDescription: meta.seoDescription ?? meta.excerpt,
  }));
}

/** @returns {JournalEntryMeta | undefined} */
export function getJournalFeatured() {
  return getJournalEntryBySlug(JOURNAL_FEATURED_SLUG);
}

/** @returns {JournalEntryMeta[]} */
export function getJournalPopularEntries() {
  return JOURNAL_POPULAR_SLUGS.slice(0, 3)
    .map((slug) => getJournalEntryBySlug(slug))
    .filter(Boolean);
}

/** Articles hors une et hors populaires → grille. */
export function getJournalGridEntries() {
  const exclude = new Set([
    JOURNAL_FEATURED_SLUG,
    ...JOURNAL_POPULAR_SLUGS.slice(0, 3),
  ]);
  return JOURNAL_ENTRIES_ALL.filter((e) => !exclude.has(e.slug));
}

export const JOURNAL_INTRO =
  "On memory, travel, and the moments worth encoding. " +
  "Articles, science, and stories from the olfactory library.";

export const JOURNAL_PULL_QUOTE =
  "I know exactly what that hotel room smelled like. I just can't remember the name of the street.";
