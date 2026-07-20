import { useState } from "react";
import PreOrderCtaLink from "../cta/PreOrderCtaLink";
import PreOrderStatus from "../cta/PreOrderStatus";

const cx = (...p) => p.filter(Boolean).join(" ");

function MediaImage({ src, alt, className, width, height, loading = "lazy", sizes }) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      loading={loading}
      decoding="async"
    />
  );
}

function HoverSwapFigure({ image, figureClassName }) {
  const [hoverReady, setHoverReady] = useState(false);

  function enableHover() {
    if (!image.hoverSrc || hoverReady) return;
    setHoverReady(true);
  }

  return (
    <figure
      className={cx(
        "split-media-figure split-media-figure--hover-swap",
        figureClassName,
      )}
      onMouseEnter={enableHover}
      onFocus={enableHover}
    >
      <MediaImage
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 1024px) 28rem, 100vw"
        className="split-media-figure__default h-full w-full object-cover"
      />
      {hoverReady && image.hoverSrc ? (
        <MediaImage
          src={image.hoverSrc}
          alt=""
          width={image.hoverWidth ?? image.width}
          height={image.hoverHeight ?? image.height}
          className="split-media-figure__hover h-full w-full object-cover"
          loading="lazy"
        />
      ) : null}
    </figure>
  );
}

/**
 * Bloc mobile-first : média + texte (Your collection, Craft, Process ingredients/label, etc.).
 * `reverse` : texte gauche / image droite sur desktop.
 */
export default function SplitMediaSection({
  image,
  title,
  titleClassName,
  subtitle,
  description,
  reverse = false,
  showPreOrderCta = false,
  figureClassName,
  cta,
  contentVerticalAlign = "center",
  headingCentered = false,
  titleId,
  overlay = null,
  className = "",
  id,
}) {
  const figure = image.hoverSrc ? (
    <HoverSwapFigure image={image} figureClassName={figureClassName} />
  ) : (
    <figure className={cx("split-media-figure", figureClassName)}>
      <MediaImage
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="h-full w-full object-cover"
      />
    </figure>
  );

  const descriptionBlock =
    typeof description === "string" ? (
      <p className="typo-body-lead">{description}</p>
    ) : (
      description
    );

  const ctaClasses = cx(
    "cta-pill max-w-sm",
    headingCentered ? "mx-auto sm:self-center" : "sm:self-start",
  );

  const titleDefaultClass = "split-media-heading";

  const textColumnJustify =
    headingCentered || contentVerticalAlign !== "top"
      ? "lg:justify-center"
      : "lg:justify-start";

  const headingBlock = headingCentered ? (
    <div className="w-full space-y-3">
      <h2
        id={titleId}
        className={cx(titleClassName ?? titleDefaultClass, "w-full text-center")}
      >
        {title}
      </h2>
      {subtitle != null && (
        <div className="flex w-full justify-center">
          <div className="min-w-0 max-w-xl">{subtitle}</div>
        </div>
      )}
    </div>
  ) : (
    <>
      <h2 id={titleId} className={titleClassName ?? titleDefaultClass}>
        {title}
      </h2>
      {subtitle != null && <div className="min-w-0">{subtitle}</div>}
    </>
  );

  const contentInner = (
    <div className="flex flex-col gap-6 lg:gap-8">
      {headingBlock}
      {description != null && (
        <div
          className={cx(
            "space-y-4",
            headingCentered ? "mx-auto w-full max-w-xl" : "max-w-xl",
          )}
        >
          {descriptionBlock}
        </div>
      )}
      {showPreOrderCta && (
        <div
          className={cx(
            "flex flex-col gap-4",
            headingCentered && "items-center text-center",
          )}
        >
          <PreOrderStatus
            className={headingCentered ? "text-center" : undefined}
          />
          <PreOrderCtaLink
            className={cx(
              "w-full sm:w-auto",
              headingCentered ? "sm:self-center" : "sm:self-start",
            )}
          />
        </div>
      )}
      {cta != null &&
        (cta.href ? (
          <a href={cta.href} className={ctaClasses}>
            {cta.label}
          </a>
        ) : (
          <button type="button" className={ctaClasses} onClick={cta.onClick}>
            {cta.label}
          </button>
        ))}
    </div>
  );

  const content = (
    <div
      className={cx(
        "min-w-0",
        "lg:flex lg:h-full lg:min-h-0 lg:flex-col",
        textColumnJustify,
      )}
    >
      {contentInner}
    </div>
  );

  const figureCell = (
    <div className="flex h-full min-h-0 min-w-0 items-start justify-center">
      {figure}
    </div>
  );

  const sectionProps =
    titleId != null && titleId !== "" ? { "aria-labelledby": titleId } : {};

  return (
    <section
      id={id}
      className={cx(
        "bg-paper",
        overlay != null && "relative overflow-hidden",
        className,
      )}
      {...sectionProps}
    >
      {overlay != null && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {overlay}
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16 xl:gap-20">
          {reverse ? (
            <>
              {content}
              {figureCell}
            </>
          ) : (
            <>
              {figureCell}
              {content}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
