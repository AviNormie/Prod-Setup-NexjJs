export const authPaths = ["/login", "/onboarding"] as const;

export const publicPathPrefixes = ["/login", "/onboarding", "/auth"] as const;

export function isPublicPath(pathname: string) {
  return publicPathPrefixes.some((prefix) => pathname.startsWith(prefix));
}

export function isAuthPage(pathname: string) {
  return authPaths.some((path) => pathname.startsWith(path));
}

export const oauthProviders = [
  { id: "google", label: "Continue with Google" },
  { id: "github", label: "Continue with GitHub" },
] as const;

export type OAuthProvider = (typeof oauthProviders)[number]["id"];

export function getAuthCallbackUrl(next = "/", origin?: string) {
  const base =
    origin ??
    (typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"));
  const url = new URL("/auth/callback", base);
  url.searchParams.set("next", next);
  return url.toString();
}
