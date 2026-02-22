"use client";

import { SymbolCard } from "./symbol-card";
import { Skeleton } from "@/components/ui/skeleton";

/* eslint-disable @typescript-eslint/no-explicit-any */
type SymbolGridProps = {
  result: any;
  status: "idle" | "loading" | "streaming" | "complete" | "error";
  onSensitiveClick: (symbolId: string) => void;
};

export function SymbolGrid({ result, status, onSensitiveClick }: SymbolGridProps) {
  if (status === "idle") return null;

  if (status === "loading") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-text-secondary animate-pulse">
          Reading your intentions...
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-xl border border-terracotta/30 bg-terracotta-subtle p-6 text-center">
        <p className="text-sm text-terracotta">
          Something went wrong. Please try again with a different message.
        </p>
      </div>
    );
  }

  const themes = (result?.emotionalThemes as (string | undefined)[] | undefined)?.filter(
    (t): t is string => !!t
  );
  const suggestions = result?.suggestions as Array<{
    symbolId?: string;
    confidence?: number;
    reasoning?: string;
    personalizedMeaning?: string;
  }> | undefined;

  return (
    <div className="space-y-4">
      {/* Emotional themes */}
      {themes && themes.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-text-tertiary">Themes we sense:</span>
          {themes.map((theme) => (
            <span
              key={theme}
              className="rounded-full bg-accent-subtle px-3 py-1 text-xs text-accent"
            >
              {theme}
            </span>
          ))}
        </div>
      )}

      {/* Symbol cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {suggestions?.map((suggestion, index) => (
          <SymbolCard
            key={suggestion.symbolId ?? index}
            suggestion={suggestion}
            onSensitiveClick={onSensitiveClick}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
