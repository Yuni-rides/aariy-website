import type { ImageAsset } from "./common";

export type Collection = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: ImageAsset;
  /** Curated collections are indexable; ad-hoc filter combinations are not (SOW §3.11). */
  indexable: boolean;
};
