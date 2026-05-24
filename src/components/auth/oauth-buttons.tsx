"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  getAuthCallbackUrl,
  oauthProviders,
  type OAuthProvider,
} from "@/config/auth";
import { createClient } from "@/lib/supabase/client";

export function OAuthButtons() {
  const [loadingProvider, setLoadingProvider] = useState<OAuthProvider | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  async function signInWithProvider(provider: OAuthProvider) {
    setLoadingProvider(provider);
    setError(null);

    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: getAuthCallbackUrl("/"),
      },
    });

    if (oauthError) {
      setError(oauthError.message);
      setLoadingProvider(null);
    }
  }

  return (
    <div className="space-y-3">
      {error ? (
        <p className="rounded-md border border-error/30 bg-error/10 px-3 py-2 text-caption text-error">
          {error}
        </p>
      ) : null}

      {oauthProviders.map((provider) => (
        <Button
          key={provider.id}
          type="button"
          variant="outline"
          className="w-full"
          disabled={loadingProvider !== null}
          onClick={() => signInWithProvider(provider.id)}
        >
          {loadingProvider === provider.id ? "Redirecting…" : provider.label}
        </Button>
      ))}
    </div>
  );
}
