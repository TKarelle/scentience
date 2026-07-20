import { useId, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DISCOVER_TABS_SECTION } from "../../config/landingDiscoverTabs";
import { PRE_ORDER_PATH } from "../../config/preOrderMessaging";
import { trackEvent } from "../../lib/analytics";
import PhilosophyTypewriterQuote from "./PhilosophyTypewriterQuote";

function TabCta({ cta }) {
  const location = useLocation();

  return (
    <Link
      to={cta.href}
      className="cta-pill cta-pill--on-mist"
      onClick={() => {
        if (cta.href === PRE_ORDER_PATH) {
          trackEvent("cta_pre_order", { location: location.pathname });
        }
      }}
    >
      {cta.label}
    </Link>
  );
}

function TabPanelContent({ tab }) {
  const subtitle =
    tab.type === "collection" ? (
      <p className="typo-typewriter-lead mt-3">
        {tab.subtitleBefore}
        <span className="text-wine">{tab.subtitleEmphasis}</span>
        {tab.subtitleAfter}
      </p>
    ) : null;

  return (
    <>
      <div className="discover-tabs-section__panel-body">
        <h2 className="discover-tabs-section__title">{tab.title}</h2>
        {subtitle}

        {tab.type === "steps" ? (
          <ol className="discover-tabs-section__steps">
            {tab.steps.map((step) => (
              <li key={step.n} className="discover-tabs-section__step">
                <h3 className="discover-tabs-section__step-title">
                  <span className="discover-tabs-section__step-num">
                    {step.n}
                  </span>
                  {step.title}
                </h3>
                <p className="typo-body-lead">{step.body}</p>
              </li>
            ))}
          </ol>
        ) : (
          <div className="discover-tabs-section__body">
            {tab.paragraphs.map((text, i) => (
              <p key={i} className="typo-body-lead">
                {text}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="discover-tabs-section__actions">
        <TabCta cta={tab.cta} />
      </div>
    </>
  );
}

/**
 * Philosophie · Collection · How it Works — onglets, citation fixe, panneau bleu + image.
 */
export default function DiscoverTabsSection() {
  const baseId = useId();
  const { quote, tabs } = DISCOVER_TABS_SECTION;
  const [activeId, setActiveId] = useState(tabs[0].id);
  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <section
      id="collection"
      className="discover-tabs-section"
      aria-labelledby={`${baseId}-quote`}
    >
      <div className="discover-tabs-section__inner mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div id={`${baseId}-quote`} className="discover-tabs-section__quote">
          <PhilosophyTypewriterQuote parts={quote.parts} />
        </div>

        <div className="discover-tabs-section__layout mt-10 sm:mt-12">
          <div className="discover-tabs-section__panel">
            <div
              role="tablist"
              aria-label="Discover MADELEINE"
              className="discover-tabs-section__tabs"
            >
              {tabs.map((tab) => {
                const selected = tab.id === activeId;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${tab.id}`}
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel-${tab.id}`}
                    tabIndex={selected ? 0 : -1}
                    className={`discover-tabs-section__tab${
                      selected ? " discover-tabs-section__tab--active" : ""
                    }`}
                    onClick={() => setActiveId(tab.id)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="discover-tabs-section__panels">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  role="tabpanel"
                  id={`${baseId}-panel-${tab.id}`}
                  aria-labelledby={`${baseId}-tab-${tab.id}`}
                  hidden={tab.id !== activeId}
                  className="discover-tabs-section__panel-view"
                >
                  <TabPanelContent tab={tab} />
                </div>
              ))}
            </div>
          </div>

          <div className="discover-tabs-section__media">
            <img
              key={activeTab.id}
              src={activeTab.image}
              alt={activeTab.imageAlt}
              className="discover-tabs-section__image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
