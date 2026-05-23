type TimelineEvent = {
  label: string;
  date?: string;
  completed?: boolean;
};

export function ApplicationTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="space-y-4 border-l border-[var(--color-border)] pl-4">
      {events.map((event) => (
        <li key={event.label} className="relative">
          <span
            className={`absolute -left-[1.3rem] top-1 h-2.5 w-2.5 rounded-full ${
              event.completed
                ? "bg-[var(--color-success)]"
                : "bg-[var(--color-border)]"
            }`}
          />
          <p className="font-medium text-[var(--color-text)]">{event.label}</p>
          {event.date ? (
            <p className="text-sm text-[var(--color-muted)]">{event.date}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
