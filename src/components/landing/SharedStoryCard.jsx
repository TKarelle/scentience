import { SHARED_STORIES_COPY } from "../../config/landingSharedStories";

const cx = (...p) => p.filter(Boolean).join(" ");

function storyInitial(name) {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  return trimmed.charAt(0).toUpperCase();
}

/**
 * Carte témoignage — citation + auteur (landing & page Proust).
 */
export default function SharedStoryCard({
  name,
  place,
  excerpt,
  className = "",
  storyTag = SHARED_STORIES_COPY.storyTag,
}) {
  return (
    <article className={cx("story-card", className)}>
      <span className="story-card__quote-mark" aria-hidden>
        &ldquo;
      </span>

      <p className="story-card__tag">{storyTag}</p>

      <blockquote className="story-card__excerpt">
        <p>{excerpt}</p>
      </blockquote>

      <footer className="story-card__footer">
        <span className="story-card__avatar" aria-hidden>
          {storyInitial(name)}
        </span>
        <div className="min-w-0">
          <cite className="story-card__name not-italic">{name}</cite>
          <p className="story-card__place">{place}</p>
        </div>
      </footer>
    </article>
  );
}
