import { Link } from "react-router-dom";
import SplitMediaSection from "../components/landing/SplitMediaSection";
import ProustResearchStatBanner from "../components/proust/ProustResearchStatBanner";
import SectionLogoWatermark from "../components/layout/SectionLogoWatermark";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import { useWaitingListModal } from "../context/WaitingListModalContext";
import { THE_SCIENCE_SEO, absoluteUrl } from "../config/seoMeta";
import { WAITING_LIST_CTA_LABEL } from "../config/waitingListMessaging";
import { PROUST_RESEARCH_STAT } from "../config/proustResearchStat";
import {
  THE_SCIENCE_AMYGDALA_BANNER,
  THE_SCIENCE_CLOSING_CTA,
  THE_SCIENCE_EXPERT_QUOTE,
  THE_SCIENCE_HERO,
  THE_SCIENCE_LIMBIC,
  THE_SCIENCE_ORIGIN,
  THE_SCIENCE_PILLARS,
  THE_SCIENCE_PROOF,
  THE_SCIENCE_RESEARCH_QUOTE,
  THE_SCIENCE_SCENT_MAPPING,
} from "../config/theScienceCopy";
import libraryHeroImg from "../image/library.png";
import memoriesImg from "../image/memories.png";
import bottleImg from "../image/bottle.png";
import lemonPerfumeImg from "../image/lemon+perfume.png";

function SciencePillar({ n, title, body }) {
  return (
    <div className="flex flex-col border-t border-wine/20 px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
      <p className="font-subtitle text-[10px] uppercase tracking-[0.2em] text-wine/70">
        {n}
      </p>
      <h3 className="typo-title mt-4 text-base leading-snug sm:text-lg">
        {title}
      </h3>
      <p className="typo-body-lead mt-4 max-w-sm">{body}</p>
    </div>
  );
}

function ScienceQuoteBlock({ attribution, role, quote, citation }) {
  return (
    <figure className="border-l-4 border-wine/35 py-2 pl-6 pr-2 sm:pl-8">
      {attribution != null && (
        <figcaption className="mb-4 font-subtitle text-[10px] uppercase tracking-[0.18em] text-wine/85">
          {attribution}
          {role != null && (
            <span className="mt-1 block font-body text-xs font-light normal-case tracking-normal text-mist">
              {role}
            </span>
          )}
        </figcaption>
      )}
      <blockquote className="border-0 p-0">
        <p className="typo-body-lead italic leading-[1.75] text-ink/88">
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>
      {citation != null && (
        <figcaption className="mt-4 font-subtitle text-[10px] uppercase tracking-[0.16em] text-mist not-italic">
          {citation}
        </figcaption>
      )}
    </figure>
  );
}

