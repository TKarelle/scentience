import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import landingImage from "../image/landing.png";
import image1 from "../image/1.png";
import image2 from "../image/3.png";
import image3 from "../image/8.png";
import baliImage from "../image/bali.png";
import plageImage from "../image/plage.png";
import sunImage from "../image/sun.png";
import memoriesImage from "../image/memories.png";
import parisImage from "../image/paris.png";

// Données d'exemple pour les articles
const articles = {
  "bali-honeymoon": {
    id: "bali-honeymoon",
    title: "Bali Honeymoon",
    subtitle: "When Scent Becomes Memory",
    author: "Sophie Laurent",
    date: "June 15, 2025",
    category: "Memory Stories",
    heroImage: baliImage,
    excerpt: "A journey through the olfactory memories of a honeymoon in Bali, where each fragrance became a portal to moments of pure bliss.",
    content: [
      {
        type: "paragraph",
        text: "The first spray of 'Bali Sunset' hit my wrist as we stepped onto the beach in Seminyak. It was our first evening together as husband and wife, and I wanted this moment—this exact moment—to be preserved forever. Not just in photographs, but in something more visceral, more immediate.",
      },
      {
        type: "paragraph",
        text: "Scent has a way of bypassing the rational mind. It doesn't ask permission. It doesn't wait for you to remember. It simply transports you. And as the warm, floral notes of frangipani and jasmine mingled with the salty air, I knew I was creating something sacred.",
      },
      {
        type: "image",
        src: plageImage,
        caption: "The beach at Seminyak, where our olfactory journey began.",
      },
      {
        type: "paragraph",
        text: "Each morning, I would apply the same fragrance. The ritual became as important as the scent itself. Wake up. Open the bottle. Inhale. Apply. And then, step into the day. By the end of our week in Bali, the fragrance had become inseparable from the experience.",
      },
      {
        type: "quote",
        text: "A scent is not just a fragrance—it's a time machine. One spray, and I'm back on that beach, watching the sun set over the Indian Ocean.",
        author: "Sophie Laurent",
      },
      {
        type: "paragraph",
        text: "Now, months later, when stress creeps in or when I simply want to remember, I reach for that bottle. The moment I smell it, I'm there again. Not just remembering, but reliving. The warmth of the sun, the sound of the waves, the feeling of his hand in mine.",
      },
      {
        type: "image",
        src: sunImage,
        caption: "Sunset memories captured in fragrance.",
      },
      {
        type: "paragraph",
        text: "This is the power of olfactory memory. It's not nostalgia—it's presence. It's not recollection—it's re-experience. And it's available to anyone willing to create the association.",
      },
    ],
  },
  "paris-first-kiss": {
    id: "paris-first-kiss",
    title: "Paris, First Kiss",
    subtitle: "The Scent of a Moment",
    author: "Thomas Dubois",
    date: "May 22, 2025",
    category: "Memory Stories",
    heroImage: parisImage,
    excerpt: "How a bespoke fragrance became the anchor for a memory that would define a relationship.",
    content: [
      {
        type: "paragraph",
        text: "Paris in spring. The city was alive with possibility, and so were we. I had commissioned a bespoke fragrance for this trip—something that would capture the essence of what I hoped would be a transformative week.",
      },
      {
        type: "paragraph",
        text: "The perfumer had crafted something extraordinary: notes of bergamot and blackcurrant, grounded in vetiver and patchouli. It was sophisticated, yet approachable. Complex, yet immediate. Much like the city itself.",
      },
      {
        type: "quote",
        text: "I didn't know it then, but I was creating a memory anchor. Every spray was a commitment to presence, to being fully in the moment.",
        author: "Thomas Dubois",
      },
      {
        type: "paragraph",
        text: "The first kiss happened under the Eiffel Tower at sunset. I remember the exact moment—the way the light hit her face, the sound of distant traffic, the feeling of her hand on my arm. And I remember the scent, because I had been wearing it all day.",
      },
      {
        type: "paragraph",
        text: "Now, whenever I wear that fragrance, I'm not just reminded of Paris. I'm transported there. The memory is so vivid, so complete, that it feels less like remembering and more like time travel.",
      },
    ],
  },
  "why-we-always-wanted-to-bottle-our-memories": {
    id: "why-we-always-wanted-to-bottle-our-memories",
    title: "Why we always wanted to bottle our memories",
    subtitle: "I once looked at a photo of a trip I loved and felt absolutely nothing.",
    author: "Scentience Editorial",
    date: "February 12, 2026",
    category: "Editorial",
    heroImage: memoriesImage,
    content: [
    
      {
        type: "quote",
        text: "Nothing brings to life again a forgotten memory like fragrance.",
        author: "Christopher Poindexter",
        isOpening: true,
      },
      {
        type: "video",
        src: "https://youtu.be/rydKd5BUBsI", // URL YouTube
        quote: "I wish there could be an invention that bottled up memories like perfume.",
        author: "Daphne du Maurier, Rebecca",
        poster: image2, // Image de prévisualisation
        isYouTube: true,
      },
      {
        type: "paragraph",
        text: "Long perceived as a romantic reverie, this sentence—uttered in Rebecca by Daphne du Maurier—reveals today an intuition of a troubling accuracy. It speaks neither of nostalgia nor of conservation. It formulates a much more precise desire: that of reliving the moment in its original purity, rather than cultivating its mourning.",
      },

      {
        type: "paragraph",
        text: "For decades, modernity believed that the image alone would fulfill this function. We delegated our memory to the retina and the lens, accumulating evidence as if the quantity of pixels could compensate for the loss of emotional density and archive what we called memories.",
      },
      {
        type: "paragraph",
        text: "And yet, something resisted…",
      },
      {
        type: "paragraph",
        text: "Images preserved the forms, but allowed the breath to evaporate. By freezing the scene, the texture was lost. Facing a photo of a beloved trip, it is rarely the moment that returns to us, but its melancholy: we no longer feel the instant; we only measure its absence. As if memory had accepted to be shown, but refused to be fully transmitted.",
      },
      {
        type: "paragraph",
        text: "Memory was never designed to be purely visual. It lacked an element capable of speaking directly to the body. This is where photography stops and Scent-Mapping begins.",
      },
      {
        type: "paragraph",
        text: "This gesture transforms scent into an intimate technology. It is no longer about documenting a moment, but about how to seal it. The goal is not to remember time, but to prevent it from wearing out.",
      },
      {
        type: "paragraph",
        text: "Sophisticated travelers practice what insiders call Memory Anchoring. The protocol is of a disarming simplicity:",
      },
      {
        type: "heading",
        text: "The virgin molecule",
        level: 3,
      },
      {
        type: "paragraph",
        text: "A unique fragrance is chosen—unknown, never worn before, devoid of any past.",
      },
      {
        type: "heading",
        text: "Imprinting",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Throughout the journey, it becomes the only admitted olfactory footprint. No other perfume, no interference.",
      },
      {
        type: "heading",
        text: "The sillage",
        level: 3,
      },
      {
        type: "paragraph",
        text: "The scent accompanies every moment without being noticed, slowly soaking into the body, the silk of the clothes, the very air of the days.",
      },
      {
        type: "paragraph",
        text: "Upon return, the bottle is closed. It is no longer worn in public. It exits the circuit of the everyday. It ceases to be an object and becomes a ritual.",
      },
      {
        type: "paragraph",
        text: "Months, sometimes years later, in those blurred moments where life has thickened, where time has smoothed out the emotions. A single breath is enough. The effect is immediate, and always the same. Even before the mind can analyze the top or base notes, the body recognizes.",
      },
      {
        type: "paragraph",
        text: "Tenderness returns, raw, without the effort of thought. The salt-crusted skin of an evening on a silent island. The particular quality of the attention we gave to one another. Scent does not trigger a memory in a narrative sense; it projects us back into it.",
      },
      {
        type: "paragraph",
        text: "What we feel then is not nostalgia, but an impression of a \"first time\" rediscovered. Time ceases to pass. The emotion was never dulled; it was simply put on hold, preserved from the wear and tear of the gaze.",
      },
      {
        type: "paragraph",
        text: "Thus, scent-mapping does not seek to archive the past but to re-inhabit it. It finally answers that ancient desire formulated in Rebecca: no longer merely to preserve memory as a visible object, but to keep it as a living experience.",
      },
      {
        type: "paragraph",
        text: "It is in this space—invisible, silent, profoundly intimate—that Scentience carves its vision: That of dethroning the image in favor of sensation, and finally putting our memories into a bottle.",
      },
      {
        type: "signature",
        text: "Scentience — As it felt",
      },
    ],
  },
};

