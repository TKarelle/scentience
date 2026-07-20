import { formatPrice } from "../../../config/bespokeProduct";
import {
  formatInfluenceRanks,
  formatIngredientPrefs,
  formatJourneyDate,
} from "../../../lib/questionnaireState";

function SummaryBlock({ label, children }) {
  return (
    <div className="questionnaire-summary__block">
      <p className="questionnaire-summary__label">{label}</p>
      <div className="questionnaire-summary__value">{children}</div>
    </div>
  );
}

function SummaryList({ items, empty = "—" }) {
  if (!items?.length) {
    return <p className="typo-body-lead text-sm text-ink/55">{empty}</p>;
  }
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item} className="typo-body-lead text-sm text-ink">
          · {item}
        </li>
      ))}
    </ul>
  );
}

export default function QuestionnaireSummary({
  answers,
  productName,
  totalGbp,
  withJournal,
}) {
  const { loved, disliked } = formatIngredientPrefs(answers.ingredientPrefs);
  const ranks = formatInfluenceRanks(answers.influenceRanks)
    .split("\n")
    .filter(Boolean);
  const dateLabel = formatJourneyDate(answers.journeyDate);

  return (
    <div className="questionnaire-summary space-y-4">
      <SummaryBlock label="Your journey">
        <p className="typo-body-lead text-sm text-ink">
          {answers.labelNames.trim()}
        </p>
        <p className="typo-body-lead mt-1 text-sm text-ink">
          {answers.journey.trim()}
        </p>
        {dateLabel ? (
          <p className="landing-meta-caption mt-1">{dateLabel}</p>
        ) : null}
      </SummaryBlock>

      <SummaryBlock label="What influences your fragrance most">
        <SummaryList items={ranks} />
      </SummaryBlock>

      <SummaryBlock label="Destination">
        <SummaryList items={answers.countries} />
      </SummaryBlock>

      <SummaryBlock label="Emotions">
        <SummaryList items={answers.emotions} />
      </SummaryBlock>

      <SummaryBlock label="Meaningful experiences">
        <SummaryList items={answers.experiences} />
      </SummaryBlock>

      <SummaryBlock label="Fragrance families you enjoy">
        <SummaryList items={answers.familiesEnjoy} />
      </SummaryBlock>

      <SummaryBlock label="Families to avoid">
        <SummaryList
          items={answers.familiesAvoid}
          empty="None selected"
        />
      </SummaryBlock>

      <SummaryBlock label="Ingredient notes">
        <p className="typo-body-lead text-sm text-ink">
          <span className="text-wine">Love:</span> {loved}
        </p>
        <p className="typo-body-lead mt-1 text-sm text-ink">
          <span className="text-ink/70">Dislike:</span> {disliked}
        </p>
      </SummaryBlock>

      <SummaryBlock label="Your order">
        <p className="typo-body-lead text-sm text-ink">
          {productName} · {formatPrice(totalGbp)}
          {withJournal ? " · incl. memory journal" : ""}
        </p>
      </SummaryBlock>
    </div>
  );
}
