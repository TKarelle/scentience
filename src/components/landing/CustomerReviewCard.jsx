import { IMAGE_DIMENSIONS } from "../../config/imageDimensions";

const cx = (...p) => p.filter(Boolean).join(" ");

function StarRow({ rating }) {
  return (
    <div
      className="review-card__stars"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={
            i < rating
              ? "review-card__star review-card__star--on"
              : "review-card__star"
          }
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

/**
 * Carte avis client — photo, étoiles, citation (landing trust).
 */
export default function CustomerReviewCard({
  name,
  place,
  journey,
  rating,
  verified,
  photo,
  photoAlt,
  quote,
  className = "",
}) {
  return (
    <article className={cx("review-card", className)}>
      <header className="review-card__header">
        <img
          src={photo}
          alt={photoAlt || name}
          width={IMAGE_DIMENSIONS.reviewThumb.width}
          height={IMAGE_DIMENSIONS.reviewThumb.height}
          className="review-card__photo"
          loading="lazy"
          decoding="async"
        />
        <div className="review-card__meta">
          <StarRow rating={rating} />
          <p className="review-card__name">{name}</p>
          <p className="review-card__place">{place}</p>
        </div>
      </header>

      <blockquote className="review-card__quote">
        <p>{quote}</p>
      </blockquote>

      <footer className="review-card__footer">
        <p className="review-card__journey">{journey}</p>
        {verified ? (
          <p className="review-card__verified">Verified commission</p>
        ) : null}
      </footer>
    </article>
  );
}
