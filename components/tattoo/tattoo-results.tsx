"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { TattooStatus } from "@/hooks/use-tattoo-ideas";

/* eslint-disable @typescript-eslint/no-explicit-any */
type TattooResultsProps = {
  result: any;
  status: TattooStatus;
};

export function TattooResults({ result, status }: TattooResultsProps) {
  if (status === "loading") {
    return (
      <div className="space-y-6">
        <p className="text-sm text-text-secondary animate-pulse font-serif italic">
          Designing your tattoo ideas...
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-56 rounded-sm" />
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-sm border border-border bg-white p-8 text-center">
        <p className="text-sm text-text-secondary">
          Something went wrong generating tattoo ideas. Please try again.
        </p>
      </div>
    );
  }

  const ideas = result?.ideas as Array<{
    style?: string;
    placement?: string;
    description?: string;
    designNotes?: string;
    culturalConsideration?: string;
  }> | undefined;

  const generalAdvice = result?.generalAdvice as string | undefined;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-8"
      >
        <h2 className="font-serif text-2xl text-text-primary">Your Tattoo Ideas</h2>

        {/* Idea cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {ideas?.map((idea, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="rounded-sm border border-border bg-white p-6 space-y-4 hover:shadow-md hover:border-accent/30 transition-all duration-300"
            >
              {/* Style + placement badges */}
              <div className="flex flex-wrap gap-2">
                {idea.style && (
                  <Badge variant="default">{idea.style.replace(/-/g, " ")}</Badge>
                )}
                {idea.placement && (
                  <Badge variant="heritage">{idea.placement.replace(/-/g, " ")}</Badge>
                )}
              </div>

              {/* Description */}
              {idea.description && (
                <p className="text-sm text-text-primary leading-relaxed">
                  {idea.description}
                </p>
              )}

              {/* Design notes */}
              {idea.designNotes && (
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-xs text-text-tertiary uppercase tracking-wider mb-1">Design Notes</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{idea.designNotes}</p>
                </div>
              )}

              {/* Cultural consideration */}
              {idea.culturalConsideration && (
                <p className="text-xs text-text-tertiary italic border-t border-border pt-3">
                  {idea.culturalConsideration}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* General advice */}
        {generalAdvice && (
          <div className="rounded-sm border border-heritage-green/20 bg-heritage-green-subtle p-6">
            <h3 className="font-serif text-base text-heritage-green mb-2">A Note on Cultural Respect</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{generalAdvice}</p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
