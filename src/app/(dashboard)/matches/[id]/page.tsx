"use client";

import { use } from "react";

import { StatusPill } from "@/components/shared/status-pill";
import { useMatch } from "@/hooks/use-matches";

export default function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, error } = useMatch(id);

  if (isLoading) {
    return <p className="text-[var(--color-muted)]">Loading match…</p>;
  }

  if (error || !data) {
    return <p className="text-[var(--color-error)]">Match not found.</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-[length:var(--text-heading)] font-[family-name:var(--font-display)]">
        Match detail
      </h1>
      <StatusPill status={data.category} />
      <p className="text-sm text-[var(--color-muted)]">{data.reasons}</p>
    </div>
  );
}
