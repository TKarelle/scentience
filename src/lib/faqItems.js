/** Normalise les entrées FAQ (`answerParagraphs` ou chaîne `answer`). */
export function normalizeFaqItems(items) {
  return items.map((item, index) => {
    const id =
      item.id != null && item.id !== "" ? item.id : `faq-${index}`;
    const answerParagraphs =
      Array.isArray(item.answerParagraphs) && item.answerParagraphs.length > 0
        ? item.answerParagraphs
        : typeof item.answer === "string"
          ? [item.answer]
          : [];
    return { id, question: item.question, answerParagraphs };
  });
}
