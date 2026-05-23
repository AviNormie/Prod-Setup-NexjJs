WORKPUNKT
Student App — Production Setup Guide
Next.js 14 · TypeScript · Supabase · Yarn
v1.0 · May 2026 · Phase 01 of 03
Table of Contents

1.  Tech Stack Overview
2.  Project Initialisation & Commands
3.  Folder Structure
4.  Design Tokens — globals.css (Colours · Gradients · Fonts)
5.  Authentication — Supabase Auth
6.  Database — Supabase Schema
7.  Data Fetching Strategy — TanStack Query · SWR · Redis
8.  API Routes — Next.js Route Handlers
9.  State Management
10. Environment Variables
11. Performance & Production Checklist
12. CI/CD & Deployment
13. Testing Setup
14. Code Quality — ESLint · Prettier · Husky
    1. Tech Stack Overview

15. Project Initialisation & Commands

2.1 Create Next.js project
yarn create next-app@latest workpunkt-student \
 --typescript \
 --tailwind \
 --eslint \
 --app \
 --src-dir \
 --import-alias "@/\*"

cd workpunkt-student

2.2 Enable Yarn Berry (v4)
corepack enable
corepack prepare yarn@stable --activate
yarn set version stable

# Confirm version

yarn --version

2.3 Install all dependencies

# ── Supabase ─────────────────────────────────────

yarn add @supabase/supabase-js @supabase/ssr

# ── Airtable ─────────────────────────────────────

yarn add airtable
yarn add -D @types/airtable

# ── Data fetching ────────────────────────────────

yarn add @tanstack/react-query @tanstack/react-query-devtools
yarn add swr
yarn add @upstash/redis @upstash/ratelimit

# ── Forms & validation ───────────────────────────

yarn add react-hook-form zod @hookform/resolvers

# ── UI ───────────────────────────────────────────

yarn add lucide-react framer-motion clsx tailwind-merge
yarn add class-variance-authority

# ── shadcn/ui CLI (run after install) ────────────

yarn dlx shadcn-ui@latest init

# ── Email ────────────────────────────────────────

yarn add resend @react-email/components

# ── Dev tooling ──────────────────────────────────

yarn add -D vitest @vitejs/plugin-react jsdom @testing-library/react
yarn add -D @playwright/test
yarn add -D prettier prettier-plugin-tailwindcss
yarn add -D husky lint-staged
yarn add -D @types/node

# ── Initialise Husky ─────────────────────────────

yarn dlx husky-init && yarn

2.4 Supabase local dev

# Install Supabase CLI

yarn add -D supabase

# Initialise local Supabase project

yarn supabase init

# Start local Supabase stack (Docker required)

yarn supabase start

# Generate TypeScript types from your schema

yarn supabase gen types typescript \
 --project-id YOUR_PROJECT_ID \

> src/types/database.types.ts

2.5 Useful daily commands
yarn dev # development server (localhost:3000)
yarn build # production build
yarn start # serve production build locally
yarn lint # ESLint
yarn test # Vitest unit tests
yarn test:e2e # Playwright end-to-end
yarn types:supabase # regenerate Supabase TS types

Add these scripts to your package.json:
"scripts": {
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint",
"test": "vitest",
"test:e2e": "playwright test",
"types:supabase": "supabase gen types typescript --project-id $SUPABASE_PROJECT_ID > src/types/database.types.ts"
}
3. Folder Structure

