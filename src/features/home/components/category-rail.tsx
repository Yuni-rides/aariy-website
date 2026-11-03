"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { categoryNav, type CategoryNavItem, type CategorySubNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Thin dark thumb on a light track, as on the Figma rail and flyout. */
const scrollbar = "[scrollbar-color:#6e6e73_#f1f1f3] [scrollbar-width:thin]";

function CategoryIcon({ item, size }: { item: CategoryNavItem; size: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full"
      style={{ backgroundColor: item.tint, width: size, height: size }}
    >
      <Image src={item.icon} alt="" width={size} height={size} className="size-[62%] object-contain" />
    </span>
  );
}

/**
 * Figma flyout beside the rail: one accordion row per group; the open row
 * shows "Shop All" plus round picture links in a scrolling four-up grid.
 */
function CategoryFlyout({ sub, id }: { sub: CategorySubNav; id: string }) {
  const [openGroup, setOpenGroup] = useState(0);

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
        {sub.groups?.map((group, g) => {
          const expanded = openGroup === g;
          return (
            <li key={group.href + group.label} className="border-b border-line last:border-b-0">
              {group.items ? (
                <button
                  type="button"
                  onClick={() => setOpenGroup(expanded ? -1 : g)}
                  aria-expanded={expanded}
                  className="flex w-full items-center justify-between py-3.5 text-left text-[15px] hover:text-accent"
                >
                  {group.label}
                  <ChevronDownIcon
                    width={20}
                    height={20}
                    className={cn("transition-transform duration-300", expanded && "rotate-180")}
                  />
                </button>
              ) : (
                <Link href={group.href} className="block py-3.5 text-[15px] hover:text-accent">
                  {group.label}
                </Link>
              )}

              <AnimatePresence initial={false}>
                {group.items && expanded && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <ul className={cn("grid max-h-52 grid-cols-4 gap-x-2 gap-y-4 overflow-y-auto pb-4 pr-2", scrollbar)}>
                      <li>
                        <Link href={group.href} className="group flex flex-col items-center">
                          <span className="flex size-12 items-center justify-center rounded-full bg-accent-soft text-center text-[11px] leading-tight transition-transform group-hover:scale-105">
                            Shop
                            <br />
                            All
                          </span>
                        </Link>
                      </li>
                      {group.items.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="group flex flex-col items-center gap-1.5 text-center text-xs">
                            <Image
                              src={link.image}
                              alt=""
                              width={48}
                              height={48}
                              className="size-12 rounded-full object-cover transition-transform group-hover:scale-105"
                            />
                            {link.label}
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
 * Figma left rail: round category icons with labels; Men/Women/Kids
 * expand to subcategories, and a subcategory with groups (Women ›
 * Clothing) opens a flyout over the hero. On mobile it becomes a
 * horizontal scroller.
 */
export function CategoryRail() {
  const [open, setOpen] = useState<string | null>("Women");
  const [active, setActive] = useState<{ item: string; sub: CategorySubNav } | null>(null);
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

  const flyoutId = active ? `cat-flyout-${active.item}-${active.sub.label}`.replace(/\W+/g, "-") : undefined;

  return (
    <nav ref={navRef} aria-label="Categories" className="relative" onMouseLeave={() => setActive(null)}>
      {/* Mobile: horizontal circles */}
      <ul className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 lg:hidden [&::-webkit-scrollbar]:hidden">
        {categoryNav.map((item) => (
          <li key={item.href + item.label} className="shrink-0">
            <Link href={item.href} className="flex w-16 flex-col items-center gap-1.5 text-center text-[11px]">
              <CategoryIcon item={item} size={52} />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop: vertical rail, as tall as the hero and scrolling inside it */}
      <ul className={cn("absolute inset-0 hidden flex-col gap-2.5 overflow-y-auto pr-3 lg:flex", scrollbar)}>
        {categoryNav.map((item) => {
          const expanded = open === item.label;
          return (
            <li key={item.href + item.label}>
              <div className="flex items-center gap-1">
                <Link
                  href={item.href}
                  onMouseEnter={() => setActive(null)}
                  className="flex flex-1 items-center gap-3.5 py-0.5 text-[15px] hover:text-accent"
                >
                  <CategoryIcon item={item} size={48} />
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : item.label)}
                    aria-expanded={expanded}
                    aria-controls={`cat-${item.label}`}
                    aria-label={`${expanded ? "Hide" : "Show"} ${item.label} categories`}
                    className="rounded-full p-1 hover:bg-subtle"
                  >
                    <ChevronDownIcon
                      width={20}
                      height={20}
                      className={cn("transition-transform duration-300", expanded && "rotate-180")}
                    />
                  </button>
                )}
              </div>
              <AnimatePresence initial={false}>
                {item.children && expanded && (
                  <m.ul
                    id={`cat-${item.label}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="ml-[3.875rem] overflow-hidden whitespace-nowrap"
                  >
                    {item.children.map((sub) => {
                      const isActive = active?.item === item.label && active.sub.label === sub.label;
                      const className = cn(
                        "block w-full py-1.5 text-left text-[13px] transition-colors hover:text-ink",
                        isActive ? "font-semibold text-ink" : "text-muted",
                      );
                      return (
                        <li key={sub.label}>
                          {sub.groups ? (
                            <button
                              type="button"
                              onMouseEnter={() => setActive({ item: item.label, sub })}
                              onClick={() => setActive(isActive ? null : { item: item.label, sub })}
                              aria-expanded={isActive}
                              aria-controls={isActive ? flyoutId : undefined}
                              className={className}
                            >
                              {sub.label}
                            </button>
                          ) : (
                            <Link href={sub.href} onMouseEnter={() => setActive(null)} className={className}>
                              {sub.label}
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
        {active && flyoutId && <CategoryFlyout key={flyoutId} id={flyoutId} sub={active.sub} />}
      </AnimatePresence>
    </nav>
  );
}
