import type { FieldSet } from "airtable/lib/field_set";

export interface StudentFields extends FieldSet {
  supabase_id: string;
  full_name: string;
  email: string;
  journey_phase: string;
  target_degree: string;
  target_intake: string;
  budget_range: string;
  career_goal: string;
}

export interface MatchFields extends FieldSet {
  student: string[];
  program: string[];
  category: "reach" | "match" | "safety";
  reasons: string;
}

export interface ApplicationFields extends FieldSet {
  student: string[];
  match: string[];
  status:
    | "not_started"
    | "in_progress"
    | "submitted"
    | "decision_pending"
    | "admitted"
    | "rejected";
  progress_pct: number;
  plain_text_summary: string;
  timeline: string;
  documents: string;
  updated_at: string;
}

export interface ContentFields extends FieldSet {
  title: string;
  journey_phase: string;
  content_type: string;
  body: string;
  url?: string;
}

export interface NotificationFields extends FieldSet {
  student: string[];
  message: string;
  is_read: boolean;
  created_at: string;
}
