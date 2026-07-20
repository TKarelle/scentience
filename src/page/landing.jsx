import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LandingHero from "../components/landing/LandingHero";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import LazySectionFallback from "../components/ui/LazySectionFallback";
import { HOME_PAGE_SEO, absoluteUrl, DEFAULT_OG_IMAGE } from "../config/seoMeta";

const CraftPitchSection = lazy(
  () => import("../components/landing/CraftPitchSection"),
);
const CustomerReviewsSection = lazy(
  () => import("../components/landing/CustomerReviewsSection"),
);
const DiscoverTabsSection = lazy(
  () => import("../components/landing/DiscoverTabsSection"),
);
const NotForEveryoneSection = lazy(
  () => import("../components/landing/NotForEveryoneSection"),
);
const ExpertQuotesSection = lazy(
  () => import("../components/landing/ExpertQuotesSection"),
);
const JourneyWaitSection = lazy(
  () => import("../components/landing/JourneyWaitSection"),
);
const FAQSection = lazy(() => import("../components/landing/FAQSection"));

function LandingMain() {
  const location = useLocation();

  useEffect(() => {
    const raw = location.hash.replace(/^#/, "");
    if (!raw) return;
    const id = decodeURIComponent(raw);
    const el = document.getElementById(id);
    if (!el) return;
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  return (
    <main>
      <LandingHero />

      <Suspense fallback={<LazySectionFallback minHeight="min-h-[32rem]" />}>
        <CraftPitchSection />
      </Suspense>

      <Suspense fallback={<LazySectionFallback minHeight="min-h-[24rem]" />}>
        <CustomerReviewsSection />
      </Suspense>

      <Suspense fallback={<LazySectionFallback minHeight="min-h-[36rem]" />}>
        <DiscoverTabsSection />
      </Suspense>

      <Suspense fallback={<LazySectionFallback minHeight="min-h-[20rem]" />}>
        <NotForEveryoneSection />
      </Suspense>

      <Suspense fallback={<LazySectionFallback minHeight="min-h-[40rem]" />}>
        <ExpertQuotesSection />
      </Suspense>

      <Suspense fallback={<LazySectionFallback minHeight="min-h-[52rem]" />}>
        <JourneyWaitSection />
      </Suspense>

      <Suspense fallback={<LazySectionFallback minHeight="min-h-[28rem]" />}>
        <FAQSection />
      </Suspense>
    </main>
  );
}

export default function MADELEINELanding() {
  return (
    <SiteChrome>
      <SyncPageSeo
        title={HOME_PAGE_SEO.title}
        description={HOME_PAGE_SEO.description}
        keywords={HOME_PAGE_SEO.keywords}
        canonicalUrl={absoluteUrl(HOME_PAGE_SEO.canonicalPath)}
        ogImage={DEFAULT_OG_IMAGE}
        ogImageAlt="MADELEINE bespoke fragrance — hero banner"
      />
      <LandingMain />
    </SiteChrome>
  );
}
