/**
 * The Project Proust — page éditoriale / recherche.
 * Les cartes témoignages réutilisent `SHARED_STORIES_COPY.stories` (source unique).
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

  /** Titre de section ; le contenu des cartes = `SHARED_STORIES_COPY.stories`. */
  storiesSectionTitle: "Field stories",

  storyForm: {
    title: "Share your story",
    subtitle:
      "Three fields — same structure as the field stories above. A few lines are enough.",
    fields: {
      name: {
        label: "Your name",
        placeholder: "e.g. Elena — or first name only",
      },
      scent: {
        label: "The scent",
        placeholder: "e.g. violet soap, rain on hot pavement, his cedar cologne…",
      },
      story: {
        label: "What came back",
        placeholder:
          "Where were you? What returned — a room, a face, a whole journey?",
      },
      consent:
        "I agree MADELEINE may contact me about research use. I have read the",
    },
    excerptMinChars: 20,
    submitLabel: "Send via email",
    emailTo: "Info@madeleine.uk",
    emailSubject: "[Project Proust] Story",
  },

  crossLinks: {
    science: { to: "/the-science", label: "The science" },
    essay: {
      to: "/journal/the-proust-project",
      label: "Long read: The Proust Project",
    },
    terms: { to: "/terms", label: "Terms & privacy" },
  },
};
