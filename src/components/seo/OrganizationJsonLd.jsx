import { useEffect } from "react";
import { SITE_ORIGIN } from "../../config/seoMeta";
import { INSTAGRAM_URL } from "../../config/siteSocial";

/** Organisation schema — sameAs Instagram synchronisé avec le footer. */
export default function OrganizationJsonLd() {
  useEffect(() => {
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
      "@type": "Organization",
      name: "MADELEINE",
      url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}/logowine-full.png`,
      email: "Info@madeleine.uk",
      description:
        "Bespoke fragrance and scent-mapping for journeys and milestones — olfactory memory, IFRA-aligned formulations.",
      sameAs: [INSTAGRAM_URL],
    });
  }, []);

  return null;
}
