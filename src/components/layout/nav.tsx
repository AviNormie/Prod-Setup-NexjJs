import Link from "next/link";

export function Nav() {
  return (
    <header className="border-b bg-surface shadow-nav">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-subheading">
          Workpunkt
        </Link>
      </div>
    </header>
  );
}
