import { useEffect } from "react";

const PLAUSIBLE_DOMAIN =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_PLAUSIBLE_DOMAIN;

const GA4_ID =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_GA4_MEASUREMENT_ID;

/** Charge Plausible et/ou GA4 une seule fois. */
export default function AnalyticsScripts() {
  useEffect(() => {
    if (PLAUSIBLE_DOMAIN && !document.getElementById("plausible-script")) {
      const s = document.createElement("script");
      s.id = "plausible-script";
      s.defer = true;
      s.dataset.domain = PLAUSIBLE_DOMAIN;
      s.src = "https://plausible.io/js/script.js";
      document.head.appendChild(s);
    }

    if (GA4_ID && !document.getElementById("ga4-script")) {
      const loader = document.createElement("script");
      loader.id = "ga4-script";
      loader.async = true;
      loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
      document.head.appendChild(loader);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA4_ID, { send_page_view: true });
    }
  }, []);

  return null;
}
