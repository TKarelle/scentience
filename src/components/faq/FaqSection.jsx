import { useMemo } from "react";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import { normalizeFaqItems } from "../../lib/faqItems";

const cx = (...p) => p.filter(Boolean).join(" ");

function buildFaqPageJsonLd(items, pageUrl) {
  const url = pageUrl.trim();
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answerParagraphs.join(" "),
      },
    })),
  };
}

/**
 * FAQ accordéon + schéma FAQPage optionnel — même motif landing / The process / autres pages.
 *
 * @param {object} props
 * @param {string} props.headingId — id du titre (aria-labelledby)
 * @param {string} [props.sectionId="faq"]
 * @param {string} [props.title="Frequently asked questions"]
 * @param {string|null} [props.intro]
 * @param {Array<{ id?: string, question: string, answerParagraphs?: string[], answer?: string }>} props.items
 * @param {string|null} [props.jsonLdPageUrl] — URL canonique de la page pour JSON-LD ; si absent, pas de script
 * @param {string} [props.className]
 */
export default function FaqSection({
  headingId,
  sectionId = "faq",
  title = "Frequently asked questions",
  intro = null,
  items: itemsProp,
  jsonLdPageUrl = null,
  className = "",
}) {
  const items = useMemo(() => normalizeFaqItems(itemsProp), [itemsProp]);

  const jsonLd = useMemo(() => {
    if (!jsonLdPageUrl) return null;
    return JSON.stringify(buildFaqPageJsonLd(items, jsonLdPageUrl));
  }, [items, jsonLdPageUrl]);

  return (
    <>
      {jsonLd != null && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <section
        id={sectionId}
        className={cx(
          "border-t border-wine/20 bg-paper py-16 sm:py-20 lg:py-24",
          className,
        )}
        aria-labelledby={headingId}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 id={headingId} className="split-media-heading-lg text-center">
            {title}
          </h2>
          {intro != null && intro !== "" && (
            <p className="typo-typewriter-lead-centered mx-auto mt-4 max-w-2xl text-pretty">
              {intro}
            </p>
          )}

          <div className="mt-12 divide-y divide-wine/20 border-y border-wine/20">
            {items.map((item) => (
              <details
                key={item.id}
                id={`${sectionId}-${item.id}`}
                className="group py-5 sm:py-6"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left [&::-webkit-details-marker]:hidden">
                  <span className="typo-title text-base font-normal leading-snug text-ink sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDownIcon className="mt-0.5 h-5 w-5 shrink-0 text-wine transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="mt-4 space-y-3 border-l-2 border-wine/25 pl-4 sm:pl-5">
                  {item.answerParagraphs.map((para, i) => (
                    <p key={i} className="typo-body-lead text-pretty">
                      {para}
                    </p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
