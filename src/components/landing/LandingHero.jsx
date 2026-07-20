import PreOrderCtaLink from "../cta/PreOrderCtaLink";
import PreOrderStatus from "../cta/PreOrderStatus";
import { Card } from "../ui";
import { LANDING_HERO_COPY } from "../../config/landingHero";
import { IMAGE_DIMENSIONS } from "../../config/imageDimensions";

/** LCP hero — served from /public for stable preload URL (see index.html). */
const HERO_BANNER_SRC = "/hero-banner.webp";

/**
 * Hero avec image fixe et carte pre-order.
 */
export default function LandingHero() {
  const { headline, card } = LANDING_HERO_COPY;

  return (
    <section className="hero-section" aria-labelledby="landing-hero-heading">
      <div className="hero-section__media">
        <img
          src={HERO_BANNER_SRC}
          alt="MADELEINE bespoke fragrance — hero banner with golden light"
          width={IMAGE_DIMENSIONS.banner.width}
          height={IMAGE_DIMENSIONS.banner.height}
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
          className="hero-section__image"
        />
        <div className="hero-section__scrim" aria-hidden />
      </div>

      <div className="hero-section__layout">
        <div className="hero-section__headline-wrap">
          <h1 id="landing-hero-heading" className="hero-carousel-headline">
            <span className="hero-carousel-headline__main">
              {headline.lead}
              <span className="hero-carousel-headline__keep">
                {headline.keepBefore}
                <span className="hero-carousel-headline__highlight">
                  {headline.highlight}
                </span>
                {headline.keepAfter}
              </span>
            </span>
            <span className="hero-carousel-headline__sub">{headline.sub}</span>
          </h1>
        </div>

        <div className="hero-section__cta-mobile lg:hidden">
          <PreOrderCtaLink fullWidth variant="on-wine" />
        </div>

        <Card
          as="aside"
          className="hero-section__card hidden lg:block"
          aria-label="Pre-order Original Bespoke"
        >
          <div className="space-y-5">
            <p className="hero-card-title">{card.title}</p>
            <PreOrderStatus className="text-center" />
            <p className="typo-body-lead">{card.body}</p>
            <PreOrderCtaLink fullWidth />
          </div>
        </Card>
      </div>
    </section>
  );
}
