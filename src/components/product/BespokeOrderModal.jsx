import { useCallback, useEffect, useId, useRef, useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import { BESPOKE_PRODUCT, formatEur } from "../../config/bespokeProduct";
import {
  BESPOKE_JOURNEY_FIELDS,
  BESPOKE_ORDER_CONFIRMATION,
  BESPOKE_ORDER_MOMENT_MIN_CHARS,
  BESPOKE_ORDER_STEPS,
  BESPOKE_SCENT_FIELDS,
} from "../../config/bespokeOrderForm";
import { buildBespokeOrderMailto } from "../../lib/buildBespokeOrderMailto";
import {
  FORM_INPUT_CLASS as inputClass,
  FORM_TEXTAREA_CLASS,
} from "../../lib/formInputClass";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function formatJourneyDate(isoDate) {
  if (!isoDate) return "";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${isoDate}T12:00:00`));
  } catch {
    return isoDate;
  }
}

function OrderStepper({ step, steps }) {
  const current = steps[step];

  return (
    <nav aria-label="Order progress" className="mt-5">
      <div className="relative px-2">
        <div
          className="absolute left-1/4 right-1/4 top-3.5 h-px bg-wine/20"
          aria-hidden
        />
        <div
          className="absolute left-1/4 top-3.5 h-px bg-wine transition-[width] duration-300 ease-out"
          style={{ width: step >= 1 ? "50%" : "0%" }}
          aria-hidden
        />
        <ol className="relative grid grid-cols-2">
          {steps.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li key={s.id} className="flex flex-col items-center">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-medium transition-colors duration-300 ${
                    active || done
                      ? "border-wine bg-wine text-paper"
                      : "border-wine/25 bg-paper text-wine/40"
                  }`}
                  aria-current={active ? "step" : undefined}
                >
                  {done ? (
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={`mt-2 text-center font-subtitle text-[10px] uppercase tracking-[0.14em] transition-colors duration-300 ${
                    active
                      ? "text-wine"
                      : done
                        ? "text-ink/75"
                        : "text-ink/40"
                  }`}
                >
                  {s.navLabel}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <p className="sr-only">
        {current.navLabel} — step {step + 1} of {steps.length}
      </p>
    </nav>
  );
}

const initialFormState = () => ({
  labelNames: "",
  journey: "",
  journeyDate: "",
  moment: "",
  mood: BESPOKE_SCENT_FIELDS.mood.options[0],
  references: "",
  email: "",
});

/**
 * Questionnaire 2 étapes — voyage puis senteur.
 * UX : sheet mobile, barre de progression, récap voyage, focus auto, état conservé si fermeture accidentelle.
 */
export default function BespokeOrderModal({
  open,
  onClose,
  withJournal,
  totalEur,
}) {
  const formId = useId();
  const panelRef = useRef(null);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialFormState);
  const [ordered, setOrdered] = useState(false);
  const [attemptedStep, setAttemptedStep] = useState(null);

  const resetAll = useCallback(() => {
    setStep(0);
    setForm(initialFormState());
    setOrdered(false);
    setAttemptedStep(null);
  }, []);

  const handleClose = useCallback(() => {
    if (ordered) resetAll();
    onClose();
  }, [ordered, onClose, resetAll]);

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
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      const focusId =
        step === 0 ? `${formId}-names` : `${formId}-moment`;
      document.getElementById(focusId)?.focus();
      panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
    return () => window.clearTimeout(t);
  }, [open, step, formId]);

  if (!open) return null;

  const journeyValid =
    form.labelNames.trim().length > 0 &&
    form.journey.trim().length > 0 &&
    form.journeyDate.trim().length > 0;

  const momentLen = form.moment.trim().length;
  const scentValid =
    momentLen >= BESPOKE_ORDER_MOMENT_MIN_CHARS && isValidEmail(form.email);

  const current = BESPOKE_ORDER_STEPS[step];
  const product = BESPOKE_PRODUCT;

  function patchForm(updates) {
    setForm((prev) => ({ ...prev, ...updates }));
  }

  function handleContinue(e) {
    e.preventDefault();
    setAttemptedStep(0);
    if (!journeyValid) return;
    setStep(1);
    setAttemptedStep(null);
  }

  function handlePlaceOrder(e) {
    e.preventDefault();
    setAttemptedStep(1);
    if (!scentValid) return;
    const href = buildBespokeOrderMailto({
      labelNames: form.labelNames.trim(),
      journey: form.journey.trim(),
      journeyDate: form.journeyDate,
      moment: form.moment.trim(),
      mood: form.mood,
      references: form.references.trim(),
      email: form.email.trim(),
      withJournal,
      totalEur,
    });
    window.location.href = href;
    setOrdered(true);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
      onClick={handleClose}
    >
      <div
        ref={panelRef}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto bg-paper p-6 shadow-xl sm:max-h-[90vh] sm:rounded-none sm:p-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${formId}-modal-title`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-2 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="font-subtitle text-[10px] uppercase tracking-[0.18em] text-wine/70">
              {product.name} · {formatEur(totalEur)}
              {withJournal ? " · incl. journal" : ""}
            </p>
            {!ordered && (
              <OrderStepper step={step} steps={BESPOKE_ORDER_STEPS} />
            )}
            <h2
              id={`${formId}-modal-title`}
              className="waiting-list-modal-title mt-5"
            >
              {ordered ? BESPOKE_ORDER_CONFIRMATION.title : current.title}
            </h2>
            {!ordered && (
              <p
                id={`${formId}-modal-desc`}
                className="typo-body-lead mt-2 text-sm text-ink/80"
              >
                {current.subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="shrink-0 p-1 text-ink/60 hover:text-ink"
            aria-label="Close"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {ordered ? (
          <div className="py-6 text-center">
            <p className="typo-body-lead text-sm text-ink/88">
              {BESPOKE_ORDER_CONFIRMATION.body}
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="cta-primary mt-8 rounded-none px-10 tracking-wide"
            >
              {BESPOKE_ORDER_CONFIRMATION.closeLabel}
            </button>
          </div>
        ) : (
          <form
            onSubmit={step === 0 ? handleContinue : handlePlaceOrder}
            aria-describedby={`${formId}-modal-desc`}
            noValidate
          >
            {step === 0 && (
              <div className="mt-6 space-y-5">
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
                    value={form.labelNames}
                    onChange={(e) => patchForm({ labelNames: e.target.value })}
                    placeholder={
                      BESPOKE_JOURNEY_FIELDS.labelNames.placeholder
                    }
                    className={inputClass}
                    autoComplete="name"
                    enterKeyHint="next"
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
                    value={form.journey}
                    onChange={(e) => patchForm({ journey: e.target.value })}
                    placeholder={BESPOKE_JOURNEY_FIELDS.journey.placeholder}
                    className={inputClass}
                    enterKeyHint="next"
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
                    value={form.journeyDate}
                    onChange={(e) =>
                      patchForm({ journeyDate: e.target.value })
                    }
                    className={inputClass}
                    enterKeyHint="go"
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="mt-6 space-y-5">
                {journeyValid && (
                  <div className="border border-wine/15 bg-paper/80 px-4 py-3">
                    <p className="font-subtitle text-[10px] uppercase tracking-[0.14em] text-wine/70">
                      Your label
                    </p>
                    <p className="typo-body-lead mt-1 text-sm text-ink">
                      {form.labelNames.trim()} · {form.journey.trim()}
                    </p>
                    <p className="landing-meta-caption mt-0.5">
                      {formatJourneyDate(form.journeyDate)}
                    </p>
                  </div>
                )}

                <div>
                  <label
                    htmlFor={`${formId}-moment`}
                    className="font-subtitle text-[10px] uppercase tracking-[0.16em] text-wine"
                  >
                    {BESPOKE_SCENT_FIELDS.moment.label}
                  </label>
                  <textarea
                    id={`${formId}-moment`}
                    rows={4}
                    value={form.moment}
                    onChange={(e) => patchForm({ moment: e.target.value })}
                    placeholder={BESPOKE_SCENT_FIELDS.moment.placeholder}
                    className={FORM_TEXTAREA_CLASS}
                    enterKeyHint="next"
                    aria-describedby={`${formId}-moment-hint`}
                  />
                  <p
                    id={`${formId}-moment-hint`}
                    className={`landing-meta-caption mt-1.5 ${
                      attemptedStep === 1 &&
                      momentLen < BESPOKE_ORDER_MOMENT_MIN_CHARS
                        ? "text-wine"
                        : ""
                    }`}
                  >
                    {momentLen}/{BESPOKE_ORDER_MOMENT_MIN_CHARS} characters
                    minimum
                  </p>
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
                    value={form.mood}
                    onChange={(e) => patchForm({ mood: e.target.value })}
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
                    value={form.references}
                    onChange={(e) => patchForm({ references: e.target.value })}
                    placeholder={BESPOKE_SCENT_FIELDS.references.placeholder}
                    className={FORM_TEXTAREA_CLASS}
                    enterKeyHint="next"
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
                    inputMode="email"
                    value={form.email}
                    onChange={(e) => patchForm({ email: e.target.value })}
                    placeholder={BESPOKE_SCENT_FIELDS.email.placeholder}
                    className={inputClass}
                    autoComplete="email"
                    enterKeyHint="done"
                    aria-invalid={
                      attemptedStep === 1 &&
                      form.email.length > 0 &&
                      !isValidEmail(form.email)
                    }
                  />
                </div>
              </div>
            )}

            <div className="sticky bottom-0 mt-8 flex gap-3 border-t border-wine/10 bg-paper pt-4 pb-[max(0px,env(safe-area-inset-bottom))]">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setStep(0);
                    setAttemptedStep(null);
                  }}
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
                {step === 0
                  ? BESPOKE_ORDER_STEPS[0].continueLabel
                  : BESPOKE_ORDER_STEPS[1].submitLabel}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
