export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  auth_callback_error:
    "Sign-in could not be completed. Please try again or use another method.",
  invalid_credentials: "Invalid email or password.",
  email_not_confirmed:
    "Please confirm your email address before signing in.",
  oauth_error: "OAuth sign-in failed. Please try again.",
};

export function getAuthErrorMessage(code?: string | null) {
  if (!code) return null;
  return AUTH_ERROR_MESSAGES[code] ?? "Something went wrong. Please try again.";
}
