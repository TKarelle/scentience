import { Link } from "react-router-dom";
import {
  getJournalFeatured,
  getJournalGridEntries,
  getJournalPopularEntries,
  JOURNAL_INTRO,
  JOURNAL_PULL_QUOTE,
} from "../../config/journalArticles";
import { getArticlePath } from "../../config/seoMeta";

function ReadEssayLink({ slug, className = "" }) {
  return (
    <Link
      to={getArticlePath(slug)}
      className={`font-subtitle text-[10px] uppercase tracking-[0.16em] text-wine transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/35 ${className}`}
    >
      Read the essay →
    </Link>
  );
}

/** Liste compacte pour la colonne droite — tient dans ~1 viewport (desktop). */
function JournalPopularItem({ slug, title, excerpt, date, image }) {
  return (
    <article className="min-h-0 min-w-0 shrink-0">
      <Link
        to={getArticlePath(slug)}
        className="group flex gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:gap-3"
      >
        <div className="h-[3.75rem] w-[2.85rem] shrink-0 overflow-hidden sm:h-[4.25rem] sm:w-[3.15rem] lg:h-[10rem] lg:w-[10rem]">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-between py-px">
          <div className="min-h-0">
            <h3 className="typo-title line-clamp-3 text-[14px] leading-[1.25] transition-opacity group-hover:opacity-85 sm:text-[15px] lg:text-[16px] lg:leading-snug">
              {title}
            </h3>
            <p className="typo-body-lead mt-1 line-clamp-2 text-pretty text-[14px] leading-snug normal-case text-ink/88 sm:text-[15px] lg:mt-1.5 lg:line-clamp-3 lg:text-[16px] lg:leading-relaxed">
              {excerpt}
            </p>
          </div>
          <div className="mt-1.5 flex flex-wrap items-end justify-between gap-1 border-t border-wine/10 pt-1.5">
            <time
              dateTime={date}
              className="font-subtitle text-[8px] uppercase tracking-[0.12em] text-wine/90 sm:text-[9px] lg:text-[10px]"
            >
              {date}
            </time>
            <span className="font-subtitle text-[8px] uppercase tracking-[0.14em] text-wine sm:text-[9px] lg:text-[10px]">
              Read the essay →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function JournalRow({ slug, title, excerpt, date, image, compact = false }) {
  return (
    <article>
      <Link
        to={getArticlePath(slug)}
        className="group flex flex-row gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:gap-5"
      >
        <div
          className={
            compact
              ? "w-[5.25rem] shrink-0 sm:w-28"
              : "w-[7rem] max-w-[32%] shrink-0 sm:w-[42%] sm:max-w-[16rem]"
          }
        >
          <img
            src={image}
            alt=""
            className="aspect-[5/6] h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <h3
              className={`typo-title leading-snug transition-opacity group-hover:opacity-85 ${
                compact
                  ? "text-[10px] sm:text-xs"
                  : "text-xs sm:text-sm md:text-base lg:text-lg"
              }`}
            >
              {title}
            </h3>
            <p
              className={`typo-body-lead mt-2 text-pretty normal-case text-ink/90 sm:mt-3 ${
                compact
                  ? "line-clamp-3 text-[11px] sm:line-clamp-4 sm:text-sm"
                  : "line-clamp-4 text-xs sm:line-clamp-none sm:text-sm sm:text-base"
              }`}
            >
              {excerpt}
            </p>
          </div>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-2 border-t border-wine/10 pt-3 sm:mt-5 sm:gap-3 sm:pt-4">
            <time
              dateTime={date}
              className="font-subtitle text-[10px] uppercase tracking-[0.14em] text-wine/90"
            >
              {date}
            </time>
            <span className="font-subtitle text-[10px] uppercase tracking-[0.16em] text-wine">
              Read the essay →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function JournalIndex() {
  const featured = getJournalFeatured();
  const popular = getJournalPopularEntries();
  const gridEntries = getJournalGridEntries();

  return (
    <main className="min-h-screen bg-paper pb-24 pt-28 sm:pt-32">
      <div className="mx-auto w-full max-w-none px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Une rangée desktop : gauche = titre + intro + cover · droite = populaires (colonne plus large, fluide) */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(17.5rem,clamp(17.5rem,34vw,42rem))] lg:items-start lg:gap-x-10 xl:gap-x-14 2xl:gap-x-16">
          <div className="min-w-0">
            <header className="lg:pr-4">
              <h1 id="journal-heading" className="split-media-heading">
                The journal
              </h1>
              <p className="typo-typewriter-lead mt-5 max-w-2xl text-pretty leading-relaxed text-ink sm:mt-6 sm:text-base lg:max-w-3xl">
                {JOURNAL_INTRO}
              </p>
            </header>

            <div className="mt-10 border-t border-wine/20 pt-8 lg:mt-12 lg:pt-10">
              {featured ? (
                <>
                  <p className="journal-section-kicker mb-6">
                    {featured.category} · cover story
                  </p>
                  <JournalRow
                    slug={featured.slug}
                    title={featured.title}
                    excerpt={featured.excerpt}
                    date={featured.date}
                    image={featured.image}
                    compact={false}
                  />
                </>
              ) : (
                <p className="typo-body-lead text-ink/70">
                  No cover story configured.
                </p>
              )}
            </div>
          </div>

          <aside
            className="mt-14 border-t border-wine/15 pt-10 lg:sticky lg:top-28 lg:mt-0 lg:flex lg:max-h-[calc(100dvh-7.25rem)] lg:flex-col lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-10 2xl:pl-12"
            aria-labelledby="journal-popular-heading"
          >
            <h2
              id="journal-popular-heading"
              className="journal-section-kicker shrink-0"
            >
              Most popular
            </h2>
            <div className="mt-5 flex min-h-0 flex-1 flex-col gap-4 lg:mt-4 lg:justify-between lg:gap-2 lg:overflow-hidden xl:gap-3">
              {popular.length > 0 ? (
                popular.map((item) => (
                  <JournalPopularItem
                    key={item.slug}
                    slug={item.slug}
                    title={item.title}
                    excerpt={item.excerpt}
                    date={item.date}
                    image={item.image}
                  />
                ))
              ) : (
                <>
                  <p className="typo-typewriter-lead text-sm leading-relaxed text-ink/75">
                    Popular picks will appear here.
                  </p>
                  {featured ? <ReadEssayLink slug={featured.slug} /> : null}
                </>
              )}
            </div>
          </aside>
        </div>

        <section
          className="-mx-4 mt-16 bg-wine px-6 py-10 sm:-mx-6 sm:px-8 sm:py-12 lg:-mx-8 lg:mt-24 lg:py-14 xl:-mx-12 2xl:-mx-16"
          aria-label="Pull quote"
        >
          <blockquote className="journal-pull-quote-banner mx-auto max-w-2xl text-center">
            {JOURNAL_PULL_QUOTE}
          </blockquote>
        </section>

        {gridEntries.length > 0 ? (
          <section
            className="pt-8 sm:pt-10 lg:pt-12"
            aria-labelledby="journal-more-heading"
          >
            <h2
              id="journal-more-heading"
              className="journal-section-kicker mb-8 sm:mb-10"
            >
              More from the journal
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-8">
              {gridEntries.map((item) => (
                <JournalPopularItem
                  key={item.slug}
                  slug={item.slug}
                  title={item.title}
                  excerpt={item.excerpt}
                  date={item.date}
                  image={item.image}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
