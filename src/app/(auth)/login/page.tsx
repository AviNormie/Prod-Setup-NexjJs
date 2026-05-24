import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-full items-center justify-center bg-gradient-hero p-6">
      <div className="w-full max-w-md rounded-xl bg-surface p-8 shadow-modal">
        <LoginForm error={params.error} message={params.message} />
      </div>
    </main>
  );
}
