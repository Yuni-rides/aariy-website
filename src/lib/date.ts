const dateFormatter = new Intl.DateTimeFormat("en-PK", { day: "numeric", month: "short", year: "numeric" });
const shortFormatter = new Intl.DateTimeFormat("en-PK", { day: "numeric", month: "short" });

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export function formatShortDate(iso: string): string {
  return shortFormatter.format(new Date(iso));
}

/** Human label for a dispatch window, e.g. "Dispatched in 3–5 days". */
export function formatDispatchWindow(minDays: number, maxDays: number): string {
  if (minDays === maxDays) return `Dispatched in ${minDays} ${minDays === 1 ? "day" : "days"}`;
  return `Dispatched in ${minDays}–${maxDays} days`;
}
