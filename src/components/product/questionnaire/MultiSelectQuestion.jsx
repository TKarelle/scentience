import { useState } from "react";

export default function MultiSelectQuestion({
  options,
  selected,
  onChange,
  max,
  min = 0,
  searchable = false,
  searchPlaceholder = "Search…",
}) {
  const atMax = max != null && selected.length >= max;

  function toggle(option) {
    if (selected.includes(option)) {
      onChange(selected.filter((o) => o !== option));
      return;
    }
    if (atMax) return;
    onChange([...selected, option]);
  }

  const [query, setQuery] = useState("");
  const filtered =
    searchable && query.trim()
      ? options.filter((o) =>
          o.toLowerCase().includes(query.trim().toLowerCase()),
        )
      : options;

  return (
    <div>
      {max != null && (
        <p className="landing-meta-caption mb-3">
          {selected.length}/{max} selected
          {min > 0 && selected.length < min ? ` · pick at least ${min}` : ""}
        </p>
      )}

      {searchable && (
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="mb-3 w-full border border-wine/20 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-wine/45 focus:ring-1 focus:ring-wine/25"
        />
      )}

      <div className="flex flex-wrap gap-2">
        {filtered.map((option) => {
          const isOn = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isOn}
              disabled={!isOn && atMax}
              onClick={() => toggle(option)}
              className={`border px-3 py-2 text-left font-subtitle text-[10px] uppercase leading-snug tracking-[0.08em] transition-colors ${
                isOn
                  ? "border-wine bg-wine text-paper"
                  : atMax
                    ? "cursor-not-allowed border-wine/10 text-ink/30"
                    : "border-wine/20 text-ink/85 hover:border-wine/40"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
