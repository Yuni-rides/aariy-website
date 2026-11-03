import { routes } from "@/config/routes";
import type { Category, CategoryEntry } from "@/types";

/**
 * Pure helpers over the category tree. Safe in server and client
 * components; the tree itself comes from the catalog service.
 */

export function categoryHref(path: Category[]): string {
  return routes.category(path.map((c) => c.slug));
}

/** Every node, depth first, with its path and URL. */
export function flattenCategories(tree: Category[], parents: Category[] = []): CategoryEntry[] {
  return tree.flatMap((category) => {
    const path = [...parents, category];
    return [{ category, path, href: categoryHref(path) }, ...flattenCategories(category.children ?? [], path)];
  });
}

export function findCategoryById(tree: Category[], id: string): CategoryEntry | null {
  return flattenCategories(tree).find((e) => e.category.id === id) ?? null;
}

/** Resolves URL segments (["women", "clothing"]) to a node. */
export function findCategoryByPath(tree: Category[], segments: string[]): CategoryEntry | null {
  let level = tree;
  const path: Category[] = [];
  for (const slug of segments) {
    const next = level.find((c) => c.slug === slug);
    if (!next) return null;
    path.push(next);
    level = next.children ?? [];
  }
  return path.length ? { category: path[path.length - 1], path, href: categoryHref(path) } : null;
}

/** The node and everything under it, for "all products in Women › Clothing". */
export function descendantIds(category: Category): string[] {
  return [category.id, ...(category.children ?? []).flatMap(descendantIds)];
}

/** Leaves with a photo (Kurta set, Maxi, …) across every main category. */
export function pictureLeaves(tree: Category[]): CategoryEntry[] {
  return flattenCategories(tree).filter((e) => !e.category.children?.length && e.category.image);
}

export function categoryCrumbs(path: Category[]): { name: string; href: string }[] {
  return path.map((category, i) => ({ name: category.name, href: categoryHref(path.slice(0, i + 1)) }));
}
