/**
 * SEO defaults — English. Override domain with `VITE_SITE_ORIGIN` (no trailing slash).
 */

export const SITE_ORIGIN =
  (typeof import.meta !== "undefined" &&
    import.meta.env?.VITE_SITE_ORIGIN?.replace(/\/$/, "")) ||
  "https://scentience.uk";

/** Cover article — canonical URL matches marketing slug `/journal/the-proust-project`. */
export const PROUST_ARTICLE_SLUG =
  "the-proust-project-how-scent-encodes-memory-forever";

export const HOME_PAGE_SEO = {
  title: "Scentience — The first olfactory library | London",
  description:
    "Commission a fragrance built around your journey—honeymoons, anniversaries, moments you refuse to forget. Science-led scent-mapping, IFRA-aligned formulations.",
  keywords:
    "custom fragrance, olfactory memory, personalized perfume, honeymoon perfume, memory perfume, Scentience, The Proust Project, bespoke fragrance UK, luxury custom perfume",
  canonicalPath: "/",
};

export const JOURNAL_INDEX_SEO = {
  title: "The journal | Scentience",
  description:
    "Essays and science on scent, memory, and travel—from virgin molecules to Scent-Mapping. Stories from the olfactory library.",
  keywords:
    "Scentience journal, olfactory memory, scent and memory, perfume memory, custom fragrance stories",
  canonicalPath: "/journal",
};

export const THE_PROCESS_SEO = {
  title: "The process | Scentience",
  description:
    "How Scent-Mapping works—from your destination and intention to a unique formula, hand-labelled ritual, and the memory you keep.",
  keywords:
    "Scent-Mapping, bespoke fragrance UK, personalised perfume travel, honeymoon perfume, custom fragrance process",
  canonicalPath: "/the-process",
};

export const BESPOKE_PRODUCT_SEO = {
  title: "Original Bespoke — 30 ml memory fragrance | Scentience",
  description:
    "Original Bespoke: 30 ml journey-built formula, optional 20-page journal, from €100. Free delivery · 5–7 business days. 247+ commissions · 4.9★.",
  keywords:
    "Scentience Original Bespoke, bespoke fragrance 30ml, memory perfume, custom fragrance UK, honeymoon perfume, personalized perfume, luxury custom perfume",
  canonicalPath: "/product/original-bespoke",
};

export const THE_SCIENCE_SEO = {
  title: "The science | Scentience — Alchemists of Memory",
  description:
    "Neuroscience behind olfactory memory: limbic bypass, the Proustian effect, Scent-Mapping, and IFRA-aligned bespoke fragrance — proof that scent encodes what photography cannot.",
  keywords:
    "olfactory memory science, limbic system smell, amygdala scent, Proustian memory effect, Scent-Mapping, smell and emotions, IFRA UK, emotional memory fragrance, bespoke fragrance UK",
  canonicalPath: "/the-science",
};

export const PROUST_MADELEINE_SEO = {
  title: "The Proust Project — What is your Proust madeleine? | Scentience",
  description:
    "Field stories, olfactory-memory research in brief, and a way to submit your own cue—Scentience tokens, serious editorial layout, transparent methods.",
  keywords:
    "Proust effect, madeleine memory, odour-evoked autobiographical memory, OEAM, smell and memory research, limbic system, Scentience, citizen science scent",
  canonicalPath: "/science/what-is-your-proust-madeleine",
};

export const TERMS_PAGE_SEO = {
  title: "Terms, privacy & GDPR | Scentience",
  description:
    "Product safety, user-generated content, research use, data processing under GDPR, returns policy for bespoke fragrances, and how to contact Scentience.",
  keywords:
    "Scentience terms, GDPR, privacy policy, bespoke fragrance returns, IFRA compliance, user content policy, scentience.uk",
  canonicalPath: "/terms",
};

/** Per-article overrides (`slug` key = key in `articles` map in article.jsx). */
export const ARTICLE_SEO_BY_SLUG = {
  [PROUST_ARTICLE_SLUG]: {
    title:
      "The Proust Project: How Scent Encodes Memory Forever | Scentience",
    description:
      "Discover the neuroscience behind olfactory memory. Learn why scent is the most powerful trigger for emotional recall — and how Scentience encodes your greatest journeys.",
    keywords:
      "olfactory memory, scent and memory, perfume memory, custom fragrance, memory perfume, Proust effect, smell and emotions, luxury custom perfume, bespoke fragrance UK, personalised perfume travel, honeymoon perfume, how scent triggers memories, olfactory memory science",
    canonicalPath: "/journal/the-proust-project",
    ogType: "article",
  },
};

export function absoluteUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${p}`;
}

/** Prefer marketing URL when an SEO slug exists (e.g. Proust cover story). */
export function getArticlePath(slug) {
  if (slug === PROUST_ARTICLE_SLUG) return "/journal/the-proust-project";
  return `/article/${slug}`;
}
