import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PreOrderCtaLink from "../components/cta/PreOrderCtaLink";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import { formatPrice } from "../config/bespokeProduct";
import { ORDER_CONFIRMATION_COPY } from "../config/bespokeOrderForm";
import { ORDER_CONFIRMATION_SEO, absoluteUrl } from "../config/seoMeta";
import { fetchCheckoutSession } from "../lib/createCheckoutSession";
import { formatJourneyDate } from "../lib/questionnaireState";

export default function OrderConfirmationPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    if (!sessionId) {
      setState({ status: "error", message: ORDER_CONFIRMATION_COPY.missingSession });
      return;
    }

    let cancelled = false;

    fetchCheckoutSession(sessionId)
      .then((order) => {
        if (cancelled) return;
        if (order.paymentStatus !== "paid") {
          setState({
            status: "error",
            message: ORDER_CONFIRMATION_COPY.pendingPayment,
          });
          return;
        }
        setState({ status: "success", order });
      })
      .catch((err) => {
        if (!cancelled) {
          setState({
            status: "error",
            message: err.message || ORDER_CONFIRMATION_COPY.loadError,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const copy = ORDER_CONFIRMATION_COPY;

  return (
    <SiteChrome>
      <SyncPageSeo
        title={ORDER_CONFIRMATION_SEO.title}
        description={ORDER_CONFIRMATION_SEO.description}
        keywords={ORDER_CONFIRMATION_SEO.keywords}
        canonicalUrl={absoluteUrl(ORDER_CONFIRMATION_SEO.canonicalPath)}
        noindex
      />
      <main className="min-h-[70vh] bg-paper pb-24 pt-28 sm:pt-32">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
          {state.status === "loading" && (
            <>
              <p className="landing-muted-text font-subtitle uppercase tracking-wider">
                {copy.loadingEyebrow}
              </p>
              <h1 className="typo-title mt-4 text-xl font-light sm:text-2xl">
                {copy.loadingTitle}
              </h1>
            </>
          )}

          {state.status === "error" && (
            <>
              <p className="landing-muted-text font-subtitle uppercase tracking-wider">
                {copy.errorEyebrow}
              </p>
              <h1 className="typo-title mt-4 text-xl font-light text-wine sm:text-2xl">
                {copy.errorTitle}
              </h1>
              <p className="typo-body-lead mt-5 text-sm sm:text-base">
                {state.message}
              </p>
              <div className="mt-10 flex flex-col items-center gap-4">
                <PreOrderCtaLink className="w-full max-w-xs" />
                <Link
                  to="/"
                  className="text-sm text-wine underline underline-offset-4"
                >
                  Back to home
                </Link>
              </div>
            </>
          )}

          {state.status === "success" && (
            <>
              <p className="font-subtitle text-[10px] uppercase tracking-[0.22em] text-wine">
                {copy.successEyebrow}
              </p>
              <h1 className="typo-title mt-4 text-xl font-light sm:text-2xl lg:text-3xl">
                {copy.successTitle}
              </h1>
              <p className="typo-body-lead mt-5 text-sm sm:text-base">
                {copy.successBody}
              </p>
              {state.order.emailSent === false && (
                <p className="typo-body-lead mt-3 text-sm text-ink/75">
                  {copy.successEmailNote}
                </p>
              )}

              <dl className="mt-10 space-y-4 border border-wine/15 bg-paper px-6 py-8 text-left sm:px-8">
                <div>
                  <dt className="font-subtitle text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    Label
                  </dt>
                  <dd className="typo-title mt-1 text-base font-normal">
                    {state.order.labelNames}
                  </dd>
                </div>
                <div>
                  <dt className="font-subtitle text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    Journey
                  </dt>
                  <dd className="typo-body-lead mt-1 text-sm sm:text-base">
                    {state.order.journey}
                    {state.order.journeyDate && (
                      <span className="block text-ink/70">
                        {formatJourneyDate(state.order.journeyDate) ||
                          state.order.journeyDate}
                      </span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="font-subtitle text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    Total paid
                  </dt>
                  <dd className="typo-title mt-1 text-lg text-wine">
                    {formatPrice(state.order.totalGbp)}
                    {state.order.withJournal && (
                      <span className="typo-body-lead block text-sm font-normal text-ink/70">
                        incl. memory journal
                      </span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="font-subtitle text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    Confirmation email
                  </dt>
                  <dd className="typo-body-lead mt-1 text-sm sm:text-base">
                    {state.order.email}
                    {state.order.emailSent && (
                      <span className="mt-1 block text-xs text-wine">
                        Sent — check your inbox
                      </span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="font-subtitle text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    Reference
                  </dt>
                  <dd className="font-subtitle mt-1 text-xs uppercase tracking-[0.12em] text-ink/70">
                    {state.order.orderId}
                  </dd>
                </div>
              </dl>

              <p className="typo-body-lead mt-8 text-sm text-ink/80">
                {copy.nextSteps}
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  to="/the-process"
                  className="cta-pill w-full max-w-xs sm:w-auto"
                >
                  The process
                </Link>
                <Link
                  to="/"
                  className="text-sm text-wine underline underline-offset-4"
                >
                  Back to home
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </SiteChrome>
  );
}
