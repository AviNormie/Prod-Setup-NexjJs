import { cn } from "@/lib/utils";

const statusClasses = {
  not_started: "status-pill--not_started",
  in_progress: "status-pill--in_progress",
  submitted: "status-pill--submitted",
  decision_pending: "status-pill--decision_pending",
  admitted: "status-pill--admitted",
  rejected: "status-pill--rejected",
  reach: "status-pill--reach",
  match: "status-pill--match",
  safety: "status-pill--safety",
} as const;

type StatusKey = keyof typeof statusClasses;

export function StatusPill({
  status,
  label,
  className,
}: {
  status: StatusKey;
  label?: string;
  className?: string;
}) {
  return (
    <span className={cn("status-pill", statusClasses[status], className)}>
      {label ?? status.replace(/_/g, " ")}
    </span>
  );
}
