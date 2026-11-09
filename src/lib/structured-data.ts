import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import type { Brand, Product, ReviewPage } from "@/types";
import { toMajor } from "./money";
import { absoluteUrl } from "./seo";

/** schema.org builders. Rendered with <JsonLd />; validated with Google's rich-results test (SOW §3.11). */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.png"),
    sameAs: Object.values(siteConfig.social),
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      contactType: "customer support",
      areaServed: siteConfig.market.country,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/search")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** Reviews are optional: Google only shows stars when aggregateRating has at least one review. */
export function productJsonLd(product: Product, reviews?: ReviewPage) {
  const inStock = product.variants.some((v) => v.stock > 0);
  const rated = reviews && reviews.summary.count > 0;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.variants[0]?.sku,
    image: product.images.map((img) => absoluteUrl(img.url)),
    brand: { "@type": "Brand", name: product.brand.name },
    material: product.material,
    aggregateRating: rated
      ? { "@type": "AggregateRating", ratingValue: reviews.summary.average, reviewCount: reviews.summary.count, bestRating: 5, worstRating: 1 }
      : undefined,
    review: rated
      ? reviews.items.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.authorName },
          datePublished: r.createdAt.slice(0, 10),
          name: r.title,
          reviewBody: r.body,
          reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
        }))
      : undefined,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(routes.product(product.slug)),
      priceCurrency: product.price.currency,
      price: toMajor(product.price),
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: product.brand.name },
    },
  };
}

export function brandJsonLd(brand: Brand) {
  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand.name,
    description: brand.tagline,
    url: absoluteUrl(routes.brand(brand.slug)),
    logo: brand.logo ? absoluteUrl(brand.logo.url) : undefined,
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}
