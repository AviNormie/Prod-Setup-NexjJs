import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";
import type { ApplicationFields } from "@/lib/airtable/types";

type ApplicationRecord = ApplicationFields & { id: string };

async function fetchApplications() {
  const response = await fetch("/api/applications");

  if (!response.ok) {
    throw new Error("Failed to fetch applications");
  }

  const json = (await response.json()) as { data: ApplicationRecord[] };
  return json.data;
}

export function useApplications() {
  return useQuery({
    queryKey: queryKeys.applications(),
    queryFn: fetchApplications,
  });
}

export function useApplication(id: string) {
  const { data, ...rest } = useApplications();

  return {
    ...rest,
    data: data?.find((application) => application.id === id),
  };
}
