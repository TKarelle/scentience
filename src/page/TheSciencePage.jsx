import { Link } from "react-router-dom";
import EditorialHero from "../components/editorial/EditorialHero";
import SplitMediaSection from "../components/landing/SplitMediaSection";
import SectionLogoWatermark from "../components/layout/SectionLogoWatermark";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import PreOrderCtaLink from "../components/cta/PreOrderCtaLink";
import { THE_SCIENCE_SEO, absoluteUrl, absoluteAssetUrl } from "../config/seoMeta";
import { IMAGE_DIMENSIONS } from "../config/imageDimensions";
import ScienceKeyStats from "../components/science/ScienceKeyStats";
import SciencePeerResearchSection from "../components/science/SciencePeerResearchSection";
import {
  THE_SCIENCE_CLOSING_CTA,
  THE_SCIENCE_HERO,
  THE_SCIENCE_PILLARS,
  THE_SCIENCE_SCENT_MAPPING,
} from "../config/theScienceCopy";
import noteHeroImg from "../image/note.webp";
import bottleImg from "../image/bottle.webp";

function SciencePillar({ n, title, body }) {
  return (
    <div className="science-pillars__cell">
      <p className="science-pillars__index">{n}</p>
      <h3 className="science-pillars__title">{title}</h3>
      <p className="science-pillars__body">{body}</p>
    </div>
  );
}

function TheScienceMain() {
  const hero = THE_SCIENCE_HERO;
  const scentMapping = THE_SCIENCE_SCENT_MAPPING;
  const closing = THE_SCIENCE_CLOSING_CTA;

  return (
    <article className="bg-paper">
      <EditorialHero
        headingId="science-hero-heading"
        imageSrc={noteHeroImg}
        imageAlt="The science of scent and memory — MADELEINE"
        imageWidth={IMAGE_DIMENSIONS.banner.width}
        imageHeight={IMAGE_DIMENSIONS.banner.height}
        kicker={hero.kicker}
        title={hero.title}
        subtitle={hero.subtitle}
        cta={<PreOrderCtaLink className="w-full max-w-xs sm:w-auto" />}
      />

      <ScienceKeyStats />

      {/* Trois piliers — bandeau mist */}
      <section
        className="science-pillars"
        aria-labelledby="science-pillars-heading"
      >
        <div className="science-pillars__inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="science-pillars__header text-center">
            <h2 id="science-pillars-heading" className="sr-only">
              Three pillars of olfactory memory
            </h2>
            <p className="science-pillars__eyebrow">The evidence</p>
            <p className="science-pillars__heading">Why scent encodes memory</p>
          </header>
          <div className="science-pillars__grid">
            {THE_SCIENCE_PILLARS.map((pillar) => (
              <SciencePillar key={pillar.n} {...pillar} />
            ))}
          </div>
        </div>
      </section>

      <SciencePeerResearchSection />

      {/* Scent-Mapping — application concrète */}
      <SplitMediaSection
        className="science-scent-mapping"
        titleId="science-scent-mapping-heading"
        title={scentMapping.title}
        titleClassName="split-media-heading-lg"
        image={{
          src: bottleImg,
          alt: "MADELEINE bespoke bottle — a physical archive of memory",
        }}
        overlay={<SectionLogoWatermark variant="paper" />}
        reverse
        headingCentered
        subtitle={
          <p className="typo-typewriter-lead-centered">
            {scentMapping.subtitle}
          </p>
        }
        description={
          <>
            {scentMapping.paragraphs.map((text, i) => (
              <p key={i} className="typo-body-lead">
                {text}
              </p>
            ))}
            <Link
              to={scentMapping.processCta.to}
              className="typo-typewriter-lead inline-block pt-2 text-wine underline underline-offset-4"
            >
              {scentMapping.processCta.label} →
            </Link>
          </>
        }
        showPreOrderCta
      />

      {/* CTA final — bandeau wine */}
      <section
        className="science-closing"
        aria-labelledby="science-closing-heading"
      >
        <div className="science-closing__inner mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 id="science-closing-heading" className="science-closing__title">
            {closing.title}
          </h2>
          <p className="science-closing__subtitle">{closing.subtitle}</p>
          <div className="science-closing__actions">
            <PreOrderCtaLink
              variant="on-wine"
              className="w-full max-w-xs sm:w-auto"
            />
            <Link
              to="/the-process"
              className="cta-pill cta-pill--on-wine w-full max-w-xs sm:w-auto"
            >
              The process
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

export default function TheSciencePage() {
  return (
    <SiteChrome>
      <SyncPageSeo
        title={THE_SCIENCE_SEO.title}
        description={THE_SCIENCE_SEO.description}
        keywords={THE_SCIENCE_SEO.keywords}
        canonicalUrl={absoluteUrl(THE_SCIENCE_SEO.canonicalPath)}
        ogImage={absoluteAssetUrl(noteHeroImg)}
        ogImageAlt="The science of scent and memory — MADELEINE"
      />
      <TheScienceMain />
    </SiteChrome>
  );
}
