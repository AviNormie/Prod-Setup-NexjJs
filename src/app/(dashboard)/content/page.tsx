"use client";

import { useQuery } from "@tanstack/react-query";

import { ContentItem } from "@/components/content/content-item";
import { queryKeys } from "@/lib/query-keys";
import type { ContentFields } from "@/lib/airtable/types";

type ContentRecord = ContentFields & { id: string };

async function fetchContent() {
  const response = await fetch("/api/content");

  if (!response.ok) {
    throw new Error("Failed to fetch content");
  }

  const json = (await response.json()) as { data: ContentRecord[] };
  return json.data;
}

export default function ContentPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.content(),
    queryFn: fetchContent,
  });

  if (isLoading) {
    return <p className="text-[var(--color-muted)]">Loading content…</p>;
  }

  if (error) {
    return <p className="text-[var(--color-error)]">Failed to load content.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-[length:var(--text-heading)] font-[family-name:var(--font-display)]">
        Content hub
      </h1>
      <div className="grid gap-4 md:grid-cols-2">
        {data?.map((item) => (
          <ContentItem key={item.id} fields={item} />
        ))}
      </div>
    </div>
  );
}
