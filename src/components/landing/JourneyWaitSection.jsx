import { useState } from "react";
import { JOURNEY_WAIT_COPY } from "../../config/landingJourneyWait";
import { submitWaitingList } from "../../lib/submitWaitingList";
import danseImg from "../../image/danse.png";
import WaitingListCountrySelect from "../waitingList/WaitingListCountrySelect";
import { Card } from "../ui";

const fieldClass =
  "mt-1.5 w-full rounded-sm border border-paper/45 bg-paper/40 px-3 py-2.5 text-sm text-ink placeholder:text-ink/45 outline-none ring-paper/30 focus:border-paper/70 focus:ring-1";

/**
 * Fond photo danse, carte wine ~70 % (composant Card), formulaire email / pays,
 * CTA fond parchemin.
 */
export default function JourneyWaitSection() {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const copy = JOURNEY_WAIT_COPY;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      await submitWaitingList({ email, country });

      setStatus("You're registered. We'll be in touch.");
      setEmail("");
      setCountry("");
      setTimeout(() => setStatus(""), 4000);
    } catch {
      setStatus("Something went wrong. Please try again.");
      setTimeout(() => setStatus(""), 4000);
    }
  }

  return (
    <section
      id="waitlist"
      className="relative isolate flex min-h-[min(100vh,52rem)] items-center justify-center overflow-hidden py-16 sm:py-24"
      aria-labelledby="journey-wait-heading"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={danseImg}
          alt="Couple dansant — atmosphère Scentience"
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/25" aria-hidden />
      </div>

      <div className="relative z-10 w-full max-w-lg px-4 sm:px-6">
        <Card tone="wine" className=" sm:p-10 p-8">
          <h2 id="journey-wait-heading" className="journey-card-title">
            {copy.title}
          </h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
              <div>
                <label
                  htmlFor="journey-email"
                  className="font-subtitle block text-[10px] tracking-wide text-paper sm:text-xs"
                >
                  {copy.emailLabel}
                </label>
                <input
                  id="journey-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className={fieldClass}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="journey-country"
                  className="font-subtitle block text-[10px] tracking-wide text-paper sm:text-xs"
                >
                  {copy.countryLabel}
                </label>
                <WaitingListCountrySelect
                  id="journey-country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  aria-label={copy.countryLabel}
                  wrapperClassName="mt-1.5"
                  selectClassName={`${fieldClass} appearance-none pr-9`}
                  chevronClassName="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/60"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "Submitting..."}
              className="cta-parchment w-full tracking-wide disabled:opacity-50"
            >
              {status === "Submitting..." ? "Submitting…" : copy.ctaLabel}
            </button>

            {status && status !== "Submitting..." && (
              <p className="text-center text-xs text-paper/90">{status}</p>
            )}
          </form>
        </Card>
      </div>
    </section>
  );
}
