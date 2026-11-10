import Image from "@/components/ui/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** The brand logo (public/logo.png, 993x411). Set the height with className; the width follows. */
export function Logo({
  className,
  priority,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt={siteConfig.name}
      width={993}
      height={411}
      priority={priority}
      sizes="240px"
      className={cn("h-10 w-auto", className)}
    />
  );
}
