import { streamObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { InterpretationResultSchema } from "@/schemas/interpretation";
import { getInterpretationSystemPrompt } from "@/lib/prompts";

const RequestSchema = z.object({
  message: z.string().min(3).max(1000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { message } = parsed.data;

    const result = streamObject({
      model: anthropic("claude-sonnet-4-20250514"),
      schema: InterpretationResultSchema,
      system: getInterpretationSystemPrompt(),
      prompt: `The user says: "${message}"\n\nInterpret their emotional themes and suggest 2-3 Adinkra symbols that resonate with their expressed feelings and intentions.`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Interpret API error:", error);
    return Response.json(
      { error: "Failed to interpret your message. Please try again." },
      { status: 500 }
    );
  }
}
