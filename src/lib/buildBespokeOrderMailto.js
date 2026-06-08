import { formatEur } from "../config/bespokeProduct";
import { BESPOKE_ORDER_SUBJECT, BESPOKE_ORDER_EMAIL } from "../config/bespokeOrderForm";

export function buildBespokeOrderMailto({
  labelNames,
  journey,
  journeyDate,
  moment,
  mood,
  references,
  email,
  withJournal,
  totalEur,
}) {
  const body = [
    "--- Original Bespoke order ---",
    "",
    "Label name(s):",
    labelNames,
    "",
    "Journey:",
    journey,
    "",
    "Journey date:",
    journeyDate,
    "",
    "--- Scent brief ---",
    "",
    "Moment to preserve:",
    moment,
    "",
    "Atmosphere:",
    mood,
    "",
    "References:",
    references || "(none)",
    "",
    "--- Order ---",
    "",
    `Memory journal: ${withJournal ? "yes" : "no"}`,
    `Total: ${formatEur(totalEur)}`,
    "",
    "Customer email:",
    email,
  ].join("\n");

  const params = new URLSearchParams();
  params.set("subject", BESPOKE_ORDER_SUBJECT);
  params.set("body", body);
  return `mailto:${BESPOKE_ORDER_EMAIL}?${params.toString()}`;
}
