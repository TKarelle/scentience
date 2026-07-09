import { PHILOSOPHY_SECTION_COPY } from "../../config/landingPhilosophy";
import albumImg from "../../image/album.png";
import PhilosophyTypewriterQuote from "./PhilosophyTypewriterQuote";

/**
 * Philosophie — album.png pleine largeur (hauteur auto).
 */
export default function PhilosophySection() {
  const { title, bodyParagraphs, quote } = PHILOSOPHY_SECTION_COPY;

  return (
    <section
      className="philosophy-section"
      aria-labelledby="philosophy-heading"
    >
      <div className="philosophy-section__quote-bar">
        <PhilosophyTypewriterQuote parts={quote.parts} />
      </div>

      <div className="philosophy-section__stage">
        <div className="philosophy-section__image-wrap">
          <img
            src={albumImg}
            alt="MADELEINE honeymoon album — bespoke bottle, gold cap, memory journal open on sunlit pages"
            className="philosophy-section__image"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="philosophy-section__pin">
          <div className="philosophy-section__sheet">
            <h2 id="philosophy-heading" className="split-media-heading-lg">
              {title}
            </h2>

            <div className="philosophy-section__body">
              {bodyParagraphs.map((text, i) => (
                <p key={i} className="typo-body-lead">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
