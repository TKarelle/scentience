import { JOURNEY_PRE_ORDER_COPY } from "../../config/landingJourneyWait";
import PreOrderCtaLink from "../cta/PreOrderCtaLink";
import PreOrderStatus from "../cta/PreOrderStatus";
import danseImg from "../../image/danse.png";
import { Card } from "../ui";

/**
 * Fond photo danse, carte wine — CTA pre-order (remplace l’ancien formulaire waitlist).
 */
export default function JourneyWaitSection() {
  const copy = JOURNEY_PRE_ORDER_COPY;

  return (
    <section
      id="pre-order"
      className="relative isolate flex min-h-[min(100vh,52rem)] items-center justify-center overflow-hidden py-16 sm:py-24"
      aria-labelledby="journey-pre-order-heading"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={danseImg}
          alt="Couple dansant — atmosphère MADELEINE"
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/25" aria-hidden />
      </div>

      <div className="relative z-10 w-full max-w-lg px-4 sm:px-6">
        <Card tone="wine" className="p-8 sm:p-10">
          <h2 id="journey-pre-order-heading" className="journey-card-title">
            {copy.title}
          </h2>

          <PreOrderStatus tone="onWine" className="mt-6" />

          <p className="typo-body-lead-on-wine mt-6">{copy.body}</p>

          <div className="mt-8">
            <PreOrderCtaLink
              fullWidth
              variant="parchment"
              label={copy.ctaLabel}
              className="w-full tracking-wide"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
