import { avatarInitial } from "../../lib/proustStoryMailto";

function avatarToneClass(name) {
  const code = (name || "A").charCodeAt(0) % 3;
  if (code === 1) return "proust-post__avatar--mist";
  if (code === 2) return "proust-post__avatar--blend";
  return "proust-post__avatar--wine";
}

/**
 * Post du fil — carte commentaire moderne.
 */
export default function ProustStoryPost({
  name,
  place,
  scent,
  excerpt,
  postedAt,
  postedAgo,
  storyTag = "Field story",
}) {
  return (
    <article className="proust-post">
      <div
        className={`proust-post__avatar ${avatarToneClass(name)}`}
        aria-hidden
      >
        {avatarInitial(name)}
      </div>

      <div className="proust-post__body">
        <header className="proust-post__header">
          <div className="proust-post__meta">
            <span className="proust-post__name">{name}</span>
            <span className="proust-post__handle">@{place.toLowerCase().replace(/\s+/g, "")}</span>
            {postedAgo ? (
              <time className="proust-post__time" dateTime={postedAt || undefined}>
                {postedAgo}
              </time>
            ) : null}
          </div>
        </header>

        {scent ? <span className="proust-post__chip">{scent}</span> : null}

        <p className="proust-post__text">{excerpt}</p>

        <footer className="proust-post__footer">
          <span className="proust-post__tag">{storyTag}</span>
        </footer>
      </div>
    </article>
  );
}
