import { useEffect } from "react";
import { SITE_ORIGIN } from "../config/seoMeta";

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
  noindex = false,
}) {
  useEffect(() => {
    document.title = title;

    upsertMetaByName("title", title);
    upsertMetaByName("description", description);
    if (keywords) upsertMetaByName("keywords", keywords);
    if (noindex) {
      upsertMetaByName("robots", "noindex, nofollow");
    } else {
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) robots.remove();
    }

    upsertCanonical(canonicalUrl);

    const image =
      ogImage || `${SITE_ORIGIN}/landing.png`;

    upsertMetaByProperty("og:type", ogType);
    upsertMetaByProperty("og:url", canonicalUrl);
    upsertMetaByProperty("og:title", title);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:image", image);
    upsertMetaByProperty("og:site_name", "MADELEINE");

    upsertMetaByProperty("twitter:card", "summary_large_image");
    upsertMetaByProperty("twitter:url", canonicalUrl);
    upsertMetaByProperty("twitter:title", title);
    upsertMetaByProperty("twitter:description", description);
    upsertMetaByProperty("twitter:image", image);
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, noindex]);
}
