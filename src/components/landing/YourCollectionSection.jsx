import { YOUR_COLLECTION_COPY } from "../../config/landingYourCollection";
import libraryImg from "../../image/library.png";
import SectionLogoWatermark from "../layout/SectionLogoWatermark";
import SplitMediaSection from "./SplitMediaSection";

export default function YourCollectionSection() {
  const copy = YOUR_COLLECTION_COPY;

  const subtitle = (
    <p className="typo-typewriter-lead-centered">
      {copy.subtitleBefore}
      <span className="text-wine">{copy.subtitleEmphasis}</span>
      {copy.subtitleAfter}
    </p>
  );

  const description = (
    <>
      {copy.paragraphs.map((text, i) => (
        <p key={i} className="typo-body-lead">
          {text}
        </p>
      ))}
    </>
  );

  return (
    <SplitMediaSection
      id="collection"
      overlay={<SectionLogoWatermark variant="paper" />}
      image={{
        src: libraryImg,
        alt: "Étagère Scentience — flacons gravés de souvenirs, Kyoto, Rome, bougie et carte",
      }}
      title={copy.title}
      titleClassName="split-media-heading-lg"
      subtitle={subtitle}
      description={description}
      reverse
      headingCentered
      cta={{ label: copy.ctaLabel, href: "#collection" }}
    />
  );
}