src/
├── app/ # Next.js App Router pages
│ ├── (auth)/ # Route group — login, onboarding
│ │ ├── login/page.tsx
│ │ └── onboarding/page.tsx
│ ├── (dashboard)/ # Route group — authenticated area
│ │ ├── layout.tsx # Dashboard shell (nav, sidebar)
│ │ ├── page.tsx # Dashboard Home
│ │ ├── matches/page.tsx
│ │ ├── matches/[id]/page.tsx
│ │ ├── applications/page.tsx
│ │ ├── applications/[id]/page.tsx
│ │ ├── content/page.tsx
│ │ ├── profile/page.tsx
│ │ └── help/page.tsx
│ ├── api/ # Route Handlers (API layer)
│ │ ├── applications/route.ts
│ │ ├── matches/route.ts
│ │ └── content/route.ts
│ ├── globals.css # Design tokens live here
│ ├── layout.tsx # Root layout + providers
│ └── not-found.tsx
│
├── components/
│ ├── ui/ # shadcn/ui generated components
│ ├── layout/ # Nav, Sidebar, Footer
│ ├── dashboard/ # Dashboard-specific components
│ ├── applications/ # Application cards, detail, timeline
│ ├── matches/ # Match cards, detail
│ ├── content/ # Content hub, item viewer
│ └── shared/ # StatusPill, ProgressBar, etc.
│
├── lib/
│ ├── supabase/ # Supabase client factories
│ │ ├── client.ts # Browser client (use client)
│ │ ├── server.ts # Server client (cookies)
│ │ └── middleware.ts # Session refresh middleware
│ ├── airtable/ # Airtable service layer
│ │ ├── client.ts # Airtable base singleton
│ │ ├── types.ts # Typed field interfaces per table
│ │ └── services/ # One file per Airtable table
│ │ ├── students.ts
│ │ ├── matches.ts
│ │ ├── applications.ts
│ │ └── content.ts
│ ├── redis.ts # Upstash Redis singleton
│ ├── query-keys.ts # TanStack Query key factory
│ └── utils.ts # cn(), formatDate(), etc.
│
├── hooks/ # Custom React hooks
│ ├── use-application.ts
│ ├── use-matches.ts
│ └── use-notifications.ts
│
├── types/ # Global TypeScript types
│ ├── database.types.ts # Auto-generated from Supabase
│ └── index.ts
│
├── middleware.ts # Auth middleware (Supabase SSR)
│
└── config/
└── site.ts # Site-wide constants
4. Design Tokens — globals.css

This file is the single source of truth for all visual decisions. Do not hardcode any colour, gradient, or font-size value outside of it.

4.1 Colour Palette
:root {
/_ ── Primary palette ─────────────────────────── _/
--color-navy: #0F172A; /_ Deep midnight navy _/
--color-navy-mid: #1E3A5F; /_ Mid navy _/
--color-gold: #B8972A; /_ Warm gold accent _/
--color-blue: #2563EB; /_ Bright interactive _/

/_ ── Semantic ────────────────────────────────── _/
--color-bg: #F8FAFC; /_ Page background _/
--color-surface: #FFFFFF; /_ Card surface _/
--color-border: #E2E8F0; /_ Default border _/
--color-muted: #64748B; /_ Secondary text _/
--color-text: #0F172A; /_ Primary text _/

/_ ── Status ──────────────────────────────────── _/
--color-success: #16A34A;
--color-warning: #D97706;
--color-error: #DC2626;
--color-info: #0284C7;
}

4.2 Gradients (used across the app)
Three gradients are used consistently. Assign them to CSS variables and never write a gradient inline in a component.
:root {
/_ Hero sections, splash screens, nav bar _/
--gradient-hero: linear-gradient(
135deg,
var(--color-navy) 0%,
var(--color-navy-mid) 60%,
#1a4a7a 100%
);

/_ Card highlights, progress bars, CTAs _/
--gradient-gold: linear-gradient(
90deg,
var(--color-gold) 0%,
#D4A843 50%,
var(--color-gold) 100%
);

/_ Subtle page-section backgrounds _/
--gradient-surface: linear-gradient(
180deg,
#F8FAFC 0%,
#EFF6FF 100%
);
}

