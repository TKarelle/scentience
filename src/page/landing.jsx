import { useState, useEffect } from "react";
import landingImage from "../image/landing.png";
import image1 from "../image/1.png";
import image2 from "../image/3.png";
import image3 from "../image/8.png";
import image4 from "../image/sunset.png";
import image5 from "../image/11.png";
import image6 from "../image/original.png";
import image7 from "../image/ia.png";
import image8 from "../image/artisanal.png";
import image9 from "../image/anniverssaire.png";
import baliImage from "../image/bali.png";
import plageImage from "../image/plage.png";
import sunImage from "../image/sun.png";

export default function ScentienceLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  return (
    <div className="min-h-screen bg-ivory-mist">
      {/* Navbar */}
      <Header setIsModalOpen={setIsModalOpen} />

      <main>
        {/* Hero Section */}
        <HeroSection setIsModalOpen={setIsModalOpen} />

        {/* Story Section */}
        <StorySection setIsModalOpen={setIsModalOpen} />

        {/* How it Works Section */}
        <HowItWorksSection />

        {/* Why Scentience Is Different Section */}
        <WhyScentienceIsDifferentSection />

        {/* Neuropsychological Proof Section */}
        <NeuropsychologicalProofSection />

        {/* Our Collection Section */}
        <OurCollectionSection />

        {/* Your Multi-Sensory Diary Section */}
        <MultiSensoryDiarySection />

        {/* Upgrade to Anniversary Subscription Section */}
        <AnniversarySubscriptionSection />

        {/* Proof & Trust Section */}
        <ProofTrustSection />

        {/* Join the Waiting List Section */}
        <JoinWaitingListSection
          setIsModalOpen={setIsModalOpen}
          emailSent={emailSent}
          setEmailSent={setEmailSent}
        />

        {/* Join the Waiting List Modal */}
        {isModalOpen && (
          <JoinWaitingListModal
            setIsModalOpen={setIsModalOpen}
            emailSent={emailSent}
            setEmailSent={setEmailSent}
          />
        )}

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ---------------- Header/Navbar ---------------- */
function Header({ setIsModalOpen }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white backdrop-blur-md border-b border-slate-taupe/20 shadow-sm"
          : "bg-transparent backdrop-blur-md border-b border-white/20"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span
                className={`text-lg font-serif italic transition-colors ${
                  isScrolled ? "text-text-primary" : "text-white drop-shadow-lg"
                }`}
              >
                Scentience Original
              </span>
              <span
                className={`text-xs font-sans transition-colors ${
                  isScrolled
                    ? "text-steel-blue"
                    : "text-white/90 drop-shadow-md"
                }`}
              >
                x Project Proust
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className={`text-sm font-sans transition-colors ${
                isScrolled
                  ? "text-steel-blue hover:text-text-primary"
                  : "text-white/90 hover:text-white drop-shadow-md"
              }`}
            >
              How it works
            </a>
            <a
              href="#proof"
              className={`text-sm font-sans transition-colors ${
                isScrolled
                  ? "text-steel-blue hover:text-text-primary"
                  : "text-white/90 hover:text-white drop-shadow-md"
              }`}
            >
              Neuropsychological Proof
            </a>
            <a
              href="#collection"
              className={`text-sm font-sans transition-colors ${
                isScrolled
                  ? "text-steel-blue hover:text-text-primary"
                  : "text-white/90 hover:text-white drop-shadow-md"
              }`}
            >
              Our Collection
            </a>
            <a
              href="#diary"
              className={`text-sm font-sans transition-colors ${
                isScrolled
                  ? "text-steel-blue hover:text-text-primary"
                  : "text-white/90 hover:text-white drop-shadow-md"
              }`}
            >
              Diary
            </a>
            <a
              href="#faq"
              className={`text-sm font-sans transition-colors ${
                isScrolled
                  ? "text-steel-blue hover:text-text-primary"
                  : "text-white/90 hover:text-white drop-shadow-md"
              }`}
            >
              FAQ
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              className={`text-sm font-sans transition-colors underline underline-offset-4 ${
                isScrolled
                  ? "text-steel-blue hover:text-text-primary"
                  : "text-white/90 hover:text-white drop-shadow-md"
              }`}
            >
              Join the list
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <IconMenu
              className={`w-6 h-6 transition-colors ${
                isScrolled ? "text-text-primary" : "text-white drop-shadow-lg"
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden mt-4 pb-4 space-y-3 border-t pt-4 backdrop-blur-md p-4 ${
              isScrolled
                ? "border-slate-taupe/20 bg-white/95"
                : "border-white/20 bg-black/30 rounded-lg"
            }`}
          >
            <a
              href="#how-it-works"
              className={`block text-sm font-sans py-2 transition-colors ${
                isScrolled
                  ? "text-steel-blue hover:text-text-primary"
                  : "text-white/90 hover:text-white"
              }`}
            >
              How it works
            </a>
            <a
              href="#proof"
              className={`block text-sm font-sans py-2 transition-colors ${
                isScrolled
                  ? "text-steel-blue hover:text-text-primary"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Neuropsychological Proof
            </a>
            <a
              href="#collection"
              className={`block text-sm font-sans py-2 transition-colors ${
                isScrolled
                  ? "text-steel-blue hover:text-text-primary"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Our Collection
            </a>
            <a
              href="#diary"
              className={`block text-sm font-sans py-2 transition-colors ${
                isScrolled
                  ? "text-steel-blue hover:text-text-primary"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Diary
            </a>
            <a
              href="#faq"
              className={`block text-sm font-sans py-2 transition-colors ${
                isScrolled
                  ? "text-steel-blue hover:text-text-primary"
                  : "text-white/90 hover:text-white"
              }`}
            >
              FAQ
            </a>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full px-5 py-2 bg-soft-beige text-text-primary rounded-lg font-medium hover:bg-amber-clay hover:text-white transition-all duration-200"
            >
              Join the list
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

/* ---------------- Hero Section ---------------- */
function HeroSection({ setIsModalOpen }) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={landingImage}
          alt="Personalized perfume Scentience - Custom fragrance for creating olfactory memories and honeymoon memories"
          className="w-full h-full object-cover"
        />
        {/* Overlay pour améliorer le contraste et l'accessibilité */}
        <div
          className="absolute inset-0 bg-black/30 sm:bg-black/25"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 w-full">
        <div className="max-w-2xl space-y-6 sm:space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl  font-serif italic text-white leading-tight drop-shadow-lg">
            CAPTURE YOUR NEXT MEMORY
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/95 font-light tracking-wide drop-shadow-md">
            SCENT. EVENT. MEMORY
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
            className="mt-8 text-sm sm:text-base font-light text-white/90 hover:text-white underline underline-offset-4 transition-colors inline-block"
          >
            Create your own perfume →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Story Section ---------------- */
function StorySection({ setIsModalOpen }) {
  return (
    <section className="w-full bg-white">
      <div className="grid md:grid-cols-2 min-h-[80vh] sm:min-h-[90vh]">
        {/* Image - Left Side */}
        <div className="relative w-full h-full min-h-[50vh] md:min-h-[80vh]">
          <img
            src={image1}
            alt="Scentience personalized perfume - Custom fragrance for olfactory memory creation"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content - Right Side */}
        <div className="flex items-center justify-center p-12 sm:p-16 lg:p-20 xl:p-24">
          <div className="max-w-xl space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-text-primary leading-tight font-light">
              Scentience crafts the scent you’ll wear for your next moment. That
              scent will become the memory.
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-light">
              Designed for your weddings, your honeymoons, your holidays, your
              next milestones.
            </p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              className="text-xs sm:text-sm font-light text-text-secondary hover:text-text-primary underline underline-offset-4 transition-colors inline-block"
            >
              Create your own perfume →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it Works Section ---------------- */
function HowItWorksSection() {
  const steps = [
    {
      number: "Step 1",
      title: "Chose your bespoke or Scentience Original Perfume",
      image: image2,
    },
    {
      number: "Step 2",
      title:
        "Create your memory. LIVE and let your subconscious form an association between scent and your special event.",
      image: image4,
    },
    {
      number: "Step 3",
      title: "Relive the moment. Relieve stress and travel back in time.",
      image: image3,
    },
  ];

  return (
    <section id="how-it-works" className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-text-primary text-center mb-20 sm:mb-24 font-light tracking-wider">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-20 lg:gap-24">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col">
              {/* Image */}
              <div className="aspect-[3/4] mb-8 overflow-hidden">
                <img
                  src={step.image}
                  alt={`${step.number} - ${step.title} - Personalized perfume creation process - Custom fragrance for memories`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-sm sm:text-base font-sans text-text-primary font-light tracking-wider uppercase">
                  {step.number}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                  {step.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why Scentience Is Different Section ---------------- */
function WhyScentienceIsDifferentSection() {
  const cards = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "No recreation",
      description: "We do not replicate old memories, we create new ones",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
      title: "Milestone Curation",
      description:
        "Each scent is intentionally paired with the moment you’re about to live",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      title: "Olfactory Memory Science",
      description: "Powered by the cognitive science of scent & recall.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Timeless Selection",
      description: "Only iconic, meaningful, emotion-driven fragrances.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "For What's Coming",
      description: "Life chapters deserve their own scent.",
    },
  ];

  return (
    <section className="bg-ivory-mist py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-text-primary text-center mb-20 sm:mb-24 font-light tracking-wider">
          Why Scentience Is Different
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white border border-[#ECECEC] rounded-sm p-8 lg:p-6 xl:p-8 space-y-6 transition-all duration-500 hover:-translate-y-1 opacity-0 animate-fade-in"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Icon */}
              <div className="text-steel-blue/60">{card.icon}</div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-sm sm:text-base font-sans text-text-primary font-medium tracking-wide">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Neuropsychological Proof Section ---------------- */
function NeuropsychologicalProofSection() {
  return (
    <section id="proof" className="bg-frosted-silver w-full">
      <div className="grid md:grid-cols-2 min-h-[80vh] sm:min-h-[90vh]">
        {/* Content - Left Side */}
        <div className="flex items-center justify-center p-12 sm:p-16 lg:p-20 xl:p-24">
          <div className="max-w-xl space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-text-primary font-light">
              Neuropsychological Proof
            </h2>
            <div className="space-y-6 text-sm sm:text-base text-text-secondary leading-relaxed font-light">
              <p>
                Memories evoked by smells are{" "}
                <strong className="text-text-primary font-normal">
                  more vivid, emotional and longer lasting
                </strong>
                , than those caused by other sensory modalities. (Chu and
                Downes, 2002)
              </p>
              <p>
                That's because the olfactory lobe has a{" "}
                <strong className="text-text-primary font-normal">
                  privileged neural connection to the amygdala
                </strong>
                , responsible for emotional and memory processing and storage.
              </p>
              <p>
                Humans possess an under-appreciated{" "}
                <strong className="text-text-primary font-normal">
                  evolutionary superpower
                </strong>
                ; unlock yours now.
              </p>
            </div>
            <div className="pt-4">
              <a
                href="#"
                className="text-xs sm:text-sm font-light text-text-secondary hover:text-text-primary underline underline-offset-4 transition-colors inline-block"
              >
                Create your own perfume →
              </a>
            </div>
          </div>
        </div>

        {/* Image - Right Side */}
        <div className="relative w-full h-full min-h-[50vh] md:min-h-[80vh]">
          <img
            src={image5}
            alt="Neuropsychological proof - Science of olfactory memory and emotional memory - Personalized perfume Scentience"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Our Collection Section ---------------- */
function OurCollectionSection() {
  const products = [
    {
      title: "Scentience Original",
      price: "£65",
      type: "Chose from Scentience Collection of curated memory blends",
      image: image6,
    },
    {
      title: "AI Bespoke",
      price: "£160",
      type: "Complete our online questionnaire ",
      image: image7,
    },
    {
      title: "Artisanal Bespoke",
      price: "£230",
      type: "created uniquely for you by our independent artisanal perfumery experts",
      image: image8,
    },
  ];

  return (
    <section id="collection" className="bg-ivory-mist py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-text-primary text-center mb-20 sm:mb-24 font-light tracking-wider">
          Our Collection
        </h2>
        <div className="grid md:grid-cols-3 gap-20 lg:gap-24">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col">
              {/* Product Image */}
              <div className="aspect-[3/4] mb-8 overflow-hidden">
                <img
                  src={product.image}
                  alt={`${product.title} - Personalized perfume Scentience - Custom fragrance for memories`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col space-y-3">
                <h3 className="text-base sm:text-lg font-sans text-text-primary font-normal tracking-wide uppercase">
                  {product.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary font-light tracking-wide">
                  {product.type}
                </p>
                <p className="text-lg sm:text-xl font-sans text-text-primary font-light mt-2">
                  {product.price}
                </p>
                <a
                  href="#"
                  className="text-xs sm:text-sm text-text-secondary font-light underline underline-offset-4 hover:text-text-primary transition-colors mt-4 w-fit"
                >
                  Add to cart
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Anniversary Subscription Section ---------------- */
function AnniversarySubscriptionSection() {
  return (
    <section className="bg-white w-full">
      <div className="grid md:grid-cols-2 min-h-[80vh] sm:min-h-[90vh]">
        {/* Image - Left Side */}
        <div className="relative w-full h-full min-h-[50vh] md:min-h-[80vh]">
          <img
            src={image9}
            alt="Anniversary subscription - Personalized perfume Scentience for celebrating precious moments"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content - Right Side */}
        <div className="flex items-center justify-center p-12 sm:p-16 lg:p-20 xl:p-24">
          <div className="max-w-xl space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-text-primary font-light">
              Upgrade to Anniversary Subscription
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-light">
              10ml of your scent delivered before every anniversary
            </p>
            <a
              href="#"
              className="text-xs sm:text-sm font-light text-text-secondary hover:text-text-primary underline underline-offset-4 transition-colors inline-block"
            >
              Create your ownperfume →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Proof & Trust Section ---------------- */
function ProofTrustSection() {
  const trustItems = [
    "IFRA/UE/UK compliant; allergens listed",
    "Responsible Person + DIP on file",
    "Batch tracking for every bottle",
    "GDPR: pseudonymized scent profile; deletion on request",
  ];

  return (
    <section className="bg-ivory-mist py-24 sm:py-32 lg:py-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-text-primary text-center mb-20 sm:mb-24 font-light tracking-wider">
          Proof & Trust
        </h2>
        <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 mb-16">
          {trustItems.map((item, index) => (
            <div key={index} className="border-t border-slate-taupe/20 pt-4">
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                {item}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center border-t border-slate-taupe/20 pt-12">
          <p className="text-sm sm:text-base text-text-secondary italic leading-relaxed max-w-2xl mx-auto font-light">
            "Smell is a potent wizard that transports you across thousands of
            miles and all the years you have lived" ~ Helen Keller
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Join Waiting List Section ---------------- */
function JoinWaitingListSection({ setIsModalOpen, emailSent, setEmailSent }) {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbydhxy1INQb-GE3u39ROajVOek9mtfzlAVf1zv9VP7TEL1sJYoBnG9QvBCn6qwPiVXmyQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, country }),
        }
      );

      setStatus("You're on the list! ✨");
      setEmailSent(true);
      setEmail("");
      setCountry("");

      setTimeout(() => {
        setEmailSent(false);
        setStatus("");
      }, 3000);
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  };

  return (
    <section className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-text-primary text-center mb-12 sm:mb-16 font-light tracking-wider">
          Join the waiting List.
        </h2>

        {emailSent ? (
          <div className="text-center py-8">
            <p className="text-sm text-text-secondary font-light">
              Thank you! We'll be in touch soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email-join" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-join"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  aria-label="Email address"
                  className="px-0 py-3 border-b border-slate-taupe/20 focus:outline-none focus:border-slate-taupe/40 text-text-primary bg-transparent text-sm font-light w-full"
                />
              </div>
              <div className="relative">
                <label htmlFor="country-join" className="sr-only">
                  Country
                </label>
                <select
                  id="country-join"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  aria-label="Country"
                  className="w-full px-0 py-3 border-b border-slate-taupe/20 focus:outline-none focus:border-slate-taupe/40 text-text-primary appearance-none bg-transparent text-sm font-light"
                >
                  <option value="">Country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                  <option value="IT">Italy</option>
                  <option value="ES">Spain</option>
                  <option value="AU">Australia</option>
                  <option value="OTHER">Other</option>
                </select>
                <IconChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-blue pointer-events-none" />
              </div>
            </div>
            <button
              type="submit"
              disabled={status === "Submitting..."}
              className="w-full px-6 py-3 bg-soft-beige text-text-primary text-sm font-light hover:bg-soft-beige/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "Submitting..."
                ? "Submitting..."
                : "Get early access"}
            </button>
            {status && (
              <p className="text-sm text-text-secondary font-light text-center">
                {status}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

/* ---------------- Join Waiting List Modal ---------------- */
function JoinWaitingListModal({ setIsModalOpen, emailSent, setEmailSent }) {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbydhxy1INQb-GE3u39ROajVOek9mtfzlAVf1zv9VP7TEL1sJYoBnG9QvBCn6qwPiVXmyQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, country }),
        }
      );

      setStatus("You're on the list! ✨");
      setEmailSent(true);
      setEmail("");
      setCountry("");

      setTimeout(() => {
        setIsModalOpen(false);
        setEmailSent(false);
        setStatus("");
      }, 2000);
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="bg-white p-12 sm:p-16 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-xl sm:text-2xl font-serif italic text-text-primary font-light">
            Join the waiting List.
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-steel-blue hover:text-text-primary transition-colors"
            aria-label="Close"
          >
            <IconClose className="w-5 h-5" />
          </button>
        </div>

        {emailSent ? (
          <div className="text-center py-12">
            <p className="text-sm text-text-secondary font-light">
              Thank you! We'll be in touch soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email-modal" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-modal"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  aria-label="Email address"
                  className="px-4 py-3 border-b border-slate-taupe/20 focus:outline-none focus:border-slate-taupe/40 text-text-primary bg-transparent text-sm w-full"
                />
              </div>
              <div className="relative">
                <label htmlFor="country-modal" className="sr-only">
                  Country
                </label>
                <select
                  id="country-modal"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  aria-label="Country"
                  className="w-full px-4 py-3 border-b border-slate-taupe/20 focus:outline-none focus:border-slate-taupe/40 text-text-primary appearance-none bg-transparent text-sm"
                >
                  <option value="">Country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                  <option value="IT">Italy</option>
                  <option value="ES">Spain</option>
                  <option value="AU">Australia</option>
                  <option value="OTHER">Other</option>
                </select>
                <IconChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-blue pointer-events-none" />
              </div>
            </div>
            <button
              type="submit"
              disabled={status === "Submitting..."}
              className="w-full px-6 py-3 bg-soft-beige text-text-primary text-sm font-light hover:bg-soft-beige/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "Submitting..."
                ? "Submitting..."
                : "Get early access"}
            </button>
            {status && (
              <p className="text-sm text-text-secondary font-light text-center">
                {status}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

/* ---------------- Multi-Sensory Diary Section ---------------- */
function MultiSensoryDiarySection() {
  return (
    <section id="diary" className="bg-mist-blue py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[60%_40%] gap-16 lg:gap-20">
          {/* Content */}
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-text-primary font-light">
              Your multi-sensory diary
            </h2>
            <div className="space-y-6 text-sm sm:text-base text-text-secondary leading-relaxed font-light">
              <p>
                Research shows that combining a scent memory with music, food,
                and other stimuli increases emotional recall.
              </p>
              <p>
                You can store your multisensory experience in our secure digital
                diary.
              </p>
            </div>

            {/* Client Testimonial */}
            <div className="mt-12">
              <div className="bg-ivory-mist/30 backdrop-blur-sm p-8 border border-slate-taupe/10">
                <div className="space-y-6">
                  <p className="text-sm sm:text-base text-text-primary leading-relaxed font-light italic font-serif">
                    "I offered this to my wife for our honeymoon, and it was
                    incredible. The way the scent captured our memories is
                    beyond words."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-soft-beige/40 flex items-center justify-center">
                      <span className="text-text-primary text-xs font-light font-serif">
                        T
                      </span>
                    </div>
                    <p className="text-xs text-steel-blue font-light">
                      Thomas, 30 ans
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diary Card */}
          <div className="bg-white p-8">
            <div className="flex gap-6 mb-8 border-b border-slate-taupe/20 pb-4">
              <button className="text-xs font-light text-text-primary border-b border-text-primary pb-2">
                Your Memories
              </button>
              <button className="text-xs font-light text-steel-blue hover:text-text-primary">
                Create New Memory
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-base sm:text-lg font-serif italic text-text-primary font-light">
                    Bali Honeymoon
                  </h3>
                  <span className="text-xs text-steel-blue font-light">
                    06/06/2025
                  </span>
                </div>
              </div>
              <div>
                <label className="text-xs font-light text-steel-blue mb-2 block">
                  Description
                </label>
                <p className="text-xs text-text-secondary leading-relaxed font-light">
                  We spent an unforgettable week on our honeymoon in Bali. Some
                  of the best moments included relaxing on beautiful beaches,
                  exploring lush rice terraces, and visiting the Uluwatu Temple.
                </p>
              </div>
              <div>
                <label className="text-xs font-light text-steel-blue mb-2 block">
                  Photos
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={plageImage}
                      alt="Bali beach - Honeymoon olfactory memory - Personalized perfume Scentience"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={baliImage}
                      alt="Bali honeymoon - Memory perfume souvenir - Custom fragrance for olfactory memories"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={sunImage}
                      alt="Sunset memory - Emotional memory perfume - Personalized fragrance Scentience"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-light text-steel-blue mb-2 block">
                  Songs
                </label>
                <p className="text-xs text-text-secondary font-light">
                  Island in the Sun - Weezer
                </p>
              </div>
              <div>
                <label className="text-xs font-light text-steel-blue mb-2 block">
                  Favorite Foods
                </label>
                <p className="text-xs text-text-secondary font-light">
                  Nasi goreng, mie goreng, satay
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ Section ---------------- */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Why don't I use my own perfume?",
      answer:
        "Using a dedicated scent creates a unique memory association that's exclusive to your special moment. This ensures the fragrance becomes intrinsically linked to your honeymoon memories.",
    },
    {
      question: "What if I forget what the perfume was?",
      answer:
        "All your scent profiles are stored securely in your account. You can access your fragrance information at any time through your multi-sensory diary.",
    },
    {
      question: "Is it guaranteed to work?",
      answer:
        "While individual experiences may vary, research shows that scent-memory associations are one of the strongest memory triggers. We provide guidance on how to create these associations effectively.",
    },
    {
      question: "Is it safe for use with children?",
      answer:
        "Our perfumes follow IFRA/UE/UK compliance standards. We recommend patch testing and consulting with a healthcare professional if you have concerns about children using fragrances.",
    },
    {
      question: "Could I use this for my gap year?",
      answer:
        "Absolutely! Scentience is perfect for any significant life moment you want to preserve - whether it's a honeymoon, gap year, anniversary, or any other memorable experience.",
    },
  ];

  return (
    <section id="faq" className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-text-primary text-center mb-20 sm:mb-24 font-light tracking-wider">
          Frequently Asked Questions
        </h2>
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-t border-slate-taupe/20 last:border-b border-slate-taupe/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-0 py-6 text-left flex items-center justify-between transition-colors"
              >
                <span className="text-sm sm:text-base font-light text-text-primary">
                  {faq.question}
                </span>
                <IconChevronDown
                  className={`w-4 h-4 text-steel-blue transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-0 pb-6">
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-steel-blue text-ivory-mist py-20 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">Footer Navigation</h2>
        {/* Brand Section */}
        <div className="mb-16 sm:mb-20">
          <div className="flex flex-col mb-4">
            <span className="text-xl sm:text-2xl font-serif italic text-ivory-mist font-light">
              Scentience
            </span>
            <span className="text-xs font-sans text-ivory-mist/70 font-light mt-1">
              x Project Proust
            </span>
          </div>
          <p className="text-xs text-ivory-mist/60 font-light tracking-wide">
            Scent. Event. Memory.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12 mb-16 sm:mb-20">
          <div>
            <h3 className="font-light mb-6 text-xs uppercase tracking-wider text-ivory-mist/80">
              About
            </h3>
            <ul className="space-y-3 text-xs text-ivory-mist/60 font-light">
              <li>
                <a
                  href="#proof"
                  className="hover:text-ivory-mist transition-colors"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#collection"
                  className="hover:text-ivory-mist transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-ivory-mist transition-colors"
                >
                  How it Works
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-light mb-6 text-xs uppercase tracking-wider text-ivory-mist/80">
              Support
            </h3>
            <ul className="space-y-3 text-xs text-ivory-mist/60 font-light">
              <li>
                <a
                  href="#faq"
                  className="hover:text-ivory-mist transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ivory-mist transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ivory-mist transition-colors">
                  Shipping
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-light mb-6 text-xs uppercase tracking-wider text-ivory-mist/80">
              Legal
            </h3>
            <ul className="space-y-3 text-xs text-ivory-mist/60 font-light">
              <li>
                <a href="#" className="hover:text-ivory-mist transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ivory-mist transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ivory-mist transition-colors">
                  GDPR
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-ivory-mist/20 pt-8">
          <p className="text-xs text-ivory-mist/50 font-light">
            © {new Date().getFullYear()} Scentience x Project Proust. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Icons ---------------- */
function IconScent({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M12 2C8 6 4 8 4 12c0 4 4 6 8 6s8-2 8-6c0-4-4-6-8-10z" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function IconMenu({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function IconArrowRight({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function IconImage({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

function IconClose({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconCheck({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconChevronDown({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
