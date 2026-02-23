"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type TattooPreviewProps = {
  symbolSvg: string;
  symbolName: string;
  style?: string;
  placement?: string;
};

const STYLE_CONFIGS: Record<string, { bg: string; border: string; filter: string; label: string }> = {
  "minimalist-line-art": {
    bg: "bg-white",
    border: "border-text-primary/10",
    filter: "opacity-70",
    label: "Fine line, single needle",
  },
  "geometric": {
    bg: "bg-surface-raised",
    border: "border-accent/20",
    filter: "opacity-80",
    label: "Geometric framework",
  },
  "ornate-traditional": {
    bg: "bg-stone-50",
    border: "border-text-primary/20",
    filter: "opacity-90",
    label: "Bold traditional",
  },
  "watercolor": {
    bg: "bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50",
    border: "border-terracotta/15",
    filter: "opacity-75",
    label: "Watercolor wash",
  },
  "dotwork": {
    bg: "bg-white",
    border: "border-text-secondary/15",
    filter: "opacity-80",
    label: "Stippled dots",
  },
};

const PLACEMENT_SIZES: Record<string, string> = {
  "wrist": "w-16 h-16",
  "forearm": "w-20 h-20",
  "shoulder": "w-24 h-24",
  "upper-back": "w-28 h-28",
  "ankle": "w-14 h-14",
  "ribcage": "w-24 h-24",
  "behind-ear": "w-12 h-12",
};

export function TattooPreview({ symbolSvg, symbolName, style, placement }: TattooPreviewProps) {
  const styleConfig = style ? STYLE_CONFIGS[style] : STYLE_CONFIGS["minimalist-line-art"];
  const sizeClass = placement ? PLACEMENT_SIZES[placement] ?? "w-20 h-20" : "w-20 h-20";
  const config = styleConfig ?? STYLE_CONFIGS["minimalist-line-art"];

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Skin-tone preview circle */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full border-2 w-32 h-32",
          config.bg,
          config.border
        )}
      >
        {/* Geometric frame overlay for geometric style */}
        {style === "geometric" && (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 128 128" fill="none">
            <polygon points="64,8 120,40 120,88 64,120 8,88 8,40" stroke="currentColor" strokeWidth="0.5" className="text-accent/30" />
            <polygon points="64,20 108,46 108,82 64,108 20,82 20,46" stroke="currentColor" strokeWidth="0.3" className="text-accent/15" />
          </svg>
        )}

        {/* Dotwork ring for dotwork style */}
        {style === "dotwork" && (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 128 128" fill="none">
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i * 10 * Math.PI) / 180;
              const x = 64 + 52 * Math.cos(angle);
              const y = 64 + 52 * Math.sin(angle);
              return <circle key={i} cx={x} cy={y} r="1" fill="currentColor" className="text-text-primary/25" />;
            })}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = ((i * 15 + 7.5) * Math.PI) / 180;
              const x = 64 + 44 * Math.cos(angle);
              const y = 64 + 44 * Math.sin(angle);
              return <circle key={`inner-${i}`} cx={x} cy={y} r="0.7" fill="currentColor" className="text-text-primary/15" />;
            })}
          </svg>
        )}

        {/* Ornate border for traditional style */}
        {style === "ornate-traditional" && (
          <div className="absolute inset-1 rounded-full border-2 border-text-primary/10 border-dashed" />
        )}

        {/* Watercolor splash effect */}
        {style === "watercolor" && (
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-200/30 via-transparent to-rose-200/30 blur-sm" />
        )}

        {/* The symbol itself */}
        <div className={cn("relative z-10", sizeClass, config.filter)}>
          <Image
            src={symbolSvg}
            alt={`${symbolName} tattoo preview`}
            fill
            className={cn(
              "object-contain",
              style === "minimalist-line-art" && "drop-shadow-none",
              style === "ornate-traditional" && "drop-shadow-sm",
              style === "watercolor" && "mix-blend-multiply"
            )}
          />
        </div>
      </div>

      {/* Size + style label */}
      <div className="text-center">
        <p className="text-[10px] text-text-tertiary uppercase tracking-wider">
          {config.label}
        </p>
        {placement && (
          <p className="text-[10px] text-text-tertiary">
            {placement.replace(/-/g, " ")} placement
          </p>
        )}
      </div>
    </div>
  );
}
