import FaqSection from "../faq/FaqSection";
import {
  PRODUCT_FAQ_INTRO,
  PRODUCT_FAQ_ITEMS,
  PRODUCT_PAGE_CANONICAL,
} from "../../config/productFaq";

/** FAQ produit — wrapper fin autour de `FaqSection` (même motif que ProcessFaqSection). */
export default function ProductFaqSection() {
  return (
    <FaqSection
      headingId="product-faq-heading"
      intro={PRODUCT_FAQ_INTRO}
      items={PRODUCT_FAQ_ITEMS}
      jsonLdPageUrl={PRODUCT_PAGE_CANONICAL}
    />
  );
}
