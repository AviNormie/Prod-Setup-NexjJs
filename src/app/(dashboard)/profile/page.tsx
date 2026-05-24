import { createServerSupabaseClient } from "@/lib/supabase/server";

import { SignOutButton } from "@/components/auth/sign-out-button";

export default async function ProfilePage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-heading">Profile</h1>
      <div className="rounded-lg border bg-surface p-4 shadow-card">
        <p className="text-caption text-muted-foreground">Signed in as</p>
        <p className="mt-1 text-body text-foreground">{user?.email}</p>
      </div>
      <SignOutButton />
    </div>
  );
}
