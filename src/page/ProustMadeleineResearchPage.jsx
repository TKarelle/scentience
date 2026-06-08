import { useCallback, useId, useState } from "react";
import { Link } from "react-router-dom";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import { Card } from "../components/ui";
import { PROUST_MADELEINE_SEO, absoluteUrl } from "../config/seoMeta";
import { PROUST_MADELEINE_PAGE_COPY } from "../config/proustMadeleineResearch";
import { SHARED_STORIES_COPY } from "../config/landingSharedStories";
import SharedStoryCard from "../components/landing/SharedStoryCard";
import ProustResearchStatBanner from "../components/proust/ProustResearchStatBanner";
import {
  FORM_INPUT_CLASS,
  FORM_LABEL_CLASS,
  FORM_TEXTAREA_CLASS,
} from "../lib/formInputClass";
import bagImg from "../image/bag.png";
import bottleImg from "../image/bottle.png";

function buildMailtoHref({
  emailTo,
  subject,
  name,
  scent,
  excerpt,
  consent,
  proustTag,
}) {
  const body = [
    "--- Project Proust story (same fields as site cards) ---",
    "",
    "Name (footer, wine line):",
    name || "(not provided)",
    "",
    "Scent (caption under name):",
    scent || "(not provided)",
    "",
    "Story (italic quote between curly quotes on the card):",
    excerpt || "(not provided)",
    "",
    "Label on every card (fixed on site):",
    proustTag,
    "",
    "Consent:",
    consent ? "yes" : "no",
  ].join("\n");

  const params = new URLSearchParams();
  params.set("subject", subject);
  params.set("body", body);
  return `mailto:${emailTo}?${params.toString()}`;
}

