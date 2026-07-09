import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import logoPaperNav from "../../image/logopaper-transparent.png";
import { LANDING_PRIMARY_NAV } from "../../config/landingNav";
import MenuIcon from "../icons/MenuIcon";
import { BrandMark } from "../typography";

function navItemKey(item) {
  return item.hash ? `${item.to}#${item.hash}` : item.to;
}

function NavLinks({ className, linkClassName, onNavigate }) {
  return (
    <ul className={className}>
      {LANDING_PRIMARY_NAV.map((item) => {
        const to = item.hash ? { pathname: item.to, hash: item.hash } : item.to;
        return (
          <li key={navItemKey(item)}>
            <Link to={to} className={linkClassName} onClick={onNavigate}>
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Barre de navigation landing : fond paper fixe, liens TrueTypewriter + tracking, wine.
 * Pre-order accessible uniquement via les CTA de page (pas dans la nav).
 */
export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const linkDesktop =
    "nav-link-landing font-normal text-sm whitespace-nowrap underline-offset-4 hover:underline";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-ink/10 bg-paper">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-6"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          aria-label="MADELEINE — Home"
          className="relative inline-flex shrink-0 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          onClick={closeMobile}
        >
          <span className="relative inline-block">
            <span className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2">
              <img
                src={logoPaperNav}
                alt=""
                width={180}
                height={180}
                className="h-[3.25rem] w-auto max-w-[7rem] object-contain object-center opacity-[0.82] sm:h-[3.65rem] sm:max-w-[7.5rem] sm:opacity-[0.85]"
                decoding="async"
                aria-hidden
              />
            </span>
            <BrandMark
              as="span"
              className="relative z-10 block text-lg tracking-[0.14em] sm:text-xl sm:tracking-[0.16em]"
            >
              MADELEINE
            </BrandMark>
          </span>
        </Link>

        <NavLinks
          className="hidden md:flex items-center gap-6 lg:gap-10"
          linkClassName={linkDesktop}
        />

        <button
          type="button"
          className="md:hidden p-2 text-wine -mr-2"
          aria-expanded={mobileOpen}
          aria-controls="landing-mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </nav>

      {mobileOpen && (
        <div
          id="landing-mobile-nav"
          className="md:hidden border-t border-ink/10 bg-paper px-4 sm:px-6 pb-5 pt-3"
        >
          <NavLinks
            className="flex flex-col gap-1"
            linkClassName="nav-link-landing font-normal text-sm block py-3 border-b border-ink/10 last:border-0"
            onNavigate={closeMobile}
          />
        </div>
      )}
    </header>
  );
}
