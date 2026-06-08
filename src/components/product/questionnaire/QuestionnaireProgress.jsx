import { BESPOKE_QUESTIONNAIRE_STEPS } from "../../../config/bespokeQuestionnaire";

/**
 * Progression minimaliste — cercles uniquement, pas de labels ni pourcentage.
 */
export default function QuestionnaireProgress({ stepIndex }) {
  const total = BESPOKE_QUESTIONNAIRE_STEPS.length;
  const current = BESPOKE_QUESTIONNAIRE_STEPS[stepIndex];

  return (
    <nav
      className="questionnaire-dots"
      aria-label={`Step ${stepIndex + 1} of ${total}`}
    >
      <ol
        className="flex items-center justify-center gap-2 sm:gap-2.5"
        role="list"
      >
        {BESPOKE_QUESTIONNAIRE_STEPS.map((step, i) => {
          const done = i < stepIndex;
          const active = i === stepIndex;
          return (
            <li key={step.id}>
              <span
                className={`questionnaire-dots__dot block rounded-full transition-all duration-300 ${
                  active
                    ? "questionnaire-dots__dot--active"
                    : done
                      ? "questionnaire-dots__dot--done"
                      : "questionnaire-dots__dot--todo"
                }`}
                aria-current={active ? "step" : undefined}
                title={step.shortLabel}
              />
            </li>
          );
        })}
      </ol>
      <p className="sr-only">
        {current.shortLabel} — step {stepIndex + 1} of {total}
      </p>
    </nav>
  );
}
