import { useEffect, useId, useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import {
  BESPOKE_JOURNEY_FIELDS,
  BESPOKE_ORDER_STEPS,
  BESPOKE_SCENT_FIELDS,
} from "../../config/bespokeOrderForm";
import { formatEur } from "../../config/bespokeProduct";
import { buildBespokeOrderMailto } from "../../lib/buildBespokeOrderMailto";

const inputClass =
  "mt-1.5 w-full border border-wine/20 bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-wine/45 focus:ring-1 focus:ring-wine/25";

/**
 * Étape 1 : voyage (noms, destination, date) — ancrage émotionnel.
 * Étape 2 : brief senteur + email — composition.
 */
export default function BespokeOrderModal({
  open,
  onClose,
  withJournal,
  totalEur,
}) {
  const formId = useId();
  const [step, setStep] = useState(0);
  const [labelNames, setLabelNames] = useState("");
  const [journey, setJourney] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [moment, setMoment] = useState("");
  const [mood, setMood] = useState(BESPOKE_SCENT_FIELDS.mood.options[0]);
  const [references, setReferences] = useState("");
  const [email, setEmail] = useState("");
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStep(0);
      setLabelNames("");
      setJourney("");
      setJourneyDate("");
      setMoment("");
      setMood(BESPOKE_SCENT_FIELDS.mood.options[0]);
      setReferences("");
      setEmail("");
      setOrdered(false);
    }
  }, [open]);

  if (!open) return null;

  const journeyValid =
    labelNames.trim() && journey.trim() && journeyDate.trim();
  const scentValid =
    moment.trim().length >= 20 && email.trim().includes("@");

  const current = BESPOKE_ORDER_STEPS[step];

  function handlePlaceOrder(e) {
    e.preventDefault();
    if (!scentValid) return;
    const href = buildBespokeOrderMailto({
      labelNames: labelNames.trim(),
      journey: journey.trim(),
      journeyDate,
      moment: moment.trim(),
      mood,
      references: references.trim(),
      email: email.trim(),
      withJournal,
      totalEur,
    });
    window.location.href = href;
    setOrdered(true);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto bg-paper p-8 sm:p-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${formId}-modal-title`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-subtitle text-[10px] uppercase tracking-[0.2em] text-wine/70">
              Step {step + 1} of {BESPOKE_ORDER_STEPS.length}
            </p>
            <h2
              id={`${formId}-modal-title`}
              className="waiting-list-modal-title mt-2"
            >
              {current.title}
            </h2>
            <p className="typo-body-lead mt-2 text-sm text-ink/80">
              {current.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 p-1 text-ink/60 hover:text-ink"
            aria-label="Close"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {ordered ? (
          <div className="py-6 text-center">
            <p className="typo-title text-lg text-wine">Order ready to send</p>
            <p className="typo-body-lead mt-3 text-sm">
              Your email client will open with the order summary. Send it to
              confirm your commission.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="cta-primary mt-8 rounded-none px-10 tracking-wide"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={
              step === 0
                ? (e) => {
                    e.preventDefault();
                    if (journeyValid) setStep(1);
                  }
                : handlePlaceOrder
            }
          >
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor={`${formId}-names`}
                    className="font-subtitle text-[10px] uppercase tracking-[0.16em] text-wine"
                  >
                    {BESPOKE_JOURNEY_FIELDS.labelNames.label}
                  </label>
                  <input
                    id={`${formId}-names`}
                    type="text"
                    required
                    value={labelNames}
                    onChange={(e) => setLabelNames(e.target.value)}
                    placeholder={BESPOKE_JOURNEY_FIELDS.labelNames.placeholder}
                    className={inputClass}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`${formId}-journey`}
                    className="font-subtitle text-[10px] uppercase tracking-[0.16em] text-wine"
                  >
                    {BESPOKE_JOURNEY_FIELDS.journey.label}
                  </label>
                  <input
                    id={`${formId}-journey`}
                    type="text"
                    required
                    value={journey}
                    onChange={(e) => setJourney(e.target.value)}
                    placeholder={BESPOKE_JOURNEY_FIELDS.journey.placeholder}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`${formId}-date`}
                    className="font-subtitle text-[10px] uppercase tracking-[0.16em] text-wine"
                  >
                    {BESPOKE_JOURNEY_FIELDS.journeyDate.label}
                  </label>
                  <input
                    id={`${formId}-date`}
                    type="date"
                    required
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor={`${formId}-moment`}
                    className="font-subtitle text-[10px] uppercase tracking-[0.16em] text-wine"
                  >
                    {BESPOKE_SCENT_FIELDS.moment.label}
                  </label>
                  <textarea
                    id={`${formId}-moment`}
                    required
                    rows={4}
                    minLength={20}
                    value={moment}
                    onChange={(e) => setMoment(e.target.value)}
                    placeholder={BESPOKE_SCENT_FIELDS.moment.placeholder}
                    className={`${inputClass} resize-y`}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`${formId}-mood`}
                    className="font-subtitle text-[10px] uppercase tracking-[0.16em] text-wine"
                  >
                    {BESPOKE_SCENT_FIELDS.mood.label}
                  </label>
                  <select
                    id={`${formId}-mood`}
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className={inputClass}
                  >
                    {BESPOKE_SCENT_FIELDS.mood.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor={`${formId}-refs`}
                    className="font-subtitle text-[10px] uppercase tracking-[0.16em] text-wine"
                  >
                    {BESPOKE_SCENT_FIELDS.references.label}
                  </label>
                  <textarea
                    id={`${formId}-refs`}
                    rows={2}
                    value={references}
                    onChange={(e) => setReferences(e.target.value)}
                    placeholder={BESPOKE_SCENT_FIELDS.references.placeholder}
                    className={`${inputClass} resize-y`}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`${formId}-email`}
                    className="font-subtitle text-[10px] uppercase tracking-[0.16em] text-wine"
                  >
                    {BESPOKE_SCENT_FIELDS.email.label}
                  </label>
                  <input
                    id={`${formId}-email`}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={BESPOKE_SCENT_FIELDS.email.placeholder}
                    className={inputClass}
                    autoComplete="email"
                  />
                </div>
                <p className="landing-muted-text text-center text-xs">
                  Total · {formatEur(totalEur)}
                  {withJournal ? " · incl. journal" : ""}
                </p>
              </div>
            )}

            <div className="mt-8 flex gap-3">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="cta-parchment flex-1 rounded-none tracking-wide"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={step === 0 ? !journeyValid : !scentValid}
                className="cta-primary flex-1 rounded-none tracking-[0.14em] disabled:cursor-not-allowed disabled:opacity-45"
              >
                {step === 0 ? "Continue to scent brief" : "Place order"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
