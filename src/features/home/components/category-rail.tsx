"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { categoryNav, type CategoryNavItem } from "@/config/navigation";
import { cn } from "@/lib/utils";

function CategoryIcon({ item, size }: { item: CategoryNavItem; size: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full"
      style={{ backgroundColor: item.tint, width: size, height: size }}
    >
      <Image src={item.icon} alt="" width={size} height={size} className="object-contain p-1" />
    </span>
  );
}

/**
 * Figma left rail: round category icons with labels; Men/Women/Kids
 * expand to subcategories. On mobile it becomes a horizontal scroller.
 */
export function CategoryRail() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <nav aria-label="Categories">
      {/* Mobile: horizontal circles */}
      <ul className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 lg:hidden [&::-webkit-scrollbar]:hidden">
        {categoryNav.map((item) => (
          <li key={item.href} className="shrink-0">
            <Link href={item.href} className="flex w-16 flex-col items-center gap-1.5 text-center text-[11px]">
              <CategoryIcon item={item} size={52} />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop: vertical rail */}
      <ul className="hidden flex-col gap-1 lg:flex">
        {categoryNav.map((item) => {
          const expanded = open === item.label;
          return (
            <li key={item.href}>
              <div className="flex items-center gap-1">
                <Link href={item.href} className="flex flex-1 items-center gap-3 rounded-full py-1 pr-2 text-sm hover:text-accent">
                  <CategoryIcon item={item} size={40} />
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
                    <ChevronDownIcon width={16} height={16} className={cn("transition-transform", expanded && "rotate-180")} />
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
                    className="ml-[3.25rem] overflow-hidden"
                  >
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="block py-1.5 text-xs text-muted hover:text-accent">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </m.ul>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
