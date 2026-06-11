import { THE_SCIENCE_PEER_RESEARCH } from "../../config/theScienceResearch";

/** Liste éditoriale — études peer-reviewed (effet Proust). */
export default function SciencePeerResearchSection() {
  const { title, studies } = THE_SCIENCE_PEER_RESEARCH;

  return (
    <section
      className="science-peer-research"
      aria-labelledby="science-peer-research-heading"
    >
      <div className="science-peer-research__inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="science-peer-research__header">
          <h2
            id="science-peer-research-heading"
            className="science-peer-research__title"
          >
            {title}
          </h2>
        </header>

        <ol className="science-peer-research__list">
          {studies.map((study) => (
            <li key={study.id} className="science-peer-research__row">
              <p className="science-peer-research__year">{study.year}</p>

              <div className="science-peer-research__body">
                {study.href ? (
                  <a
                    href={study.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="science-peer-research__study-title"
                  >
                    {study.title}
                  </a>
                ) : (
                  <p className="science-peer-research__study-title">
                    {study.title}
                  </p>
                )}
                <p className="science-peer-research__description">
                  {study.description}
                </p>
              </div>

              <p className="science-peer-research__category">{study.category}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
