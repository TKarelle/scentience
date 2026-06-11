import { PHILOSOPHY_SECTION_COPY } from "../../config/landingPhilosophy";
import albumImg from "../../image/album.png";

/**
 * Philosophie — album.png pleine largeur (hauteur auto).
 * Typo alignée design system : titre TLWG, corps Times, citation typewriter.
 */
export default function PhilosophySection() {
  const { title, bodyParagraphs, quote } = PHILOSOPHY_SECTION_COPY;

  return (
    <section
      className="philosophy-section"
      aria-labelledby="philosophy-heading"
    >
      <div className="philosophy-section__stage">
        <div className="philosophy-section__image-wrap">
          <img
            src={albumImg}
            alt="Scentience honeymoon album — bespoke bottle, gold cap, memory journal open on sunlit pages"
            className="philosophy-section__image"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="philosophy-section__pin">
          <div className="philosophy-section__sheet">
            <h2 id="philosophy-heading" className="philosophy-card-title">
              {title}
            </h2>

            <div className="mt-5 space-y-4">
              {bodyParagraphs.map((text, i) => (
                <p key={i} className="typo-body-lead">
                  {text}
                </p>
              ))}
            </div>

            <blockquote className="philosophy-quote philosophy-quote--on-paper">
              <p>{quote.line1}</p>
              {quote.line2 ? <p className="mt-3">{quote.line2}</p> : null}
              {quote.line3 ? <p className="mt-3">{quote.line3}</p> : null}
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
