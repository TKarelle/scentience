import { BESPOKE_INGREDIENTS } from "../../../config/bespokeQuestionnaire";
import { IMAGE_DIMENSIONS } from "../../../config/imageDimensions";

function HeartIcon({ active }) {
  return (
    <svg
      className={`h-4 w-4 ${active ? "text-wine" : "text-ink/40"}`}
      viewBox="0 0 20 20"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M10 17s-6-4.35-6-8.5a3.5 3.5 0 0 1 6-2.26A3.5 3.5 0 0 1 16 8.5C16 12.65 10 17 10 17z" />
    </svg>
  );
}

function DislikeIcon({ active }) {
  return (
    <svg
      className={`h-4 w-4 ${active ? "text-ink/70" : "text-ink/40"}`}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
    </svg>
  );
}

export default function IngredientPreferenceQuestion({ prefs, onChange }) {
  const loved = Object.values(prefs).filter((v) => v === "love").length;
  const disliked = Object.values(prefs).filter((v) => v === "dislike").length;

  function setPref(id, value) {
    const next = { ...prefs };
    if (next[id] === value) {
      delete next[id];
    } else {
      next[id] = value;
    }
    onChange(next);
  }

  return (
    <div>
      {(loved > 0 || disliked > 0) && (
        <p className="landing-meta-caption mb-4">
          {loved} loved · {disliked} disliked — tap again to clear
        </p>
      )}

      <div className="grid grid-cols-3 gap-x-2 gap-y-5 sm:grid-cols-4 sm:gap-x-3">
        {BESPOKE_INGREDIENTS.map((item) => {
          const state = prefs[item.id] ?? null;
          return (
            <div key={item.id} className="flex flex-col items-center text-center">
              <div
                className={`relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-full border-2 transition-colors sm:h-20 sm:w-20 ${
                  state === "love"
                    ? "border-wine ring-2 ring-wine/25"
                    : state === "dislike"
                      ? "border-ink/25 opacity-55 grayscale"
                      : "border-wine/15"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  width={IMAGE_DIMENSIONS.ingredient.width}
                  height={IMAGE_DIMENSIONS.ingredient.height}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="mt-2 font-subtitle text-[10px] uppercase tracking-[0.1em] text-ink/85">
                {item.label}
              </p>
              <div className="mt-2 flex gap-1">
                <button
                  type="button"
                  aria-label={`Love ${item.label}`}
                  aria-pressed={state === "love"}
                  onClick={() => setPref(item.id, "love")}
                  className={`flex h-8 w-8 items-center justify-center border transition-colors ${
                    state === "love"
                      ? "border-wine bg-wine/10"
                      : "border-wine/15 hover:border-wine/35"
                  }`}
                >
                  <HeartIcon active={state === "love"} />
                </button>
                <button
                  type="button"
                  aria-label={`Dislike ${item.label}`}
                  aria-pressed={state === "dislike"}
                  onClick={() => setPref(item.id, "dislike")}
                  className={`flex h-8 w-8 items-center justify-center border transition-colors ${
                    state === "dislike"
                      ? "border-ink/30 bg-ink/5"
                      : "border-wine/15 hover:border-wine/35"
                  }`}
                >
                  <DislikeIcon active={state === "dislike"} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
