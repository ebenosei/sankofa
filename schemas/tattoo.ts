import { z } from "zod";

export const TATTOO_STYLES = [
  { id: "minimalist-line-art", label: "Minimalist Line Art", description: "Clean, simple lines with minimal detail" },
  { id: "geometric", label: "Geometric", description: "Structured patterns with sharp angles and symmetry" },
  { id: "ornate-traditional", label: "Ornate Traditional", description: "Rich, detailed work honoring traditional aesthetics" },
  { id: "watercolor", label: "Watercolor", description: "Soft, flowing color washes blending with the design" },
  { id: "dotwork", label: "Dotwork", description: "Intricate patterns built from precise dots" },
] as const;

export const TATTOO_PLACEMENTS = [
  { id: "wrist", label: "Wrist" },
  { id: "forearm", label: "Forearm" },
  { id: "shoulder", label: "Shoulder" },
  { id: "upper-back", label: "Upper Back" },
  { id: "ankle", label: "Ankle" },
  { id: "ribcage", label: "Ribcage" },
  { id: "behind-ear", label: "Behind Ear" },
] as const;

export const TattooIdeaSchema = z.object({
  style: z.string().describe("The tattoo style for this idea"),
  placement: z.string().describe("The suggested body placement"),
  description: z.string().describe("A vivid description of how this Adinkra symbol would look as a tattoo in this style and placement"),
  designNotes: z.string().describe("Specific design guidance: size recommendation, line weight, shading approach"),
  culturalConsideration: z.string().describe("Cultural context relevant to tattooing this symbol"),
});

export const TattooIdeasResultSchema = z.object({
  ideas: z.array(TattooIdeaSchema).min(2).max(4).describe("2 to 4 tattoo design ideas"),
  generalAdvice: z.string().describe("Overall advice for getting an Adinkra symbol tattoo respectfully"),
});

export type TattooIdea = z.infer<typeof TattooIdeaSchema>;
export type TattooIdeasResult = z.infer<typeof TattooIdeasResultSchema>;
