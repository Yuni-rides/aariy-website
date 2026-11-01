import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent-hover",
  secondary: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-bg",
  ghost: "text-ink hover:bg-subtle",
  link: "text-ink underline underline-offset-4 hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-md",
  md: "h-11 px-5 text-sm rounded-md",
  lg: "h-13 px-7 text-base rounded-md",
};

type StyleProps = { variant?: Variant; size?: Size; fullWidth?: boolean };

export function buttonStyles({ variant = "primary", size = "md", fullWidth }: StyleProps = {}) {
  return cn(base, variants[variant], variant !== "link" && sizes[size], fullWidth && "w-full");
}

export function Button({ variant, size, fullWidth, className, type = "button", ...props }: ComponentProps<"button"> & StyleProps) {
  return <button type={type} className={cn(buttonStyles({ variant, size, fullWidth }), className)} {...props} />;
}

export function ButtonLink({ variant, size, fullWidth, className, ...props }: ComponentProps<typeof Link> & StyleProps) {
  return <Link className={cn(buttonStyles({ variant, size, fullWidth }), className)} {...props} />;
}
