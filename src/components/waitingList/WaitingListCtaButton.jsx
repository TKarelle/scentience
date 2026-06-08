import { WAITING_LIST_CTA_LABEL } from "../../config/waitingListMessaging";

const cx = (...p) => p.filter(Boolean).join(" ");

/** CTA liste d’attente (style global .cta-primary). */
export default function WaitingListCtaButton({
  onClick,
  fullWidth = false,
  className = "",
}) {
  return (
    <button
      type="button"
      className={cx(
        "cta-primary max-w-sm rounded-none text-xs uppercase tracking-wide sm:text-sm",
        fullWidth && "mx-auto w-full",
        className,
      )}
      onClick={onClick}
    >
      {WAITING_LIST_CTA_LABEL}
    </button>
  );
}
