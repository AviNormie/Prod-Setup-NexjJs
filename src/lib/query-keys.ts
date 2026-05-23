export const queryKeys = {
  student: () => ["student"] as const,
  matches: () => ["matches"] as const,
  match: (id: string) => ["matches", id] as const,
  applications: () => ["applications"] as const,
  application: (id: string) => ["applications", id] as const,
  notifications: () => ["notifications"] as const,
  content: (phase?: string) => ["content", phase] as const,
};
