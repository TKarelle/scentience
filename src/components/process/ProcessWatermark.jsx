/**
 * Filigrane boussole / cadran — fond très léger (Ingredients, Label).
 */
export default function ProcessWatermark({
  className = "text-ink",
  svgClassName = "mx-auto h-[min(85vw,28rem)] w-[min(85vw,28rem)] opacity-[0.07]",
}) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 420 420"
        className={svgClassName}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="210"
          cy="210"
          r="198"
          stroke="currentColor"
          strokeWidth="0.75"
        />
        <circle
          cx="210"
          cy="210"
          r="172"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <circle
          cx="210"
          cy="210"
          r="148"
          stroke="currentColor"
          strokeWidth="0.35"
        />
        <line
          x1="210"
          y1="210"
          x2="210"
          y2="42"
          stroke="currentColor"
          strokeWidth="0.75"
        />
        <circle cx="210" cy="210" r="4" fill="currentColor" />
      </svg>
    </div>
  );
}
