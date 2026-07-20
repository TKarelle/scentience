import { Link } from "react-router-dom";
import PreOrderCtaLink from "../components/cta/PreOrderCtaLink";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import { NOT_FOUND_PAGE_COPY } from "../config/notFoundCopy";
import { NOT_FOUND_SEO, absoluteUrl } from "../config/seoMeta";

export default function NotFoundPage() {
  const copy = NOT_FOUND_PAGE_COPY;

  return (
    <SiteChrome>
      <SyncPageSeo
        title={NOT_FOUND_SEO.title}
        description={NOT_FOUND_SEO.description}
        keywords={NOT_FOUND_SEO.keywords}
        canonicalUrl={absoluteUrl(NOT_FOUND_SEO.canonicalPath)}
        noindex
      />
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-paper px-4 pb-24 pt-28 text-center sm:pt-32">
        <p className="font-subtitle text-[10px] uppercase tracking-[0.22em] text-wine">
          {copy.eyebrow}
        </p>
        <h1 className="typo-title mt-4 max-w-md text-xl font-light sm:text-2xl lg:text-3xl">
          {copy.title}
        </h1>
        <p className="typo-body-lead mt-5 max-w-sm text-sm sm:text-base">
          {copy.body}
        </p>
        <div className="mt-10 flex w-full max-w-xs flex-col gap-4">
          <PreOrderCtaLink fullWidth />
          <Link
            to="/"
            className="text-sm text-wine underline underline-offset-4"
          >
            {copy.backHome}
          </Link>
        </div>
      </main>
    </SiteChrome>
  );
}