export default function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement
    setTimeout(() => {
      const foundArticle = articles[slug];
      if (foundArticle) {
        setArticle(foundArticle);
      }
      setIsLoading(false);
    }, 300);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory-mist flex items-center justify-center">
        <div className="text-steel-blue font-light">Loading...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-ivory-mist flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif italic text-text-primary mb-4">
            Article not found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-steel-blue hover:text-text-primary underline underline-offset-4"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-mist">
      {/* Header */}
      <Header navigate={navigate} />

      {/* Hero Section - Ultra Luxueux */}
      <section className="relative w-full h-[45vh] min-h-[380px] max-h-[450px] overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay élégant avec gradient raffiné */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/45" />
          {/* Vignette subtile pour effet cinématographique */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/25" />
          {/* Bordure subtile en bas */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 sm:pb-14">
            <div className="max-w-3xl">
              <div className="mb-2.5">
                <span className="text-[10px] sm:text-xs text-white/60 font-light tracking-[0.2em] uppercase">
                  {article.category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white leading-[1.1] mb-2 font-light tracking-[-0.01em]">
                {article.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-2xl">
                {article.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        {/* Article Meta */}
        <div className="mb-8 pb-4 border-b border-slate-taupe/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <p className="text-sm text-text-secondary font-light">
                By <span className="text-text-primary">{article.author}</span>
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary font-light">
                {article.date}
              </p>
            </div>
          </div>
        </div>

        {/* Excerpt - Only show if exists */}
        {article.excerpt && (
          <div className="mb-12 pb-6 border-b border-slate-taupe/10">
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-light italic max-w-3xl">
              {article.excerpt}
            </p>
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-lg max-w-none mt-8">
          {article.content.map((block, index) => {
            if (block.type === "paragraph") {
              // Détecter si c'est le premier paragraphe après une citation ou vidéo
              const prevBlock = index > 0 ? article.content[index - 1] : null;
              const isFirstParagraph = index === 0 || 
                (prevBlock && (prevBlock.type === "quote" || prevBlock.type === "video"));
              
              return (
                <p
                  key={index}
                  className={`text-sm sm:text-base text-text-secondary leading-[1.85] font-light ${
                    isFirstParagraph ? 'mb-10 first-paragraph' : 'mb-7'
                  }`}
                  style={{
                    letterSpacing: '0.015em',
                  }}
                >
                  {isFirstParagraph && (
                    <span 
                      className="float-left text-5xl sm:text-6xl font-serif text-text-primary leading-[0.85] mr-2 mt-1 font-light"
                      style={{ fontFamily: 'Canela, Cormorant Garamond, serif' }}
                    >
                      {block.text.charAt(0)}
                    </span>
                  )}
                  <span className={isFirstParagraph ? 'block' : ''}>
                    {isFirstParagraph ? block.text.slice(1).trim() : block.text}
                  </span>
                </p>
              );
            }
            if (block.type === "quote") {
              // Opening quote with special styling
              if (block.isOpening) {
                return (
                  <blockquote
                    key={index}
                    className="my-6 py-4 text-center"
                  >
                    <div className="max-w-3xl mx-auto">
                      <p className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-text-primary leading-relaxed mb-2 font-light">
                        "{block.text}"
                      </p>
                      <p className="text-xs text-steel-blue font-light tracking-wide">
                        — {block.author}
                      </p>
                    </div>
                  </blockquote>
                );
              }
              // Regular quote
              return (
                <blockquote
                  key={index}
                  className="border-l-4 border-soft-beige pl-8 py-6 my-12"
                >
                  <p className="text-xl sm:text-2xl font-serif italic text-text-primary leading-relaxed mb-4 font-light">
                    "{block.text}"
                  </p>
                  <p className="text-sm text-steel-blue font-light">
                    — {block.author}
                  </p>
                </blockquote>
              );
            }
            if (block.type === "heading") {
              const level = block.level || 3;
              const HeadingTag = level === 2 ? "h2" : level === 3 ? "h3" : "h4";
              const Component = HeadingTag;
              return (
                <Component
                  key={index}
                  className="text-xl sm:text-2xl font-serif text-text-primary font-light mt-12 mb-6"
                >
                  {block.text}
                </Component>
              );
            }
            if (block.type === "signature") {
              return (
                <div key={index} className="mt-16 pt-8 border-t border-slate-taupe/20">
                  <p className="text-lg sm:text-xl font-serif italic text-text-primary font-light text-right">
                    {block.text}
                  </p>
                </div>
              );
            }
            if (block.type === "image") {
              return (
                <figure key={index} className="my-16">
                  <div className="aspect-[16/10] overflow-hidden mb-4">
                    <img
                      src={block.src}
                      alt={block.caption || ""}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {block.caption && (
                    <figcaption className="text-sm text-steel-blue font-light italic text-center">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }
            if (block.type === "video") {
              // Convertir l'URL YouTube en format embed si nécessaire
              const getYouTubeEmbedUrl = (url) => {
                if (!url) return null;
                if (url.includes('youtube.com/embed/')) return url;
                if (url.includes('youtu.be/')) {
                  const videoId = url.split('youtu.be/')[1]?.split('?')[0];
                  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
                }
                if (url.includes('youtube.com/watch?v=')) {
                  const videoId = url.split('watch?v=')[1]?.split('&')[0];
                  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
                }
                return null;
              };

              const youtubeEmbedUrl = getYouTubeEmbedUrl(block.src);

              return (
                <figure key={index} className="my-24 -mx-4 sm:-mx-8 lg:-mx-16">
                  <div className="relative aspect-[16/9] overflow-hidden bg-black group">
                    {/* Bordure élégante */}
                    <div className="absolute inset-0 border border-white/10 z-10 pointer-events-none" />
                    <div className="absolute inset-[1px] border border-black/20 z-10 pointer-events-none" />
                    
                    {youtubeEmbedUrl ? (
                      <div className="relative w-full h-full">
                        <iframe
                          src={`${youtubeEmbedUrl}?modestbranding=1&rel=0&showinfo=0`}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={block.quote || "Video"}
                        />
                        {/* Overlay subtil au hover pour effet luxueux */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />
                        {/* Vignette subtile */}
                        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/10 pointer-events-none z-20" />
                      </div>
                    ) : block.src ? (
                      <video
                        className="w-full h-full object-cover"
                        poster={block.poster}
                        controls
                        playsInline
                      >
                        <source src={block.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={block.poster}
                          alt="Video placeholder"
                          className="w-full h-full object-cover opacity-50"
                        />
                        {/* Overlay avec gradient élégant */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 flex items-center justify-center">
                          <div className="text-center px-6 sm:px-8 lg:px-12 max-w-4xl z-10">
                            {/* Icône play stylisée */}
                            <div className="mb-8 flex justify-center">
                              <div className="relative">
                                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                                  <svg
                                    className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            {/* Citation élégante */}
                            <blockquote className="space-y-4">
                              <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif italic text-white leading-relaxed font-light">
                                "{block.quote}"
                              </p>
                              <p className="text-sm sm:text-base text-white/80 font-light tracking-wide">
                                — {block.author}
                              </p>
                            </blockquote>
                          </div>
                        </div>
                        {/* Grain de film pour effet cinématographique */}
                        <div
                          className="absolute inset-0 opacity-[0.02] pointer-events-none"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {/* Citation élégante sous la vidéo YouTube */}
                  {youtubeEmbedUrl && block.quote && (
                    <div className="mt-10 px-4 sm:px-8 text-center">
                      <blockquote className="max-w-3xl mx-auto">
                        <p className="text-lg sm:text-xl font-serif italic text-text-primary leading-relaxed mb-3 font-light">
                          "{block.quote}"
                        </p>
                        <p className="text-xs sm:text-sm text-steel-blue font-light tracking-wide">
                          — {block.author}
                        </p>
                      </blockquote>
                    </div>
                  )}
                  {block.caption && !youtubeEmbedUrl && (
                    <figcaption className="text-sm text-steel-blue font-light italic text-center mt-6 px-4">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }
            return null;
          })}
        </div>

        {/* CTA Section - Style éditorial luxueux */}
        <div className="mt-32 pt-20 border-t border-slate-taupe/10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-serif text-text-primary mb-5 font-light">
              Create Your Own Memory
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mb-8 font-light leading-relaxed">
              Every moment deserves its own scent. Discover how to create
              olfactory memories that will last a lifetime.
            </p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className="inline-block border border-text-primary/30 px-10 py-3.5 text-xs sm:text-sm font-light text-text-primary hover:border-text-primary hover:bg-text-primary hover:text-white transition-all duration-300 tracking-wide"
            >
              Explore Our Collection
            </a>
          </div>
        </div>
      </article>

      {/* Related Articles - Style luxueux et réduit */}
      <section className="bg-ivory-mist py-16 sm:py-20 border-t border-slate-taupe/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-serif text-text-primary text-center mb-10 font-light tracking-wide">
            More Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.values(articles)
              .filter((a) => a.id !== article.id)
              .slice(0, 2)
              .map((relatedArticle) => (
                <article
                  key={relatedArticle.id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/article/${relatedArticle.id}`)}
                >
                  <div className="flex items-start gap-4">
                    {/* Image réduite */}
                    <div className="flex-shrink-0 w-20 sm:w-24 aspect-[3/4] overflow-hidden">
                      <img
                        src={relatedArticle.heroImage}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <p className="text-[10px] text-steel-blue font-light uppercase tracking-[0.15em]">
                        {relatedArticle.category}
                      </p>
                      <h3 className="text-sm sm:text-base font-serif text-text-primary font-light group-hover:text-text-primary/70 transition-colors leading-tight">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-xs text-text-secondary font-light line-clamp-2 leading-relaxed">
                        {relatedArticle.excerpt}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header({ navigate }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-ivory-mist/95 backdrop-blur-md border-b border-slate-taupe/10"
          : "bg-transparent backdrop-blur-md border-b border-slate-taupe/10"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <div className="flex flex-col">
              <span
                className={`text-lg font-serif italic transition-colors ${
                  isScrolled
                    ? "text-text-primary"
                    : "text-text-primary"
                }`}
              >
                Scentience Original
              </span>
              <span
                className={`text-xs font-sans transition-colors ${
                  isScrolled
                    ? "text-steel-blue"
                    : "text-steel-blue"
                }`}
              >
                x Project Proust
              </span>
            </div>
          </button>

          <button
            onClick={() => navigate("/")}
            className="text-sm font-sans text-steel-blue hover:text-text-primary transition-colors"
          >
            ← Back to Stories
          </button>
        </div>
      </nav>
    </header>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-steel-blue text-ivory-mist py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">Footer Navigation</h2>
        
        {/* Main Content - Aligned horizontally */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-12 mb-8">
          {/* Brand Section */}
          <div className="flex-shrink-0">
            <div className="flex flex-col mb-2">
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
          <div className="grid grid-cols-3 gap-8 md:gap-12 flex-1">
            <div>
              <h3 className="font-light mb-4 text-xs uppercase tracking-wider text-ivory-mist/80">
                About
              </h3>
              <ul className="space-y-2 text-xs text-ivory-mist/60 font-light">
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
              <h3 className="font-light mb-4 text-xs uppercase tracking-wider text-ivory-mist/80">
                Support
              </h3>
              <ul className="space-y-2 text-xs text-ivory-mist/60 font-light">
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
              <h3 className="font-light mb-4 text-xs uppercase tracking-wider text-ivory-mist/80">
                Legal
              </h3>
              <ul className="space-y-2 text-xs text-ivory-mist/60 font-light">
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
        </div>

        {/* Copyright */}
        <div className="border-t border-ivory-mist/20 pt-6">
          <p className="text-xs text-ivory-mist/50 font-light">
            © {new Date().getFullYear()} Scentience x Project Proust. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
