import { Link } from "react-router-dom";
import { PROUST_RESEARCH_STAT } from "../../config/proustResearchStat";

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
 * Bandeau 95 % centré — preuve sociale + incitation à contribuer (Project Proust).
 */
export default function ProustResearchStatBanner({
  copy = PROUST_RESEARCH_STAT,
  ctaHref = copy.contributeHref,
  showCta = true,
  className = "",
}) {
  return (
    <section
      className={cx("bg-wine px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16", className)}
      aria-labelledby="proust-research-stat-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-subtitle text-[10px] uppercase tracking-[0.22em] text-paper/55">
          {copy.eyebrow}
        </p>

        <p
          id="proust-research-stat-heading"
          className="mt-6 font-body text-5xl font-light tabular-nums leading-none text-paper sm:text-6xl md:text-7xl"
        >
          {copy.value}
        </p>

        <p className="typewriter-face mx-auto mt-5 max-w-md text-[10px] font-normal uppercase leading-snug tracking-[0.14em] text-paper sm:text-xs sm:tracking-[0.16em] md:max-w-lg md:text-sm">
          {copy.statLine}
        </p>

        <p className="typo-body-lead-on-wine typo-body-lead-on-wine-muted mx-auto mt-6 max-w-lg">
          {copy.hook}
        </p>

        {showCta && (
          <div className="mt-8 flex justify-center">
            <StatCta
              href={ctaHref}
              label={copy.ctaLabel}
              className="cta-parchment rounded-none px-12 py-4 text-xs uppercase tracking-[0.18em] sm:px-14 sm:text-sm sm:tracking-[0.2em]"
            />
          </div>
        )}

        <p className="mt-6 font-body text-[11px] font-light italic leading-relaxed text-paper/65 sm:text-xs">
          {copy.disclaimer}
        </p>
      </div>
    </section>
  );
}
