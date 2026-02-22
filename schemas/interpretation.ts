import { z } from "zod";

export const SymbolSuggestionSchema = z.object({
  symbolId: z.string().describe("The ID of the suggested Adinkra symbol"),
  confidence: z.number().min(0).max(1).describe("Confidence score from 0 to 1"),
  reasoning: z.string().describe("Why this symbol resonates with the user's expressed feelings or intentions"),
  personalizedMeaning: z.string().describe("A meaning tailored specifically to the user's situation"),
});

export const InterpretationResultSchema = z.object({
  emotionalThemes: z.array(z.string()).describe("The emotional themes extracted from the user's input"),
  suggestions: z.array(SymbolSuggestionSchema).min(2).max(3).describe("2 to 3 symbol suggestions ranked by relevance"),
});

export type SymbolSuggestion = z.infer<typeof SymbolSuggestionSchema>;
export type InterpretationResult = z.infer<typeof InterpretationResultSchema>;
