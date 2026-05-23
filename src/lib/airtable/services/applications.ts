import type { Records } from "airtable";

import { base } from "../client";
import type { ApplicationFields } from "../types";

const TABLE = "Applications";

export async function getApplicationsByStudent(
  studentRecordId: string,
): Promise<Records<ApplicationFields>> {
  return base<ApplicationFields>(TABLE)
    .select({
      filterByFormula: `FIND("${studentRecordId}", {student})`,
      sort: [{ field: "updated_at", direction: "desc" }],
    })
    .all();
}

export async function getApplicationById(
  recordId: string,
): Promise<Records<ApplicationFields>[number]> {
  return base<ApplicationFields>(TABLE).find(recordId);
}
