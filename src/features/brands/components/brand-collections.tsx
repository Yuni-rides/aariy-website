import Image from "next/image";
import Link from "next/link";
import { EmptyState } from "@/components/ui";
import { routes } from "@/config/routes";
import type { BrandCollection } from "@/types";

export function BrandCollections({
  brandSlug,
  collections,
}: {
  brandSlug: string;
  collections: BrandCollection[];
}) {
  if (collections.length === 0) {
    return (
      <div className="container-site">
        <EmptyState
          title="No collections yet"
          description="This store hasn't grouped its products into collections."
        />
      </div>
    );
  }

  return (
    <ul className="container-site grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6">
      {collections.map(({ collection, productCount, image }) => (
        <li key={collection.slug}>
          <Link
            href={`${routes.brand(brandSlug)}?collection=${encodeURIComponent(collection.slug)}`}
            className="group block"
          >
            <span className="relative block aspect-[4/5] overflow-hidden rounded-card bg-subtle">
              {image && (
                <Image
                  src={image.url}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                />
              )}
            </span>
            <span className="mt-3 block font-semibold group-hover:text-accent">
              {collection.title}
            </span>
            <span className="text-sm text-muted">
              {productCount} {productCount === 1 ? "item" : "items"}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
