import bottlePaperImg from "../image/bottle+paper.png";
import libraryImg from "../image/library.png";
import sprayImg from "../image/spray.png";
import {
  PRE_ORDER_CTA_LABEL,
  PRE_ORDER_PATH,
} from "./preOrderMessaging";

/**
 * Section découverte — How it Works, Collection, Philosophy (onglets).
 */
export const DISCOVER_TABS_SECTION = {
  quote: {
    parts: [
      { text: "Empty of ", accent: false },
      { text: "meaning", accent: true },
      { text: ", Until you ", accent: false },
      { text: "wear", accent: true },
      { text: " it.", accent: false },
    ],
  },
  tabs: [
    {
      id: "process",
      label: "How it Works",
      title: "How it works",
      type: "steps",
      steps: [
        {
          n: 1,
          title: "Order before you leave",
          body:
            "Choose your destination. Your MADELEINE formula begins with the journey ahead — composed before you smell it.",
        },
        {
          n: 2,
          title: "Wear it on the journey",
          body:
            "Live the moment in your bespoke scent — one formula, never replicated. When you return, write in the journal to anchor the memory.",
        },
        {
          n: 3,
          title: "Encode the memory",
          body:
            "Years later, one inhalation — the journey comes back in full.",
        },
      ],
      image: sprayImg,
      imageAlt: "Vaporisation d’un parfum MADELEINE — geste et brume dorée",
      cta: {
        kind: "link",
        href: "/the-process",
        label: "Read more",
      },
    },
    {
      id: "collection",
      label: "Your Collection",
      title: "Your collection",
      type: "collection",
      subtitleBefore: "Your shelf tells your ",
      subtitleEmphasis: "life",
      subtitleAfter: ".",
      paragraphs: [
        "Each bottle holds a specific moment — a city, an event, a version of yourself you never want to lose.",
        "Over time, your collection becomes something no photograph album can be: a biography written in scent.",
        "Every great journey deserves its own scent. Every great life deserves a library.",
      ],
      image: libraryImg,
      imageAlt:
        "Étagère MADELEINE — flacons gravés de souvenirs, Kyoto, Rome, bougie et carte",
      cta: {
        kind: "link",
        href: PRE_ORDER_PATH,
        label: PRE_ORDER_CTA_LABEL,
      },
    },
    {
      id: "philosophy",
      label: "Our Philosophy",
      title: "OUR PHILOSOPHY— THE PROUST PROJECT",
      type: "prose",
      paragraphs: [
        "Based on the Proust Phenomenon, scent has a unique ability to evoke vivid, emotional memories. We create bespoke perfumes designed for one purpose: to accompany life's most meaningful moments. Each fragrance is crafted to be worn only for a single occasion, becoming a lasting reminder of the memories made.",
      ],
      image: bottlePaperImg,
      imageAlt:
        "MADELEINE bottle beside the memory journal — bespoke fragrance ritual",
      cta: {
        kind: "link",
        href: "/science/what-is-your-proust-madeleine",
        label: "WHAT'S YOUR MADELEINE?",
      },
    },
  ],
};
