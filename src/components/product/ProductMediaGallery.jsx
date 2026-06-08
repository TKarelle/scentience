import { useState } from "react";

const cx = (...p) => p.filter(Boolean).join(" ");

/**
 * Galerie PDP Le Labo — miniatures à gauche, média principal à droite.
 */
export default function ProductMediaGallery({ items, className = "" }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div
      className={cx("product-gallery", className)}
      aria-label="Product gallery"
    >
      <div className="product-gallery-thumbs" role="tablist" aria-label="Media thumbnails">
        {items.map((item, index) => (
          <button
            key={`thumb-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-label={item.alt}
            onClick={() => setActive(index)}
            className={cx(
              "product-gallery-thumb",
              active === index && "product-gallery-thumb-active",
            )}
          >
            {item.type === "image" ? (
              <img src={item.src} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="relative block h-full w-full">
                <img
                  src={item.poster}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <span
                  className="absolute inset-0 flex items-center justify-center bg-black/25 text-paper"
                  aria-hidden
                >
                  ▶
                </span>
              </span>
            )}
          </button>
        ))}
      </div>

      <figure className="product-gallery-main m-0 overflow-hidden bg-ink/[0.03]">
        {current.type === "image" ? (
          <img
            src={current.src}
            alt={current.alt}
            className="h-full w-full object-cover"
            decoding="async"
          />
        ) : (
          <video
            key={current.src}
            className="h-full w-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster={current.poster}
            aria-label={current.alt}
          >
            <source src={current.src} type="video/mp4" />
          </video>
        )}
      </figure>
    </div>
  );
}
