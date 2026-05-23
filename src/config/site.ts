export const siteConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "Workpunkt",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  description: "Your study abroad journey, guided.",
} as const;

export const dashboardNav = [
  { href: "/", label: "Home" },
  { href: "/matches", label: "Matches" },
  { href: "/applications", label: "Applications" },
  { href: "/content", label: "Content" },
  { href: "/profile", label: "Profile" },
  { href: "/help", label: "Help" },
] as const;
