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
      "At Scentience our purpose is to contribute to the rich literature on the Proust Phenomenon, know as involuntary autobiographical memory. We intend to gather survey data about people’s smell memories to better understand how episodic memory is encoded ",
    ctaLabel: "SHARE MY STORY",
    ctaHref: "#proust-contribute",
  },

  /** Titre de section ; le contenu des cartes = `SHARED_STORIES_COPY.stories`. */
  storiesSectionTitle: "Field stories",

  storyForm: {
    title: "Share your story",
    intro: "",
    fields: {
      name: "Name",
      place: "Scent",
      excerpt: "Story",
      consent:
        "I agree Scentience may contact me about research use. I have read the",
    },
    excerptMinChars: 20,
    submitLabel: "Send via email",
    emailTo: "Info@scentience.uk",
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
