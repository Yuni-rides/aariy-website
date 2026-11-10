"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "@/components/ui/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { routes } from "@/config/routes";
import { categoryHref } from "@/lib/categories";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Thin dark thumb on a light track, as on the Figma rail and flyout. */
const scrollbar = "[scrollbar-color:#6e6e73_#f1f1f3] [scrollbar-width:thin]";

/** "View all" heads the rail; it is a link, not a category in the tree. */
const VIEW_ALL: Category = {
  id: "view-all",
  slug: "",
  name: "View all",
  icon: "/images/categories/view-all.svg",
  tint: "#eeeeef",
};

function CategoryIcon({ category, size }: { category: Category; size: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full"
      style={{ backgroundColor: category.tint ?? "#eeeeef", width: size, height: size }}
    >
      {category.icon && (
        <Image src={category.icon} alt="" width={size} height={size} className="size-[62%] object-contain" />
      )}
    </span>
  );
}

/**
 * Figma flyout beside the rail: one accordion row per sub category
 * (Eastern Ready to wear, …); the open row shows "Shop All" plus round
 * child category links in a scrolling four-up grid.
 */
function CategoryFlyout({ path, id }: { path: Category[]; id: string }) {
  const [openGroup, setOpenGroup] = useState(0);
  const parent = path[path.length - 1];

  return (
    <m.div
      id={id}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={cn(
        "absolute left-full top-0 z-40 max-h-full w-[20rem] overflow-y-auto rounded-card bg-surface px-4 py-2 shadow-[0_12px_40px_rgb(0_0_0/0.12)]",
        scrollbar,
      )}
    >
      <ul>
        {parent.children?.map((group, g) => {
          const expanded = openGroup === g;
          const groupPath = [...path, group];
          return (
            <li key={group.id} className="border-b border-line last:border-b-0">
              {group.children?.length ? (
                <button
                  type="button"
                  onClick={() => setOpenGroup(expanded ? -1 : g)}
                  aria-expanded={expanded}
                  className="flex w-full items-center justify-between py-3.5 text-left text-[15px] hover:text-accent"
                >
                  {group.name}
                  <ChevronDownIcon
                    width={20}
                    height={20}
                    className={cn("transition-transform duration-300", expanded && "rotate-180")}
                  />
                </button>
              ) : (
                <Link href={categoryHref(groupPath)} className="block py-3.5 text-[15px] hover:text-accent">
                  {group.name}
                </Link>
              )}

              <AnimatePresence initial={false}>
                {!!group.children?.length && expanded && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <ul className={cn("grid max-h-52 grid-cols-4 gap-x-2 gap-y-4 overflow-y-auto pb-4 pr-2", scrollbar)}>
                      <li>
                        <Link href={categoryHref(groupPath)} className="group flex flex-col items-center">
                          <span className="flex size-12 items-center justify-center rounded-full bg-accent-soft text-center text-[11px] leading-tight transition-transform group-hover:scale-105">
                            Shop
                            <br />
                            All
                          </span>
                        </Link>
                      </li>
                      {group.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={categoryHref([...groupPath, child])}
                            className="group flex flex-col items-center gap-1.5 text-center text-xs"
                          >
                            {child.image ? (
                              <Image
                                src={child.image}
                                alt=""
                                width={48}
                                height={48}
                                className="size-12 rounded-full object-cover transition-transform group-hover:scale-105"
                              />
                            ) : (
                              <span className="size-12 rounded-full bg-subtle" />
                            )}
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </m.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </m.div>
  );
}

/**
 * Figma left rail, read from the category tree: main categories with
 * round icons; Men/Women/Kids expand to their categories, and a category
 * with sub categories (Women › Clothing) opens a flyout over the hero.
 * On mobile it becomes a horizontal scroller.
 */
export function CategoryRail({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState<string | null>(() => categories.find((c) => c.slug === "women")?.id ?? null);
  const [active, setActive] = useState<Category[] | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!active) return;
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setActive(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const rail = [VIEW_ALL, ...categories];
  const hrefOf = (c: Category) => (c === VIEW_ALL ? routes.collection("all") : categoryHref([c]));
  const activeId = active?.[active.length - 1].id;
  const flyoutId = activeId ? `cat-flyout-${activeId}` : undefined;

  return (
    <nav ref={navRef} aria-label="Categories" className="relative" onMouseLeave={() => setActive(null)}>
      {/* Mobile: horizontal circles */}
      <ul className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 lg:hidden [&::-webkit-scrollbar]:hidden">
        {rail.map((item) => (
          <li key={item.id} className="shrink-0">
            <Link href={hrefOf(item)} className="flex w-16 flex-col items-center gap-1.5 text-center text-[11px]">
              <CategoryIcon category={item} size={52} />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop: vertical rail, as tall as the hero and scrolling inside it */}
      <ul className={cn("absolute inset-0 hidden flex-col gap-2.5 overflow-y-auto pr-3 lg:flex", scrollbar)}>
        {rail.map((item) => {
          const expanded = open === item.id;
          const listId = `cat-${item.id}`;
          return (
            <li key={item.id}>
              <div className="flex items-center gap-1">
                <Link
                  href={hrefOf(item)}
                  onMouseEnter={() => setActive(null)}
                  className="flex flex-1 items-center gap-3.5 py-0.5 text-[15px] hover:text-accent"
                >
                  <CategoryIcon category={item} size={48} />
                  {item.name}
                </Link>
                {item.children?.length ? (
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : item.id)}
                    aria-expanded={expanded}
                    aria-controls={listId}
                    aria-label={`${expanded ? "Hide" : "Show"} ${item.name} categories`}
                    className="rounded-full p-1 hover:bg-subtle"
                  >
                    <ChevronDownIcon
                      width={20}
                      height={20}
                      className={cn("transition-transform duration-300", expanded && "rotate-180")}
                    />
                  </button>
                ) : null}
              </div>
              <AnimatePresence initial={false}>
                {!!item.children?.length && expanded && (
                  <m.ul
                    id={listId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="ml-[3.875rem] overflow-hidden whitespace-nowrap"
                  >
                    {item.children.map((sub) => {
                      const path = [item, sub];
                      const isActive = activeId === sub.id;
                      const className = cn(
                        "block w-full py-1.5 text-left text-[13px] transition-colors hover:text-ink",
                        isActive ? "font-semibold text-ink" : "text-muted",
                      );
                      return (
                        <li key={sub.id}>
                          {sub.children?.length ? (
                            <button
                              type="button"
                              onMouseEnter={() => setActive(path)}
                              onClick={() => setActive(isActive ? null : path)}
                              aria-expanded={isActive}
                              aria-controls={isActive ? flyoutId : undefined}
                              className={className}
                            >
                              {sub.name}
                            </button>
                          ) : (
                            <Link href={categoryHref(path)} onMouseEnter={() => setActive(null)} className={className}>
                              {sub.name}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </m.ul>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {active && flyoutId && <CategoryFlyout key={flyoutId} id={flyoutId} path={active} />}
      </AnimatePresence>
    </nav>
  );
}
