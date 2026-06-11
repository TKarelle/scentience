/** Réseaux sociaux — source unique footer + JSON-LD. */
export const INSTAGRAM_URL =
  (typeof import.meta !== "undefined" &&
    import.meta.env?.VITE_INSTAGRAM_URL?.replace(/\/$/, "")) ||
  "https://www.instagram.com/madeleine";

export const SITE_SOCIAL_LINKS = [
  {
    id: "instagram",
    label: "Instagram",
    url: INSTAGRAM_URL,
  },
];
