"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSymbolById } from "@/data/symbols";
import { AlertTriangle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type SymbolCardProps = {
  suggestion: {
    symbolId?: string;
    confidence?: number;
    reasoning?: string;
    personalizedMeaning?: string;
  };
  onSensitiveClick?: (symbolId: string) => void;
  index: number;
};

export function SymbolCard({ suggestion, onSensitiveClick, index }: SymbolCardProps) {
  const symbolId = suggestion.symbolId;
  const symbol = symbolId ? getSymbolById(symbolId) : null;

  if (!symbolId || !symbol) {
    return (
      <div className="animate-pulse rounded-xl border border-border bg-surface p-6 h-64" />
    );
  }

  const confidence = suggestion.confidence ?? 0;
  const confidencePercent = Math.round(confidence * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className={cn(
        "group relative rounded-xl border border-border bg-surface p-6",
        "hover:border-border-hover transition-all duration-200",
        "flex flex-col gap-4"
      )}
    >
      {/* Confidence badge */}
      <div className="flex items-center justify-between">
        <Badge variant={index === 0 ? "default" : "success"}>
          <Sparkles size={12} className="mr-1" />
          {confidencePercent}% match
        </Badge>
        {symbol.sensitive && (
          <Badge variant="warning">
            <AlertTriangle size={12} className="mr-1" />
            Sensitive
          </Badge>
        )}
      </div>

      {/* Symbol image + name */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-surface-raised p-2 flex items-center justify-center">
          <Image
            src={`/symbols/${symbol.svgFilename}`}
            alt={symbol.name}
            width={48}
            height={48}
            className="opacity-90"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-text-primary">{symbol.name}</h3>
          <p className="text-sm text-accent italic">&ldquo;{symbol.literal}&rdquo;</p>
          <p className="mt-1 text-sm text-text-secondary">{symbol.coreMeaning}</p>
        </div>
      </div>

      {/* Personalized reasoning */}
      {suggestion.reasoning && (
        <div className="rounded-lg bg-accent-subtle p-3">
          <p className="text-xs font-medium text-accent mb-1">Why this symbol</p>
          <p className="text-sm text-text-secondary">{suggestion.reasoning}</p>
        </div>
      )}

      {/* Personalized meaning */}
      {suggestion.personalizedMeaning && (
        <p className="text-sm text-text-secondary">
          <span className="font-medium text-text-primary">For you:</span>{" "}
          {suggestion.personalizedMeaning}
        </p>
      )}

      {/* Cultural note */}
      <p className="text-xs text-text-tertiary italic border-t border-border pt-3">
        {symbol.culturalNote}
      </p>

      {/* Actions */}
      <div className="mt-auto pt-2">
        {symbol.sensitive ? (
          <Button
            variant="terracotta"
            size="sm"
            className="w-full"
            onClick={() => onSensitiveClick?.(symbolId)}
          >
            <AlertTriangle size={14} className="mr-1.5" />
            Review & Customize
          </Button>
        ) : (
          <Link href={`/customize?symbol=${symbolId}`} className="block">
            <Button variant="primary" size="sm" className="w-full">
              Customize with this symbol
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
