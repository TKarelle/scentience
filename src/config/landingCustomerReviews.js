import celebrationImg from "../image/celebration.webp";
import danseImg from "../image/danse.webp";
import justMarriedImg from "../image/justmarried.webp";
import { BESPOKE_PRODUCT } from "./bespokeProduct";
import { PRE_ORDER_CTA_LABEL, PRE_ORDER_PATH } from "./preOrderMessaging";

/**
 * Avis clients — landing uniquement (trust).
 * Les stories éditoriales Proust restent dans `landingSharedStories.js`.
 */
export const CUSTOMER_REVIEWS_COPY = {
  title: "What our customers say",
  aggregate: {
    rating: BESPOKE_PRODUCT.socialProof?.rating ?? 4.9,
    reviewCount: BESPOKE_PRODUCT.socialProof?.reviewCount ?? 38,
    commissionsCount: BESPOKE_PRODUCT.socialProof?.commissionsCount ?? 247,
  },
  reviews: [
    {
      id: "daniela",
      name: "Daniela",
      place: "Wedding day",
      journey: "Wedding · Original Bespoke",
      rating: 5,
      verified: true,
      photo: justMarriedImg,
      photoAlt: "Daniela — wedding fragrance",
      quote:
        "My wedding perfume is now part of my memory box alongside my photos and vows. Every anniversary, one spray takes me straight back to that day. It's the most meaningful keepsake we have.",
    },
    {
      id: "josh-thias",
      name: "Josh & Thias",
      place: "Paris & Rome",
      journey: "Honeymoon · Original Bespoke",
      rating: 5,
      verified: true,
      photo: celebrationImg,
      photoAlt: "Josh & Thias — honeymoon fragrances",
      quote:
        "We created one scent for Paris and another for Rome on our honeymoon. Wearing them made us more present, knowing we were creating memories we'd be able to relive for years to come.",
    },
    {
      id: "jenna-ewan",
      name: "Jenna & Ewan",
      place: "Antibes",
      journey: "Honeymoon · Original Bespoke",
      rating: 5,
      verified: true,
      photo: danseImg,
      photoAlt: "Jenna & Ewan — Antibes honeymoon",
      quote:
        "Our bespoke honeymoon fragrance became part of every day we spent in Antibes. Now, every time we wear it, we're transported back to those carefree weeks on the French Riviera.",
    },
  ],
  ctaLabel: PRE_ORDER_CTA_LABEL,
  ctaHref: PRE_ORDER_PATH,
};
