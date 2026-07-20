/**
 * The Project Proust — page éditoriale / recherche.
 * Field stories : `SHARED_STORIES_COPY.stories` (indépendant des avis landing).
 */

export const PROUST_MADELEINE_PAGE_COPY = {
  /** Hero plein écran : fond bag.png, titres, CTA paper, bandeau wine. */
  hero: {
    kicker: "The Proust Project",
    titleLine1: "HAS A SCENT EVER BROUGT BACK A MEMORY ?",
    titleLine2: "",
    tagline:
      "At MADELEINE our purpose is to contribute to the rich literature on the Proust Phenomenon, know as involuntary autobiographical memory. We intend to gather survey data about people’s smell memories to better understand how episodic memory is encoded ",
    ctaLabel: "SHARE MY STORY",
    ctaHref: "#proust-contribute",
  },

  /** Section feed social — stories puis composer. */
  storiesSectionTitle: "Field stories",
  

  storyForm: {
    title: "Share your story",
    subtitle:
      "Quick as a comment — a name, a scent, a few lines. That's it.",
    composerPrompt: "What scent brought you back?",
    fields: {
      name: {
        label: "Your name",
        placeholder: "First name or nickname",
      },
      scent: {
        label: "The scent",
        placeholder: "e.g. violet soap, rain on pavement…",
      },
      story: {
        label: "What came back",
        placeholder:
          "What scent hit you — and where did it take you? A room, a face, a whole journey…",
      },
      consent:
        "I agree MADELEINE may contact me about research use. I have read the",
    },
    excerptMinChars: 20,
    excerptMaxChars: 280,
    submitLabel: "Share story",
    emailTo: "Info@madeleine.uk",
    emailSubject: "[Project Proust] Story",
  },

  crossLinks: {
    science: { to: "/the-science", label: "The science" },
    article: {
      to: "/journal/the-proust-project",
      label: "Long read: The Proust Project",
    },
    terms: { to: "/terms", label: "Terms & privacy" },
  },
};
