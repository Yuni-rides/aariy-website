
export type Category = {
  id: string;
  /** URL segment, unique among siblings ("eastern-ready-to-wear"). */
  slug: string;
  name: string;
  /** Round photo on the flyout and home "Categories" circles (leaves). */
  image?: string;
  /** Rail illustration and its soft background (main categories). */
  icon?: string;
  tint?: string;
  children?: Category[];
};

/** A category with its place in the tree resolved, for pages and breadcrumbs. */
export type CategoryEntry = {
  category: Category;
  /** Root first, ending with this category. */
  path: Category[];
  href: string;
};
