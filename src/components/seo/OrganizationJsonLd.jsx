import { useEffect } from "react";
import { SITE_ORIGIN } from "../../config/seoMeta";
import { INSTAGRAM_URL } from "../../config/siteSocial";

function injectOrganizationSchema() {
  const id = "madeleine-organization-jsonld";
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }

  el.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_ORIGIN}/#organization`,
        name: "MADELEINE",
        url: SITE_ORIGIN,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_ORIGIN}/logowine-full.png`,
        },
        email: "Info@madeleine.uk",
        description:
          "Bespoke fragrance and scent-mapping for journeys and milestones — olfactory memory, IFRA-aligned formulations.",
        sameAs: [INSTAGRAM_URL],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        url: SITE_ORIGIN,
        name: "MADELEINE",
        description:
          "Bespoke perfume for journeys and milestones — Scent-Mapping, olfactory memory, London UK.",
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
        inLanguage: "en-GB",
      },
    ],
  });
}

/** Organization + WebSite schema — injected when idle to avoid blocking paint. */
export default function OrganizationJsonLd() {
  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(() => injectOrganizationSchema());
      return () => window.cancelIdleCallback(idleId);
    }

    const t = window.setTimeout(injectOrganizationSchema, 1);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
