import { Link } from "react-router-dom";
import EditorialHero from "../components/editorial/EditorialHero";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import ProustStoryFeedSection from "../components/proust/ProustStoryFeedSection";
import { PROUST_MADELEINE_SEO, absoluteUrl, absoluteAssetUrl } from "../config/seoMeta";
import { IMAGE_DIMENSIONS } from "../config/imageDimensions";
import { PROUST_MADELEINE_PAGE_COPY } from "../config/proustMadeleineResearch";
import { SHARED_STORIES_COPY } from "../config/landingSharedStories";
import ScienceKeyStats from "../components/science/ScienceKeyStats";
import bagImg from "../image/bag.webp";

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
        ogImage={absoluteAssetUrl(bagImg)}
        ogImageAlt="Travel bag and journey essentials — The Proust Project"
      />

      <article className="relative isolate bg-paper">
        <EditorialHero
          headingId="proust-madeleine-heading"
          imageSrc={bagImg}
          imageAlt="Travel bag and journey essentials — The Proust Project"
          imageWidth={IMAGE_DIMENSIONS.banner.width}
          imageHeight={IMAGE_DIMENSIONS.banner.height}
          imageClassName="object-[50%_45%]"
          minHeightClass="min-h-[min(88vh,44rem)] sm:min-h-[min(90vh,48rem)]"
          ctaPlacement="below"
          kicker={hero.kicker}
          titleLines={[hero.titleLine1, hero.titleLine2].filter(Boolean)}
          subtitle={hero.tagline}
          cta={
            <a href={hero.ctaHref} className="cta-pill cta-pill--on-wine">
              {hero.ctaLabel}
            </a>
          }
        />

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
