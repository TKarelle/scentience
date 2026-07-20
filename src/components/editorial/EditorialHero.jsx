/**
 * Hero éditorial partagé — Process, Science, Proust.
 */
export default function EditorialHero({
  headingId,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  imageClassName = "object-center",
  kicker,
  title,
  titleLines,
  subtitle,
  cta,
  ctaPlacement = "inline",
  minHeightClass = "min-h-[min(85vh,48rem)]",
}) {
  const titleContent =
    titleLines?.length > 0 ? (
      titleLines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))
    ) : (
      title
    );

  return (
    <header
      className={`relative flex ${minHeightClass} flex-col ${
        ctaPlacement === "below" ? "border-b border-wine/15" : "justify-end overflow-hidden border-b border-wine/15"
      } ${ctaPlacement === "inline" ? "justify-end overflow-hidden" : ""}`}
      aria-labelledby={headingId}
    >
      <div className="absolute inset-0 z-0">
        <img
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className={`h-full w-full object-cover ${imageClassName}`}
          decoding="async"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-paper/25 via-paper/10 to-paper/35"
          aria-hidden
        />
      </div>

      {ctaPlacement === "below" ? (
        <div className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pb-0 pt-28 sm:px-6 sm:pt-32 lg:px-10 lg:pt-36">
          <div className="mx-auto w-full max-w-7xl">
            <div className="card-fill-paper w-full max-w-3xl px-8 py-10 shadow-xl backdrop-blur-sm sm:px-10 sm:py-12">
              <p className="typewriter-face text-xs font-normal uppercase tracking-[0.14em] text-ink sm:text-sm">
                {kicker}
              </p>
              <h1
                id={headingId}
                className="typo-title mt-4 max-w-3xl text-xl font-light uppercase leading-snug tracking-[0.06em] text-wine sm:mt-5 sm:text-2xl sm:leading-snug md:text-3xl md:leading-snug lg:mt-6 lg:text-4xl lg:tracking-[0.05em]"
              >
                {titleContent}
              </h1>
              {subtitle ? (
                <p className="typo-body-lead mt-5 max-w-xl sm:mt-6">{subtitle}</p>
              ) : null}
            </div>
          </div>
          {cta ? (
            <div className="flex flex-1 flex-col items-center justify-center py-14 sm:py-16 lg:py-20">
              {cta}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24">
          <div className="card-fill-paper w-full max-w-3xl px-8 py-10 shadow-xl backdrop-blur-sm sm:px-10 sm:py-12">
            <p className="typewriter-face text-xs font-normal uppercase tracking-[0.14em] text-ink sm:text-sm">
              {kicker}
            </p>
            <h1
              id={headingId}
              className="typo-title mt-4 max-w-3xl text-xl font-light uppercase leading-snug tracking-[0.06em] text-wine sm:mt-5 sm:text-2xl sm:leading-snug md:text-3xl md:leading-snug lg:text-4xl lg:tracking-[0.05em]"
            >
              {titleContent}
            </h1>
            {subtitle ? (
              <p className="typo-body-lead mt-5 max-w-xl sm:mt-6">{subtitle}</p>
            ) : null}
            {cta ? <div className="mt-10">{cta}</div> : null}
          </div>
        </div>
      )}
    </header>
  );
}
