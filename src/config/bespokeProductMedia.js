import bottleImg from "../image/bottle.png";
import bottlePaperImg from "../image/bottle+paper.png";
import libraryImg from "../image/library.png";

/** 3 photos + 1 vidéo — `public/product/original-bespoke.mp4` */
export const BESPOKE_PRODUCT_MEDIA = [
  {
    type: "image",
    src: bottleImg,
    alt: "Original Bespoke — 30 ml Scentience bottle",
  },
  {
    type: "image",
    src: bottlePaperImg,
    alt: "The memory journal ritual — Scentience bottle after the journey",
  },
  {
    type: "image",
    src: libraryImg,
    alt: "Your volume in the olfactory library",
  },
  {
    type: "video",
    src: "/product/original-bespoke.mp4",
    poster: bottleImg,
    alt: "Original Bespoke — craftsmanship",
  },
];