4.3 Typography — clamp() fluid scale
Four fluid sizes cover all screen sizes from 320px (small phone) to 1440px (desktop). Never use a fifth size.
:root {
/\*

- clamp(min, preferred, max)
- min = small phone (320px viewport)
- max = desktop (1440px viewport)
  \*/

/_ Display — hero headings, cover text _/
--text-display: clamp(2rem, 5vw + 0.5rem, 3.75rem);

/_ Heading — section titles, page titles _/
--text-heading: clamp(1.375rem, 3vw + 0.25rem, 2.25rem);

/_ Subheading — card titles, labels _/
--text-subheading: clamp(1rem, 1.5vw + 0.25rem, 1.375rem);

/_ Body — all prose, UI copy _/
--text-body: clamp(0.875rem, 1vw + 0.25rem, 1rem);

/_ Supporting — metadata, timestamps, captions _/
--text-caption: clamp(0.75rem, 0.75vw + 0.15rem, 0.875rem);

/_ Font families _/
--font-display: "Playfair Display", Georgia, serif;
--font-body: "Inter", system-ui, sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", monospace;

/_ Line heights _/
--leading-tight: 1.25;
--leading-normal: 1.6;
--leading-loose: 1.8;

/_ Letter spacing _/
--tracking-tight: -0.02em;
--tracking-normal: 0;
--tracking-wide: 0.05em;
--tracking-caps: 0.1em;
}

4.4 Spacing, Radius & Shadow tokens
:root {
/_ Spacing scale (multiples of 4px) _/
--space-1: 0.25rem; --space-2: 0.5rem;
--space-3: 0.75rem; --space-4: 1rem;
--space-6: 1.5rem; --space-8: 2rem;
--space-12: 3rem; --space-16: 4rem;

/_ Border radius _/
--radius-sm: 0.25rem;
--radius-md: 0.5rem;
--radius-lg: 1rem;
--radius-xl: 1.5rem;
--radius-full: 9999px;

/_ Shadows _/
--shadow-card: 0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06);
--shadow-modal: 0 8px 32px rgba(0,0,0,0.16);
--shadow-nav: 0 1px 0 rgba(0,0,0,0.08);
}
Extend tailwind.config.ts to map these tokens to Tailwind utilities so you can use them as classes (e.g. text-heading, bg-navy, shadow-card).
5. Authentication — Supabase Auth

5.1 Supabase client factories
Create two separate factories: one for the browser (client components) and one for the server (Server Components, Route Handlers, Middleware).
// src/lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";

export const createClient = () =>
createBrowserClient<Database>(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// src/lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";

export const createServerSupabaseClient = () => {
const cookieStore = cookies();
return createServerClient<Database>(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
{ cookies: { get: (n) => cookieStore.get(n)?.value } }
);
};

5.2 Auth Middleware (src/middleware.ts)
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
let response = NextResponse.next({ request: { headers: request.headers } });

const supabase = createServerClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
{
cookies: {
get: (n) => request.cookies.get(n)?.value,
set: (n, v, o) => { response.cookies.set({ name: n, value: v, ...o }); },
remove: (n, o) => { response.cookies.set({ name: n, value: "", ...o }); },
},
}
);

// Refresh session — ALWAYS call getUser(), never getSession()
const { data: { user } } = await supabase.auth.getUser();

const isAuthPage = request.nextUrl.pathname.startsWith("/login");
if (!user && !isAuthPage) {
return NextResponse.redirect(new URL("/login", request.url));
}
if (user && isAuthPage) {
return NextResponse.redirect(new URL("/", request.url));
}
return response;
}

export const config = {
matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
6. Database — Airtable

Airtable is used as the operational database. Your counsellor team manages student records, matches, and applications directly in Airtable. The app reads from it via the Airtable REST API. All writes in Phase 1 come from the counsellor side — the student app is read-only.

6.1 Airtable base structure
Create one Airtable Base called "Workpunkt Platform". Inside it, create these tables:

6.2 Airtable client singleton (src/lib/airtable/client.ts)
Never instantiate Airtable more than once. Export a single base instance and import it into each service file.
// src/lib/airtable/client.ts
// IMPORTANT: only import this in server-side files.
// The API key must never reach the browser bundle.
import Airtable from "airtable";

if (!process.env.AIRTABLE_API_KEY) {
throw new Error("Missing AIRTABLE_API_KEY env var");
}
if (!process.env.AIRTABLE_BASE_ID) {
throw new Error("Missing AIRTABLE_BASE_ID env var");
}

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });

