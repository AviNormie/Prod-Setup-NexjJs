import Airtable from "airtable";
import type { FieldSet } from "airtable/lib/field_set";

let airtableBase: ReturnType<Airtable["base"]> | null = null;

function getBase() {
  if (!airtableBase) {
    if (!process.env.AIRTABLE_API_KEY) {
      throw new Error("Missing AIRTABLE_API_KEY env var");
    }

    if (!process.env.AIRTABLE_BASE_ID) {
      throw new Error("Missing AIRTABLE_BASE_ID env var");
    }

    const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
    airtableBase = airtable.base(process.env.AIRTABLE_BASE_ID);
  }

  return airtableBase;
}

export function base<TFields extends FieldSet>(tableName: string) {
  return getBase()<TFields>(tableName);
}
