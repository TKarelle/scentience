import { SHARED_STORIES_COPY } from "../../config/landingSharedStories";
import { Card } from "../ui";

const cx = (...p) => p.filter(Boolean).join(" ");

/**
 * Carte témoignage — même marqueup que la section « They share their stories » (landing).
 */
export default function SharedStoryCard({
  name,
  place,
  excerpt,
  className = "",
  proustTag = SHARED_STORIES_COPY.proustTag,
}) {
  return (
    <Card
      as="article"
      tone="paper"
      className={cx("flex flex-col p-6 shadow-sm sm:p-8", className)}
    >
      <p
        aria-hidden
        className="font-subtitle mb-3 text-[10px] uppercase tracking-wider text-mist"
      >
        {proustTag}
      </p>
      <blockquote className="typo-body-lead flex-1 italic">
        &ldquo;{excerpt}&rdquo;
      </blockquote>
      <footer className="mt-6 pt-4">
        <p className="font-subtitle text-xs uppercase tracking-wide text-wine">
          {name}
        </p>
        <p className="landing-meta-caption">{place}</p>
      </footer>
    </Card>
  );
}