export const base = airtable.base(process.env.AIRTABLE_BASE_ID);

6.3 Typed field interfaces (src/lib/airtable/types.ts)
Define a TypeScript interface per Airtable table. Airtable returns fields as a plain object — typing it here means everywhere else is safe.
// src/lib/airtable/types.ts
export interface StudentFields {
supabase_id: string;
full_name: string;
email: string;
journey_phase: string;
target_degree: string;
target_intake: string;
budget_range: string;
career_goal: string;
}

export interface MatchFields {
student: string[]; // linked record IDs
program: string[];
category: "reach" | "match" | "safety";
reasons: string; // JSON string — parse on use
}

export interface ApplicationFields {
student: string[];
match: string[];
status: "not_started" | "in_progress" | "submitted"
| "decision_pending" | "admitted" | "rejected";
progress_pct: number;
plain_text_summary: string;
timeline: string; // JSON string
documents: string; // JSON string
updated_at: string;
}

export interface NotificationFields {
student: string[];
message: string;
is_read: boolean;
created_at: string;
}

6.4 Example service — Applications (src/lib/airtable/services/applications.ts)
Each service file exposes simple async functions. Route Handlers and Server Components call these — never call the Airtable client directly from components.
import { base } from "../client";
import type { ApplicationFields } from "../types";
import type { Records } from "airtable";

const TABLE = "Applications";

// Fetch all applications for a student (by their Airtable record ID)
export async function getApplicationsByStudent(
studentRecordId: string
): Promise<Records<ApplicationFields>> {
return base(TABLE)
.select({
filterByFormula: `FIND("${studentRecordId}", {student})`,
sort: [{ field: "updated_at", direction: "desc" }],
})
.all();
}

// Fetch a single application by its Airtable record ID
export async function getApplicationById(
recordId: string
): Promise<Records<ApplicationFields>[0]> {
return base(TABLE).find(recordId);
}

6.5 Linking Supabase Auth to Airtable
When a student logs in via Supabase, look up their Airtable record by matching supabase_id. Cache this lookup in Redis (TTL 1h) so every authenticated request does not pay an Airtable API call.
// src/lib/airtable/services/students.ts
import { base } from "../client";
import { redis } from "@/lib/redis";
import type { StudentFields } from "../types";

export async function getStudentBySupabaseId(supabaseId: string) {
const cacheKey = `student:${supabaseId}`;
const cached = await redis.get(cacheKey);
if (cached) return cached;

const records = await base("Students")
.select({ filterByFormula: `{supabase_id} = "${supabaseId}"`, maxRecords: 1 })
.firstPage();

if (!records.length) throw new Error("Student not found in Airtable");

const student = { id: records[0].id, ...records[0].fields } as
StudentFields & { id: string };

await redis.setex(cacheKey, 3600, JSON.stringify(student));
return student;
}

7. Data Fetching Strategy

Different data has different freshness requirements. Use the right tool for each case — never use TanStack Query when SWR is simpler, or fetch() when Redis can serve cached data.

7.1 TanStack Query setup (src/app/layout.tsx)
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
const [queryClient] = useState(() => new QueryClient({
defaultOptions: {
queries: {
staleTime: 1000 _ 60 _ 5, // 5 min — data stays fresh
gcTime: 1000 _ 60 _ 10, // 10 min — cache kept in memory
retry: 2,
refetchOnWindowFocus: true,
},
},
}));
return (
<QueryClientProvider client={queryClient}>
{children}
{process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
</QueryClientProvider>
);
}

