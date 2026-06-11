import { Link } from "react-router-dom";
import { SHARED_STORIES_COPY } from "../../config/landingSharedStories";
import SharedStoryCard from "./SharedStoryCard";

/**
 * Témoignages clients — fond distinct, cartes citation.
 */
export default function SharedStoriesSection() {
  const copy = SHARED_STORIES_COPY;

  return (
    <section
      id="shared-stories"
      className="shared-stories-section"
      aria-labelledby="shared-stories-heading"
    >
      <div className="shared-stories-section__inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="shared-stories-section__header mx-auto max-w-2xl text-center">
          <p className="shared-stories-section__eyebrow">{copy.eyebrow}</p>
          <h2
            id="shared-stories-heading"
            className="landing-block-title mt-3"
          >
            {copy.title}
          </h2>
          <p className="landing-intro-text">{copy.subtitle}</p>
        </header>

        <div className="shared-stories-section__grid mt-14 sm:mt-16">
          {copy.stories.map((story) => (
            <SharedStoryCard
              key={story.id}
              name={story.name}
              place={story.place}
              excerpt={story.excerpt}
            />
          ))}
        </div>

        <div className="mt-14 flex justify-center sm:mt-16">
          <Link
            to="/science/what-is-your-proust-madeleine"
            className="cta-primary max-w-sm px-10 tracking-wide"
          >
            {copy.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
