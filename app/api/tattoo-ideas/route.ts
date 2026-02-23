import { streamObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { TattooIdeasResultSchema } from "@/schemas/tattoo";
import { getSymbolById } from "@/data/symbols";

const RequestSchema = z.object({
  symbolId: z.string(),
  style: z.string().optional(),
  placement: z.string().optional(),
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

    const symbol = getSymbolById(parsed.data.symbolId);
    if (!symbol) {
      return Response.json({ error: "Symbol not found" }, { status: 404 });
    }

    const result = streamObject({
      model: google("gemini-2.5-flash"),
      schema: TattooIdeasResultSchema,
      system: `You are an expert tattoo design consultant specializing in Adinkra symbol tattoos. You understand both the artistry of tattoo design and the cultural significance of Akan Adinkra symbols.

Your role is to generate thoughtful, beautiful tattoo design ideas that honor the cultural meaning of each symbol while creating visually striking body art.

Guidelines:
- Always respect the cultural significance of the symbol
- Consider how the symbol's geometry translates to different tattoo styles
- Provide practical design guidance (size, line weight, shading)
- Note any cultural considerations specific to permanently marking the body with this symbol
- Suggest placements that complement the symbol's shape and meaning
- Be specific and vivid in your descriptions so someone could bring them to a tattoo artist`,
      prompt: `Generate tattoo design ideas for the Adinkra symbol "${symbol.name}" ("${symbol.literal}").

Symbol meaning: ${symbol.coreMeaning}
Secondary meanings: ${symbol.secondaryMeanings.join(", ")}
Cultural note: ${symbol.culturalNote}
${symbol.usageCautions ? `Usage cautions: ${symbol.usageCautions}` : ""}
${parsed.data.style ? `Preferred style: ${parsed.data.style}` : "Consider various styles"}
${parsed.data.placement ? `Preferred placement: ${parsed.data.placement}` : "Suggest appropriate placements"}

Generate 3 unique tattoo design ideas that honor this symbol's cultural significance while creating beautiful body art.`,
    });

    return result.toTextStreamResponse();
  } catch (error: unknown) {
    console.error("Tattoo ideas API error:", error);
    return Response.json(
      { error: "Failed to generate tattoo ideas. Please try again." },
      { status: 500 }
    );
  }
}
