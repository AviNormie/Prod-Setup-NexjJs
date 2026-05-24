"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Button } from "@/components/ui/button";
import { getAuthCallbackUrl } from "@/config/auth";
import { getAuthErrorMessage } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const authSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type AuthFormValues = z.infer<typeof authSchema>;

type LoginFormProps = {
  error?: string | null;
  message?: string | null;
};

export function LoginForm({ error, message }: LoginFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [formError, setFormError] = useState<string | null>(null);
  const [formMessage, setFormMessage] = useState<string | null>(
    message ?? null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const callbackError = getAuthErrorMessage(error);

  async function onSubmit(values: AuthFormValues) {
    setFormError(null);
    setFormMessage(null);

    const supabase = createClient();

    if (mode === "sign-in") {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (signInError) {
        if (signInError.message.toLowerCase().includes("email not confirmed")) {
          setFormError(getAuthErrorMessage("email_not_confirmed"));
        } else {
          setFormError(getAuthErrorMessage("invalid_credentials"));
        }
        return;
      }

      router.push("/");
      router.refresh();
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: getAuthCallbackUrl("/"),
      },
    });

    if (signUpError) {
      setFormError(signUpError.message);
      return;
    }

    if (data.session) {
      router.push("/");
      router.refresh();
      return;
    }

    setFormMessage("Check your email to confirm your account, then sign in.");
    setMode("sign-in");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-heading text-foreground">
          {mode === "sign-in" ? "Sign in" : "Create account"}
        </h1>
        <p className="mt-2 text-caption text-muted-foreground">
          {mode === "sign-in"
            ? "Use OAuth or your email and password."
            : "Register with OAuth or email and password."}
        </p>
      </div>

      {callbackError ? (
        <AuthAlert variant="error">{callbackError}</AuthAlert>
      ) : null}

      {formError ? <AuthAlert variant="error">{formError}</AuthAlert> : null}

      {formMessage ? (
        <AuthAlert variant="success">{formMessage}</AuthAlert>
      ) : null}

      <OAuthButtons />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-caption uppercase tracking-wide">
          <span className="bg-surface px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Field
          id="password"
          label="Password"
          type="password"
          autoComplete={
            mode === "sign-in" ? "current-password" : "new-password"
          }
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting
            ? "Please wait…"
            : mode === "sign-in"
              ? "Sign in with email"
              : "Create account"}
        </Button>
      </form>

      <p className="text-center text-caption text-muted-foreground">
        {mode === "sign-in" ? "New here?" : "Already have an account?"}{" "}
        <button
          type="button"
          className="font-medium text-blue underline-offset-4 hover:underline"
          onClick={() => {
            setFormError(null);
            setFormMessage(null);
            setMode(mode === "sign-in" ? "sign-up" : "sign-in");
          }}
        >
          {mode === "sign-in" ? "Create an account" : "Sign in"}
        </button>
      </p>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  className,
  ...props
}: React.ComponentProps<"input"> & {
  label: string;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-caption font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        className={cn(
          "flex h-10 w-full rounded-md border border-border bg-surface px-3 text-body text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-blue focus-visible:ring-2 focus-visible:ring-blue/20",
          error &&
            "border-error focus-visible:border-error focus-visible:ring-error/20",
          className,
        )}
        {...props}
      />
      {error ? <p className="text-caption text-error">{error}</p> : null}
    </div>
  );
}

function AuthAlert({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "error" | "success";
}) {
  return (
    <div
      className={cn(
        "rounded-md border px-3 py-2 text-caption",
        variant === "error"
          ? "border-error/30 bg-error/10 text-error"
          : "border-success/30 bg-success/10 text-success",
      )}
    >
      {children}
    </div>
  );
}
