export default function LoginPage() {
  return (
    <main className="flex min-h-full items-center justify-center bg-[var(--gradient-hero)] p-6">
      <div className="w-full max-w-md rounded-xl bg-[var(--color-surface)] p-8 shadow-[var(--shadow-modal)]">
        <h1 className="text-[length:var(--text-heading)] font-[family-name:var(--font-display)] text-[var(--color-text)]">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Supabase auth will be wired here.
        </p>
      </div>
    </main>
  );
}
