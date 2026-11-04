import { StarIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/** Read-only stars; fractional ratings fill the last star partly (4.5 → four and a half). */
export function RatingStars({ value, size = 16, className }: { value: number; size?: number; className?: string }) {
  return (
    <span role="img" aria-label={`${value} out of 5 stars`} className={cn("inline-flex shrink-0 gap-0.5", className)}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative" style={{ width: size, height: size }}>
            <StarIcon width={size} height={size} className="absolute inset-0 text-line" aria-hidden />
            {fill > 0 && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <StarIcon width={size} height={size} className="text-accent" aria-hidden />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
