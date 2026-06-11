/**
 * Analytics — Plausible et/ou GA4 selon les variables d’environnement.
 * Événements CTA : trackEvent("cta_pre_order", { location: "header" }).
 */

export function trackEvent(name, props = {}) {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.plausible === "function") {
      window.plausible(name, { props });
    }
  } catch {
    /* ignore */
  }

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, props);
    }
  } catch {
    /* ignore */
  }
}
