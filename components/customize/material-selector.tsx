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
    <div className="space-y-2">
      <label className="text-sm font-medium text-text-primary">Material</label>
      <div className="flex gap-3">
        {MATERIALS.map((material) => {
          const colors = MATERIAL_COLORS[material];
          const isSelected = selected === material;
          return (
            <button
              key={material}
              onClick={() => onSelect(material)}
              className={cn(
                "relative flex items-center gap-2 rounded-lg border px-4 py-3 transition-all duration-150",
                "capitalize text-sm",
                isSelected
                  ? "border-accent bg-accent-subtle text-text-primary"
                  : "border-border bg-surface text-text-secondary hover:border-border-hover"
              )}
              aria-pressed={isSelected}
            >
              <span
                className="h-4 w-4 rounded-full border border-white/20"
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
