"use client";

import { MATERIAL_COLORS, type Material } from "@/lib/constants";
import type { DayNameResult } from "@/schemas/day-name";

type BraceletPreviewProps = {
  symbolSvg: string;
  symbolName: string;
  customName: string;
  dayName: DayNameResult | null;
  material: Material;
};

export function BraceletPreview({
  symbolSvg,
  symbolName,
  customName,
  dayName,
  material,
}: BraceletPreviewProps) {
  const colors = MATERIAL_COLORS[material];

  return (
    <div className="space-y-3">
      <label className="font-serif text-base text-text-primary">Live Preview</label>
      <div className="relative flex items-center justify-center rounded-sm bg-surface-raised border border-border p-8 min-h-[280px]">
        {/* Bracelet band */}
        <svg
          viewBox="0 0 400 280"
          className="w-full max-w-[400px]"
          aria-label={`Bracelet preview with ${symbolName} symbol`}
        >
          {/* Band */}
          <ellipse
            cx="200"
            cy="140"
            rx="150"
            ry="100"
            fill="none"
            stroke={colors.primary}
            strokeWidth="20"
            opacity="0.9"
          />
          {/* Inner highlight */}
          <ellipse
            cx="200"
            cy="140"
            rx="150"
            ry="100"
            fill="none"
            stroke={colors.secondary}
            strokeWidth="2"
            opacity="0.5"
          />

          {/* Symbol plate (center top) */}
          <rect
            x="165"
            y="22"
            width="70"
            height="38"
            rx="4"
            fill={colors.primary}
            stroke={colors.secondary}
            strokeWidth="1"
          />
          {/* Symbol image */}
          <image
            href={symbolSvg}
            x="180"
            y="26"
            width="40"
            height="30"
            opacity="0.85"
          />

          {/* Custom name engraving */}
          {customName && (
            <>
              <rect
                x="140"
                y="220"
                width="120"
                height="26"
                rx="3"
                fill={colors.primary}
                stroke={colors.secondary}
                strokeWidth="0.5"
                opacity="0.85"
              />
              <text
                x="200"
                y="238"
                textAnchor="middle"
                fill="#1C1917"
                fontSize="11"
                fontWeight="600"
                fontFamily="var(--font-inter), system-ui"
              >
                {customName}
              </text>
            </>
          )}

          {/* Day name engraving */}
          {dayName && (
            <>
              <rect
                x="305"
                y="115"
                width="55"
                height="50"
                rx="3"
                fill={colors.primary}
                stroke={colors.secondary}
                strokeWidth="0.5"
                opacity="0.85"
              />
              <text
                x="332"
                y="138"
                textAnchor="middle"
                fill="#1C1917"
                fontSize="10"
                fontWeight="600"
                fontFamily="var(--font-inter), system-ui"
              >
                {dayName.name}
              </text>
              <text
                x="332"
                y="154"
                textAnchor="middle"
                fill="#1C1917"
                fontSize="7"
                opacity="0.6"
                fontFamily="var(--font-inter), system-ui"
              >
                {dayName.day}
              </text>
            </>
          )}
        </svg>
      </div>
      <p className="text-xs text-text-tertiary text-center italic">
        Preview is illustrative. Final product may vary.
      </p>
    </div>
  );
}
