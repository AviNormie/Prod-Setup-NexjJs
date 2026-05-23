export default function OnboardingPage() {
  return (
    <main className="flex min-h-full items-center justify-center bg-[var(--color-bg)] p-6">
      <div className="w-full max-w-2xl rounded-xl bg-[var(--color-surface)] p-8 shadow-[var(--shadow-card)]">
        <h1 className="text-[length:var(--text-heading)] font-[family-name:var(--font-display)]">
          Welcome to Workpunkt
        </h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Complete your profile to personalise your journey.
        </p>
      </div>
    </main>
  );
}
