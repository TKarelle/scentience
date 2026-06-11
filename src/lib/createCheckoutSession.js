const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) || "";

/**
 * Crée une session Stripe Checkout et renvoie l’URL de redirection.
 */
export async function createCheckoutSession({ answers, withJournal, totalGbp }) {
  const res = await fetch(`${API_BASE}/api/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers, withJournal, totalGbp }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Checkout could not be started.");
  }

  if (!data.url) {
    throw new Error("Checkout URL missing from server response.");
  }

  return data;
}

export async function fetchCheckoutSession(sessionId) {
  const params = new URLSearchParams({ session_id: sessionId });
  const res = await fetch(`${API_BASE}/api/checkout/session?${params}`);

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Unable to load your order.");
  }

  return data;
}
