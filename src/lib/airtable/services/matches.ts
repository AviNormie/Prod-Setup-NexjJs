import type { Records } from "airtable";

import { base } from "../client";
import type { MatchFields } from "../types";

const TABLE = "Matches";

export async function getMatchesByStudent(
  studentRecordId: string,
): Promise<Records<MatchFields>> {
  return base<MatchFields>(TABLE)
    .select({
      filterByFormula: `FIND("${studentRecordId}", {student})`,
    })
    .all();
}

export async function getMatchById(
  recordId: string,
): Promise<Records<MatchFields>[number]> {
  return base<MatchFields>(TABLE).find(recordId);
}
