export function SignOutButton() {
  return (
    <form action="/auth/signout" method="post">
      <button
        type="submit"
        className="rounded-md border border-border bg-surface px-4 py-2 text-caption text-foreground transition-colors hover:bg-bg"
      >
        Sign out
      </button>
    </form>
  );
}
