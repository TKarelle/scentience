import { WAITING_LIST_STATUS } from "../../config/waitingListMessaging";

const cx = (...p) => p.filter(Boolean).join(" ");

/** Statut liste d’attente (TLWG + rouge). */
export default function WaitingListStatus({ className = "" }) {
  return (
    <p
      className={cx(
        "font-subtitle text-sm leading-snug text-red-500",
        className,
      )}
      aria-live="polite"
    >
      {WAITING_LIST_STATUS}
    </p>
  );
}
