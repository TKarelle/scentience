import { Link } from "react-router-dom";
import { BrandMark } from "../typography";
import SectionLogoWatermark from "./SectionLogoWatermark";

export default function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-paper py-12 sm:py-16">
      <SectionLogoWatermark
        variant="black"
        imgClassName="h-auto w-[min(92vw,38rem)] max-h-[min(65vh,26rem)] object-contain opacity-[0.11] brightness-0 invert"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">Footer Navigation</h2>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-12 mb-8">
          <div className="flex-shrink-0">
            <div className="flex flex-col mb-2">
              <BrandMark className="text-xl sm:text-2xl text-paper">
                Scentience
              </BrandMark>
            </div>
            <p className="text-xs text-paper/60 font-light tracking-wide">
              Scent. Event. Memory.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 md:gap-12 flex-1">
            <div>
              <h3 className="font-light mb-4 text-xs uppercase tracking-wider text-paper/80">
                About
              </h3>
              <ul className="space-y-2 text-xs text-paper/60 font-light">
                <li>
                  <Link
                    to="/the-science"
                    className="hover:text-paper transition-colors"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    to="/science/what-is-your-proust-madeleine"
                    className="hover:text-paper transition-colors"
                  >
                    The project proust
                  </Link>
                </li>
                <li>
                  <Link
                    to={{ pathname: "/", hash: "collection" }}
                    className="hover:text-paper transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/the-process"
                    className="hover:text-paper transition-colors"
                  >
                    How it Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-light mb-4 text-xs uppercase tracking-wider text-paper/80">
                Support
              </h3>
              <ul className="space-y-2 text-xs text-paper/60 font-light">
                <li>
                  <Link
                    to={{ pathname: "/", hash: "faq" }}
                    className="hover:text-paper transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:Info@scentience.uk"
                    className="hover:text-paper transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-paper transition-colors">
                    Shipping
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-light mb-4 text-xs uppercase tracking-wider text-paper/80">
                Legal
              </h3>
              <ul className="space-y-2 text-xs text-paper/60 font-light">
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-paper transition-colors"
                  >
                    Terms, privacy &amp; GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className=" pt-6">
          <p className="text-xs text-paper font-light">
            © {new Date().getFullYear()} Scentience . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
