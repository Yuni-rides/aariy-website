import type { MetadataRoute } from "next";
import { noIndexPaths } from "@/config/seo-pages";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...noIndexPaths, "/*?*sort=", "/*?*size=", "/*?*price="],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
