import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";
import type { MatchFields } from "@/lib/airtable/types";

type MatchRecord = MatchFields & { id: string };

async function fetchMatches() {
  const response = await fetch("/api/matches");

  if (!response.ok) {
    throw new Error("Failed to fetch matches");
  }

  const json = (await response.json()) as { data: MatchRecord[] };
  return json.data;
}

export function useMatches() {
  return useQuery({
    queryKey: queryKeys.matches(),
    queryFn: fetchMatches,
  });
}

export function useMatch(id: string) {
  const { data, ...rest } = useMatches();

  return {
    ...rest,
    data: data?.find((match) => match.id === id),
  };
}
