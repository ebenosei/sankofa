export const APP_NAME = "Sankofa";
export const APP_DESCRIPTION =
  "Discover Adinkra symbols that speak to your journey. Personalized cultural merchandise crafted with meaning.";
export const APP_TAGLINE = "Wear Your Story";

export const MATERIALS = ["gold", "silver", "bronze"] as const;
export type Material = (typeof MATERIALS)[number];

export const MATERIAL_COLORS: Record<Material, { primary: string; secondary: string }> = {
  gold: { primary: "#c8a45c", secondary: "#d4b36a" },
  silver: { primary: "#a8a8b0", secondary: "#c0c0c8" },
  bronze: { primary: "#b87333", secondary: "#cd7f32" },
};
