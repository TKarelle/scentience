import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import ArticleBlockRenderer from "../components/article/ArticleBlockRenderer";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import { typewriterFaceClass } from "../components/typography";
import {
  getArticleSummaries,
  loadArticleBySlug,
} from "../config/journalArticles";
import {
  ARTICLE_SEO_BY_SLUG,
  PROUST_ARTICLE_SLUG,
  NOT_FOUND_SEO,
  absoluteUrl,
  absoluteAssetUrl,
  getArticlePath,
} from "../config/seoMeta";
import { IMAGE_DIMENSIONS } from "../config/imageDimensions";

function buildArticleJsonLd(article, canonicalUrl, imageUrl) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription ?? article.subtitle ?? "",
    image: [imageUrl],
    author: {
      "@type": "Organization",
      name: article.author ?? "MADELEINE",
    },
    publisher: {
      "@type": "Organization",
      name: "MADELEINE",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logowine-full.png"),
      },
    },
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    articleSection: article.category,
    inLanguage: "en-GB",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  });
}

export default function ArticlePage() {
  const { slug: slugFromRoute } = useParams();
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, "") || "/";

  const slug =
    slugFromRoute ??
    (pathname === "/journal/the-proust-project"
      ? PROUST_ARTICLE_SLUG
      : undefined);

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const pendingSummary = slug
    ? getArticleSummaries().find((entry) => entry.id === slug)
    : null;
  const pendingSeo = slug ? ARTICLE_SEO_BY_SLUG[slug] : null;

  useEffect(() => {
    let cancelled = false;

    async function resolveArticle() {
      if (!slug) {
        if (!cancelled) {
          setArticle(null);
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      const loaded = await loadArticleBySlug(slug);
      if (!cancelled) {
        setArticle(loaded);
        setIsLoading(false);
      }
    }

    resolveArticle();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (isLoading) {
    const loadingTitle =
      pendingSeo?.title ??
      (pendingSummary
        ? `${pendingSummary.title} | MADELEINE`
        : "The journal | MADELEINE");
    const loadingDescription =
      pendingSeo?.description ??
      pendingSummary?.seoDescription ??
      pendingSummary?.subtitle ??
      "Articles on scent, memory, and travel from MADELEINE.";
    const loadingCanonical = slug
      ? absoluteUrl(pendingSeo?.canonicalPath ?? getArticlePath(slug))
      : absoluteUrl("/journal");

    return (
      <SiteChrome>
        <SyncPageSeo
          title={loadingTitle}
          description={loadingDescription}
          keywords={pendingSeo?.keywords}
          canonicalUrl={loadingCanonical}
          ogType={pendingSeo?.ogType ?? (pendingSummary ? "article" : "website")}
          ogImage={
            pendingSummary
              ? absoluteAssetUrl(pendingSummary.heroImage)
              : undefined
          }
          ogImageAlt={pendingSummary?.title}
          articlePublishedTime={pendingSummary?.datePublished}
          articleAuthor={pendingSummary?.author}
          articleSection={pendingSummary?.category}
        />
        <main className="flex min-h-[60vh] items-center justify-center bg-paper pb-24 pt-28">
          <p className="text-mist font-light" aria-live="polite">
            Loading…
          </p>
        </main>
      </SiteChrome>
    );
  }

  if (!article) {
    return (
      <SiteChrome>
        <SyncPageSeo
          title={NOT_FOUND_SEO.title}
          description={NOT_FOUND_SEO.description}
          keywords={NOT_FOUND_SEO.keywords}
          canonicalUrl={absoluteUrl(NOT_FOUND_SEO.canonicalPath)}
          noindex
        />
        <main className="flex min-h-[60vh] flex-col items-center justify-center bg-paper px-4 pb-24 pt-28 text-center">
          <h1 className="typo-title mb-4 text-2xl font-light">Article not found</h1>
          <Link
            to="/journal"
            className="text-sm text-wine underline underline-offset-4"
          >
            Back to the journal
          </Link>
        </main>
      </SiteChrome>
    );
  }

  const seo = ARTICLE_SEO_BY_SLUG[article.id];
  const canonicalUrl = absoluteUrl(
    seo?.canonicalPath ?? getArticlePath(article.id),
  );
  const pageTitle = seo?.title ?? `${article.title} | MADELEINE`;
  const description =
    seo?.description ?? article.seoDescription ?? article.subtitle ?? "";
  const ogImage = absoluteAssetUrl(article.heroImage);
  const articleJsonLd = buildArticleJsonLd(article, canonicalUrl, ogImage);

  return (
    <SiteChrome>
      <SyncPageSeo
        title={pageTitle}
        description={description}
        keywords={seo?.keywords}
        canonicalUrl={canonicalUrl}
        ogType={seo?.ogType ?? "article"}
        ogImage={ogImage}
        ogImageAlt={article.title}
        articlePublishedTime={article.datePublished}
        articleAuthor={article.author}
        articleSection={article.category}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleJsonLd }}
      />
      <article className="bg-paper">
        <div className="border-b border-ink/10 bg-paper pt-24 sm:pt-28">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <Link
              to="/journal"
              className="text-sm text-wine underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              ← The journal
            </Link>
          </div>
        </div>

        <section className="relative h-[36vh] min-h-[300px] max-h-[300px] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={article.heroImage}
              alt={article.imageAlt ?? article.title}
              width={IMAGE_DIMENSIONS.articleHero.width}
              height={IMAGE_DIMENSIONS.articleHero.height}
              className="h-full w-full object-cover object-center"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/45" />
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/25" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <div className="relative z-10 flex h-full items-end">
            <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8">
              <div className="max-w-3xl">
                <div className="mb-2.5">
                  <span className="typo-subtitle text-[10px] text-white/60 font-light sm:text-xs">
                    {article.category}
                  </span>
                </div>
                <h1 className="typo-title mb-3 max-w-3xl text-lg leading-snug text-wine [text-shadow:0_2px_12px_rgba(0,0,0,0.55)] sm:text-xl lg:text-2xl xl:text-3xl">
                  {article.title}
                </h1>
                <p className="typo-body-lead max-w-2xl normal-case text-paper/95">
                  {article.subtitle}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 border-b border-ink/20 pb-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-light text-ink/70">
                By <span className="text-ink">{article.author}</span>
              </p>
              <p className="text-sm font-light text-ink/70">{article.date}</p>
            </div>
          </div>

          {article.excerpt ? (
            <div className="mb-12 border-b border-ink/10 pb-6">
              <p className="typo-body-lead max-w-3xl italic text-ink/85">
                {article.excerpt}
              </p>
            </div>
          ) : null}

          <div className="prose prose-lg mt-8 max-w-none">
            {article.content.map((block, index) => (
              <ArticleBlockRenderer
                key={`${block.type}-${index}`}
                block={block}
                index={index}
                prevBlock={index > 0 ? article.content[index - 1] : null}
                articleTitle={article.title}
              />
            ))}
          </div>

          <div
            className="relative left-1/2 mt-24 w-screen max-w-none -translate-x-1/2 overflow-hidden bg-wine px-6 py-16 sm:mt-32 sm:px-8 sm:py-20 lg:px-12"
            aria-labelledby="article-cta-heading"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.08] via-transparent to-black/[0.16]"
              aria-hidden
            />
            <div className="relative mx-auto max-w-3xl text-center">
              <p className="font-subtitle text-[10px] uppercase tracking-[0.22em] text-paper/50">
                Before it lives only in photographs
              </p>
              <h2
                id="article-cta-heading"
                className={`${typewriterFaceClass} mt-5 text-2xl font-normal normal-case leading-[1.2] text-paper sm:text-3xl sm:leading-tight`}
              >
                Give your next memory a scent only you can reopen.
              </h2>
              <p className="typo-typewriter-on-wine mx-auto mt-5 max-w-md text-paper/85">
                One formula for that journey—worn, then sealed—until a single
                breath puts you back inside the moment.
              </p>
              <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
                <Link to="/" className="cta-pill cta-pill--on-wine">
                  Explore MADELEINE
                </Link>
                <Link
                  to="/the-process"
                  className={`${typewriterFaceClass} text-sm font-normal normal-case text-paper/70 underline decoration-paper/35 underline-offset-[6px] transition-colors hover:text-paper hover:decoration-paper/55`}
                >
                  How Scent-Mapping works
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="border-t border-ink/10 bg-paper py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="typo-title mb-10 text-center text-lg font-light sm:text-xl lg:text-2xl">
              More Stories
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {getArticleSummaries()
                .filter((entry) => entry.id !== article.id)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={getArticlePath(relatedArticle.id)}
                    className="group block"
                  >
                    <div className="flex items-start gap-4">
                      <div className="aspect-[3/4] w-20 shrink-0 overflow-hidden sm:w-24">
                        <img
                          src={relatedArticle.heroImage}
                          alt={relatedArticle.imageAlt ?? relatedArticle.title}
                          width={IMAGE_DIMENSIONS.journalThumb.width}
                          height={IMAGE_DIMENSIONS.journalThumb.height}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="min-w-0 flex-1 space-y-2">
                        <p className="typo-subtitle text-[10px] font-light text-mist">
                          {relatedArticle.category}
                        </p>
                        <h3 className="typo-title text-sm font-light leading-tight transition-colors group-hover:text-wine/70 sm:text-base">
                          {relatedArticle.title}
                        </h3>
                        <p className="line-clamp-2 text-xs font-light leading-relaxed text-ink/70">
                          {relatedArticle.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </article>
    </SiteChrome>
  );
}
