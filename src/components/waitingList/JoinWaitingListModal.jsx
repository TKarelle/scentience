import { useEffect, useState } from "react";
import { submitWaitingList } from "../../lib/submitWaitingList";
import CloseIcon from "../icons/CloseIcon";
import WaitingListCountrySelect from "./WaitingListCountrySelect";

/**
 * Liste d’attente — overlay (Hero, Craft, Shared stories, header mobile).
 * `open` : affichage ; `onClose` : fermeture (backdrop, Escape, succès).
 */
export default function JoinWaitingListModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
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
      setEmail("");
      setCountry("");
      setStatus("");
      setEmailSent(false);
    }
  }, [open]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      await submitWaitingList({ email, country });

      setStatus("You're on the list! ✨");
      setEmailSent(true);
      setEmail("");
      setCountry("");

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch {
      setStatus("Something went wrong. Please try again.");
      setTimeout(() => setStatus(""), 3000);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto bg-paper p-12 sm:p-16"
        role="dialog"
        aria-modal="true"
        aria-labelledby="waiting-list-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <h2
            id="waiting-list-modal-title"
            className="waiting-list-modal-title"
          >
            Join the waiting List.
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-mist transition-colors hover:text-ink"
            aria-label="Close"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {emailSent ? (
          <div className="py-12 text-center">
            <p className="text-sm font-light text-ink/70">
              Thank you! We&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email-modal" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-modal"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  autoComplete="email"
                  aria-label="Email address"
                  className="w-full border-b border-ink/20 bg-transparent px-4 py-3 text-sm text-ink focus:border-ink/40 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="country-modal" className="sr-only">
                  Country
                </label>
                <WaitingListCountrySelect
                  id="country-modal"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  selectClassName="w-full appearance-none border-b border-ink/20 bg-transparent px-4 py-3 text-sm text-ink focus:border-ink/40 focus:outline-none"
                  chevronClassName="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-mist"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={status === "Submitting..."}
              className="cta-primary w-full tracking-wide disabled:opacity-50"
            >
              {status === "Submitting..." ? "Submitting..." : "Get early access"}
            </button>
            {status && (
              <p className="text-center text-sm font-light text-ink/70">
                {status}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
