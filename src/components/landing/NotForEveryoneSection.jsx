import { NOT_FOR_EVERYONE_COPY } from "../../config/landingNotForEveryone";

/**
 * Bandeau wine (titre TLWG, lignes TrueTypewriter).
 */
export default function NotForEveryoneSection() {
  const copy = NOT_FOR_EVERYONE_COPY;

  return (
    <section
      className="overflow-hidden bg-paper"
      aria-labelledby="not-for-everyone-heading"
    >
      <div className="bg-wine px-4 py-10 sm:px-6 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <h2
            id="not-for-everyone-heading"
            className="banner-wine-title"
          >
            {copy.title}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 text-center sm:mt-10 sm:grid-cols-3 sm:items-start sm:gap-6 lg:gap-10">
            {copy.lines.map((line, i) => (
              <p
                key={line}
                className={`typo-typewriter-on-wine ${
                  i === 0
                    ? "sm:text-left"
                    : i === 1
                      ? "sm:text-center"
                      : "sm:text-right"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
