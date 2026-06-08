const cx = (...p) => p.filter(Boolean).join(" ");

function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="text-wine tracking-tight" aria-hidden>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

/** Preuves sociales PDP + pitch (`variant`: stats | pitch | all). */
export default function ProductSocialProof({
  social,
  personalisationPitch,
  variant = "all",
  className = "",
}) {
  const showStats = variant === "all" || variant === "stats";
  const showPitch =
    (variant === "all" || variant === "pitch") && personalisationPitch != null;

  return (
    <div className={cx(showPitch && variant === "all" && "space-y-4", className)}>
      {showStats && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm">
          <p className="typewriter-face text-ink/80">
            <span className="font-body text-base tabular-nums text-wine sm:text-lg">
              {social.commissionsCount}+
            </span>{" "}
            commissions
          </p>
          <span className="hidden h-3 w-px bg-ink/20 sm:block" aria-hidden />
          <p className="flex items-center gap-1.5">
            <Stars rating={social.rating} />
            <span className="font-body tabular-nums text-ink">
              {social.rating}
            </span>
            <span className="landing-muted-text">({social.reviewCount})</span>
          </p>
        </div>
      )}

      {showPitch && (
        <div className={cx(variant === "all" && "border-t border-wine/15 pt-4")}>
          <p className="typo-typewriter-lead text-sm text-wine">
            {personalisationPitch.lead}
          </p>
          <p className="typo-body-lead mt-3 text-sm leading-relaxed text-ink/88">
            {personalisationPitch.body}
          </p>
          {personalisationPitch.steps?.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {personalisationPitch.steps.map((step) => (
                <li
                  key={step}
                  className="typewriter-face text-[11px] uppercase leading-snug tracking-[0.12em] text-ink/75 sm:text-xs"
                >
                  · {step}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
