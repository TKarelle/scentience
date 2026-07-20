/** Placeholder while below-fold sections lazy-load — reserves space to limit CLS. */
export default function LazySectionFallback({ minHeight = "min-h-[28rem]" }) {
  return (
    <div
      className={`perf-section-placeholder ${minHeight} bg-paper`}
      aria-hidden
    />
  );
}