function TheScienceMain() {
  const { openWaitingList } = useWaitingListModal();
  const hero = THE_SCIENCE_HERO;
  const origin = THE_SCIENCE_ORIGIN;
  const limbic = THE_SCIENCE_LIMBIC;
  const scentMapping = THE_SCIENCE_SCENT_MAPPING;
  const proof = THE_SCIENCE_PROOF;
  const closing = THE_SCIENCE_CLOSING_CTA;

  return (
    <article className="bg-paper">
      {/* Hero — bibliothèque olfactive */}
      <header
        className="relative flex min-h-[min(85vh,48rem)] flex-col justify-end overflow-hidden border-b border-wine/15"
        aria-labelledby="science-hero-heading"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={libraryHeroImg}
            alt=""
            className="h-full w-full object-cover object-center"
            decoding="async"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-paper/20"
            aria-hidden
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24">
          <p className="font-subtitle text-[10px] uppercase tracking-[0.22em] text-paper/55">
            {hero.kicker}
          </p>
          <h1
            id="science-hero-heading"
            className="typo-title mt-4 text-2xl font-light leading-snug text-paper sm:text-3xl lg:text-4xl"
          >
            {hero.title}
          </h1>
          <p className="typo-typewriter-on-wine mt-6 max-w-xl text-sm sm:text-base">
            {hero.subtitle}
          </p>
          <div className="mt-10">
            <button
              type="button"
              onClick={openWaitingList}
              className="cta-parchment rounded-none px-10 tracking-[0.16em] sm:px-12"
            >
              {WAITING_LIST_CTA_LABEL}
            </button>
          </div>
        </div>
      </header>

      {/* Origine — bandeau wine éditorial */}
      <section
        className="relative isolate overflow-hidden bg-wine px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        aria-labelledby="science-origin-heading"
      >
        <SectionLogoWatermark variant="wine" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2
              id="science-origin-heading"
              className="font-subtitle text-[10px] uppercase tracking-[0.22em] text-paper/55"
            >
              {origin.eyebrow}
            </h2>
            <p className="typo-title-on-wine mt-6 text-xl font-light leading-snug sm:text-2xl">
              {origin.pullQuote}
            </p>
          </div>
          <div className="space-y-6 lg:col-span-7">
            {origin.paragraphs.map((text, i) => (
              <p key={i} className="typo-body-lead-on-wine">
                {text}
              </p>
            ))}
            <p className="typewriter-face text-sm font-normal normal-case leading-relaxed text-paper/90 sm:text-base">
              {origin.closing}
            </p>
          </div>
        </div>
      </section>

      {/* Trois piliers scientifiques */}
      <section
        className="border-b border-wine/15 bg-paper"
        aria-labelledby="science-pillars-heading"
      >
        <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
          <h2 id="science-pillars-heading" className="sr-only">
            Three pillars of olfactory memory
          </h2>
          <p className="landing-muted-text text-center font-subtitle uppercase tracking-wider">
            The evidence
          </p>
          <p className="landing-section-title mb-0 pb-12 sm:pb-14">
            Why scent encodes memory
          </p>
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 divide-y divide-wine/20 md:grid-cols-3 md:divide-x md:divide-y-0">
            {THE_SCIENCE_PILLARS.map((pillar) => (
              <SciencePillar key={pillar.n} {...pillar} />
            ))}
          </div>
        </div>
      </section>

      {/* Limbic system — split image memories */}
      <SplitMediaSection
        titleId="science-limbic-heading"
        title={limbic.title}
        titleClassName="split-media-heading-lg"
        image={{
          src: memoriesImg,
          alt: "Atmospheric still life evoking scent and memory",
        }}
        overlay={<SectionLogoWatermark variant="paper" />}
        headingCentered
        subtitle={
          <p className="typo-typewriter-lead-centered">{limbic.subtitle}</p>
        }
        description={
          <>
            <p className="typo-body-lead">{limbic.body}</p>
            <p className="typo-typewriter-lead pt-2 text-wine">
              {limbic.closing}
            </p>
          </>
        }
      />

      {/* Citations — preuves institutionnelles */}
      <section
        className="border-t border-wine/15 bg-paper py-14 sm:py-16 lg:py-20"
        aria-label="Expert and research citations"
      >
        <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          <ScienceQuoteBlock {...THE_SCIENCE_EXPERT_QUOTE} />
          <ScienceQuoteBlock {...THE_SCIENCE_RESEARCH_QUOTE} />
        </div>
      </section>

      {/* Bandeau amygdale — même pattern que The Process */}
      <section className="relative isolate overflow-hidden bg-black py-20 sm:py-28 lg:py-32">
        <SectionLogoWatermark
          variant="black"
          imgClassName="h-auto w-[min(95vw,40rem)] max-h-[min(85vh,34rem)] object-contain opacity-[0.11] brightness-0 invert sm:opacity-[0.1]"
        />
        <p className="typewriter-face relative z-10 mx-auto max-w-4xl px-6 text-center text-[11px] font-normal uppercase leading-relaxed tracking-[0.14em] text-paper sm:text-xs sm:tracking-[0.16em] md:text-sm">
          {THE_SCIENCE_AMYGDALA_BANNER}
        </p>
      </section>

      {/* Proust visuel — madeleine / citron */}
      <section
        className="relative isolate min-h-[min(70vh,36rem)] overflow-hidden"
        aria-hidden
      >
        <img
          src={lemonPerfumeImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent"
          aria-hidden
        />
      </section>

      {/* Scent-Mapping — application concrète */}
      <SplitMediaSection
        titleId="science-scent-mapping-heading"
        title={scentMapping.title}
        titleClassName="split-media-heading-lg"
        image={{
          src: bottleImg,
          alt: "Scentience bespoke bottle — a physical archive of memory",
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
        showWaitingListCta
        onWaitingListClick={openWaitingList}
      />

      {/* Proof & trust */}
      <section
        className="border-t border-ink/10 bg-paper py-20 sm:py-24 lg:py-28"
        aria-labelledby="science-proof-heading"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="science-proof-heading" className="landing-section-title">
            {proof.title}
          </h2>
          <p className="typo-body-lead -mt-12 mb-14 text-center sm:mb-16">
            {proof.intro}
          </p>
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
            {proof.items.map((item, index) => (
              <div key={index} className="border-t border-ink/20 pt-4">
                <p className="landing-muted-text">{item}</p>
              </div>
            ))}
          </div>
          <p className="typo-body-lead mt-12 text-center">
            <Link
              to="/#faq"
              className="text-wine underline underline-offset-4"
            >
              Full compliance details in our FAQ
            </Link>
          </p>
        </div>
      </section>

      <ProustResearchStatBanner ctaHref={PROUST_RESEARCH_STAT.contributePath} />

      {/* CTA final */}
      <section
        className="border-t border-wine/15 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
        aria-labelledby="science-closing-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="science-closing-heading"
            className="split-media-heading-lg text-balance"
          >
            {closing.title}
          </h2>
          <p className="typo-typewriter-lead-centered mt-5">
            {closing.subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={openWaitingList}
              className="cta-primary w-full max-w-xs rounded-none tracking-wide sm:w-auto"
            >
              {WAITING_LIST_CTA_LABEL}
            </button>
            <Link
              to="/the-process"
              className="cta-parchment w-full max-w-xs rounded-none text-center tracking-wide sm:w-auto"
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
