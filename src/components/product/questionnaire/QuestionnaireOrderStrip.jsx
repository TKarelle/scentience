import { formatPrice } from "../../../config/bespokeProduct";
import CloseIcon from "../../icons/CloseIcon";

/**
 * Bandeau commande — produit, prix, journal. Toujours visible en tête du modal.
 */
export default function QuestionnaireOrderStrip({
  productName,
  totalEur,
  withJournal,
  onClose,
}) {
  return (
    <div className="questionnaire-order-strip">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="questionnaire-order-strip__name">{productName}</p>
          <p className="questionnaire-order-strip__price">{formatPrice(totalEur)}</p>
          <p className="questionnaire-order-strip__meta">
            {withJournal ? "Incl. memory journal" : "30 ml · bespoke"}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 p-1 text-ink/50 transition-colors hover:text-ink"
          aria-label="Close"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
