import type { MetadataRoute } from "next";
import { routes } from "@/config/routes";
import { policies } from "@/features/policies";
import { flattenCategories } from "@/lib/categories";
import { absoluteUrl } from "@/lib/seo";
import { getCategoryTree, getProductSlugsForBuild, listBrands, listCollections } from "@/services";

/** Curated pages only: collections, categories, brands, products, policies (SOW §3.11). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [collections, categories, brands, productSlugs] = await Promise.all([
    listCollections(),
    getCategoryTree(),
    listBrands(),
    getProductSlugsForBuild(),
  ]);

  return [
    { url: absoluteUrl(routes.home()), changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl(routes.brands()), changeFrequency: "weekly", priority: 0.7 },
    ...collections
      .filter((c) => c.indexable)
      .map((c) => ({ url: absoluteUrl(routes.collection(c.slug)), changeFrequency: "daily" as const, priority: 0.8 })),
    ...flattenCategories(categories).map((e) => ({ url: absoluteUrl(e.href), changeFrequency: "daily" as const, priority: 0.8 })),
    ...brands.map((b) => ({ url: absoluteUrl(routes.brand(b.slug)), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...productSlugs.map((slug) => ({ url: absoluteUrl(routes.product(slug)), changeFrequency: "weekly" as const, priority: 0.6 })),
    ...policies.map((p) => ({ url: absoluteUrl(routes.policy(p.slug)), changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
