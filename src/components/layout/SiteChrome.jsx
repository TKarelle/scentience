import { useCallback, useMemo, useState } from "react";
import { WaitingListModalContext } from "../../context/WaitingListModalContext";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import JoinWaitingListModal from "../waitingList/JoinWaitingListModal";

/**
 * En-tête, pied de page et modal liste d’attente — commun landing + pages éditoriales.
 */
export default function SiteChrome({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openWaitingList = useCallback(() => setIsModalOpen(true), []);

  const modalContext = useMemo(
    () => ({ openWaitingList }),
    [openWaitingList],
  );

  return (
    <WaitingListModalContext.Provider value={modalContext}>
      <div className="min-h-screen bg-paper">
        <SiteHeader onOpenWaitingList={openWaitingList} />
        {children}
        <SiteFooter />
        <JoinWaitingListModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </WaitingListModalContext.Provider>
  );
}
