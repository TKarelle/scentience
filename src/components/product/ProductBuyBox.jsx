import { createContext, useContext, useId, useMemo, useState } from "react";
import {
  BESPOKE_PRODUCT,
  formatPrice,
  getBespokePrice,
} from "../../config/bespokeProduct";
import { trackEvent } from "../../lib/analytics";

const ProductBuyContext = createContext(null);

function useProductBuy() {
  const ctx = useContext(ProductBuyContext);
  if (!ctx) {
    throw new Error("ProductBuy components must be used within ProductBuyProvider");
  }
  return ctx;
}

/** État partagé prix / journal — checkout et livraison peuvent être séparés sur mobile. */
export function ProductBuyProvider({ onPersonalise, children }) {
  const [withJournal, setWithJournal] = useState(true);
  const total = useMemo(
    () => getBespokePrice({ withJournal }),
    [withJournal],
  );

  const value = useMemo(
    () => ({
      withJournal,
      setWithJournal,
      total,
      onPersonalise: () => onPersonalise({ withJournal, totalEur: total }),
    }),
    [withJournal, total, onPersonalise],
  );

  return (
    <ProductBuyContext.Provider value={value}>
      {children}
    </ProductBuyContext.Provider>
  );
}

/** Prix · journal · CTA */
export function ProductBuyCheckout({ className = "" }) {
  const product = BESPOKE_PRODUCT;
  const journalId = useId();
  const { withJournal, setWithJournal, total, onPersonalise } = useProductBuy();
  const { journalAddOnGbp, bundleDiscountGbp } = product.pricing;
  const showSavings = withJournal && bundleDiscountGbp > 0;

  return (
    <div className={className}>
      <p className="font-body text-3xl font-light tabular-nums text-wine sm:text-4xl">
        {formatPrice(total)}
      </p>
      

      <div className="mt-5 flex gap-3 border-t border-wine/15 pt-5">
        <input
          id={journalId}
          type="checkbox"
          checked={withJournal}
          onChange={(e) => setWithJournal(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 border-wine/35 text-wine focus:ring-wine/30"
        />
        <label htmlFor={journalId} className="cursor-pointer">
          <span className="typo-title text-xs font-normal sm:text-sm">
            + {product.journalOption.label} ({product.journalOption.pages} pp.)
          </span>
          <span className="landing-meta-caption mt-0.5 block">
            {withJournal
              ? `${formatPrice(journalAddOnGbp - bundleDiscountGbp)} in bundle`
              : `+${formatPrice(journalAddOnGbp)}`}
          </span>
        </label>
      </div>

      <button
        type="button"
        onClick={() => {
          trackEvent("cta_personalise_open", { location: "/product/original-bespoke" });
          onPersonalise();
        }}
        className="cta-pill mt-6 w-full"
      >
        {product.purchaseCta}
      </button>
    </div>
  );
}

/** Livraison · retours */
export function ProductBuyLogistics({ className = "" }) {
  const product = BESPOKE_PRODUCT;

  return (
    <div className={className}>
      {product.delivery != null && (
        <div className="border-t border-wine/15 pt-6">
          <p className="font-subtitle text-[10px] uppercase tracking-[0.18em] text-ink">
            {product.delivery.heading}
          </p>
          <ul className="mt-3 space-y-2">
            {product.delivery.bullets.map((line) => (
              <li
                key={line}
                className="typo-body-lead text-xs leading-relaxed text-ink/80 sm:text-sm"
              >
                · {line}
              </li>
            ))}
          </ul>
        </div>
      )}

      {product.returns?.note != null && (
        <p className="landing-muted-text mt-4 text-[11px] leading-snug sm:text-xs">
          {product.returns.note}
        </p>
      )}
    </div>
  );
}

export { getBespokePrice };
