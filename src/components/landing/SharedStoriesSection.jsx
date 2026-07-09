import { Link } from "react-router-dom";
import { SHARED_STORIES_COPY } from "../../config/landingSharedStories";
import SharedStoryCard from "./SharedStoryCard";

/**
 * Témoignages clients — fond wine, cartes blanches.
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
          <h2
            id="shared-stories-heading"
            className="shared-stories-section__title"
          >
            {copy.title}
          </h2>
        </header>

        <div className="shared-stories-section__grid mt-8 sm:mt-10">
          {copy.stories.map((story) => (
            <SharedStoryCard
              key={story.id}
              name={story.name}
              place={story.place}
              excerpt={story.excerpt}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            to="/science/what-is-your-proust-madeleine"
            className="cta-pill cta-pill--on-wine"
          >
            {copy.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
