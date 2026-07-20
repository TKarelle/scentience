import { Link } from "react-router-dom";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import {
  TERMS_CONTACT_EMAIL,
  TERMS_DOCUMENT_TITLE,
  TERMS_INTRO,
  TERMS_SECTIONS,
} from "../config/termsLegalContent";
import { TERMS_PAGE_SEO, absoluteUrl } from "../config/seoMeta";

function TermsBlockRenderer({ block }) {
  if (block.type === "p") {
    return (
      <p className="typo-body-lead normal-case text-ink/88">{block.text}</p>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="typo-body-lead list-disc space-y-2 pl-5 normal-case text-ink/88 marker:text-wine/45">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "contact") {
    return (
      <p className="typo-body-lead normal-case text-ink/88">
        Requests can be made by contacting:{" "}
        <a
          href={`mailto:${TERMS_CONTACT_EMAIL}`}
          className="text-wine underline underline-offset-4 transition-opacity hover:opacity-85"
        >
          {TERMS_CONTACT_EMAIL}
        </a>
      </p>
    );
  }
  return null;
}

export default function TermsPage() {
  return (
    <SiteChrome>
      <SyncPageSeo
        title={TERMS_PAGE_SEO.title}
        description={TERMS_PAGE_SEO.description}
        keywords={TERMS_PAGE_SEO.keywords}
        canonicalUrl={absoluteUrl(TERMS_PAGE_SEO.canonicalPath)}
        ogImage={TERMS_PAGE_SEO.ogImage}
        ogImageAlt="MADELEINE bespoke fragrance — hero banner"
      />
      <main className="min-h-screen bg-paper pb-24 pt-28 sm:pt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="landing-muted-text mb-4 text-center font-subtitle uppercase tracking-wider">
            Legal
          </p>
          <h1 className="mx-auto mb-8 max-w-3xl text-center font-subtitle text-lg font-light normal-case leading-snug tracking-[0.02em] text-wine sm:mb-10 sm:text-xl lg:text-2xl">
            {TERMS_DOCUMENT_TITLE}
          </h1>
          <p className="typo-body-lead mb-14 border-b border-ink/10 pb-10 normal-case text-ink/85 sm:mb-16">
            {TERMS_INTRO}
          </p>

          <div className="space-y-14 sm:space-y-16">
            {TERMS_SECTIONS.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28"
                aria-labelledby={`terms-heading-${section.id}`}
              >
                <h2
                  id={`terms-heading-${section.id}`}
                  className="mb-5 text-left font-subtitle text-sm font-light normal-case leading-snug tracking-[0.02em] text-wine sm:text-base"
                >
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.blocks.map((block, i) => (
                    <TermsBlockRenderer
                      key={`${section.id}-${block.type}-${i}`}
                      block={block}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="typo-body-lead mt-16 border-t border-ink/10 pt-10 text-center normal-case text-ink/65 sm:mt-20">
            <Link
              to="/"
              className="text-wine underline underline-offset-4 transition-opacity hover:opacity-85"
            >
              Back to home
            </Link>
          </p>
        </div>
      </main>
    </SiteChrome>
  );
}
