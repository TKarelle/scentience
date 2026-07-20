import sprayHero from "../image/spray.webp";
import ingredientImg from "../image/ingedient.webp";
import EditorialHero from "../components/editorial/EditorialHero";
import SplitMediaSection from "../components/landing/SplitMediaSection";
import SectionLogoWatermark from "../components/layout/SectionLogoWatermark";
import ProcessFaqSection from "../components/process/ProcessFaqSection";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import PreOrderCtaLink from "../components/cta/PreOrderCtaLink";
import { THE_PROCESS_SEO, absoluteUrl, absoluteAssetUrl } from "../config/seoMeta";
import { IMAGE_DIMENSIONS } from "../config/imageDimensions";
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
        <span className="typo-title text-base leading-tight sm:text-lg">
          {title}
        </span>
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
      <EditorialHero
        headingId="process-hero-heading"
        imageSrc={sprayHero}
        imageAlt="Perfume spray — MADELEINE Scent-Mapping process"
        imageWidth={IMAGE_DIMENSIONS.spray.width}
        imageHeight={IMAGE_DIMENSIONS.spray.height}
        kicker={hero.kicker}
        title={hero.title}
        subtitle={hero.subtitle}
        cta={<PreOrderCtaLink className="w-full max-w-xs sm:w-auto" />}
      />

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
          <p className="font-subtitle text-base font-light italic leading-snug tracking-normal normal-case text-paper sm:text-lg">
            &ldquo;{THE_PROCESS_HELEN_KELLER_QUOTE.text}&rdquo;
          </p>
          <p className="mt-2.5 text-xs font-light tracking-wide text-paper/78 sm:text-sm">
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
          <p className="typo-typewriter-lead-centered">
            {ingredients.subtitle}
          </p>
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
        ogImage={absoluteAssetUrl(sprayHero)}
        ogImageAlt="Perfume spray — MADELEINE Scent-Mapping process"
      />
      <TheProcessMain />
    </SiteChrome>
  );
}
