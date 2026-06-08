import { SHARED_STORIES_COPY } from "../../config/landingSharedStories";
import SharedStoryCard from "./SharedStoryCard";

/**
 * Shared story cards (placeholder copy in config) + CTA.
 */
export default function SharedStoriesSection({ onShareStoryClick }) {
  const copy = SHARED_STORIES_COPY;

  return (
    <section
      id="shared-stories"
      className="border-t border-ink/10 bg-paper py-20 sm:py-24 lg:py-28"
      aria-labelledby="shared-stories-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <h2
            id="shared-stories-heading"
            className="landing-block-title"
          >
            {copy.title}
          </h2>
          <p className="landing-intro-text">{copy.subtitle}</p>
        </header>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
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
          <button
            type="button"
            className="cta-primary max-w-sm px-10 tracking-wide"
            onClick={() => onShareStoryClick?.()}
          >
            {copy.ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
