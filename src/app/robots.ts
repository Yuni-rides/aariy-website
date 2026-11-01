import type { MetadataRoute } from "next";
import { noIndexPaths } from "@/config/seo-pages";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Non-curated filter combinations are noindex via metadata; these paths are never crawled.
        disallow: [...noIndexPaths, "/*?*sort=", "/*?*size=", "/*?*price="],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
