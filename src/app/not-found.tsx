import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-[length:var(--text-heading)] font-[family-name:var(--font-display)]">
        Page not found
      </h1>
      <p className="text-[var(--color-muted)]">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="rounded-md bg-[var(--color-navy)] px-4 py-2 text-sm text-white"
      >
        Back to dashboard
      </Link>
    </main>
  );
}
