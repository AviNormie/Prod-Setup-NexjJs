"use client";

import { MatchCard } from "@/components/matches/match-card";
import { useMatches } from "@/hooks/use-matches";

export default function MatchesPage() {
  const { data, isLoading, error } = useMatches();

  if (isLoading) {
    return <p className="text-muted-foreground">Loading matches…</p>;
  }

  if (error) {
    return <p className="text-error">Failed to load matches.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-heading">Matches</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {data?.map((match) => (
          <MatchCard key={match.id} id={match.id} fields={match} />
        ))}
      </div>
    </div>
  );
}
