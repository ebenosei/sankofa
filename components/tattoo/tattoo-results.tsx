"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TattooPreview } from "./tattoo-preview";
import { Heart } from "lucide-react";
import type { TattooStatus } from "@/hooks/use-tattoo-ideas";

/* eslint-disable @typescript-eslint/no-explicit-any */
type TattooResultsProps = {
  result: any;
  status: TattooStatus;
  symbolSvg: string;
  symbolName: string;
};

export function TattooResults({ result, status, symbolSvg, symbolName }: TattooResultsProps) {
  if (status === "loading") {
    return (
      <div className="space-y-6">
        <p className="text-sm text-text-secondary animate-pulse font-serif italic">
          Designing your tattoo ideas...
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-72 rounded-sm" />
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
              className="rounded-sm border border-border bg-white p-6 space-y-5 hover:shadow-md hover:border-accent/30 transition-all duration-300"
            >
              {/* Visual preview */}
              <div className="flex justify-center py-2">
                <TattooPreview
                  symbolSvg={symbolSvg}
                  symbolName={symbolName}
                  style={idea.style}
                  placement={idea.placement}
                />
              </div>

              {/* Style + placement badges */}
              <div className="flex flex-wrap gap-2 justify-center">
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

        {/* Tattoo artist disclaimer */}
        <div className="rounded-sm border border-border bg-surface-raised p-6 text-center space-y-3">
          <div className="flex justify-center">
            <Heart size={18} className="text-accent" />
          </div>
          <h3 className="font-serif text-base text-text-primary">Support Real Tattoo Artists</h3>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xl mx-auto">
            These AI-generated ideas are meant to serve as inspiration and a starting point for
            conversations with your tattoo artist — not to replace their craft. Professional tattoo
            artists bring years of expertise in skin, ink, placement, and healing that no AI can
            replicate. Please bring these concepts to a qualified artist who can refine them into
            a design that is truly yours.
          </p>
          <p className="text-xs text-text-tertiary italic">
            We encourage you to credit and fairly compensate the artists who bring your vision to life.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
