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
      className="block rounded-lg border bg-[var(--color-surface)] p-4 shadow-[var(--shadow-card)] transition-shadow hover:shadow-md"
    >
      <StatusPill status={fields.category} />
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        Program match · {fields.program.length} linked
      </p>
    </Link>
  );
}
