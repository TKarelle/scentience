import { Link } from "react-router-dom";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import ProustStoryFeedSection from "../components/proust/ProustStoryFeedSection";
import { PROUST_MADELEINE_SEO, absoluteUrl } from "../config/seoMeta";
import { PROUST_MADELEINE_PAGE_COPY } from "../config/proustMadeleineResearch";
import { SHARED_STORIES_COPY } from "../config/landingSharedStories";
import ScienceKeyStats from "../components/science/ScienceKeyStats";
import bagImg from "../image/bag.png";

export default function ProustMadeleineResearchPage() {
  const copy = PROUST_MADELEINE_PAGE_COPY;
  const hero = copy.hero;

  return (
    <SiteChrome>
      <SyncPageSeo
        title={PROUST_MADELEINE_SEO.title}
        description={PROUST_MADELEINE_SEO.description}
        keywords={PROUST_MADELEINE_SEO.keywords}
        canonicalUrl={absoluteUrl(PROUST_MADELEINE_SEO.canonicalPath)}
      />

      <article className="relative isolate bg-paper">
        {/* Hero — bag.png, titres, CTA centré, bannière chiffres clés */}
        <header className="relative flex min-h-[min(88vh,44rem)] flex-col border-b border-wine/15 sm:min-h-[min(90vh,48rem)]">
          <div className="absolute inset-0 z-0">
            <img
              src={bagImg}
              alt=""
              className="h-full w-full object-cover object-[50%_45%]"
              decoding="async"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-paper/25 via-paper/10 to-paper/35"
              aria-hidden
            />
          </div>

          <div className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pb-0 pt-28 sm:px-6 sm:pt-32 lg:px-10 lg:pt-36">
            <div className="mx-auto w-full max-w-7xl">
              <div className="card-fill-paper w-full max-w-3xl px-8 py-10 shadow-xl backdrop-blur-sm sm:px-10 sm:py-12">
                <p className="typewriter-face text-xs font-normal uppercase tracking-[0.14em] text-ink sm:text-sm">
                  {hero.kicker}
                </p>
                <h1
                  id="proust-madeleine-heading"
                  className="typo-title mt-4 max-w-3xl text-xl font-light uppercase leading-snug tracking-[0.06em] text-wine sm:mt-5 sm:text-2xl sm:leading-snug md:text-3xl md:leading-snug lg:mt-6 lg:text-4xl lg:tracking-[0.05em]"
                >
                  <span className="block">{hero.titleLine1}</span>
                  <span className="block">{hero.titleLine2}</span>
                </h1>
                <p className="typo-body-lead mt-5 max-w-xl sm:mt-6">
                  {hero.tagline}
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center py-14 sm:py-16 lg:py-20">
              <a
                href={hero.ctaHref}
                className="cta-pill cta-pill--on-wine"
              >
                {hero.ctaLabel}
              </a>
            </div>
          </div>
        </header>

        <ScienceKeyStats />

        <ProustStoryFeedSection
          title={copy.storiesSectionTitle}
          subtitle={copy.storiesSectionSubtitle}
          stories={SHARED_STORIES_COPY.stories}
          storyTag={SHARED_STORIES_COPY.storyTag}
          form={copy.storyForm}
          crossLinks={copy.crossLinks}
        />
      </article>
    </SiteChrome>
  );
}
