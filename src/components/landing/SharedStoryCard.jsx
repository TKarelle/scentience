import { SHARED_STORIES_COPY } from "../../config/landingSharedStories";

const cx = (...p) => p.filter(Boolean).join(" ");

/**
 * Carte témoignage — citation + auteur (landing & page Proust).
 */
export default function SharedStoryCard({
  name,
  place,
  excerpt,
  className = "",
}) {
  return (
    <article className={cx("story-card", className)}>
      <blockquote className="story-card__excerpt">
        <p>{excerpt}</p>
      </blockquote>

      <footer className="story-card__footer">
        <cite className="story-card__attribution not-italic">
          — {name}, {place}
        </cite>
      </footer>
    </article>
  );
}
