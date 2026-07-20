/**
 * SEO defaults — English. Override domain with `VITE_SITE_ORIGIN` (no trailing slash).
 */

import { JOURNAL_ENTRIES_ALL } from "./journalArticles";

export const SITE_ORIGIN =
  (typeof import.meta !== "undefined" &&
    import.meta.env?.VITE_SITE_ORIGIN?.replace(/\/$/, "")) ||
  "https://madeleine.uk";

export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/hero-banner.webp`;
export const PRODUCT_OG_IMAGE = `${SITE_ORIGIN}/logowine-full.png`;

/** Absolute URL for a file in `public/` (e.g. `/landing.png`). */
export function publicAssetUrl(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

/** Absolute URL for a Vite-resolved import (e.g. imported PNG → `/assets/…`). */
export function absoluteAssetUrl(assetPath) {
  if (!assetPath) return DEFAULT_OG_IMAGE;
  if (assetPath.startsWith("http")) return assetPath;
  const normalized = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return `${SITE_ORIGIN}${normalized}`;
}

/** Cover article — canonical URL matches marketing slug `/journal/the-proust-project`. */
export const PROUST_ARTICLE_SLUG =
  "the-proust-project-how-scent-encodes-memory-forever";

export const HOME_PAGE_SEO = {
  title: "MADELEINE — bespoke perfume for your next journey | London",
  description:
    "Commission a fragrance built around your journey—honeymoons, anniversaries, moments you refuse to forget. Science-led scent-mapping, IFRA-aligned formulations.",
  keywords:
    "custom fragrance, olfactory memory, personalized perfume, honeymoon perfume, memory perfume, MADELEINE, The Proust Project, bespoke fragrance UK, luxury custom perfume",
  canonicalPath: "/",
};

export const JOURNAL_INDEX_SEO = {
  title: "The journal | MADELEINE",
  description:
    "Articles and science on scent, memory, and travel—from virgin molecules to Scent-Mapping. Stories from the olfactory library.",
  keywords:
    "MADELEINE journal, olfactory memory, scent and memory, perfume memory, custom fragrance stories",
  canonicalPath: "/journal",
};

export const THE_PROCESS_SEO = {
  title: "The process | MADELEINE",
  description:
    "How Scent-Mapping works—from order before you leave to bespoke alchemy, the journal ritual, and encoded memory you keep for life.",
  keywords:
    "Scent-Mapping, bespoke fragrance UK, personalised perfume travel, honeymoon perfume, custom fragrance process",
  canonicalPath: "/the-process",
};

export const BESPOKE_PRODUCT_SEO = {
  title: "Original Bespoke — 30 ml memory fragrance | MADELEINE",
  description:
    "Original Bespoke: 30 ml journey-built formula, optional 20-page journal, from £100. Free UK delivery · 5–7 business days. 247+ commissions · 4.9★.",
  keywords:
    "MADELEINE Original Bespoke, bespoke fragrance 30ml, memory perfume, custom fragrance UK, honeymoon perfume, personalized perfume, luxury custom perfume",
  canonicalPath: "/product/original-bespoke",
};

export const THE_SCIENCE_SEO = {
  title: "The science | MADELEINE — Alchemists of Memory",
  description:
    "Neuroscience behind olfactory memory: limbic bypass, the Proustian effect, Scent-Mapping, and IFRA-aligned bespoke fragrance — proof that scent encodes what photography cannot.",
  keywords:
    "olfactory memory science, limbic system smell, amygdala scent, Proustian memory effect, Scent-Mapping, smell and emotions, IFRA UK, emotional memory fragrance, bespoke fragrance UK",
  canonicalPath: "/the-science",
};

export const PROUST_MADELEINE_SEO = {
  title: "The Proust Project — What is your Proust madeleine? | MADELEINE",
  description:
    "Field stories, olfactory-memory research in brief, and a way to submit your own cue—MADELEINE tokens, serious editorial layout, transparent methods.",
  keywords:
    "Proust effect, madeleine memory, odour-evoked autobiographical memory, OEAM, smell and memory research, limbic system, MADELEINE, citizen science scent",
  canonicalPath: "/science/what-is-your-proust-madeleine",
};

export const ORDER_CONFIRMATION_SEO = {
  title: "Order confirmed | MADELEINE",
  description:
    "Your Original Bespoke pre-order is confirmed. We will be in touch with next steps for your bespoke fragrance.",
  keywords: "MADELEINE order confirmation, bespoke fragrance pre-order",
  canonicalPath: "/order/confirmation",
};

export const NOT_FOUND_SEO = {
  title: "Page not found | MADELEINE",
  description: "This page does not exist. Return to MADELEINE or pre-order Original Bespoke.",
  keywords: "MADELEINE",
  canonicalPath: "/",
};

export const CONTACT_PAGE_SEO = {
  title: "Contact | MADELEINE",
  description:
    "Contact MADELEINE about Original Bespoke pre-orders, shipping, product safety, press, and The Proust Project. Info@madeleine.uk",
  keywords:
    "contact MADELEINE, bespoke fragrance UK, madeleine.uk support, pre-order help",
  canonicalPath: "/contact",
  ogImage: `${SITE_ORIGIN}/hero-banner.webp`,
};

export const TERMS_PAGE_SEO = {
  title: "Terms, privacy & GDPR | MADELEINE",
  description:
    "Product safety, user-generated content, research use, data processing under GDPR, returns policy for bespoke fragrances, and how to contact MADELEINE.",
  keywords:
    "MADELEINE terms, GDPR, privacy policy, bespoke fragrance returns, IFRA compliance, user content policy, madeleine.uk",
  canonicalPath: "/terms",
  ogImage: `${SITE_ORIGIN}/hero-banner.webp`,
};

const PROUST_ARTICLE_SEO = {
  title: "The Proust Project: How Scent Encodes Memory Forever | MADELEINE",
  description:
    "Discover the neuroscience behind olfactory memory. Learn why scent is the most powerful trigger for emotional recall — and how MADELEINE encodes your greatest journeys.",
  keywords:
    "olfactory memory, scent and memory, perfume memory, custom fragrance, memory perfume, Proust effect, smell and emotions, luxury custom perfume, bespoke fragrance UK, personalised perfume travel, honeymoon perfume, how scent triggers memories, olfactory memory science",
  canonicalPath: "/journal/the-proust-project",
  ogType: "article",
};

/** Prefer marketing URL when an SEO slug exists (e.g. Proust cover story). */
export function getArticlePath(slug) {
  if (slug === PROUST_ARTICLE_SLUG) return "/journal/the-proust-project";
  return `/article/${slug}`;
}

/** Per-article SEO — généré depuis `journalArticles.js` (+ override Proust). */
export const ARTICLE_SEO_BY_SLUG = Object.fromEntries(
  JOURNAL_ENTRIES_ALL.map((entry) => {
    if (entry.slug === PROUST_ARTICLE_SLUG) {
      return [entry.slug, PROUST_ARTICLE_SEO];
    }
    return [
      entry.slug,
      {
        title: `${entry.title} | MADELEINE`,
        description: entry.seoDescription ?? entry.excerpt,
        keywords: `MADELEINE, ${entry.category.toLowerCase()}, olfactory memory, scent and memory, custom fragrance, ${entry.title}`,
        canonicalPath: getArticlePath(entry.slug),
        ogType: "article",
      },
    ];
  }),
);

export function absoluteUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${p}`;
}
