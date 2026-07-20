/**
 * Routes à prérendre au build — source unique pour les HTML shells SEO.
 * Consommé par `scripts/buildPrerenderHtml.mjs` (Node + Vite SSR load).
 */
import { JOURNAL_ENTRIES_ALL } from "./journalArticles.js";
import {
  ARTICLE_SEO_BY_SLUG,
  BESPOKE_PRODUCT_SEO,
  CONTACT_PAGE_SEO,
  DEFAULT_OG_IMAGE,
  HOME_PAGE_SEO,
  JOURNAL_INDEX_SEO,
  PROUST_MADELEINE_SEO,
  TERMS_PAGE_SEO,
  THE_PROCESS_SEO,
  THE_SCIENCE_SEO,
  getArticlePath,
} from "./seoMeta.js";

/** @param {string} imageFileName @param {string} siteOrigin @param {Record<string, { file?: string }>} manifest */
function ogFromImageFile(imageFileName, siteOrigin, manifest) {
  if (!imageFileName || !manifest) {
    return `${siteOrigin}/hero-banner.webp`;
  }

  const key = Object.keys(manifest).find((moduleId) =>
    moduleId.endsWith(`/${imageFileName}`),
  );
  if (key && manifest[key]?.file) {
    return `${siteOrigin}/${manifest[key].file}`;
  }

  return `${siteOrigin}/hero-banner.webp`;
}

/** @param {string} publicPath @param {string} siteOrigin */
function ogFromPublicPath(publicPath, siteOrigin) {
  const normalized = publicPath.startsWith("/") ? publicPath : `/${publicPath}`;
  return `${siteOrigin}${normalized}`;
}

/**
 * @param {{ siteOrigin: string, manifest: Record<string, { file?: string }> }} options
 * @returns {Array<{
 *   title: string,
 *   description: string,
 *   keywords?: string,
 *   canonicalPath: string,
 *   ogType?: string,
 *   ogImage: string,
 *   ogImageAlt?: string,
 *   articlePublishedTime?: string,
 *   articleAuthor?: string,
 *   articleSection?: string,
 *   noindex?: boolean,
 * }>}
 */
export function getPrerenderPages({ siteOrigin, manifest }) {
  /** @type {ReturnType<typeof getPrerenderPages>} */
  const pages = [];

  const staticRoutes = [
    {
      seo: HOME_PAGE_SEO,
      ogImage: ogFromPublicPath("/hero-banner.webp", siteOrigin),
      ogImageAlt: "MADELEINE bespoke fragrance — hero banner",
      ogType: "website",
    },
    {
      seo: BESPOKE_PRODUCT_SEO,
      ogImage: ogFromPublicPath("/logowine-full.png", siteOrigin),
      ogImageAlt: "MADELEINE Original Bespoke",
      ogType: "website",
    },
    {
      seo: THE_PROCESS_SEO,
      ogImage: ogFromImageFile("spray.webp", siteOrigin, manifest),
      ogImageAlt: "Perfume spray — MADELEINE Scent-Mapping process",
      ogType: "website",
    },
    {
      seo: THE_SCIENCE_SEO,
      ogImage: ogFromImageFile("note.webp", siteOrigin, manifest),
      ogImageAlt: "The science of scent and memory — MADELEINE",
      ogType: "website",
    },
    {
      seo: PROUST_MADELEINE_SEO,
      ogImage: ogFromImageFile("bag.webp", siteOrigin, manifest),
      ogImageAlt: "Travel bag and journey essentials — The Proust Project",
      ogType: "website",
    },
    {
      seo: JOURNAL_INDEX_SEO,
      ogImage: ogFromImageFile("library.webp", siteOrigin, manifest),
      ogImageAlt: "MADELEINE memory library — journal",
      ogType: "website",
    },
    {
      seo: CONTACT_PAGE_SEO,
      ogImage: ogFromPublicPath("/hero-banner.webp", siteOrigin),
      ogImageAlt: "MADELEINE bespoke fragrance — hero banner",
      ogType: "website",
    },
    {
      seo: TERMS_PAGE_SEO,
      ogImage: ogFromPublicPath("/hero-banner.webp", siteOrigin),
      ogImageAlt: "MADELEINE bespoke fragrance — hero banner",
      ogType: "website",
    },
  ];

  for (const route of staticRoutes) {
    pages.push({
      title: route.seo.title,
      description: route.seo.description,
      keywords: route.seo.keywords,
      canonicalPath: route.seo.canonicalPath,
      ogType: route.ogType,
      ogImage: route.ogImage,
      ogImageAlt: route.ogImageAlt,
    });
  }

  const imageFileBySlug = {
    "the-proust-project-how-scent-encodes-memory-forever": "library.webp",
    "why-we-always-wanted-to-bottle-our-memories": "bag.webp",
    "amalfi-coast-golden-hour-building-scent-from-a-coastline":
      "lemon+perfume.webp",
    "why-smell-is-the-only-sense-that-bypasses-the-brains-filter":
      "science.webp",
    "how-to-choose-the-perfume-for-your-honeymoon": "justmarried.webp",
  };

  for (const entry of JOURNAL_ENTRIES_ALL) {
    const seo = ARTICLE_SEO_BY_SLUG[entry.slug];
    if (!seo) continue;

    pages.push({
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      canonicalPath: seo.canonicalPath ?? getArticlePath(entry.slug),
      ogType: seo.ogType ?? "article",
      ogImage: ogFromImageFile(imageFileBySlug[entry.slug], siteOrigin, manifest),
      ogImageAlt: entry.imageAlt ?? entry.title,
      articlePublishedTime: entry.datePublished,
      articleAuthor: "MADELEINE Editorial",
      articleSection: entry.category,
    });
  }

  // Fallback si manifest vide (dev) — évite OG cassés
  if (!manifest || Object.keys(manifest).length === 0) {
    return pages.map((page) => ({
      ...page,
      ogImage: page.ogImage.startsWith("http")
        ? page.ogImage
        : DEFAULT_OG_IMAGE,
    }));
  }

  return pages;
}
