import sprayHero from "../image/spray.png";
import ingredientImg from "../image/ingedient.png";
import SplitMediaSection from "../components/landing/SplitMediaSection";
import SectionLogoWatermark from "../components/layout/SectionLogoWatermark";
import ProcessFaqSection from "../components/process/ProcessFaqSection";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import PreOrderCtaLink from "../components/cta/PreOrderCtaLink";
import { THE_PROCESS_SEO, absoluteUrl } from "../config/seoMeta";
import {
  THE_PROCESS_HELEN_KELLER_QUOTE,
  THE_PROCESS_HERO,
  THE_PROCESS_INGREDIENTS,
  THE_PROCESS_STEPS,
} from "../config/theProcessCopy";

function ProcessStepColumn({ n, title, body }) {
  return (
    <div className="flex flex-col px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
      <h3 className="mb-5 flex flex-wrap items-baseline gap-x-3">
        <span className="font-body text-4xl font-light tabular-nums leading-none text-wine sm:text-5xl">
          {n}
        </span>
        <span className="typo-title text-base leading-tight sm:text-lg">{title}</span>
      </h3>
      <p className="typo-body-lead max-w-sm text-left">{body}</p>
    </div>
  );
}

function TheProcessMain() {
  const hero = THE_PROCESS_HERO;
  const ingredients = THE_PROCESS_INGREDIENTS;
  const steps = THE_PROCESS_STEPS;

  return (
    <>
      <header
        className="relative flex min-h-[min(85vh,48rem)] flex-col justify-end overflow-hidden border-b border-wine/15"
        aria-labelledby="process-hero-heading"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={sprayHero}
            alt=""
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
              id="process-hero-heading"
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

      <section
        className="border-t border-wine/20 bg-paper"
        aria-labelledby="process-steps-heading"
      >
        <h2 id="process-steps-heading" className="sr-only">
          Three steps
        </h2>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 divide-y divide-wine/25 md:grid-cols-3 md:divide-x md:divide-y-0 md:border-b md:border-wine/25">
            {steps.map((s) => (
              <ProcessStepColumn key={s.n} {...s} />
            ))}
          </div>
          <div className="flex justify-center border-t border-wine/25 px-4 py-12 sm:py-14">
            <PreOrderCtaLink className="max-w-md" />
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-black py-10 sm:py-12 lg:py-14">
        <SectionLogoWatermark
          variant="black"
          imgClassName="h-auto w-[min(95vw,40rem)] max-h-[min(85vh,34rem)] object-contain opacity-[0.11] brightness-0 invert sm:opacity-[0.1]"
        />
        <blockquote className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <p
            className="font-subtitle text-base font-light italic leading-snug tracking-normal normal-case sm:text-lg"
            style={{ color: "var(--color-paper)" }}
          >
            &ldquo;{THE_PROCESS_HELEN_KELLER_QUOTE.text}&rdquo;
          </p>
          <p
            className="mt-2.5 text-xs font-light tracking-wide sm:text-sm"
            style={{
              color: "color-mix(in srgb, var(--color-paper) 78%, transparent)",
            }}
          >
            {THE_PROCESS_HELEN_KELLER_QUOTE.attribution}
          </p>
        </blockquote>
      </section>

      <SplitMediaSection
        titleId="process-ingredients-heading"
        title={ingredients.title}
        titleClassName="split-media-heading-lg"
        image={{
          src: ingredientImg,
          alt: "Atelier — natural ingredients, botanical sketches and precious oils",
        }}
        overlay={<SectionLogoWatermark variant="paper" />}
        headingCentered
        subtitle={
          <p className="typo-typewriter-lead-centered">{ingredients.subtitle}</p>
        }
        description={
          <>
            <p className="typo-body-lead">{ingredients.body}</p>
            <p className="typo-typewriter-lead pt-2 text-wine">
              {ingredients.closing}
            </p>
          </>
        }
      />

      <ProcessFaqSection />
    </>
  );
}

export default function TheProcessPage() {
  return (
    <SiteChrome>
      <SyncPageSeo
        title={THE_PROCESS_SEO.title}
        description={THE_PROCESS_SEO.description}
        keywords={THE_PROCESS_SEO.keywords}
        canonicalUrl={absoluteUrl(THE_PROCESS_SEO.canonicalPath)}
      />
      <TheProcessMain />
    </SiteChrome>
  );
}
