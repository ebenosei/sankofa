import { z } from "zod";

export const ProductConfigSchema = z.object({
  symbolId: z.string(),
  customName: z.string().max(20),
  dayName: z
    .object({
      name: z.string(),
      meaning: z.string(),
      day: z.string(),
      traits: z.array(z.string()),
    })
    .nullable(),
  material: z.enum(["gold", "silver", "bronze"]),
});

export type ProductConfig = z.infer<typeof ProductConfigSchema>;
