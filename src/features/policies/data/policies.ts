import { siteConfig } from "@/config/site";


export type Policy = {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  /** Short intro shown under the title. */
  intro?: string;
  sections: { heading: string; body: string[]; list?: string[] }[];
};

const name = siteConfig.name;
const email = siteConfig.contact.email;

const draftNotice = "Draft placeholder. Final wording will be provided by counsel before launch.";

export const policies: Policy[] = [
  {
    slug: "terms",
    title: "Terms of Service",
    description: `The terms that apply when you browse, shop or sell on ${name}.`,
    updatedAt: "2026-11-10",
    intro: `Welcome to ${name}. These terms explain how our marketplace works and what we expect from everyone who uses it. By using our website or placing an order, you agree to these terms, so please read them carefully.`,
    sections: [
      {
        heading: `1. About ${name}`,
        body: [
          `${name} is an online marketplace operated by ${siteConfig.legalName}. We connect shoppers with independent, verified Pakistani fashion brands.`,
          `Products on ${name} are sold by the brands themselves. We run the platform, take payments, coordinate delivery and support you if something goes wrong, but each brand is responsible for the products it lists.`,
        ],
      },
      {
        heading: "2. Your account",
        body: ["You can browse without an account. To place and track orders you sign in with a one-time code sent to your phone."],
        list: [
          "You must be at least 18 years old, or shop with the permission of a parent or guardian.",
          "Give us accurate details, especially your name, phone number and delivery address.",
          "Keep your phone and one-time codes private. You are responsible for orders placed from your account.",
          "Tell us straight away if you think someone else has used your account.",
        ],
      },
      {
        heading: "3. Products and listings",
        body: [
          "Brands work hard to describe and photograph their products accurately. Colours can look slightly different on different screens, and handmade or embroidered pieces may vary a little from the photos. These small differences are not defects.",
          "Size guides are provided by each brand. Please check them before you order.",
        ],
      },
      {
        heading: "4. Prices and payment",
        body: ["All prices are in Pakistani Rupees (PKR) and include applicable taxes. Delivery charges, if any, are shown at checkout before you confirm your order."],
        list: [
          "You can pay by cash on delivery or by debit or credit card.",
          "For cash on delivery, please have the exact amount ready when the courier arrives.",
          "Card payments are processed by a secure payment partner. We never store your full card number.",
          "If a price is clearly wrong because of an error, we may cancel the order and refund any amount you paid.",
        ],
      },
      {
        heading: "5. Orders",
        body: [
          "Your order is confirmed when you receive a confirmation message from us. One basket can contain items from several brands. Each brand prepares its own items, so they may arrive in separate parcels.",
          "We or the brand may cancel an order if an item is out of stock, if we cannot verify the order, or if we suspect fraud. If this happens, we will tell you and refund any amount you have already paid.",
          "You can cancel an order free of charge until it has been dispatched. Contact us or use your order page.",
        ],
      },
      {
        heading: "6. Delivery",
        body: [
          "We deliver across Pakistan through our courier partners. Delivery times shown on the site are estimates and can be affected by weather, holidays or events outside our control.",
          "Please check your parcel when it arrives. If a parcel is damaged or opened, mention it to the courier and contact us within 48 hours. See our Shipping & Delivery policy for details.",
        ],
      },
      {
        heading: "7. Returns and refunds",
        body: [
          "If something is not right, you can request a return from your order page. Our Returns Policy explains which items can be returned, the time limits, and how refunds are paid.",
        ],
      },
      {
        heading: "8. Selling on " + name,
        body: [
          `Brands that want to sell on ${name} must apply through our Become a Seller page and pass our verification. Sellers agree to a separate seller agreement, and must follow these terms and our Prohibited Products policy.`,
        ],
      },
      {
        heading: "9. Using the site fairly",
        body: ["When you use our website, you agree not to:"],
        list: [
          "Break any law of Pakistan, including the Prevention of Electronic Crimes Act, 2016.",
          "Place fake orders, refuse genuine deliveries repeatedly, or abuse cash on delivery.",
          "Post false, abusive or misleading reviews.",
          "Copy, scrape or resell content, images or data from the site without our written permission.",
          "Try to hack, overload or interfere with the website or other users' accounts.",
        ],
      },
      {
        heading: "10. Intellectual property",
        body: [
          `The ${name} name, logo and website design belong to ${siteConfig.legalName}. Brand names, logos and product photos belong to the brands that own them. You may not use any of them without permission.`,
        ],
      },
      {
        heading: "11. Our liability",
        body: [
          `We take care to run ${name} well, but we cannot promise the site will always be available or error free. To the extent the law allows, our total liability for any order is limited to the amount you paid for that order. Nothing in these terms limits any rights you have under Pakistani consumer protection law.`,
        ],
      },
      {
        heading: "12. Changes to these terms",
        body: [
          "We may update these terms from time to time. The date at the top of this page shows when they last changed. Orders are governed by the terms in place when the order was placed.",
        ],
      },
      {
        heading: "13. Governing law",
        body: ["These terms are governed by the laws of Pakistan. Any dispute will be handled by the courts of Pakistan."],
      },
      {
        heading: "14. Contact us",
        body: [`Questions about these terms? Email us at ${email} or use our Contact Us page.`],
      },
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
    description: `What personal data ${name} collects, why, and how we keep it safe.`,
    updatedAt: "2026-11-10",
    intro: `Your privacy matters to us. This policy explains what information ${name} collects when you use our website, how we use it, who we share it with, and the choices you have.`,
    sections: [
      {
        heading: "1. Information we collect",
        body: ["We collect only what we need to run the marketplace and deliver your orders."],
        list: [
          "Contact details: your name, phone number and email address.",
          "Delivery details: your address, city and province.",
          "Order details: what you bought, from which brands, how you paid and your returns.",
          "Payment details: card payments are handled by our payment partner. We receive a confirmation, not your full card number.",
          "Messages: what you send us through the contact form, seller form or support.",
          "Device and usage data: your browser, device type, pages visited and basic location (city level), collected through cookies.",
        ],
      },
      {
        heading: "2. How we use your information",
        body: [],
        list: [
          "To process, deliver and track your orders.",
          "To send order updates and one-time sign-in codes by SMS or WhatsApp.",
          "To handle returns, refunds and customer support.",
          "To prevent fraud and keep the platform safe.",
          "To improve the website and understand which products people like.",
          "To send offers and news, only if you have agreed. You can opt out at any time.",
        ],
      },
      {
        heading: "3. Who we share it with",
        body: ["We never sell your personal data. We share it only when needed:"],
        list: [
          "Brands: the brand you order from receives your name, phone and order details so it can prepare your items.",
          "Courier partners: receive your name, phone number and address to deliver your parcel.",
          "Payment partners: process card payments securely.",
          "Service providers: help us with hosting, SMS, email and analytics, under strict confidentiality.",
          "Authorities: when the law requires it, or to protect our users and platform from fraud or harm.",
        ],
      },
      {
        heading: "4. Cookies",
        body: [
          "We use cookies to keep you signed in, remember your basket and wishlist, and understand how the site is used. Essential cookies are needed for the site to work. You can block other cookies in your browser settings, but some features may stop working.",
        ],
      },
      {
        heading: "5. How long we keep your data",
        body: [
          "We keep your account and order information for as long as your account is active, and afterwards for as long as we need it for accounting, tax, legal or fraud-prevention reasons. After that, we delete it or make it anonymous.",
        ],
      },
      {
        heading: "6. Keeping your data safe",
        body: [
          "We use encrypted connections (HTTPS), access controls and trusted service providers to protect your information. No system is completely secure, but we work hard to protect your data and will tell you if a breach affects you.",
        ],
      },
      {
        heading: "7. Your choices and rights",
        body: ["You can contact us at any time to:"],
        list: [
          "Ask for a copy of the personal information we hold about you.",
          "Correct details that are wrong or out of date.",
          "Ask us to delete your account and data, unless we must keep it by law.",
          "Stop receiving marketing messages.",
        ],
      },
      {
        heading: "8. Children",
        body: [`${name} is not meant for children under 18 to use on their own. We do not knowingly collect personal information from children.`],
      },
      {
        heading: "9. Changes to this policy",
        body: ["We may update this policy from time to time. The date at the top shows when it last changed. If we make important changes, we will let you know on the website."],
      },
      {
        heading: "10. Contact us",
        body: [`For any privacy question or request, email us at ${email}. We aim to reply within 7 working days.`],
      },
    ],
  },
  {
    slug: "prohibited-products",
    title: "Prohibited Products",
    description: `Products that brands may not list or sell on ${name}.`,
    updatedAt: "2026-11-10",
    intro: `${name} is a marketplace for genuine fashion, jewelry and accessories from verified brands. To keep shoppers safe and the marketplace trustworthy, the products below may not be listed. This policy applies to every seller on ${name}.`,
    sections: [
      {
        heading: "1. Counterfeit and copied goods",
        body: [],
        list: [
          "Fake or replica products of any brand, including \"master copies\" and \"first copies\".",
          "Products that copy another designer's protected designs, prints, logos or trademarks.",
          "Products using another brand's name, label or photos without permission.",
        ],
      },
      {
        heading: "2. Misrepresented products",
        body: [],
        list: [
          "Artificial jewelry sold as real gold, silver or precious stones.",
          "Fabric described falsely, for example polyester sold as pure silk or lawn.",
          "Used or damaged items sold as new.",
          "Products whose photos do not show the actual item being sold.",
        ],
      },
      {
        heading: "3. Illegal and dangerous items",
        body: [],
        list: [
          "Weapons, replica weapons, ammunition and explosives.",
          "Drugs, narcotics, tobacco, vapes and alcohol.",
          "Medicines, supplements and products that make medical claims.",
          "Hazardous chemicals and flammable products.",
          "Stolen goods or items obtained illegally.",
        ],
      },
      {
        heading: "4. Restricted beauty and personal care",
        body: [],
        list: [
          "Unregistered or unlabelled cosmetics and skin creams.",
          "Products containing banned ingredients, such as mercury or high levels of hydroquinone.",
          "Expired products, or products with missing or altered expiry dates.",
        ],
      },
      {
        heading: "5. Offensive content",
        body: [],
        list: [
          "Items with offensive, hateful or obscene prints, slogans or images.",
          "Products that disrespect any religion, sect, ethnicity or community.",
          "Adult or sexually explicit products.",
          "Political or extremist material.",
        ],
      },
      {
        heading: "6. Animal products",
        body: [],
        list: [
          "Products made from endangered or protected animals, such as ivory, real tortoise shell or protected furs and skins.",
          "Live animals.",
        ],
      },
      {
        heading: "7. Other items not allowed",
        body: [],
        list: [
          "Digital goods, gift cards, vouchers or services.",
          "Currency, coins or financial products.",
          "Products that are unrelated to fashion, jewelry, beauty or accessories.",
          "Any item that is illegal to sell in Pakistan.",
        ],
      },
      {
        heading: "What happens if a rule is broken",
        body: ["We review new listings and check reports from shoppers. If a product breaks this policy, we may:"],
        list: [
          "Remove the listing without notice.",
          "Cancel open orders and refund shoppers.",
          "Hold payouts while we investigate.",
          "Suspend or permanently close the seller's store.",
          "Report the matter to the relevant authorities where required by law.",
        ],
      },
      {
        heading: "Report a product",
        body: [`Seen a product that breaks these rules? Email us at ${email} with a link to the product and we will look into it. We may update this list at any time.`],
      },
    ],
  },
];

export function getPolicy(slug: string): Policy | undefined {
  return policies.find((p) => p.slug === slug);
}
