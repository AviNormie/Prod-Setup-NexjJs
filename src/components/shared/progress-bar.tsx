import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-border",
        className,
      )}
    >
      <div
        className="h-full rounded-full bg-gradient-gold transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
