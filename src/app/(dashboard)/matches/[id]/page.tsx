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
    return <p className="text-muted-foreground">Loading match…</p>;
  }

  if (error || !data) {
    return <p className="text-error">Match not found.</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-heading">Match detail</h1>
      <StatusPill status={data.category} />
      <p className="text-caption text-muted-foreground">{data.reasons}</p>
    </div>
  );
}
