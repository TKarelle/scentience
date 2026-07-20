import { useCallback, useEffect, useId, useState } from "react";
import { EXPERT_QUOTES_COPY } from "../../config/landingExpertQuotes";
import { IMAGE_DIMENSIONS } from "../../config/imageDimensions";
import bottleFondImg from "../../image/bottle+fond.webp";

function ExpertQuoteSlide({ expert }) {
  return (
    <article className="expert-quotes__slide">
      <div className="expert-quotes__photo-wrap">
        <img
          src={expert.photo}
          alt={expert.photoAlt}
          width={IMAGE_DIMENSIONS.expertPortrait.width}
          height={IMAGE_DIMENSIONS.expertPortrait.height}
          className="expert-quotes__photo"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="expert-quotes__content">
        <header className="expert-quotes__profile">
          <p className="expert-quotes__affiliation">{expert.affiliation}</p>
          <h3 className="expert-quotes__name">{expert.name}</h3>
          <p className="expert-quotes__role">{expert.role}</p>
        </header>

        <blockquote className="expert-quotes__quote">
          <p>&ldquo;{expert.quote}&rdquo;</p>
          {expert.attribution ? (
            <footer className="expert-quotes__attribution">
              — {expert.attribution}
            </footer>
          ) : null}
        </blockquote>
      </div>
    </article>
  );
}

/**
 * Carousel témoignages experts — crédibilité scientifique (Project Proust).
 */
export default function ExpertQuotesSection() {
  const copy = EXPERT_QUOTES_COPY;
  const experts = copy.experts;
  const carouselId = useId();
  const [index, setIndex] = useState(0);
  const count = experts.length;

  const goTo = useCallback(
    (next) => {
      setIndex((prev) => {
        if (next === "prev") return prev === 0 ? count - 1 : prev - 1;
        if (next === "next") return prev === count - 1 ? 0 : prev + 1;
        if (typeof next === "number") {
          return Math.min(Math.max(next, 0), count - 1);
        }
        return prev;
      });
    },
    [count],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goTo("prev");
      if (e.key === "ArrowRight") goTo("next");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  const current = experts[index];

  return (
    <section
      className="expert-quotes-section perf-defer-section"
      aria-labelledby="expert-quotes-heading"
    >
      <div className="expert-quotes-section__bg" aria-hidden>
        <img
          src={bottleFondImg}
          alt=""
          width={IMAGE_DIMENSIONS.bottle.width}
          height={IMAGE_DIMENSIONS.bottle.height}
          className="expert-quotes-section__bg-image"
          loading="lazy"
          decoding="async"
        />
        <div className="expert-quotes-section__scrim" />
      </div>

      <div className="expert-quotes-section__inner relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="expert-quotes-section__header mx-auto max-w-3xl text-center">
          <h2 id="expert-quotes-heading" className="expert-quotes-section__title">
            {copy.title}
          </h2>
          <p className="expert-quotes-section__subtitle">{copy.subtitle}</p>
        </header>

        <div
          id={carouselId}
          className="expert-quotes__carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Expert perspectives on scent and memory"
        >
          <div className="expert-quotes__viewport" aria-live="polite">
            <ExpertQuoteSlide key={current.id} expert={current} />
          </div>

          <div className="expert-quotes__nav">
            <button
              type="button"
              className="expert-quotes__nav-btn"
              onClick={() => goTo("prev")}
              aria-controls={carouselId}
              aria-label="Previous expert"
            >
              ← Prev
            </button>

            <div
              className="expert-quotes__dots"
              role="tablist"
              aria-label="Select expert"
            >
              {experts.map((expert, i) => (
                <button
                  key={expert.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`${expert.name}, slide ${i + 1} of ${count}`}
                  className={`expert-quotes__dot${
                    i === index ? " expert-quotes__dot--active" : ""
                  }`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            <p className="expert-quotes__counter" aria-hidden>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </p>

            <button
              type="button"
              className="expert-quotes__nav-btn"
              onClick={() => goTo("next")}
              aria-controls={carouselId}
              aria-label="Next expert"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
