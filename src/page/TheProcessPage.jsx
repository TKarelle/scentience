import sprayHero from "../image/spray.png";
import ingredientImg from "../image/ingedient.png";
import bottlePaperImg from "../image/bottle+paper.png";
import SplitMediaSection from "../components/landing/SplitMediaSection";
import SectionLogoWatermark from "../components/layout/SectionLogoWatermark";
import ProcessFaqSection from "../components/process/ProcessFaqSection";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import { useWaitingListModal } from "../context/WaitingListModalContext";
import { THE_PROCESS_SEO, absoluteUrl } from "../config/seoMeta";
import { WAITING_LIST_CTA_LABEL } from "../config/waitingListMessaging";
import {
  THE_PROCESS_AMYGDALA_QUOTE,
  THE_PROCESS_HERO,
  THE_PROCESS_INGREDIENTS,
  THE_PROCESS_LABEL,
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
  const { openWaitingList } = useWaitingListModal();
  const hero = THE_PROCESS_HERO;
  const ingredients = THE_PROCESS_INGREDIENTS;
  const label = THE_PROCESS_LABEL;
  const steps = THE_PROCESS_STEPS;

  return (
    <>
      {/* Hero — même hiérarchie typo que la carte Craft (titre split-media scale, sous-texte typewriter) */}
      <section
        className="relative flex min-h-[min(85vh,52rem)] items-start justify-center px-4 pb-16 pt-24 sm:pt-28 lg:pt-32"
        aria-labelledby="process-hero-heading"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={sprayHero}
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-amber-950/20"
            aria-hidden
          />
        </div>
        <div className="card-fill-paper relative z-10 w-full max-w-2xl px-8 py-12 text-center shadow-xl backdrop-blur-sm sm:px-12 sm:py-14">
          <h1 id="process-hero-heading" className="split-media-heading">
            {hero.title}
          </h1>
          <p className="typo-typewriter-lead-max mx-auto mt-6 text-center normal-case">
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* 5 étapes */}
      <section
        className="border-t border-wine/20 bg-paper"
        aria-labelledby="process-steps-heading"
      >
        <h2 id="process-steps-heading" className="sr-only">
          Five steps
        </h2>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 divide-y divide-wine/25 md:grid-cols-3 md:divide-x md:divide-y-0 md:border-b md:border-wine/25">
            {steps.slice(0, 3).map((s) => (
              <ProcessStepColumn key={s.n} {...s} />
            ))}
          </div>
          <div className="grid grid-cols-1 divide-y divide-wine/25 md:grid-cols-2 md:divide-x md:divide-y-0">
            {steps.slice(3, 5).map((s) => (
              <ProcessStepColumn key={s.n} {...s} />
            ))}
          </div>
          <div className="flex justify-center border-t border-wine/25 px-4 py-12 sm:py-14">
            <button
              type="button"
              onClick={openWaitingList}
              className="cta-primary max-w-md px-12 tracking-wide"
            >
              {WAITING_LIST_CTA_LABEL}
            </button>
          </div>
        </div>
      </section>

      {/* Bandeau noir */}
      <section className="relative isolate overflow-hidden bg-black py-20 sm:py-28 lg:py-32">
        <SectionLogoWatermark
          variant="black"
          imgClassName="h-auto w-[min(95vw,40rem)] max-h-[min(85vh,34rem)] object-contain opacity-[0.11] brightness-0 invert sm:opacity-[0.1]"
        />
        <p className="typewriter-face relative z-10 mx-auto max-w-4xl px-6 text-center text-[11px] font-normal uppercase leading-relaxed tracking-[0.14em] text-paper sm:text-xs sm:tracking-[0.16em] md:text-sm">
          {THE_PROCESS_AMYGDALA_QUOTE}
        </p>
      </section>

      {/* The ingredients — même bloc split que Your collection */}
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

      {/* The label */}
      <SplitMediaSection
        titleId="process-label-heading"
        title={label.title}
        titleClassName="split-media-heading-lg"
        image={{
          src: bottlePaperImg,
          alt: "Hands applying a handwritten paper label to a Scentience bottle",
        }}
        overlay={<SectionLogoWatermark variant="paper" />}
        reverse
        headingCentered
        subtitle={
          <p className="typo-typewriter-lead-centered">{label.subtitle}</p>
        }
        description={
          <>
            {label.paragraphs.map((text, i) => (
              <p key={i} className="typo-body-lead">
                {text}
              </p>
            ))}
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
