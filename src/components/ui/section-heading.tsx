import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  action?: { label: string; href: string };
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ title, eyebrow, description, action, as: Tag = "h2", className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
        <Tag className="font-display text-3xl leading-tight md:text-4xl">{title}</Tag>
        {description && <p className="mt-3 text-muted">{description}</p>}
      </div>
      {action && (
        <Link href={action.href} className="text-sm font-medium underline underline-offset-4 hover:text-accent">
          {action.label}
        </Link>
      )}
    </div>
  );
}
