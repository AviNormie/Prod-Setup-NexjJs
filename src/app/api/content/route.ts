import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

import { getContentByPhase } from "@/lib/airtable/services/content";
import { getStudentBySupabaseId } from "@/lib/airtable/services/students";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(60, "1 m"),
});

export async function GET(request: Request) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { success } = await ratelimit.limit(user.id);

  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  await getStudentBySupabaseId(user.id);

  const { searchParams } = new URL(request.url);
  const phase = searchParams.get("phase") ?? undefined;
  const records = await getContentByPhase(phase);
  const data = records.map((record) => ({ id: record.id, ...record.fields }));

  return NextResponse.json({ data });
}
