import { PRE_ORDER_STATUS } from "../../config/preOrderMessaging";

const cx = (...p) => p.filter(Boolean).join(" ");

/** Bandeau statut pre-order (typewriter). */
export default function PreOrderStatus({ tone = "default", className = "" }) {
  const toneClass = tone === "onWine" ? "text-paper" : "text-wine";

  return (
    <p
      className={cx(
        "typewriter-face text-center text-xs font-normal normal-case tracking-[0.12em] sm:text-sm",
        toneClass,
        className,
      )}
      role="status"
    >
      {PRE_ORDER_STATUS}
    </p>
  );
}
