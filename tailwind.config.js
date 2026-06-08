/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--color-paper)",
        ink: "var(--color-ink)",
        wine: "var(--color-wine)",
        mist: "var(--color-mist)",
        /** Texte lisible sur fond wine (CTA) */
        "on-wine": "var(--color-on-wine)",
      },
      fontFamily: {
        typewriter: ["var(--font-typewriter)"],
        subtitle: ["var(--font-subtitle)"],
        body: ["var(--font-body)"],
      },
      letterSpacing: {
        typewriter: "var(--tracking-typewriter)",
        subtitle: "var(--tracking-subtitle)",
      },
    },
  },
  plugins: [],
};
