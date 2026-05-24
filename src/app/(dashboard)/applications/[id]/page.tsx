"use client";

import { use } from "react";

import { ProgressBar } from "@/components/shared/progress-bar";
import { StatusPill } from "@/components/shared/status-pill";
import { useApplication } from "@/hooks/use-application";
import { formatDate } from "@/lib/utils";

export default function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, error } = useApplication(id);

  if (isLoading) {
    return <p className="text-muted-foreground">Loading application…</p>;
  }

  if (error || !data) {
    return <p className="text-error">Application not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-heading">Application</h1>
        <StatusPill status={data.status} />
      </div>
      <ProgressBar value={data.progress_pct} />
      <p className="text-foreground">{data.plain_text_summary}</p>
      <p className="text-caption text-muted-foreground">
        Updated {formatDate(data.updated_at)}
      </p>
    </div>
  );
}
