import { useMemo } from "react";
import { Link } from "react-router-dom";
import ProustStoryComposer from "./ProustStoryComposer";
import ProustStoryPost from "./ProustStoryPost";
import { sortStoriesByDate } from "../../lib/proustStoryMailto";

/**
 * Fil Field stories — posts triés par date, layout 2 colonnes md+.
 */
export default function ProustStoryFeedSection({
  title,
  subtitle,
  stories,
  storyTag,
  form,
  crossLinks,
}) {
  const sortedStories = useMemo(() => sortStoriesByDate(stories), [stories]);

  return (
    <section className="proust-feed" aria-labelledby="proust-stories-heading">
      <div className="proust-feed__header">
        <h2 id="proust-stories-heading" className="proust-feed__title">
          {title}
        </h2>
        {subtitle ? <p className="proust-feed__subtitle">{subtitle}</p> : null}
        <p className="proust-feed__count">
          {sortedStories.length}{" "}
          {sortedStories.length === 1 ? "story" : "stories"}
        </p>
      </div>

      <div className="proust-feed__layout">
        <div className="proust-feed__stream-col">
          <div className="proust-feed__stream" role="feed" aria-label={title}>
            {sortedStories.map((story) => (
              <ProustStoryPost
                key={story.id}
                name={story.name}
                place={story.place}
                scent={story.scent}
                excerpt={story.excerpt}
                postedAt={story.postedAt}
                postedAgo={story.postedAgo}
                storyTag={storyTag}
              />
            ))}
          </div>
        </div>

        <aside className="proust-feed__composer-col" aria-label={form.title}>
          <ProustStoryComposer
            form={form}
            storyTag={storyTag}
            termsLink={crossLinks.terms}
          />
        </aside>
      </div>

      <nav className="proust-feed__links" aria-label="Related pages">
        <Link to={crossLinks.science.to} className="proust-feed__link">
          ← {crossLinks.science.label}
        </Link>
        <Link to={crossLinks.article.to} className="proust-feed__link">
          {crossLinks.article.label} →
        </Link>
      </nav>
    </section>
  );
}
