import { CRAFT_PITCH_COPY } from "../../config/landingCraftPitch";
import { IMAGE_DIMENSIONS } from "../../config/imageDimensions";
import bottleImg from "../../image/bottle.webp";
import bottleHoverImg from "../../image/bottle2.webp";
import SectionLogoWatermark from "../layout/SectionLogoWatermark";
import SplitMediaSection from "./SplitMediaSection";

export default function CraftPitchSection() {
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
        hoverSrc: bottleHoverImg,
        alt: "MADELEINE bespoke bottle on a mineral plinth",
        width: IMAGE_DIMENSIONS.bottle.width,
        height: IMAGE_DIMENSIONS.bottle.height,
        hoverWidth: IMAGE_DIMENSIONS.bottle2.width,
        hoverHeight: IMAGE_DIMENSIONS.bottle2.height,
      }}
      title={copy.title}
      titleClassName="split-media-heading-lg"
      subtitle={subtitle}
      description={copy.description}
      reverse={false}
      headingCentered
      showPreOrderCta
    />
  );
}
