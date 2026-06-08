import { BESPOKE_INFLUENCE_FACTORS } from "../../../config/bespokeQuestionnaire";

const RANKS = [1, 2, 3];

export default function RankImportanceQuestion({ ranks, onChange }) {
  const taken = new Set(
    Object.values(ranks).filter((r) => r != null),
  );

  function setRank(factorId, rank) {
    const next = { ...ranks };
    for (const key of Object.keys(next)) {
      if (next[key] === rank) next[key] = null;
    }
    next[factorId] = rank;
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {BESPOKE_INFLUENCE_FACTORS.map((factor) => (
        <div
          key={factor.id}
          className={`border px-4 py-3 transition-colors ${
            ranks[factor.id] != null
              ? "border-wine/35 bg-wine/[0.04]"
              : "border-wine/15"
          }`}
        >
          <p className="typo-title text-xs font-normal sm:text-sm">
            {factor.title}
          </p>
          <p className="typo-body-lead mt-1 text-xs leading-relaxed text-ink/75">
            {factor.hint}
          </p>
          <div className="mt-3 flex gap-2">
            {RANKS.map((rank) => {
              const selected = ranks[factor.id] === rank;
              const disabled = taken.has(rank) && !selected;
              return (
                <button
                  key={rank}
                  type="button"
                  disabled={disabled}
                  onClick={() => setRank(factor.id, rank)}
                  className={`min-w-[3rem] flex-1 border py-2 font-subtitle text-[10px] uppercase tracking-[0.12em] transition-colors ${
                    selected
                      ? "border-wine bg-wine text-paper"
                      : disabled
                        ? "cursor-not-allowed border-wine/10 text-ink/25"
                        : "border-wine/25 text-wine hover:border-wine/45"
                  }`}
                >
                  {rank === 1 ? "1st" : rank === 2 ? "2nd" : "3rd"}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
