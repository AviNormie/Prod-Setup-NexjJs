import Link from "next/link";

import { StatusPill } from "@/components/shared/status-pill";
import type { MatchFields } from "@/lib/airtable/types";

type MatchCardProps = {
  id: string;
  fields: MatchFields;
};

export function MatchCard({ id, fields }: MatchCardProps) {
  return (
    <Link
      href={`/matches/${id}`}
      className="block rounded-lg border bg-surface p-4 shadow-card transition-shadow hover:shadow-md"
    >
      <StatusPill status={fields.category} />
      <p className="mt-2 text-caption text-muted-foreground">
        Program match · {fields.program.length} linked
      </p>
    </Link>
  );
}