export default function ProustMadeleineResearchPage() {
  const copy = PROUST_MADELEINE_PAGE_COPY;
  const hero = copy.hero;
  const form = copy.storyForm;
  const formId = useId();

  const [name, setName] = useState("");
  const [scent, setScent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [consent, setConsent] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const excerptMin = form.excerptMinChars ?? 20;
  const excerptLen = excerpt.trim().length;
  const canSubmit =
    consent &&
    name.trim().length > 0 &&
    scent.trim().length > 0 &&
    excerptLen >= excerptMin;

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setAttemptedSubmit(true);
      if (!canSubmit) return;
      const href = buildMailtoHref({
        emailTo: form.emailTo,
        subject: form.emailSubject,
        name: name.trim(),
        scent: scent.trim(),
        excerpt: excerpt.trim(),
        consent,
        proustTag: SHARED_STORIES_COPY.proustTag,
      });
      window.location.href = href;
    },
    [canSubmit, consent, excerpt, form.emailSubject, form.emailTo, name, scent],
  );

  return (
    <SiteChrome>
      <SyncPageSeo
        title={PROUST_MADELEINE_SEO.title}
        description={PROUST_MADELEINE_SEO.description}
        keywords={PROUST_MADELEINE_SEO.keywords}
        canonicalUrl={absoluteUrl(PROUST_MADELEINE_SEO.canonicalPath)}
      />

      <article className="relative isolate bg-paper">
        {/* Hero — bag.png, titres, CTA centré, bandeau wine */}
        <header className="relative flex min-h-[min(88vh,44rem)] flex-col border-b border-wine/15 sm:min-h-[min(90vh,48rem)]">
          <div className="absolute inset-0 z-0">
            <img
              src={bagImg}
              alt=""
              className="h-full w-full object-cover object-[50%_45%]"
              decoding="async"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-paper/25 via-paper/10 to-paper/35"
              aria-hidden
            />
          </div>

          <div className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pb-0 pt-28 sm:px-6 sm:pt-32 lg:px-10 lg:pt-36">
            <div className="mx-auto w-full max-w-7xl">
              <p className="typewriter-face text-xs font-normal uppercase tracking-[0.14em] text-ink sm:text-sm">
                {hero.kicker}
              </p>
              <h1
                id="proust-madeleine-heading"
                className="typo-title mt-4 max-w-3xl text-xl font-light uppercase leading-snug tracking-[0.06em] text-wine sm:mt-5 sm:text-2xl sm:leading-snug md:text-3xl md:leading-snug lg:mt-6 lg:text-4xl lg:tracking-[0.05em]"
              >
                <span className="block">{hero.titleLine1}</span>
                <span className="block">{hero.titleLine2}</span>
              </h1>
              <p className="typewriter-face mt-5 max-w-xl text-sm font-normal normal-case leading-relaxed text-ink/88 sm:mt-6 sm:text-base">
                {hero.tagline}
              </p>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center py-14 sm:py-16 lg:py-20">
              <a
                href={hero.ctaHref}
                className="cta-parchment rounded-none px-12 py-4 text-xs uppercase tracking-[0.18em] sm:px-14 sm:text-sm sm:tracking-[0.2em]"
              >
                {hero.ctaLabel}
              </a>
            </div>
          </div>

          <ProustResearchStatBanner className="relative z-10" />
        </header>

        {/* Field stories — mêmes cartes que « They share their stories » */}
        <section
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
          aria-labelledby="proust-stories-heading"
        >
          <div className="mb-10">
            <h2
              id="proust-stories-heading"
              className="split-media-heading-lg max-w-xl text-balance"
            >
              {copy.storiesSectionTitle}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
            {SHARED_STORIES_COPY.stories.map((story) => (
              <SharedStoryCard
                key={story.id}
                name={story.name}
                place={story.place}
                excerpt={story.excerpt}
              />
            ))}
          </div>
        </section>

        {/* Formulaire + sources */}
        <div
          id="proust-contribute"
          className="scroll-mt-28 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Card tone="paper" className="p-6 sm:p-8">
                <h2
                  id={`${formId}-form-h`}
                  className="waiting-list-modal-title"
                >
                  {form.title}
                </h2>
                {form.subtitle ? (
                  <p
                    id={`${formId}-form-desc`}
                    className="typo-body-lead mt-2 text-sm text-ink/80"
                  >
                    {form.subtitle}
                  </p>
                ) : null}

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                  noValidate
                  aria-describedby={
                    form.subtitle ? `${formId}-form-desc` : undefined
                  }
                >
                  <div>
                    <label
                      htmlFor={`${formId}-name`}
                      className={FORM_LABEL_CLASS}
                    >
                      {form.fields.name.label}
                    </label>
                    <input
                      id={`${formId}-name`}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={form.fields.name.placeholder}
                      autoComplete="name"
                      enterKeyHint="next"
                      className={FORM_INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${formId}-scent`}
                      className={FORM_LABEL_CLASS}
                    >
                      {form.fields.scent.label}
                    </label>
                    <input
                      id={`${formId}-scent`}
                      type="text"
                      value={scent}
                      onChange={(e) => setScent(e.target.value)}
                      placeholder={form.fields.scent.placeholder}
                      enterKeyHint="next"
                      className={FORM_INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${formId}-story`}
                      className={FORM_LABEL_CLASS}
                    >
                      {form.fields.story.label}
                    </label>
                    <textarea
                      id={`${formId}-story`}
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={5}
                      placeholder={form.fields.story.placeholder}
                      enterKeyHint="next"
                      aria-describedby={`${formId}-story-hint`}
                      className={FORM_TEXTAREA_CLASS}
                    />
                    <p
                      id={`${formId}-story-hint`}
                      className={`landing-meta-caption mt-1.5 ${
                        attemptedSubmit && excerptLen < excerptMin
                          ? "text-wine"
                          : ""
                      }`}
                    >
                      {excerptLen}/{excerptMin} characters minimum
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <input
                      id={`${formId}-consent`}
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 border-wine/35 text-wine focus:ring-wine/30"
                    />
                    <label
                      htmlFor={`${formId}-consent`}
                      className="typo-body-lead text-xs leading-snug text-ink/88"
                    >
                      {form.fields.consent}{" "}
                      <Link
                        to={copy.crossLinks.terms.to}
                        className="text-wine underline underline-offset-2"
                      >
                        {copy.crossLinks.terms.label}
                      </Link>
                      .
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="cta-primary w-full rounded-none py-3 text-xs uppercase tracking-[0.14em] disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto sm:px-10"
                  >
                    {form.submitLabel}
                  </button>
                </form>
              </Card>
            </div>

            <div className="flex flex-col justify-between gap-8 lg:col-span-7">
              <div className="overflow-hidden rounded-sm border border-wine/12">
                <img
                  src={bottleImg}
                  alt=""
                  className="aspect-[16/10] w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <nav
                className="flex flex-wrap gap-x-6 gap-y-2 font-subtitle text-[10px] uppercase tracking-[0.14em] text-wine"
                aria-label="Related pages"
              >
                <Link
                  to={copy.crossLinks.science.to}
                  className="underline-offset-4 hover:underline"
                >
                  ← {copy.crossLinks.science.label}
                </Link>
                <Link
                  to={copy.crossLinks.essay.to}
                  className="underline-offset-4 hover:underline"
                >
                  {copy.crossLinks.essay.label} →
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </article>
    </SiteChrome>
  );
}
