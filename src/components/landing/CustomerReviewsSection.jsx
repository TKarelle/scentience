import { Link } from "react-router-dom";
import { CUSTOMER_REVIEWS_COPY } from "../../config/landingCustomerReviews";
import { PRE_ORDER_PATH } from "../../config/preOrderMessaging";
import CustomerReviewCard from "./CustomerReviewCard";

/**
 * Avis clients — landing (trust). Indépendant des field stories Proust.
 */
export default function CustomerReviewsSection() {
  const copy = CUSTOMER_REVIEWS_COPY;
  const { rating, reviewCount, commissionsCount } = copy.aggregate;

  return (
    <section
      id="reviews"
      className="customer-reviews-section"
      aria-labelledby="customer-reviews-heading"
    >
      <div className="customer-reviews-section__inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="customer-reviews-section__header mx-auto max-w-2xl text-center">
          <h2
            id="customer-reviews-heading"
            className="customer-reviews-section__title"
          >
            {copy.title}
          </h2>
          <p className="customer-reviews-section__aggregate">
            <span className="customer-reviews-section__score" aria-hidden>
              {rating.toFixed(1)}
            </span>
            <span className="customer-reviews-section__stars" aria-hidden>
              ★★★★★
            </span>
            <span className="sr-only">{rating} out of 5 stars. </span>
           
          </p>
        </header>

        <div className="customer-reviews-section__grid mt-5 sm:mt-6">
          {copy.reviews.map((review) => (
            <CustomerReviewCard key={review.id} {...review} />
          ))}
        </div>

        <div className="mt-5 flex justify-center sm:mt-6">
          <Link
            to={copy.ctaHref || PRE_ORDER_PATH}
            className="cta-pill cta-pill--on-wine"
          >
            {copy.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
