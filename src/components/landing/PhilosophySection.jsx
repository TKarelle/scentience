import { PHILOSOPHY_SECTION_COPY } from "../../config/landingPhilosophy";
import lemonPerfumeImg from "../../image/lemon+perfume.png";
import { Card } from "../ui";

/**
 * Philosophie : fond photo, carte vitrée en haut à gauche (TLWG + Times),
 * citation TrueTypewriter centrée en bas.
 */
export default function PhilosophySection() {
  const { title, bodyParagraphs, quote } = PHILOSOPHY_SECTION_COPY;

  return (
    <section
      className="relative isolate flex min-h-[min(100vh,52rem)] flex-col overflow-hidden bg-ink"
      aria-labelledby="philosophy-heading"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={lemonPerfumeImg}
          alt="Nature morte — parfum Scentience Origine, citron, madeleine et verres sous la lumière du jour"
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/25"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16 lg:px-10 lg:pb-16 lg:pt-20">
        <Card
          as="div"
          tone="paper"
          className="max-w-md p-6 shadow-md sm:p-8 lg:max-w-lg"
        >
          <h2
            id="philosophy-heading"
            className="philosophy-card-title"
          >
            {title}
          </h2>
          <div className="mt-5 space-y-4">
            {bodyParagraphs.map((text, i) => (
              <p key={i} className="typo-body-lead">
                {text}
              </p>
            ))}
          </div>
        </Card>

        <blockquote className="philosophy-quote">
          <p>{quote.line1}</p>
          <p className="mt-3">{quote.line2}</p>
        </blockquote>
      </div>
    </section>
  );
}
