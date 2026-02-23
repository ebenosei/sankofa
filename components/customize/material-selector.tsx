"use client";

import { cn } from "@/lib/utils";
import { MATERIALS, MATERIAL_COLORS, type Material } from "@/lib/constants";
import { Check } from "lucide-react";

type MaterialSelectorProps = {
  selected: Material;
  onSelect: (material: Material) => void;
};

export function MaterialSelector({ selected, onSelect }: MaterialSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="font-serif text-base text-text-primary">Material</label>
      <div className="flex gap-3">
        {MATERIALS.map((material) => {
          const colors = MATERIAL_COLORS[material];
          const isSelected = selected === material;
          return (
            <button
              key={material}
              onClick={() => onSelect(material)}
              className={cn(
                "relative flex items-center gap-2.5 rounded-sm border px-5 py-3 transition-all duration-200",
                "capitalize text-sm",
                isSelected
                  ? "border-accent bg-accent-subtle text-text-primary"
                  : "border-border bg-white text-text-secondary hover:border-accent/40"
              )}
              aria-pressed={isSelected}
            >
              <span
                className="h-4 w-4 rounded-full"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
              />
              {material}
              {isSelected && (
                <Check size={14} className="text-accent" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
