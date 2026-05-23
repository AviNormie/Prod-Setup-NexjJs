import type { Records } from "airtable";

import { base } from "../client";
import type { ContentFields } from "../types";

const TABLE = "Content";

export async function getContentByPhase(
  phase?: string,
): Promise<Records<ContentFields>> {
  const selectOptions = phase
    ? {
        filterByFormula: `{journey_phase} = "${phase}"`,
      }
    : {};

  return base<ContentFields>(TABLE).select(selectOptions).all();
}

export async function getContentById(
  recordId: string,
): Promise<Records<ContentFields>[number]> {
  return base<ContentFields>(TABLE).find(recordId);
}
