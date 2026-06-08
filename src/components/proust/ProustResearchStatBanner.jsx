import { Link } from "react-router-dom";
import { PROUST_RESEARCH_STAT } from "../../config/proustResearchStat";
import SectionLogoWatermark from "../layout/SectionLogoWatermark";

const cx = (...p) => p.filter(Boolean).join(" ");

function StatCta({ href, label, className }) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      {label}
    </Link>
  );
}

/**
 * Bandeau 95 % — grille éditoriale wine : preuve sociale + CTA conversion.
 */
export default function ProustResearchStatBanner({
  copy = PROUST_RESEARCH_STAT,
  ctaHref = copy.contributeHref,
  showCta = true,
  className = "",
}) {
  return (
    <section
      className={cx(
        "proust-stat-banner relative isolate overflow-hidden bg-wine px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20",
        className,
      )}
      aria-labelledby="proust-research-stat-heading"
    >
      <SectionLogoWatermark variant="wine" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-5">
          <p className="proust-stat-banner__eyebrow">{copy.eyebrow}</p>

          <p
            id="proust-research-stat-heading"
            className="proust-stat-banner__value mt-5 font-body font-light tabular-nums leading-none"
          >
            {copy.value}
          </p>

          <p className="proust-stat-banner__stat-line mt-5 max-w-sm">
            {copy.statLine}
          </p>
        </div>

        <div className="border-t border-paper/15 pt-8 lg:col-span-7 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0 xl:pl-16">
          <p className="typo-title-on-wine max-w-xl text-base leading-snug sm:text-lg">
            {copy.headline}
          </p>

          <p className="typo-body-lead-on-wine typo-body-lead-on-wine-muted mt-5 max-w-lg">
            {copy.hook}
          </p>

          {showCta && (
            <div className="mt-8">
              <StatCta
                href={ctaHref}
                label={copy.ctaLabel}
                className="cta-parchment inline-flex rounded-none px-12 py-4 text-xs uppercase tracking-[0.18em] sm:px-14 sm:text-sm sm:tracking-[0.2em]"
              />
            </div>
          )}

          <p className="proust-stat-banner__disclaimer mt-6 font-body text-[11px] font-light italic leading-relaxed sm:text-xs">
            {copy.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
