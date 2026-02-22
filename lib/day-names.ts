import { AKAN_DAY_NAMES } from "@/data/day-names";
import type { DayNameResult } from "@/schemas/day-name";

export function getAkanDayName(
  dateOfBirth: string,
  gender: "male" | "female"
): DayNameResult {
  const date = new Date(dateOfBirth + "T12:00:00");
  const dayIndex = date.getDay(); // 0 = Sunday
  const entry = AKAN_DAY_NAMES[dayIndex];
  const data = entry[gender];

  return {
    name: data.name,
    meaning: data.meaning,
    day: entry.day,
    traits: data.traits,
  };
}
