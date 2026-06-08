import { CRAFT_PITCH_COPY } from "../../config/landingCraftPitch";
import bottleImg from "../../image/bottle.png";
import SectionLogoWatermark from "../layout/SectionLogoWatermark";
import SplitMediaSection from "./SplitMediaSection";

export default function CraftPitchSection({ onOpenWaitingList }) {
  const copy = CRAFT_PITCH_COPY;

  const subtitle = (
    <p className="typo-typewriter-lead-centered">{copy.subtitle}</p>
  );

  return (
    <SplitMediaSection
      titleId="craft-pitch-heading"
      overlay={<SectionLogoWatermark variant="paper" />}
      image={{
        src: bottleImg,
        alt: "Origine — parfum Scentience sur socle minéral",
      }}
      title={copy.title}
      titleClassName="split-media-heading-lg"
      subtitle={subtitle}
      description={copy.description}
      reverse={false}
      headingCentered
      showWaitingListCta
      onWaitingListClick={onOpenWaitingList}
    />
  );
}
