import { THE_SCIENCE_KEY_STATS } from "../../config/theScienceResearch";

/** Bannière compacte — chiffres clés (wine, faible hauteur). */
export default function ScienceKeyStats() {
  return (
    <section className="science-stats-banner" aria-label="Key figures">
      <div className="science-stats-banner__inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="science-stats-banner__grid">
          {THE_SCIENCE_KEY_STATS.map((stat) => (
            <li key={stat.id} className="science-stats-banner__item">
              <p className="science-stats-banner__value">{stat.value}</p>
              <p className="science-stats-banner__label">{stat.label}</p>
              <p className="science-stats-banner__source">{stat.source}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
