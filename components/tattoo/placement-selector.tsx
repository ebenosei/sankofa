"use client";

import { cn } from "@/lib/utils";
import { TATTOO_PLACEMENTS } from "@/schemas/tattoo";

type PlacementSelectorProps = {
  selected: string | undefined;
  onSelect: (placement: string) => void;
};

export function TattooPlacementSelector({ selected, onSelect }: PlacementSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-serif text-xl text-text-primary">Choose a Placement</h2>
        <p className="text-sm text-text-tertiary mt-1">Optional — or let the AI suggest placements</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {TATTOO_PLACEMENTS.map((placement) => {
          const isSelected = selected === placement.id;
          return (
            <button
              key={placement.id}
              onClick={() => onSelect(isSelected ? "" : placement.id)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm transition-all duration-200",
                isSelected
                  ? "border-accent bg-accent-subtle text-accent"
                  : "border-border bg-white text-text-secondary hover:border-accent/40 hover:text-accent"
              )}
            >
              {placement.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
