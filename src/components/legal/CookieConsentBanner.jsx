import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_KEY,
} from "../../config/cookieConsent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="cookie-banner__shell">
        <div className="cookie-banner__stripe" aria-hidden />

        <div className="cookie-banner__inner">
          <p className="cookie-banner__index" aria-hidden>
            00
          </p>

          <div>
            <p className="cookie-banner__eyebrow">Essential cookies only</p>
            <h2 id="cookie-consent-title" className="cookie-banner__title">
              Your preference, remembered.
            </h2>
            <p id="cookie-consent-desc" className="cookie-banner__body">
              MADELEINE uses a small imprint of cookies to run this site and
              keep your choice — nothing more, nothing sold. Read our{" "}
              <Link to="/terms#cookies" className="cookie-banner__link">
                cookie policy
              </Link>
              .
            </p>
          </div>

          <div className="cookie-banner__actions">
            <button
              type="button"
              onClick={accept}
              className="cookie-banner__cta"
            >
              Accept &amp; continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
