export const APP_NAME = "Medea";
export const APP_TAGLINE = "me dea";
export const APP_SUBTITLE = "Wear Your Story";
export const APP_DESCRIPTION =
  "Discover Adinkra symbols that speak to your journey. Luxury cultural jewelry crafted with centuries of meaning.";

export const MATERIALS = ["gold", "silver", "bronze"] as const;
export type Material = (typeof MATERIALS)[number];

export const MATERIAL_COLORS: Record<Material, { primary: string; secondary: string }> = {
  gold: { primary: "#B8860B", secondary: "#C9A84C" },
  silver: { primary: "#a8a8b0", secondary: "#c0c0c8" },
  bronze: { primary: "#b87333", secondary: "#cd7f32" },
};
