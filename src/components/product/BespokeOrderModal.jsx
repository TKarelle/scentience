import { useCallback, useEffect, useId, useRef, useState } from "react";
import { BESPOKE_PRODUCT } from "../../config/bespokeProduct";
import { BESPOKE_ORDER_CONFIRMATION } from "../../config/bespokeOrderForm";
import {
  BESPOKE_DESTINATION_COUNTRIES,
  BESPOKE_QUESTIONNAIRE_STEPS,
} from "../../config/bespokeQuestionnaire";
import { trackEvent } from "../../lib/analytics";
import { createCheckoutSession } from "../../lib/createCheckoutSession";
import { FORM_INPUT_CLASS, FORM_LABEL_CLASS } from "../../lib/formInputClass";
import {
  createInitialQuestionnaireAnswers,
  isQuestionnaireStepValid,
} from "../../lib/questionnaireState";
import IngredientPreferenceQuestion from "./questionnaire/IngredientPreferenceQuestion";
import MultiSelectQuestion from "./questionnaire/MultiSelectQuestion";
import QuestionnaireOrderStrip from "./questionnaire/QuestionnaireOrderStrip";
import QuestionnaireProgress from "./questionnaire/QuestionnaireProgress";
import QuestionnaireSummary from "./questionnaire/QuestionnaireSummary";
import RankImportanceQuestion from "./questionnaire/RankImportanceQuestion";

/**
 * Questionnaire Original Bespoke — une question par écran, progression visible.
 */
