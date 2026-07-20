import { PRE_ORDER_STATUS } from "../../config/preOrderMessaging";

const cx = (...p) => p.filter(Boolean).join(" ");

/** Bandeau statut pre-order (typewriter). */
export default function PreOrderStatus({ tone = "default", className = "" }) {
  const toneClass = tone === "onWine" ? "text-paper" : "text-wine";

  return (
    <p
      className={cx(
        "typewriter-face inline-flex items-center justify-center gap-2 text-center text-xs font-normal normal-case tracking-[0.12em] sm:text-sm",
        toneClass,
        className,
      )}
      role="status"
    >
      {PRE_ORDER_STATUS}
      <span className="pre-order-status__dot" aria-hidden />
    </p>
  );
}
