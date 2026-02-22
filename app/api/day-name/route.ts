import { DayNameRequestSchema } from "@/schemas/day-name";
import { getAkanDayName } from "@/lib/day-names";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = DayNameRequestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { dateOfBirth, gender } = parsed.data;
    const result = getAkanDayName(dateOfBirth, gender);

    return Response.json(result);
  } catch (error) {
    console.error("Day name API error:", error);
    return Response.json(
      { error: "Failed to calculate day name." },
      { status: 500 }
    );
  }
}
