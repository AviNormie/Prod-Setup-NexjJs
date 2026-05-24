import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-4 p-6">
      <h1 className="font-display text-heading">Page not found</h1>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="rounded-md bg-navy px-4 py-2 text-caption text-primary-foreground"
      >
        Back to dashboard
      </Link>
    </main>
  );
}
