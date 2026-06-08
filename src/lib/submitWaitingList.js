import { WAITING_LIST_FORM_ENDPOINT } from "../config/waitingListForm";

/**
 * Envoie l’inscription liste d’attente vers le script Google (Apps Script).
 * Avec `mode: "no-cors"` la réponse est opaque : pas de contrôle HTTP fiable côté client.
 *
 * @param {{ email: string; country: string }} payload
 */
export async function submitWaitingList(payload) {
  const { email, country } = payload;
  await fetch(WAITING_LIST_FORM_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, country }),
  });
}
