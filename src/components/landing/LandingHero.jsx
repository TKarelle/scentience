import { useEffect, useState } from "react";
import PreOrderCtaLink from "../cta/PreOrderCtaLink";
import PreOrderStatus from "../cta/PreOrderStatus";
import { Card } from "../ui";
import { LANDING_HERO_COPY } from "../../config/landingHero";
import { LANDING_HERO_SLIDES } from "../../config/landingHeroSlides";
import HeroCarouselDots from "./HeroCarouselDots";

const AUTOPLAY_MS = 6500;

/**
 * Hero avec carrousel d’images, accroche synchronisée et carte pre-order.
 */
export default function LandingHero() {
  const { card } = LANDING_HERO_COPY;
  const [index, setIndex] = useState(0);
  const slides = LANDING_HERO_SLIDES;
  const count = slides.length;

  function goTo(i) {
    setIndex(((i % count) + count) % count);
  }

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return undefined;

    const id = window.setTimeout(() => {
      setIndex((prev) => (prev + 1) % count);
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(id);
  }, [index, count]);

  return (
    <section
      className="hero-section"
      aria-labelledby="landing-hero-heading"
      aria-roledescription="carousel"
    >
      <div className="hero-section__media">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`hero-section__slide ${
              i === index ? "hero-section__slide--active" : ""
            }`}
            aria-hidden={i !== index}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="hero-section__image"
            />
          </div>
        ))}
        <div className="hero-section__scrim" aria-hidden />
      </div>

      <HeroCarouselDots
        className="hero-section__dots"
        count={count}
        activeIndex={index}
        onSelect={(i) => goTo(i)}
      />

      <div className="hero-section__layout">
        <div className="hero-section__headline-wrap">
          <h1
            id="landing-hero-heading"
            aria-live="polite"
            className="hero-carousel-headline"
          >
            {slides.map((slide, i) => (
              <span
                key={slide.id}
                className={`max-w-xl text-center transition-opacity duration-[900ms] ease-out ${
                  i === index ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                aria-hidden={i !== index}
              >
                {slide.headline}
              </span>
            ))}
          </h1>
        </div>

        <Card
          as="aside"
          className="hero-section__card"
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
