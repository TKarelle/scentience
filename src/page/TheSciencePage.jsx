import { Link } from "react-router-dom";
import SplitMediaSection from "../components/landing/SplitMediaSection";
import SectionLogoWatermark from "../components/layout/SectionLogoWatermark";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import PreOrderCtaLink from "../components/cta/PreOrderCtaLink";
import { THE_SCIENCE_SEO, absoluteUrl } from "../config/seoMeta";
import ScienceKeyStats from "../components/science/ScienceKeyStats";
import SciencePeerResearchSection from "../components/science/SciencePeerResearchSection";
import {
  THE_SCIENCE_CLOSING_CTA,
  THE_SCIENCE_HERO,
  THE_SCIENCE_PILLARS,
  THE_SCIENCE_SCENT_MAPPING,
} from "../config/theScienceCopy";
import noteHeroImg from "../image/note.png";
import bottleImg from "../image/bottle.png";

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
      {/* Hero — The science */}
      <header
        className="relative flex min-h-[min(85vh,48rem)] flex-col justify-end overflow-hidden border-b border-wine/15"
        aria-labelledby="science-hero-heading"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={noteHeroImg}
            alt="The science of scent and memory — MADELEINE"
            className="h-full w-full object-cover object-center"
            decoding="async"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-paper/25 via-paper/10 to-paper/35"
            aria-hidden
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24">
          <div className="card-fill-paper w-full max-w-3xl px-8 py-10 shadow-xl backdrop-blur-sm sm:px-10 sm:py-12">
            <p className="typewriter-face text-xs font-normal uppercase tracking-[0.14em] text-ink sm:text-sm">
              {hero.kicker}
            </p>
            <h1
              id="science-hero-heading"
              className="typo-title mt-4 max-w-3xl text-xl font-light uppercase leading-snug tracking-[0.06em] text-wine sm:mt-5 sm:text-2xl sm:leading-snug md:text-3xl md:leading-snug lg:text-4xl lg:tracking-[0.05em]"
            >
              {hero.title}
            </h1>
            <p className="typo-body-lead mt-5 max-w-xl sm:mt-6">
              {hero.subtitle}
            </p>
            <div className="mt-10">
              <PreOrderCtaLink className="w-full max-w-xs sm:w-auto" />
            </div>
          </div>
        </div>
      </header>

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
      />
      <TheScienceMain />
    </SiteChrome>
  );
}
