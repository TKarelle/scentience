/**
 * Terms, GDPR disclosure & product conditions — single legal page.
 */

export const TERMS_DOCUMENT_TITLE =
  "Terms of Sale, Withdrawal, Privacy & Product Conditions";

export const TERMS_INTRO =
  "MADELEINE provides personalised fragrance products and offers users the option to submit written content (e.g. blog posts, reflections, or personal accounts) describing memories associated with scent or experiences using MADELEINE products. These pages set out our terms of sale, right of withdrawal for bespoke goods, shipping and returns, product safety, and how we handle personal data under the GDPR.";

/** @typedef {{ type: 'p', text: string } | { type: 'ul', items: string[] } | { type: 'contact' }} TermsBlock */

/** @typedef {{ id: string, heading: string, blocks: TermsBlock[] }} TermsSection */

/** @type {TermsSection[]} */
export const TERMS_SECTIONS = [
  {
    id: "product-safety",
    heading: "1. Product Safety & Use",
    blocks: [
      {
        type: "p",
        text: "All MADELEINE fragrances are developed in accordance with applicable industry safety standards and guidelines (including IFRA compliance where relevant) and are tested for consumer use.",
      },
      { type: "p", text: "Users must:" },
      {
        type: "ul",
        items: [
          "Follow all instructions and warning labels provided with the product",
          "Use fragrances externally and as directed",
          "Discontinue use if irritation occurs",
        ],
      },
      {
        type: "p",
        text: "By purchasing and using MADELEINE products, users acknowledge that individual reactions to fragrance may vary.",
      },
    ],
  },
  {
    id: "purpose-data",
    heading: "2. Purpose of Data Collection",
    blocks: [
      {
        type: "p",
        text: "Submitted content and associated information may be used for:",
      },
      {
        type: "ul",
        items: [
          "Display on MADELEINE platforms (e.g. website or blog)",
          "Internal product development and service improvement",
          "Research purposes, including the study of autobiographical memory, emotional association, and olfactory perception",
        ],
      },
      {
        type: "p",
        text: "Where applicable, anonymised data may be made available as part of an open or shared qualitative dataset for academic or research use.",
      },
    ],
  },
  {
    id: "optional-demographic",
    heading: "3. Optional Demographic Information",
    blocks: [
      {
        type: "p",
        text: "When submitting content, users may optionally be asked to provide limited demographic information (such as age range, gender, or similar general characteristics).",
      },
      {
        type: "ul",
        items: [
          "Providing this information is entirely voluntary",
          "This data is collected solely to support research and analysis",
          "Users are encouraged not to provide unnecessary personal or identifying details",
        ],
      },
    ],
  },
  {
    id: "legal-basis",
    heading: "4. Legal Basis for Processing",
    blocks: [
      { type: "p", text: "We process this data based on:" },
      {
        type: "ul",
        items: [
          "User consent (Article 6(1)(a) GDPR)",
          "Where relevant, explicit consent for any potentially sensitive personal data (Article 9(2)(a) GDPR)",
        ],
      },
      {
        type: "p",
        text: "Submission of content and demographic information is entirely voluntary.",
      },
    ],
  },
  {
    id: "anonymisation",
    heading: "5. Anonymisation & Publication",
    blocks: [
      { type: "p", text: "Users will have the option to:" },
      {
        type: "ul",
        items: [
          "Publish content under their name",
          "Use a pseudonym",
          "Submit content anonymously",
        ],
      },
      {
        type: "p",
        text: "Where anonymisation is selected, MADELEINE will take reasonable steps to remove identifying information before publication or data sharing.",
      },
      { type: "p", text: "Demographic data will be:" },
      {
        type: "ul",
        items: [
          "stored separately from identifying information where possible",
          "used in aggregated or anonymised form for analysis",
        ],
      },
      {
        type: "p",
        text: "Users are advised not to include personally identifiable or sensitive information within free-text submissions.",
      },
    ],
  },
  {
    id: "data-sharing",
    heading: "6. Data Sharing & Open Research",
    blocks: [
      {
        type: "p",
        text: "By submitting content, users acknowledge that:",
      },
      {
        type: "ul",
        items: [
          "Their anonymised submission and associated demographic data may be shared with third parties, including academic researchers",
          "Data may be included in open-access datasets and used for research and publication purposes",
          "Once anonymised data is included in open datasets, full deletion may not always be possible.",
        ],
      },
    ],
  },
  {
    id: "terms-of-sale",
    heading: "7. Terms of Sale",
    blocks: [
      {
        type: "p",
        text: "These terms apply to commissions of Original Bespoke and related options (such as the memory journal) sold by MADELEINE.",
      },
      {
        type: "p",
        text: "Completing the guided questionnaire and leaving your email records your scent brief only. It does not create a paid order or a binding purchase. Paid commissions open next month; you will be invited to confirm and pay when sales begin.",
      },
      {
        type: "ul",
        items: [
          "A contract of sale is formed only when payment is successfully completed at checkout and we confirm your order by email",
          "Prices are shown in GBP and include applicable taxes unless stated otherwise",
          "Each Original Bespoke fragrance is composed to order from your questionnaire answers and is unique to your commission",
          "We may decline or cancel an order if payment fails, details are incomplete, or we cannot fulfil the commission safely or lawfully",
        ],
      },
      {
        type: "p",
        text: "Until payment is taken, you may ask us to update or delete your brief by contacting us at the address below.",
      },
    ],
  },
  {
    id: "shipping",
    heading: "8. Shipping & delivery",
    blocks: [
      {
        type: "p",
        text: "Original Bespoke orders include free standard shipping to the UK.",
      },
      {
        type: "ul",
        items: [
          "Composed to order after your questionnaire and payment are received",
          "Dispatch typically within 5–7 business days once your formula enters production",
          "Tracked parcel · delivery address confirmed by email after checkout",
          "International shipping outside the UK/EU may be available on request — contact us before ordering",
        ],
      },
      {
        type: "p",
        text: "You will receive email updates when your order is confirmed and when your parcel ships.",
      },
    ],
  },
  {
    id: "withdrawal",
    heading: "9. Right of Withdrawal (Cooling-off)",
    blocks: [
      {
        type: "p",
        text: "Under UK consumer law, you may normally cancel most distance contracts within 14 days without giving a reason. That statutory cooling-off right does not apply to goods made to your specifications or clearly personalised.",
      },
      {
        type: "p",
        text: "Original Bespoke is composed exclusively from your questionnaire (journey, emotions, preferences, and notes). Once you place a paid order, you expressly acknowledge that the fragrance is personalised for you and that the 14-day right of withdrawal does not apply.",
      },
      {
        type: "ul",
        items: [
          "Before payment: you may close the questionnaire or ask us to delete your brief — no purchase has been made",
          "After payment and before production begins: contact us promptly if you need to correct order details; we will help where still practical",
          "Once production has begun: the commission cannot be cancelled, returned, or exchanged for change of mind or scent preference",
        ],
      },
      {
        type: "p",
        text: "This does not affect your statutory rights if goods are faulty, not as described, or unsafe.",
      },
    ],
  },
  {
    id: "returns",
    heading: "10. Returns & Product Positioning",
    blocks: [
      {
        type: "p",
        text: "Because each formula is made to order and cannot be restocked or resold, paid Original Bespoke sales are final. Returns and exchanges are not accepted for change of mind or personal preference for the scent.",
      },
      {
        type: "p",
        text: "MADELEINE products are designed not solely as conventional perfumes, but as tools to support the formation of new memories and emotional associations. Research suggests that more novel or unfamiliar scents may strengthen memory encoding. As such, individual preference for the scent itself may vary and does not constitute a fault.",
      },
      {
        type: "p",
        text: "If you believe a product is defective or unsafe, contact us without delay. Your statutory rights remain unaffected.",
      },
    ],
  },
  {
    id: "retention",
    heading: "11. Data Retention",
    blocks: [
      {
        type: "p",
        text: "Content and associated data will be retained only for as long as necessary for the purposes outlined above, unless deletion is requested. Questionnaire briefs collected before paid commissions open are kept so we can invite you when sales begin, unless you ask us to delete them sooner.",
      },
    ],
  },
  {
    id: "user-rights",
    heading: "12. User Rights",
    blocks: [
      { type: "p", text: "Users have the right to:" },
      {
        type: "ul",
        items: [
          "Withdraw consent at any time",
          "Request access to their data",
          "Request correction or deletion of their data (where applicable)",
          "Object to or restrict processing",
        ],
      },
      { type: "contact" },
    ],
  },
  {
    id: "safeguards",
    heading: "13. Safeguards",
    blocks: [
      {
        type: "p",
        text: "MADELEINE implements appropriate technical and organisational measures to protect personal data in accordance with applicable data protection laws.",
      },
    ],
  },
  {
    id: "cookies",
    heading: "Cookies & local storage",
    blocks: [
      {
        type: "p",
        text: "MADELEINE uses a small number of cookies and similar technologies to operate the website and remember your preferences.",
      },
      {
        type: "ul",
        items: [
          "Essential cookies required for site functionality",
          "Local storage to remember your cookie consent choice",
          "We do not use third-party advertising cookies at this time",
        ],
      },
      {
        type: "p",
        text: "You can clear cookies and local storage at any time through your browser settings. For questions about data processing, see the sections above or contact us.",
      },
    ],
  },
  {
    id: "acknowledgement",
    heading: "14. Acknowledgement",
    blocks: [
      {
        type: "p",
        text: "By submitting content and/or purchasing products, users confirm that:",
      },
      {
        type: "ul",
        items: [
          "They understand how their data may be used",
          "They have read and will follow product safety instructions and warnings",
          "They understand that completing the brief is not a paid order until checkout when commissions open",
          "They acknowledge the personalised nature of Original Bespoke, the absence of the 14-day withdrawal right once a paid order is placed, and the no-returns policy for change of mind",
          "They consent to data processing in accordance with this policy",
        ],
      },
    ],
  },
];

export const TERMS_CONTACT_EMAIL = "Info@madeleine.uk";
