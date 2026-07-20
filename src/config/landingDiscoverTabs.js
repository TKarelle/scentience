import bottlePaperImg from "../image/bottle+paper.webp";
import libraryImg from "../image/library.webp";
import sprayImg from "../image/spray.webp";
import { PRE_ORDER_CTA_LABEL, PRE_ORDER_PATH } from "./preOrderMessaging";
import { THE_PROCESS_STEPS } from "./theProcessCopy";

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
      steps: THE_PROCESS_STEPS.map(({ n, title, shortBody }) => ({
        n,
        title,
        body: shortBody,
      })),
      image: sprayImg,
      imageAlt: "MADELEINE perfume being sprayed — golden mist and gesture",
      cta: {
        kind: "link",
        href: "/the-process",
        label: "See the three steps",
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
        "MADELEINE shelf — engraved bottles from Kyoto, Rome, with candle and map",
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