7.2 Query key factory (src/lib/query-keys.ts)
Centralised key factory prevents typos and makes invalidation predictable.
export const queryKeys = {
student: () => ["student"] as const,
matches: () => ["matches"] as const,
match: (id: string) => ["matches", id] as const,
applications: () => ["applications"] as const,
application: (id: string) => ["applications", id] as const,
notifications:() => ["notifications"] as const,
content: (phase?: string) => ["content", phase] as const,
};

7.3 SWR hook for application status
// src/hooks/use-application-status.ts
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useApplicationStatus(id: string) {
return useSWR(
`/api/applications/${id}/status`,
fetcher,
{ refreshInterval: 30_000 } // poll every 30s
);
}

7.4 Redis caching in a Route Handler
// src/app/api/programs/[id]/route.ts
import { Redis } from "@upstash/redis";
import { base } from "@/lib/airtable/client";

const redis = Redis.fromEnv();

export async function GET(req: Request, { params }: { params: { id: string } }) {
const cacheKey = `program:${params.id}`;
const cached = await redis.get(cacheKey);
if (cached) return Response.json(cached);

const record = await base("Programs").find(params.id);
const data = { id: record.id, ...record.fields };

await redis.setex(cacheKey, 3600, JSON.stringify(data)); // 1h TTL
return Response.json(data);
}
8. API Routes — Route Handlers

8.1 Standard Route Handler pattern
Every API route follows the same shape: auth check → rate limit → validate input → fetch data → return typed response.
// src/app/api/applications/route.ts
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getApplicationsByStudent } from "@/lib/airtable/services/applications";
import { getStudentBySupabaseId } from "@/lib/airtable/services/students";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const ratelimit = new Ratelimit({
redis: Redis.fromEnv(),
limiter: Ratelimit.slidingWindow(60, "1 m"), // 60 req/min
});

export async function GET(req: Request) {
// 1. Auth — Supabase verifies identity
const supabase = createServerSupabaseClient();
const { data: { user }, error: authError } = await supabase.auth.getUser();
if (authError || !user) {
return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
}

// 2. Rate limit
const { success } = await ratelimit.limit(user.id);
if (!success) {
return NextResponse.json({ error: "Too many requests" }, { status: 429 });
}

// 3. Look up Airtable student record (Redis-cached)
const student = await getStudentBySupabaseId(user.id);

// 4. Fetch applications from Airtable
const records = await getApplicationsByStudent(student.id);
const data = records.map(r => ({ id: r.id, ...r.fields }));

return NextResponse.json({ data });
}
9. State Management

Phase 1 is read-only, so state is minimal. Follow this hierarchy:
Server state (API data) → TanStack Query or SWR
Global UI state (modals, notifications) → Zustand (lightweight, no boilerplate)
Local component state → useState / useReducer
URL state (filters, tabs) → Next.js useSearchParams

9.1 Zustand store (UI state only)
// src/lib/store.ts
import { create } from "zustand";

interface UIStore {
isNotificationDrawerOpen: boolean;
isFamilyShareModalOpen: boolean;
activeDocModal: string | null;
setNotificationDrawer: (v: boolean) => void;
setFamilyShareModal: (v: boolean) => void;
setDocModal: (id: string | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
isNotificationDrawerOpen: false,
isFamilyShareModalOpen: false,
activeDocModal: null,
setNotificationDrawer: (v) => set({ isNotificationDrawerOpen: v }),
setFamilyShareModal: (v) => set({ isFamilyShareModalOpen: v }),
setDocModal: (id) => set({ activeDocModal: id }),
}));
10. Environment Variables

Create a .env.local file locally and add all variables to your Vercel project (Settings → Environment Variables).

# .env.local

# ── Supabase ─────────────────────────────────────────────

NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ... # Never expose to client
SUPABASE_PROJECT_ID=xxxxxxxxxxxx

# ── Airtable ──────────────────────────────────────────────

