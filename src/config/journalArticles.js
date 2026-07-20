import lemonPerfumeImage from "../image/lemon+perfume.png";
import libraryImage from "../image/library.png";
import albumImage from "../image/album.png";
import scienceImage from "../image/science.png";
import justMarriedImage from "../image/justmarried.png";

/**
 * Source unique des fiches journal (slug alignés sur `page/article.jsx`).
 * @typedef {{ slug: string, title: string, excerpt: string, date: string, image: string, category: string }} JournalEntry
 */

/** @type {JournalEntry[]} */
export const JOURNAL_ENTRIES_ALL = [
  {
    slug: "the-proust-project-how-scent-encodes-memory-forever",
    title: "The Proust Project: How Scent Encodes Memory Forever",
    excerpt:
      "From Swann's Way to the limbic system: Proust named a neurological collision—proof that scent replays memory in its original purity, not as document.",
    date: "April 2026",
    category: "Science",
    image: libraryImage,
  },
  {
    slug: "why-we-always-wanted-to-bottle-our-memories",
    title: "Why we always wanted to bottle our memories",
    excerpt:
      "I once looked at a photo of a trip I loved and felt absolutely nothing. Images preserved the forms, but allowed the breath to evaporate — until scent-mapping offered another path.",
    date: "February 12, 2026",
    category: "Editorial",
    image: albumImage,
  },
  {
    slug: "amalfi-coast-golden-hour-building-scent-from-a-coastline",
    title: "The Amalfi Coast at Golden Hour: Building a Scent from a Coastline",
    excerpt:
      "Sun-warmed lemon, wild rosemary, sea salt at dawn. How the raw materials of a specific place become the olfactory coordinates of a memory that will last a lifetime.",
    date: "April 2026",
    category: "Journal",
    image: lemonPerfumeImage,
  },
  {
    slug: "why-smell-is-the-only-sense-that-bypasses-the-brains-filter",
    title: "Why Smell Is the Only Sense That Bypasses the Brain's Filter",
    excerpt:
      "Every other sense passes through the thalamus. Smell does not. Here is what that means for memory — and for MADELEINE.",
    date: "April 2026",
    category: "Science",
    image: scienceImage,
  },
  {
    slug: "how-to-choose-the-perfume-for-your-honeymoon",
    title: "How to Choose the Perfume for Your Honeymoon",
    excerpt:
      "Not notes or accords—a protocol for encoding. Your preference matters less than the virgin molecule and the geography of your emotion.",
    date: "April 2026",
    category: "Journal",
    image: justMarriedImage,
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

/** @returns {JournalEntry | undefined} */
export function getJournalFeatured() {
  return getJournalEntryBySlug(JOURNAL_FEATURED_SLUG);
}

/** @returns {JournalEntry[]} */
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
