import FaqSection from "../faq/FaqSection";
import {
  THE_PROCESS_FAQ_INTRO,
  THE_PROCESS_FAQ_ITEMS,
  THE_PROCESS_PAGE_CANONICAL,
} from "../../config/theProcessFaq";

export default function ProcessFaqSection() {
  return (
    <FaqSection
      headingId="process-faq-heading"
      intro={THE_PROCESS_FAQ_INTRO}
      items={THE_PROCESS_FAQ_ITEMS}
      jsonLdPageUrl={THE_PROCESS_PAGE_CANONICAL}
    />
  );
}
