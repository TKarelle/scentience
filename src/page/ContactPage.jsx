import { useState } from "react";
import { Link } from "react-router-dom";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import { CONTACT_COPY } from "../config/contactCopy";
import { CONTACT_PAGE_SEO, absoluteUrl } from "../config/seoMeta";
import { trackEvent } from "../lib/analytics";
import { FORM_INPUT_CLASS, FORM_LABEL_CLASS } from "../lib/formInputClass";
import { submitContactForm } from "../lib/submitContact";

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

export default function ContactPage() {
  const copy = CONTACT_COPY;
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setStatus("sending");
    trackEvent("contact_submit", { location: "/contact" });

    try {
      await submitContactForm(form);
      setStatus("success");
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus("idle");
      setError(err.message || copy.errorGeneric);
    }
  }

  return (
    <SiteChrome>
      <SyncPageSeo
        title={CONTACT_PAGE_SEO.title}
        description={CONTACT_PAGE_SEO.description}
        keywords={CONTACT_PAGE_SEO.keywords}
        canonicalUrl={absoluteUrl(CONTACT_PAGE_SEO.canonicalPath)}
      />
      <main className="contact-page">
        <div className="contact-page__inner">
          <header className="contact-page__header text-center">
            <p className="contact-page__eyebrow">{copy.kicker}</p>
            <h1 className="contact-page__title">{copy.title}</h1>
            <p className="contact-page__intro">{copy.intro}</p>
          </header>

          {status === "success" ? (
            <div className="contact-page__success" role="status">
              <p className="contact-page__eyebrow">{copy.success.eyebrow}</p>
              <h2 className="contact-page__title contact-page__title--sm">
                {copy.success.title}
              </h2>
              <p className="contact-page__intro">{copy.success.body}</p>
              <Link to="/" className="contact-page__back">
                Back to home
              </Link>
            </div>
          ) : (
            <form
              className="contact-page__form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="contact-page__form-grid">
                <div>
                  <label htmlFor="contact-name" className={FORM_LABEL_CLASS}>
                    {copy.form.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    disabled={status === "sending"}
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className={FORM_INPUT_CLASS}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={FORM_LABEL_CLASS}>
                    {copy.form.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    disabled={status === "sending"}
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className={FORM_INPUT_CLASS}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className={FORM_LABEL_CLASS}>
                  {copy.form.subjectLabel}
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  disabled={status === "sending"}
                  value={form.subject}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, subject: e.target.value }))
                  }
                  className={FORM_INPUT_CLASS}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className={FORM_LABEL_CLASS}>
                  {copy.form.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={6}
                  disabled={status === "sending"}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  className={`${FORM_INPUT_CLASS} min-h-[10rem] resize-y`}
                />
              </div>

              {error && (
                <p className="contact-page__error" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="cta-pill contact-page__submit w-full disabled:opacity-50"
              >
                {status === "sending"
                  ? copy.form.sendingLabel
                  : copy.form.submitLabel}
              </button>
            </form>
          )}
        </div>
      </main>
    </SiteChrome>
  );
}
