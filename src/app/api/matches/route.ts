import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

import { getMatchesByStudent } from "@/lib/airtable/services/matches";
import { getStudentBySupabaseId } from "@/lib/airtable/services/students";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(60, "1 m"),
});

export async function GET() {
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

  const student = await getStudentBySupabaseId(user.id);
  const records = await getMatchesByStudent(student.id);
  const data = records.map((record) => ({ id: record.id, ...record.fields }));

  return NextResponse.json({ data });
}
