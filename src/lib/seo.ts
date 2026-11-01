import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  /** Skip the "| Aariy" title template (used on the home page). */
  absoluteTitle?: boolean;
};

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * One helper for every page's metadata so canonical, Open Graph and robots
 * rules stay consistent across the site.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path,
  image,
  noIndex = false,
  type = "website",
  absoluteTitle = false,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle && title ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: title ?? siteConfig.name,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      // Without an explicit image, the generated app/opengraph-image is used.
      ...(image && { images: [{ url: absoluteUrl(image) }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.name,
      description,
      ...(image && { images: [absoluteUrl(image)] }),
    },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
  };
}
