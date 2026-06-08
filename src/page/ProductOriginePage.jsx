import { useMemo, useState } from "react";
import BespokeOrderModal from "../components/product/BespokeOrderModal";
import {
  ProductBuyCheckout,
  ProductBuyLogistics,
  ProductBuyProvider,
} from "../components/product/ProductBuyBox";
import ProductDetailAccordions from "../components/product/ProductDetailAccordions";
import ProductMediaGallery from "../components/product/ProductMediaGallery";
import ProductSocialProof from "../components/product/ProductSocialProof";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import { BESPOKE_PRODUCT } from "../config/bespokeProduct";
import { BESPOKE_PRODUCT_MEDIA } from "../config/bespokeProductMedia";
import { PRODUCT_FAQ_ITEMS } from "../config/productFaq";
import {
  BESPOKE_PRODUCT_SEO,
  absoluteUrl,
  SITE_ORIGIN,
} from "../config/seoMeta";

function buildProductJsonLd(product) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Scentience ${product.name}`,
    description: product.description,
    brand: { "@type": "Brand", name: "Scentience" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.socialProof.rating,
      reviewCount: product.socialProof.reviewCount,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_ORIGIN}${product.path}`,
      priceCurrency: product.pricing.currency,
      price: product.pricing.baseEur,
      availability: "https://schema.org/InStock",
    },
  });
}

function buildFaqJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRODUCT_FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answerParagraphs.join(" "),
      },
    })),
  });
}

function ProductBespokeMain() {
  const product = BESPOKE_PRODUCT;
  const [modalOpen, setModalOpen] = useState(false);
  const [orderOpts, setOrderOpts] = useState({
    withJournal: true,
    totalEur: product.pricing.baseEur,
  });

  const productJsonLd = useMemo(() => buildProductJsonLd(product), [product]);
  const faqJsonLd = useMemo(() => buildFaqJsonLd(), []);

  function openOrder(opts) {
    setOrderOpts(opts);
    setModalOpen(true);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: productJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />

      <BespokeOrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        withJournal={orderOpts.withJournal}
        totalEur={orderOpts.totalEur}
      />

      <article className="bg-paper pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
            <ProductMediaGallery items={BESPOKE_PRODUCT_MEDIA} />

            <div className="flex flex-col lg:sticky lg:top-28 lg:self-start">
              <p className="font-subtitle text-[10px] uppercase tracking-[0.2em] text-wine/80">
                {product.kicker}
              </p>
              <h1
                id="product-bespoke-heading"
                className="typo-title mt-2 text-2xl font-light leading-snug sm:text-3xl"
              >
                {product.name}
              </h1>

              <ProductSocialProof
                variant="stats"
                className="mt-4"
                social={product.socialProof}
              />

              {/*
                Mobile : checkout (2) → pitch (3) → livraison (4)
                Tablette / desktop : pitch → checkout → livraison (ordre DOM)
              */}
              <ProductBuyProvider onPersonalise={openOrder}>
                <div className="flex flex-col max-md:contents md:mt-2">
                  <ProductSocialProof
                    variant="pitch"
                    className="max-md:order-3 border-t border-wine/15 pt-6 md:order-1 md:pt-6"
                    social={product.socialProof}
                    personalisationPitch={product.personalisationPitch}
                  />

                  <ProductBuyCheckout className="max-md:order-2 border-t border-wine/15 pt-4 md:order-2 md:pt-6" />

                  <ProductBuyLogistics className="max-md:order-4 md:order-3 md:mt-6" />

                  <ProductDetailAccordions
                    panels={product.detailPanels}
                    className="max-md:order-5 mt-8 md:order-4"
                  />
                </div>
              </ProductBuyProvider>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default function ProductOriginePage() {
  return (
    <SiteChrome>
      <SyncPageSeo
        title={BESPOKE_PRODUCT_SEO.title}
        description={BESPOKE_PRODUCT_SEO.description}
        keywords={BESPOKE_PRODUCT_SEO.keywords}
        canonicalUrl={absoluteUrl(BESPOKE_PRODUCT_SEO.canonicalPath)}
      />
      <ProductBespokeMain />
    </SiteChrome>
  );
}
