import ChevronDownIcon from "../icons/ChevronDownIcon";

const cx = (...p) => p.filter(Boolean).join(" ");

/**
 * Accordéons PDP — même motif visuel que `FaqSection`, sans section wrapper.
 */
export default function ProductDetailAccordions({ panels, className = "" }) {
  return (
    <div
      className={cx("mt-10 divide-y divide-wine/20 border-y border-wine/20", className)}
    >
      {panels.map((panel) => (
        <details
          key={panel.id}
          id={`product-${panel.id}`}
          className="group py-4 sm:py-5"
          open={panel.defaultOpen ?? false}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-subtitle text-[10px] uppercase tracking-[0.18em] text-ink">
              {panel.title}
            </span>
            <ChevronDownIcon className="h-4 w-4 shrink-0 text-wine transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="mt-4 space-y-3">
            {panel.paragraphs?.map((para, i) => (
              <p key={i} className="typo-body-lead text-pretty text-ink/88">
                {para}
              </p>
            ))}
            {panel.bullets != null && panel.bullets.length > 0 && (
              <ul className="space-y-2 pl-4">
                {panel.bullets.map((item, i) => (
                  <li
                    key={i}
                    className="typo-body-lead relative text-pretty text-ink/88 before:absolute before:-left-4 before:text-wine before:content-['·']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
