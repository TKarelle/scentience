import PreOrderCtaLink from "../cta/PreOrderCtaLink";
import PreOrderStatus from "../cta/PreOrderStatus";
import { Card } from "../ui";
import { LANDING_HERO_COPY } from "../../config/landingHero";
import bannerImg from "../../image/banner.png";

/**
 * Hero avec image fixe et carte pre-order.
 */
export default function LandingHero() {
  const { headline, card } = LANDING_HERO_COPY;

  return (
    <section className="hero-section" aria-labelledby="landing-hero-heading">
      <div className="hero-section__media">
        <img
          src={bannerImg}
          alt="Banner hero Madeleine"
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
