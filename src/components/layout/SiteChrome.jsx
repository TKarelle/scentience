import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

/**
 * En-tête et pied de page — commun landing + pages éditoriales.
 */
export default function SiteChrome({ children }) {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
