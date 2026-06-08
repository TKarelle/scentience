import { useEffect, useState } from "react";
import { LANDING_HERO_COPY } from "../../config/landingHero";
import { LANDING_HERO_SLIDES } from "../../config/landingHeroSlides";
import WaitingListCtaButton from "../waitingList/WaitingListCtaButton";
import WaitingListStatus from "../waitingList/WaitingListStatus";
import { Card } from "../ui";
import HeroCarouselDots from "./HeroCarouselDots";

const AUTOPLAY_MS = 6500;

/**
 * Hero avec carrousel d’images, accroche synchronisée et points style machine à écrire.
 */
export default function LandingHero({ onOpenWaitingList }) {
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
      className="relative min-h-[min(100vh,56rem)] overflow-hidden"
      aria-labelledby="landing-hero-heading"
      aria-roledescription="carousel"
    >
      {/* Images en fondu */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${
              i === index ? "z-[1] opacity-100" : "z-0 opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        <div
          className="absolute inset-0 z-[2] bg-black/35 sm:bg-black/30"
          aria-hidden
        />
      </div>

      {/* Points · / ● */}
      <HeroCarouselDots
        className="absolute bottom-7 left-1/2 z-30 -translate-x-1/2 sm:bottom-10"
        count={count}
        activeIndex={index}
        onSelect={(i) => goTo(i)}
      />

      <div className="relative z-10 flex min-h-[min(100vh,56rem)] flex-col lg:block">
        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-28 text-center md:pb-20 md:pt-32 lg:absolute lg:inset-0 lg:flex lg:pb-12 lg:pt-28">
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
          className="mx-4 mb-10 w-full max-w-[22rem] shrink-0 self-center p-8 sm:mx-6 sm:p-10 lg:absolute lg:right-0 lg:top-1/2 lg:z-20 lg:mx-0 lg:mb-0 lg:w-[min(100%,22rem)] lg:-translate-y-1/2 lg:self-auto lg:p-8 xl:p-10"
        >
          <div className="space-y-5">
            <p className="hero-card-title">{card.title}</p>
            <WaitingListStatus className="text-center" />
            <p className="typo-body-lead">{card.body}</p>
            <WaitingListCtaButton
              fullWidth
              onClick={() => onOpenWaitingList?.()}
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
