const cx = (...parts) => parts.filter(Boolean).join(" ");

/**
 * Indicateurs typewriter (· / ●) pour le carrousel hero.
 */
export default function HeroCarouselDots({
  count,
  activeIndex,
  onSelect,
  className = "",
}) {
  return (
    <div
      className={cx(
        "typewriter-face flex items-center justify-center gap-x-1 text-[1.35rem] leading-none tracking-[0.2em] text-paper drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)] sm:text-[1.5rem]",
        className,
      )}
      role="tablist"
      aria-label="Hero carousel slides"
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === activeIndex}
          tabIndex={i === activeIndex ? 0 : -1}
          className={cx(
            "flex min-h-11 min-w-11 items-center justify-center rounded-sm transition-opacity duration-300",
            i === activeIndex
              ? "opacity-100"
              : "opacity-45 hover:opacity-80",
          )}
          onClick={() => onSelect(i)}
        >
          <span className="sr-only">Slide {i + 1}</span>
          <span aria-hidden className="block translate-y-px">
            {i === activeIndex ? "●" : "·"}
          </span>
        </button>
      ))}
    </div>
  );
}
