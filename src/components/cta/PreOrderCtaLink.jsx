import { Link } from "react-router-dom";
import {
  PRE_ORDER_CTA_LABEL,
  PRE_ORDER_PATH,
} from "../../config/preOrderMessaging";

const cx = (...p) => p.filter(Boolean).join(" ");

/** CTA pre-order — lien vers Original Bespoke. */
export default function PreOrderCtaLink({
  to = PRE_ORDER_PATH,
  label = PRE_ORDER_CTA_LABEL,
  fullWidth = false,
  variant = "primary",
  className = "",
}) {
  const variantClass =
    variant === "parchment" ? "cta-parchment" : "cta-primary";

  return (
    <Link
      to={to}
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
