import { useEffect } from "react";
import { DEFAULT_OG_IMAGE, SITE_ORIGIN } from "../config/seoMeta";

function upsertMetaByName(name, content) {
  if (content == null || content === "") return;
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaByProperty(property, content) {
  if (content == null || content === "") return;
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Met à jour title + meta pour la route courante (SPA).
 */
export function usePageSeo({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = "website",
  ogImage,
  ogImageAlt,
  articlePublishedTime,
  articleAuthor,
  articleSection,
  noindex = false,
}) {
  useEffect(() => {
    document.title = title;

    upsertMetaByName("title", title);
    upsertMetaByName("description", description);
    if (keywords) upsertMetaByName("keywords", keywords);
    upsertMetaByName("robots", noindex ? "noindex, nofollow" : "index, follow");

    upsertCanonical(canonicalUrl);

    const image = ogImage || DEFAULT_OG_IMAGE;
    const imageAlt = ogImageAlt || title;

    upsertMetaByProperty("og:type", ogType);
    upsertMetaByProperty("og:url", canonicalUrl);
    upsertMetaByProperty("og:title", title);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:image", image);
    upsertMetaByProperty("og:image:alt", imageAlt);
    upsertMetaByProperty("og:site_name", "MADELEINE");
    upsertMetaByProperty("og:locale", "en_GB");

    if (ogType === "article") {
      if (articlePublishedTime) {
        upsertMetaByProperty("article:published_time", articlePublishedTime);
      }
      if (articleAuthor) {
        upsertMetaByProperty("article:author", articleAuthor);
      }
      if (articleSection) {
        upsertMetaByProperty("article:section", articleSection);
      }
    }

    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:url", canonicalUrl);
    upsertMetaByName("twitter:title", title);
    upsertMetaByName("twitter:description", description);
    upsertMetaByName("twitter:image", image);
    upsertMetaByName("twitter:image:alt", imageAlt);
    upsertMetaByName("twitter:site", "@madeleine");
  }, [
    title,
    description,
    keywords,
    canonicalUrl,
    ogType,
    ogImage,
    ogImageAlt,
    articlePublishedTime,
    articleAuthor,
    articleSection,
    noindex,
  ]);
}
