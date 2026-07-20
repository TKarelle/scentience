import { IMAGE_DIMENSIONS } from "../../config/imageDimensions";

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  if (url.includes("youtube.com/embed/")) return url;
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }
  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("watch?v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }
  return null;
}

function ArticleParagraph({ block, index, prevBlock }) {
  const isFirstParagraph =
    index === 0 ||
    (prevBlock && (prevBlock.type === "quote" || prevBlock.type === "video"));

  return (
    <p
      className={`text-sm sm:text-base text-ink/70 leading-[1.85] font-light ${
        isFirstParagraph ? "mb-10 first-paragraph" : "mb-7"
      }`}
      style={{ letterSpacing: "0.015em" }}
    >
      {isFirstParagraph && (
        <span className="float-left text-5xl sm:text-6xl typo-title leading-[0.85] mr-2 mt-1 font-light">
          {block.text.charAt(0)}
        </span>
      )}
      <span className={isFirstParagraph ? "block" : ""}>
        {isFirstParagraph ? block.text.slice(1).trim() : block.text}
      </span>
    </p>
  );
}

export default function ArticleBlockRenderer({ block, index, prevBlock, articleTitle }) {
  if (block.type === "paragraph") {
    return (
      <ArticleParagraph block={block} index={index} prevBlock={prevBlock} />
    );
  }

  if (block.type === "quote") {
    if (block.isOpening) {
      return (
        <blockquote className="my-6 py-4 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-xl sm:text-2xl lg:text-3xl typo-title italic leading-relaxed mb-2 font-light">
              "{block.text}"
            </p>
            <p className="text-xs text-mist font-light tracking-wide">
              — {block.author}
            </p>
          </div>
        </blockquote>
      );
    }

    return (
      <blockquote className="border-l-4 border-mist/50 pl-8 py-6 my-12">
        <p className="text-xl sm:text-2xl typo-title italic leading-relaxed mb-4 font-light">
          "{block.text}"
        </p>
        <p className="text-sm text-mist font-light">— {block.author}</p>
      </blockquote>
    );
  }

  if (block.type === "heading") {
    const level = block.level || 3;
    const HeadingTag = level === 2 ? "h2" : level === 3 ? "h3" : "h4";
    return (
      <HeadingTag className="text-xl sm:text-2xl typo-title font-light mt-12 mb-6">
        {block.text}
      </HeadingTag>
    );
  }

  if (block.type === "signature") {
    return (
      <div className="mt-16 pt-8 border-t border-ink/20">
        <p className="text-lg sm:text-xl typo-title italic font-light text-right">
          {block.text}
        </p>
      </div>
    );
  }

  if (block.type === "image") {
    return (
      <figure className="my-16">
        <div className="aspect-[16/10] overflow-hidden mb-4">
          <img
            src={block.src}
            alt={block.caption || articleTitle}
            width={IMAGE_DIMENSIONS.articleInline.width}
            height={IMAGE_DIMENSIONS.articleInline.height}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        {block.caption && (
          <figcaption className="text-sm text-mist font-light italic text-center">
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (block.type === "video") {
    const youtubeEmbedUrl = getYouTubeEmbedUrl(block.src);

    return (
      <figure className="my-24 -mx-4 sm:-mx-8 lg:-mx-16">
        <div className="relative aspect-[16/9] overflow-hidden bg-black group">
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
                loading="lazy"
                title={block.quote || "Video"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />
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
                alt={block.quote ? `Video: ${block.author}` : "Video preview"}
                width={IMAGE_DIMENSIONS.articleInline.width}
                height={IMAGE_DIMENSIONS.articleInline.height}
                className="w-full h-full object-cover opacity-50"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 flex items-center justify-center">
                <div className="text-center px-6 sm:px-8 lg:px-12 max-w-4xl z-10">
                  <div className="mb-8 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-xl" />
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                        <svg
                          className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <blockquote className="space-y-4">
                    <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl typo-title italic text-white leading-relaxed font-light">
                      "{block.quote}"
                    </p>
                    <p className="text-sm sm:text-base text-white/80 font-light tracking-wide">
                      — {block.author}
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          )}
        </div>
        {youtubeEmbedUrl && block.quote && (
          <div className="mt-10 px-4 sm:px-8 text-center">
            <blockquote className="max-w-3xl mx-auto">
              <p className="text-lg sm:text-xl typo-title italic leading-relaxed mb-3 font-light">
                "{block.quote}"
              </p>
              <p className="text-xs sm:text-sm text-mist font-light tracking-wide">
                — {block.author}
              </p>
            </blockquote>
          </div>
        )}
        {block.caption && !youtubeEmbedUrl && (
          <figcaption className="text-sm text-mist font-light italic text-center mt-6 px-4">
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return null;
}
