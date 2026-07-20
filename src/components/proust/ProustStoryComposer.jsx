import { useCallback, useId, useState } from "react";
import { Link } from "react-router-dom";
import { buildProustStoryMailtoHref, avatarInitial } from "../../lib/proustStoryMailto";

/**
 * Composer bas de fil — partage rapide type commentaire social.
 */
export default function ProustStoryComposer({
  form,
  storyTag,
  termsLink,
  className = "",
}) {
  const formId = useId();
  const [name, setName] = useState("");
  const [scent, setScent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [consent, setConsent] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [focused, setFocused] = useState(false);

  const excerptMin = form.excerptMinChars ?? 20;
  const excerptMax = form.excerptMaxChars ?? 280;
  const excerptLen = excerpt.length;
  const canSubmit =
    consent &&
    name.trim().length > 0 &&
    scent.trim().length > 0 &&
    excerpt.trim().length >= excerptMin &&
    excerptLen <= excerptMax;

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setAttemptedSubmit(true);
      if (!canSubmit) return;
      const href = buildProustStoryMailtoHref({
        emailTo: form.emailTo,
        subject: form.emailSubject,
        name: name.trim(),
        scent: scent.trim(),
        excerpt: excerpt.trim(),
        consent,
        storyTag,
      });
      window.location.href = href;
    },
    [canSubmit, consent, excerpt, form.emailSubject, form.emailTo, name, scent, storyTag],
  );

  const avatarLabel = name.trim() ? avatarInitial(name) : "?";

  return (
    <div
      id="proust-contribute"
      className={`proust-composer scroll-mt-28 ${className}`.trim()}
    >
      <div className="proust-composer__intro">
        <h3 className="proust-composer__title">{form.title}</h3>
        {form.subtitle ? (
          <p className="proust-composer__subtitle">{form.subtitle}</p>
        ) : null}
      </div>

      <form
        onSubmit={handleSubmit}
        className={`proust-composer__card${focused ? " proust-composer__card--active" : ""}`}
        noValidate
        aria-labelledby={`${formId}-heading`}
      >
        <h4 id={`${formId}-heading`} className="sr-only">
          {form.title}
        </h4>

        <div className="proust-composer__row">
          <div className="proust-composer__avatar" aria-hidden>
            {avatarLabel}
          </div>

          <div className="proust-composer__main">
            <label htmlFor={`${formId}-story`} className="proust-composer__prompt">
              {form.composerPrompt}
            </label>
            <div className="proust-composer__textarea-wrap">
              <textarea
                id={`${formId}-story`}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value.slice(0, excerptMax))}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                rows={5}
                placeholder={form.fields.story.placeholder}
                enterKeyHint="done"
                className="proust-composer__textarea"
                aria-describedby={`${formId}-story-hint`}
              />
              <p
                id={`${formId}-story-hint`}
                className={`proust-composer__count proust-composer__count--inline ${
                  attemptedSubmit && excerpt.trim().length < excerptMin
                    ? "proust-composer__count--warn"
                    : excerptLen >= excerptMax
                      ? "proust-composer__count--warn"
                      : ""
                }`}
                aria-live="polite"
              >
                {excerptLen}/{excerptMax}
              </p>
            </div>

            <div className="proust-composer__inline-fields">
              <div className="proust-composer__field">
                <label htmlFor={`${formId}-name`} className="proust-composer__field-label">
                  {form.fields.name.label}
                </label>
                <input
                  id={`${formId}-name`}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={form.fields.name.placeholder}
                  autoComplete="name"
                  enterKeyHint="next"
                  className="proust-composer__input"
                />
              </div>
              <div className="proust-composer__field">
                <label htmlFor={`${formId}-scent`} className="proust-composer__field-label">
                  {form.fields.scent.label}
                </label>
                <input
                  id={`${formId}-scent`}
                  type="text"
                  value={scent}
                  onChange={(e) => setScent(e.target.value)}
                  placeholder={form.fields.scent.placeholder}
                  enterKeyHint="next"
                  className="proust-composer__input"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="proust-composer__footer">
          <label htmlFor={`${formId}-consent`} className="proust-composer__consent">
            <input
              id={`${formId}-consent`}
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="proust-composer__checkbox"
            />
            <span>
              {form.fields.consent}{" "}
              <Link to={termsLink.to} className="proust-composer__terms-link">
                {termsLink.label}
              </Link>
            </span>
          </label>

          <div className="proust-composer__actions">
            <button
              type="submit"
              disabled={!canSubmit}
              className="proust-composer__submit disabled:cursor-not-allowed disabled:opacity-40"
            >
              {form.submitLabel}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
