import { Link, useLocation } from "react-router-dom";
import {
  PRE_ORDER_CTA_LABEL,
  PRE_ORDER_PATH,
} from "../../config/preOrderMessaging";
import { trackEvent } from "../../lib/analytics";

const cx = (...p) => p.filter(Boolean).join(" ");

/** CTA pre-order — lien vers Original Bespoke. */
export default function PreOrderCtaLink({
  to = PRE_ORDER_PATH,
  label = PRE_ORDER_CTA_LABEL,
  fullWidth = false,
  variant = "primary",
  className = "",
  trackLocation,
  onClick,
}) {
  const location = useLocation();
  const variantClass =
    variant === "parchment" ? "cta-parchment" : "cta-primary";

  function handleClick(e) {
    trackEvent("cta_pre_order", {
      location: trackLocation ?? location.pathname,
    });
    onClick?.(e);
  }

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={cx(
        variantClass,
        "max-w-sm rounded-none text-xs uppercase tracking-wide sm:text-sm",
        fullWidth && "mx-auto w-full",
        className,
      )}
    >
      {label}
    </Link>
  );
}
