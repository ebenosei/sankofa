import { z } from "zod";

export const DayNameRequestSchema = z.object({
  dateOfBirth: z.string(),
  gender: z.enum(["male", "female"]),
});

export const DayNameResultSchema = z.object({
  name: z.string(),
  meaning: z.string(),
  day: z.string(),
  traits: z.array(z.string()),
});

export type DayNameRequest = z.infer<typeof DayNameRequestSchema>;
export type DayNameResult = z.infer<typeof DayNameResultSchema>;
