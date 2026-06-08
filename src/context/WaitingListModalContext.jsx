import { createContext, useContext } from "react";

/** Fourni par `SiteChrome` — ouvre le modal liste d’attente depuis n’importe quelle section. */
export const WaitingListModalContext = createContext(null);

export function useWaitingListModal() {
  const ctx = useContext(WaitingListModalContext);
  if (!ctx) {
    throw new Error("useWaitingListModal must be used within SiteChrome");
  }
  return ctx;
}
