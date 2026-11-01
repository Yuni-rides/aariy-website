import { formatDate } from "@/lib/date";
import type { TrackingEvent } from "@/types";

export function OrderTimeline({ events }: { events: TrackingEvent[] }) {
  return (
    <ol className="relative ml-2 border-l border-line">
      {events.map((event, i) => (
        <li key={event.status + event.at} className="mb-4 ml-5 last:mb-0">
          <span
            aria-hidden
            className={`absolute -left-[5px] mt-1.5 size-2.5 rounded-full ${i === events.length - 1 ? "bg-accent" : "bg-ink"}`}
          />
          <p className="text-sm">{event.label}</p>
          <p className="text-xs text-muted">{formatDate(event.at)}</p>
        </li>
      ))}
    </ol>
  );
}
