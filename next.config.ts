import type { NextConfig } from "next";

// Product images move to the S3 + CDN bucket once the API is live (SOW §5).
// Set NEXT_PUBLIC_CDN_HOST to the CDN hostname and it is allowed here automatically.
const cdnHost = process.env.NEXT_PUBLIC_CDN_HOST;

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: cdnHost ? [{ protocol: "https", hostname: cdnHost }] : [],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
