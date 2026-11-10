import NextImage, { type ImageProps } from "next/image";

/**
 * next/image, except files we already compressed to WebP skip the
 * /_next/image optimizer. On Vercel every optimized source image counts
 * against the plan's quota, and once it runs out new images fail with 402.
 */
export default function Image(props: ImageProps) {
  const preOptimized = typeof props.src === "string" && props.src.endsWith(".webp");
  return <NextImage {...props} unoptimized={props.unoptimized ?? preOptimized} />;
}
