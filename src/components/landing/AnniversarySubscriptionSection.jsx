import { ANNIVERSARY_SUBSCRIPTION_COPY } from "../../config/landingAnniversarySubscription";
import { WAITING_LIST_CTA_LABEL } from "../../config/waitingListMessaging";
import anniversaryImg from "../../image/anniverssaire.png";
import SplitMediaSection from "./SplitMediaSection";

/** Image à gauche, texte à droite — aligné sur CraftPitchSection / SplitMediaSection. */
export default function AnniversarySubscriptionSection() {
  const copy = ANNIVERSARY_SUBSCRIPTION_COPY;

  const description = (
    <p className="typo-typewriter-lead">{copy.subtitle}</p>
  );

  return (
    <SplitMediaSection
      image={{ src: anniversaryImg, alt: copy.imageAlt }}
      title={copy.title}
      titleClassName="split-media-heading-lg"
      description={description}
      reverse={false}
      cta={{ label: WAITING_LIST_CTA_LABEL, href: "#waitlist" }}
    />
  );
}
