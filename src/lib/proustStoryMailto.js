export function buildProustStoryMailtoHref({
  emailTo,
  subject,
  name,
  scent,
  excerpt,
  consent,
  storyTag,
}) {
  const body = [
    "--- Project Proust story (same fields as site cards) ---",
    "",
    "Name (footer, wine line):",
    name || "(not provided)",
    "",
    "Scent (caption under name):",
    scent || "(not provided)",
    "",
    "Story (italic quote between curly quotes on the card):",
    excerpt || "(not provided)",
    "",
    "Label on every card (fixed on site):",
    storyTag,
    "",
    "Consent:",
    consent ? "yes" : "no",
  ].join("\n");

  const params = new URLSearchParams();
  params.set("subject", subject);
  params.set("body", body);
  return `mailto:${emailTo}?${params.toString()}`;
}

export function avatarInitial(name) {
  const trimmed = (name || "?").trim();
  return trimmed.charAt(0).toUpperCase() || "?";
}

/** Plus récent en premier ; sans date → fin de liste. */
export function sortStoriesByDate(stories) {
  return [...stories].sort((a, b) => {
    const aTime = a.postedAt ? Date.parse(a.postedAt) : 0;
    const bTime = b.postedAt ? Date.parse(b.postedAt) : 0;
    return bTime - aTime;
  });
}
