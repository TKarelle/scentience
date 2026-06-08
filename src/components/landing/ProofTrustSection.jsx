import { PROOF_TRUST_COPY } from "../../config/landingProofTrust";

export default function ProofTrustSection() {
  const copy = PROOF_TRUST_COPY;

  return (
    <section className="bg-paper py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="landing-section-title">{copy.title}</h2>
        <div className="mb-16 grid gap-8 sm:grid-cols-2 sm:gap-12">
          {copy.items.map((item, index) => (
            <div key={index} className="border-t border-ink/20 pt-4">
              <p className="landing-muted-text">{item}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-ink/20 pt-12 text-center">
          <blockquote className="mx-auto max-w-3xl">
            <p className="proof-trust-quote">{copy.quoteLine1}</p>
            <p className="text-xs font-light tracking-wide text-mist sm:text-sm">
              {copy.quoteAttribution}
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
