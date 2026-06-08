import FaqSection from "../faq/FaqSection";
import {
  LANDING_FAQ_INTRO,
  LANDING_FAQ_ITEMS,
  LANDING_PAGE_CANONICAL,
} from "../../config/landingFaq";

export default function FAQSection() {
  return (
    <FaqSection
      headingId="landing-faq-heading"
      intro={LANDING_FAQ_INTRO}
      items={LANDING_FAQ_ITEMS}
      jsonLdPageUrl={LANDING_PAGE_CANONICAL}
    />
  );
}
