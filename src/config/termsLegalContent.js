/**
 * Terms, GDPR disclosure & product conditions — single legal page.
 */

export const TERMS_DOCUMENT_TITLE =
  "GDPR Disclosure – User-Generated Content, Research Use & Product Terms";

export const TERMS_INTRO =
  "MADELEINE provides personalised fragrance products and offers users the option to submit written content (e.g. blog posts, reflections, or personal accounts) describing memories associated with scent or experiences using MADELEINE products.";

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
    id: "shipping",
    heading: "Shipping & delivery",
    blocks: [
      {
        type: "p",
        text: "Original Bespoke orders include free standard shipping to the UK and EU.",
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
    id: "returns",
    heading: "7. Returns & Product Positioning",
    blocks: [
      {
        type: "p",
        text: "Due to the personalised and bespoke nature of MADELEINE fragrances, all sales are final and non-returnable.",
      },
      {
        type: "p",
        text: "MADELEINE products are designed not solely as conventional perfumes, but as tools to support the formation of new memories and emotional associations. Research suggests that more novel or unfamiliar scents may strengthen memory encoding. As such, individual preference for the scent itself may vary and does not constitute a fault.",
      },
      {
        type: "p",
        text: "This does not affect your statutory rights in the case of defective or unsafe products.",
      },
    ],
  },
  {
    id: "retention",
    heading: "8. Data Retention",
    blocks: [
      {
        type: "p",
        text: "Content and associated data will be retained only for as long as necessary for the purposes outlined above, unless deletion is requested.",
      },
    ],
  },
  {
    id: "user-rights",
    heading: "9. User Rights",
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
    heading: "10. Safeguards",
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
    heading: "11. Acknowledgement",
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
          "They acknowledge the personalised nature of the product and the no-returns policy",
          "They consent to data processing in accordance with this policy",
        ],
      },
    ],
  },
];

export const TERMS_CONTACT_EMAIL = "Info@madeleine.uk";