AIRTABLE_API_KEY=patXXXX... # Personal Access Token
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX # Base ID from Airtable URL

# Never prefix these with NEXT*PUBLIC* — server-only

# ── Upstash Redis ─────────────────────────────────────────

UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXxx...

# ── Resend (email) ───────────────────────────────────────

RESEND_API_KEY=re_xxxx
EMAIL_FROM=noreply@workpunkt.com

# ── App ──────────────────────────────────────────────────

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Workpunkt

11. Performance & Production Checklist

11.1 Images
Always use next/image — never <img>
Set width and height to prevent layout shift
Use priority prop on above-the-fold images
Store images in Supabase Storage; use their CDN URL

11.2 Fonts
// src/app/layout.tsx
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
subsets: ["latin"],
variable: "--font-body",
display: "swap",
});

const playfair = Playfair_Display({
subsets: ["latin"],
variable: "--font-display",
display: "swap",
});

export default function RootLayout({ children }) {
return (

<html lang="en" className={`${inter.variable} ${playfair.variable}`}>
<body>{children}</body>
</html>
);
}

11.3 Core performance rules
"use client" only on components that genuinely need browser APIs or event handlers — default to Server Components
Put Suspense boundaries around every async Server Component that fetches data
Use loading.tsx files for route-level skeleton screens
Wrap heavy client components (rich text editor, charts) in dynamic(() => import(), { ssr: false })
Run yarn build and fix all TypeScript errors before every deploy — never deploy with errors

11.4 next.config.ts hardening
// next.config.ts
const nextConfig = {
images: {
remotePatterns: [
{ protocol: "https", hostname: "*.supabase.co" },
],
},
experimental: {
typedRoutes: true, // type-safe <Link href> values
},
headers: async () => [
{
source: "/(.\*)",
headers: [
{ key: "X-Frame-Options", value: "DENY" },
{ key: "X-Content-Type-Options", value: "nosniff" },
{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
{ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
],
},
],
};
export default nextConfig;
12. CI/CD & Deployment

12.1 GitHub Actions — CI pipeline (.github/workflows/ci.yml)
name: CI
on:
push: { branches: [main, develop] }
pull_request: { branches: [main] }

jobs:
ci:
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v4 - uses: actions/setup-node@v4
with: { node-version: "20", cache: "yarn" } - run: yarn install --frozen-lockfile - run: yarn lint - run: yarn test --run - run: yarn build

12.2 Vercel deployment
Connect GitHub repo to Vercel — auto-deploys on push to main
Use Vercel Preview Deployments for every PR — test before merging
Set all env vars in Vercel dashboard (Settings → Environment Variables)
Use separate Supabase projects for dev, staging, and production
Never push directly to main — always use PRs

12.3 Branch strategy
main → production (Vercel prod deployment)
dev → staging (Vercel preview deployment)
feature/_ → feature branches — PR into develop
hotfix/_ → urgent fixes — PR directly into main
13. Testing Setup

14.1 Prettier config (.prettierrc)
{
"semi": true,
"singleQuote": false,
"tabWidth": 2,
"trailingComma": "es5",
"printWidth": 100,
"plugins": ["prettier-plugin-tailwindcss"]
}

<!--
14.2 lint-staged config (.lintstagedrc.js)
module.exports = {
"_.{ts,tsx}": ["eslint --fix", "prettier --write"],
"_.{json,css,md}": ["prettier --write"],
};

14.3 Husky pre-commit hook (.husky/pre-commit)
#!/usr/bin/env sh
. "$(dirname -- "$0")/\_/husky.sh"

yarn lint-staged -->

14.4 TypeScript tsconfig.json — strict mode
{
"compilerOptions": {
"strict": true,
"noUncheckedIndexedAccess": true,
"noImplicitReturns": true,
"exactOptionalPropertyTypes": true
}
}

END OF DOCUMENT · WORKPUNKT PLATFORM · STUDENT APP SETUP GUIDE V1.0
