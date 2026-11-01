/**
 * Placeholder policy text. Counsel-approved copy replaces this before UAT
 * (SOW §7, WBS 3.10). Kept as structured data so it can later come from a CMS.
 */
export type Policy = {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: { heading: string; body: string[] }[];
};

const draftNotice = "Draft placeholder. Final wording will be provided by counsel before launch.";

export const policies: Policy[] = [
  {
    slug: "terms",
    title: "Terms of Service",
    description: "The terms that apply when you shop on Aariy.",
    updatedAt: "2026-10-31",
    sections: [
      { heading: "About Aariy", body: [draftNotice, "Aariy is a marketplace. Products are sold by independent, verified brands."] },
      { heading: "Orders", body: ["An order is confirmed when you receive a confirmation message. Each brand fulfils its own items."] },
      { heading: "Pricing", body: ["Prices are shown in Pakistani Rupees and include applicable taxes."] },
    ],
  },
  {
    slug: "returns",
    title: "Returns Policy",
    description: "How to request a return and how refunds are handled.",
    updatedAt: "2026-10-31",
    sections: [
      { heading: "Requesting a return", body: [draftNotice, "Request a return from your order page after delivery. Our team reviews each request with the brand."] },
      { heading: "Refunds", body: ["Approved refunds are issued to the original payment method, or by bank transfer for cash on delivery orders."] },
    ],
  },
  {
    slug: "shipping",
    title: "Shipping & Delivery",
    description: "Delivery times, charges and tracking.",
    updatedAt: "2026-10-31",
    sections: [
      { heading: "Dispatch", body: [draftNotice, "Each product page shows the brand's dispatch window. Items are quality checked at our hub before shipping."] },
      { heading: "Delivery", body: ["We deliver across Pakistan with our courier partner. Tracking appears on your order page after dispatch."] },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "What data we collect and how we use it.",
    updatedAt: "2026-10-31",
    sections: [
      { heading: "Data we collect", body: [draftNotice, "Your name, phone number, delivery address and order history."] },
      { heading: "How we use it", body: ["To deliver your orders, provide support and, with your consent, measure site usage."] },
    ],
  },
  {
    slug: "prohibited-products",
    title: "Prohibited Products",
    description: "Products that may not be listed on Aariy.",
    updatedAt: "2026-10-31",
    sections: [{ heading: "Overview", body: [draftNotice, "Counterfeit goods and items that infringe intellectual property are not allowed."] }],
  },
];

export function getPolicy(slug: string): Policy | undefined {
  return policies.find((p) => p.slug === slug);
}
