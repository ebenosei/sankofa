import { streamObject } from "ai";
import { google } from "@ai-sdk/google";
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
      model: google("gemini-2.5-flash"),
      schema: InterpretationResultSchema,
      system: getInterpretationSystemPrompt(),
      prompt: `The user says: "${message}"\n\nInterpret their emotional themes and suggest 2-3 Adinkra symbols that resonate with their expressed feelings and intentions.`,
    });

    return result.toTextStreamResponse();
  } catch (error: unknown) {
    console.error("Interpret API error:", error);
    const message =
      error instanceof Error && error.message.includes("credit balance")
        ? "API credit balance is too low. Please add credits at console.anthropic.com."
        : error instanceof Error && (error.message.includes("401") || error.message.includes("authentication"))
        ? "Invalid API key. Please check your ANTHROPIC_API_KEY."
        : "Failed to interpret your message. Please try again.";
    return Response.json({ error: message }, { status: 500 });
  }
}
