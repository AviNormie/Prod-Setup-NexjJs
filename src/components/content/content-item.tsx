import type { ContentFields } from "@/lib/airtable/types";

type ContentItemProps = {
  fields: ContentFields;
};

export function ContentItem({ fields }: ContentItemProps) {
  return (
    <article className="rounded-lg border bg-surface p-4 shadow-card">
      <p className="text-caption uppercase tracking-wide text-muted-foreground">
        {fields.content_type}
      </p>
      <h3 className="mt-1 font-medium text-subheading text-foreground">
        {fields.title}
      </h3>
      {fields.body ? (
        <p className="mt-2 line-clamp-3 text-caption text-muted-foreground">
          {fields.body}
        </p>
      ) : null}
    </article>
  );
}
