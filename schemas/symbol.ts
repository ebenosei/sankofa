import { z } from "zod";

export const AdinkraSymbolSchema = z.object({
  id: z.string(),
  name: z.string(),
  literal: z.string(),
  coreMeaning: z.string(),
  secondaryMeanings: z.array(z.string()),
  emotionalTags: z.array(z.string()),
  lifeDomains: z.array(z.string()),
  usageCautions: z.string().nullable(),
  compatibleSymbols: z.array(z.string()),
  incompatibleSymbols: z.array(z.string()),
  sensitive: z.boolean(),
  culturalNote: z.string(),
  svgFilename: z.string(),
});

export type AdinkraSymbol = z.infer<typeof AdinkraSymbolSchema>;