export default function BespokeOrderModal({
  open,
  onClose,
  withJournal,
  totalEur,
}) {
  const formId = useId();
  const bodyRef = useRef(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(createInitialQuestionnaireAnswers);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [attempted, setAttempted] = useState(false);

  const resetAll = useCallback(() => {
    setStep(0);
    setAnswers(createInitialQuestionnaireAnswers());
    setCheckoutLoading(false);
    setCheckoutError("");
    setAttempted(false);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

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
    const stepType = BESPOKE_QUESTIONNAIRE_STEPS[step]?.type;
    const t = window.setTimeout(() => {
      if (step === 0) {
        document.getElementById(`${formId}-names`)?.focus();
      } else if (stepType === "contact") {
        document.getElementById(`${formId}-email`)?.focus();
      }
      bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      setAttempted(false);
    }, 40);
    return () => window.clearTimeout(t);
  }, [open, step, formId]);

  if (!open) return null;

  const current = BESPOKE_QUESTIONNAIRE_STEPS[step];
  const product = BESPOKE_PRODUCT;
  const stepValid = isQuestionnaireStepValid(step, answers);
  const isLast = step === BESPOKE_QUESTIONNAIRE_STEPS.length - 1;

  function patchAnswers(updates) {
    setAnswers((prev) => ({ ...prev, ...updates }));
  }

  async function goNext() {
    setAttempted(true);
    if (!stepValid) return;
    if (isLast) {
      setCheckoutError("");
      setCheckoutLoading(true);
      trackEvent("cta_checkout_start", { location: "questionnaire" });
      try {
        const { url } = await createCheckoutSession({
          answers,
          withJournal,
          totalGbp: totalEur,
        });
        window.location.href = url;
      } catch (err) {
        setCheckoutLoading(false);
        setCheckoutError(
          err.message || "Checkout could not be started. Please try again.",
        );
      }
      return;
    }
    setStep((s) => s + 1);
    setAttempted(false);
  }

  function goBack() {
    if (step === 0) return;
    setStep((s) => s - 1);
    setAttempted(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    goNext();
  }

  function renderStep() {
    switch (current.type) {
      case "rank":
        return (
          <RankImportanceQuestion
            ranks={answers.influenceRanks}
            onChange={(influenceRanks) => patchAnswers({ influenceRanks })}
          />
        );
      case "countries":
        return (
          <MultiSelectQuestion
            options={BESPOKE_DESTINATION_COUNTRIES}
            selected={answers.countries}
            onChange={(countries) => patchAnswers({ countries })}
            min={1}
            searchable
            searchPlaceholder="Search countries…"
          />
        );
      case "multi":
        return (
          <MultiSelectQuestion
            options={current.options}
            selected={
              current.id === "q3-emotions"
                ? answers.emotions
                : current.id === "q4-experiences"
                  ? answers.experiences
                  : current.id === "q5-families-enjoy"
                    ? answers.familiesEnjoy
                    : answers.familiesAvoid
            }
            onChange={(value) => {
              if (current.id === "q3-emotions") patchAnswers({ emotions: value });
              else if (current.id === "q4-experiences")
                patchAnswers({ experiences: value });
              else if (current.id === "q5-families-enjoy")
                patchAnswers({ familiesEnjoy: value });
              else patchAnswers({ familiesAvoid: value });
            }}
            min={current.min}
            max={current.max}
          />
        );
      case "ingredients":
        return (
          <IngredientPreferenceQuestion
            prefs={answers.ingredientPrefs}
            onChange={(ingredientPrefs) => patchAnswers({ ingredientPrefs })}
          />
        );
      case "journey":
        return (
          <div className="space-y-5">
            <div>
              <label htmlFor={`${formId}-names`} className={FORM_LABEL_CLASS}>
                Name(s) for the label
              </label>
              <input
                id={`${formId}-names`}
                type="text"
                value={answers.labelNames}
                onChange={(e) =>
                  patchAnswers({ labelNames: e.target.value })
                }
                placeholder="e.g. Elena & Marco"
                autoComplete="name"
                enterKeyHint="next"
                className={FORM_INPUT_CLASS}
              />
            </div>
            <div>
              <label htmlFor={`${formId}-journey`} className={FORM_LABEL_CLASS}>
                Journey
              </label>
              <input
                id={`${formId}-journey`}
                type="text"
                value={answers.journey}
                onChange={(e) => patchAnswers({ journey: e.target.value })}
                placeholder="e.g. Honeymoon — Amalfi Coast"
                enterKeyHint="next"
                className={FORM_INPUT_CLASS}
              />
            </div>
            <div>
              <label htmlFor={`${formId}-date`} className={FORM_LABEL_CLASS}>
                Date of the journey
              </label>
              <input
                id={`${formId}-date`}
                type="date"
                value={answers.journeyDate}
                onChange={(e) =>
                  patchAnswers({ journeyDate: e.target.value })
                }
                enterKeyHint="next"
                className={FORM_INPUT_CLASS}
              />
            </div>
          </div>
        );
      case "summary":
        return (
          <QuestionnaireSummary
            answers={answers}
            productName={product.name}
            totalEur={totalEur}
            withJournal={withJournal}
          />
        );
      case "contact":
        return (
          <div>
            <label htmlFor={`${formId}-email`} className={FORM_LABEL_CLASS}>
              Email for order confirmation
            </label>
            <input
              id={`${formId}-email`}
              type="email"
              inputMode="email"
              value={answers.email}
              onChange={(e) => patchAnswers({ email: e.target.value })}
              placeholder="you@example.com"
              autoComplete="email"
              enterKeyHint="done"
              className={FORM_INPUT_CLASS}
              aria-invalid={attempted && !stepValid}
            />
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
      onClick={handleClose}
    >
      <div
        className="flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-none bg-paper shadow-xl sm:max-h-[90dvh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${formId}-modal-title`}
        onClick={(e) => e.stopPropagation()}
      >
        <QuestionnaireOrderStrip
          productName={product.name}
          totalEur={totalEur}
          withJournal={withJournal}
          onClose={handleClose}
        />

        <div className="shrink-0 border-b border-wine/10 px-6 pb-5 pt-5 sm:px-10 sm:pt-6">
          <QuestionnaireProgress stepIndex={step} />

          <h2
            id={`${formId}-modal-title`}
            className="waiting-list-modal-title mt-5"
          >
            {checkoutLoading ? BESPOKE_ORDER_CONFIRMATION.title : current.title}
          </h2>
          <p
            id={`${formId}-modal-desc`}
            className="typo-body-lead mt-2 text-sm text-ink/80"
          >
            {checkoutLoading
              ? BESPOKE_ORDER_CONFIRMATION.body
              : current.subtitle}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
          noValidate
          aria-describedby={`${formId}-modal-desc`}
        >
          <div
            ref={bodyRef}
            className="questionnaire-modal__body min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5 sm:px-10 sm:py-6"
          >
            <div key={current.id} className="questionnaire-step-enter">
              {renderStep()}
            </div>
            {checkoutError && (
              <p
                className="mt-4 text-sm text-wine"
                role="alert"
              >
                {checkoutError}
              </p>
            )}
          </div>

          <div className="shrink-0 flex gap-3 border-t border-wine/10 bg-paper px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-10">
            {step > 0 && (
              <button
                type="button"
                onClick={goBack}
                disabled={checkoutLoading}
                className="cta-pill flex-1 disabled:opacity-45"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={!stepValid || checkoutLoading}
              className="cta-pill flex-1 disabled:cursor-not-allowed disabled:opacity-45"
            >
              {checkoutLoading
                ? "Redirecting…"
                : isLast
                  ? "Pay & pre-order"
                  : current.type === "summary"
                    ? "Looks good"
                    : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
