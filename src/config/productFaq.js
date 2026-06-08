/** JSON-LD FAQ — dérivé des accordéons produit. */

import { BESPOKE_PRODUCT } from "./bespokeProduct";
import { SITE_ORIGIN } from "./seoMeta";

export const PRODUCT_PAGE_CANONICAL = `${SITE_ORIGIN}${BESPOKE_PRODUCT.path}`;

export const PRODUCT_FAQ_ITEMS = BESPOKE_PRODUCT.detailPanels.map((panel) => ({
  id: panel.id,
  question: panel.title,
  answerParagraphs: [
    ...(panel.paragraphs ?? []),
    ...(panel.bullets ?? []),
  ],
}));
