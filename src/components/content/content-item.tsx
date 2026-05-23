import type { ContentFields } from "@/lib/airtable/types";

type ContentItemProps = {
  fields: ContentFields;
};

export function ContentItem({ fields }: ContentItemProps) {
  return (
    <article className="rounded-lg border bg-[var(--color-surface)] p-4 shadow-[var(--shadow-card)]">
      <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
        {fields.content_type}
      </p>
      <h3 className="mt-1 font-medium text-[var(--color-text)]">{fields.title}</h3>
      {fields.body ? (
        <p className="mt-2 text-sm text-[var(--color-muted)] line-clamp-3">
          {fields.body}
        </p>
      ) : null}
    </article>
  );
}
