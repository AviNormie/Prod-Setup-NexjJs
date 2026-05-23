import Link from "next/link";

import { StatusPill } from "@/components/shared/status-pill";
import type { ApplicationFields } from "@/lib/airtable/types";

type ApplicationCardProps = {
  id: string;
  fields: ApplicationFields;
};

export function ApplicationCard({ id, fields }: ApplicationCardProps) {
  return (
    <Link
      href={`/applications/${id}`}
      className="block rounded-lg border bg-surface p-4 shadow-card transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-medium text-foreground">
          {fields.plain_text_summary || "Application"}
        </p>
        <StatusPill status={fields.status} />
      </div>
    </Link>
  );
}
