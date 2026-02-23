"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSymbolById } from "@/data/symbols";
import { Info, Sparkles } from "lucide-react";
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
      <div className="animate-pulse rounded-sm border border-border bg-white p-8 h-64" />
    );
  }

  const confidence = suggestion.confidence ?? 0;
  const confidencePercent = Math.round(confidence * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.12 }}
      className={cn(
        "group relative rounded-sm border border-border bg-white p-8",
        "hover:border-accent/40 hover:shadow-md transition-all duration-300",
        "flex flex-col gap-5"
      )}
    >
      {/* Badges */}
      <div className="flex items-center justify-between">
        <Badge variant={index === 0 ? "default" : "success"}>
          <Sparkles size={10} className="mr-1" />
          {confidencePercent}% match
        </Badge>
        {symbol.sensitive && (
          <Badge variant="heritage">
            <Info size={10} className="mr-1" />
            Cultural context
          </Badge>
        )}
      </div>

      {/* Symbol image centered */}
      <div className="flex-shrink-0 w-20 h-20 rounded-sm bg-surface-raised p-3 flex items-center justify-center mx-auto">
        <Image
          src={`/symbols/${symbol.svgFilename}`}
          alt={symbol.name}
          width={56}
          height={56}
          className="opacity-80"
        />
      </div>

      {/* Name + literal */}
      <div className="text-center">
        <h3 className="font-serif text-xl text-text-primary">{symbol.name}</h3>
        <p className="text-sm text-accent italic mt-1">&ldquo;{symbol.literal}&rdquo;</p>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">{symbol.coreMeaning}</p>
      </div>

      {/* Reasoning — gold left border */}
      {suggestion.reasoning && (
        <div className="border-l-2 border-accent pl-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider mb-1">Why this symbol</p>
          <p className="text-sm text-text-secondary leading-relaxed">{suggestion.reasoning}</p>
        </div>
      )}

      {/* Personalized meaning */}
      {suggestion.personalizedMeaning && (
        <p className="text-sm text-text-secondary leading-relaxed">
          <span className="font-medium text-text-primary">For you:</span>{" "}
          {suggestion.personalizedMeaning}
        </p>
      )}

      {/* Cultural note */}
      <p className="text-xs text-text-tertiary italic border-t border-border pt-4">
        {symbol.culturalNote}
      </p>

      {/* Actions */}
      <div className="mt-auto pt-2">
        {symbol.sensitive ? (
          <Button
            variant="heritage"
            size="md"
            className="w-full"
            onClick={() => onSensitiveClick?.(symbolId)}
          >
            Review & Customize
          </Button>
        ) : (
          <Link href={`/customize?symbol=${symbolId}`} className="block">
            <Button variant="primary" size="md" className="w-full">
              Customize
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
