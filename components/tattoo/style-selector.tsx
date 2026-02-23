"use client";

import { cn } from "@/lib/utils";
import { TATTOO_STYLES } from "@/schemas/tattoo";

type StyleSelectorProps = {
  selected: string | undefined;
  onSelect: (style: string) => void;
};

export function TattooStyleSelector({ selected, onSelect }: StyleSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-serif text-xl text-text-primary">Choose a Style</h2>
        <p className="text-sm text-text-tertiary mt-1">Optional — or let the AI suggest styles for you</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {TATTOO_STYLES.map((style) => {
          const isSelected = selected === style.id;
          return (
            <button
              key={style.id}
              onClick={() => onSelect(isSelected ? "" : style.id)}
              className={cn(
                "rounded-sm border p-4 text-left transition-all duration-200",
                isSelected
                  ? "border-accent bg-accent-subtle shadow-sm"
                  : "border-border bg-white hover:border-accent/40"
              )}
            >
              <p className="text-sm font-medium text-text-primary">{style.label}</p>
              <p className="text-xs text-text-tertiary mt-1 leading-relaxed">{style.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
