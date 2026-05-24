"use client";

import { ApplicationCard } from "@/components/applications/application-card";
import { useApplications } from "@/hooks/use-application";

export default function ApplicationsPage() {
  const { data, isLoading, error } = useApplications();

  if (isLoading) {
    return <p className="text-muted-foreground">Loading applications…</p>;
  }

  if (error) {
    return <p className="text-error">Failed to load applications.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-heading">Applications</h1>
      <div className="grid gap-4">
        {data?.map((application) => (
          <ApplicationCard
            key={application.id}
            id={application.id}
            fields={application}
          />
        ))}
      </div>
    </div>
  );
}
