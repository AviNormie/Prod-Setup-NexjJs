import type { Records } from "airtable";

import { redis } from "@/lib/redis";

import { base } from "../client";
import type { StudentFields } from "../types";

const TABLE = "Students";

export async function getStudentBySupabaseId(supabaseId: string) {
  const cacheKey = `student:${supabaseId}`;
  const cached = await redis.get<string>(cacheKey);

  if (cached) {
    return JSON.parse(cached) as StudentFields & { id: string };
  }

  const records = await base<StudentFields>(TABLE)
    .select({
      filterByFormula: `{supabase_id} = "${supabaseId}"`,
      maxRecords: 1,
    })
    .firstPage();

  if (!records.length) {
    throw new Error("Student not found in Airtable");
  }

  const student = {
    id: records[0].id,
    ...records[0].fields,
  } as StudentFields & { id: string };

  await redis.setex(cacheKey, 3600, JSON.stringify(student));

  return student;
}

export async function getStudentById(
  recordId: string,
): Promise<Records<StudentFields>[number]> {
  return base<StudentFields>(TABLE).find(recordId);
}
