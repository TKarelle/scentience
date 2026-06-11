import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CraftPitchSection from "../components/landing/CraftPitchSection";
import FAQSection from "../components/landing/FAQSection";
import JourneyWaitSection from "../components/landing/JourneyWaitSection";
import LandingHero from "../components/landing/LandingHero";
import NotForEveryoneSection from "../components/landing/NotForEveryoneSection";
import PhilosophySection from "../components/landing/PhilosophySection";
import ProofTrustSection from "../components/landing/ProofTrustSection";
import SharedStoriesSection from "../components/landing/SharedStoriesSection";
import YourCollectionSection from "../components/landing/YourCollectionSection";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import { HOME_PAGE_SEO, absoluteUrl } from "../config/seoMeta";

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

      <CraftPitchSection />

      <PhilosophySection />

      <YourCollectionSection />

      <NotForEveryoneSection />

      <SharedStoriesSection />

      <JourneyWaitSection />

      <ProofTrustSection />

      <FAQSection />
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
      />
      <LandingMain />
    </SiteChrome>
  );
}
