"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useInterpretation } from "@/hooks/use-interpretation";
import { IntentInput } from "@/components/chat/intent-input";
import { SymbolGrid } from "@/components/symbols/symbol-grid";
import { SensitivityWarning } from "@/components/symbols/sensitivity-warning";
import { AdinkraDivider } from "@/components/ui/adinkra-divider";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MedeaApp() {
  const { result, status, interpret, isLoading, reset } = useInterpretation();
  const [sensitiveSymbolId, setSensitiveSymbolId] = useState<string | null>(null);

  const showResults = status !== "idle";

  return (
    <div className="flex flex-col gap-16">
      {/* Hero */}
      <section className="text-center space-y-6 pt-16 pb-4">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-text-primary tracking-tight">
          Wear Your Story
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-base leading-relaxed">
          Describe a feeling, moment, or intention — and discover Adinkra symbols
          that speak to your journey. Each symbol carries centuries of wisdom,
          waiting to become part of your story.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
          <Image
            src="/symbols/gye-nyame.svg"
            alt=""
            width={16}
            height={16}
            className="opacity-15"
          />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
        </div>
      </section>

      {/* Input */}
      <section className="max-w-2xl mx-auto w-full">
        <IntentInput
          onSubmit={interpret}
          isLoading={isLoading}
          disabled={status === "streaming"}
        />
      </section>

      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="space-y-8"
          >
            <AdinkraDivider symbol="sankofa" />

            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-text-primary">
                {status === "complete"
                  ? "Symbols for Your Journey"
                  : "Discovering symbols..."}
              </h2>
              {status === "complete" && (
                <Button variant="ghost" size="sm" onClick={reset} className="text-text-secondary">
                  <RotateCcw size={14} className="mr-1.5" />
                  Start over
                </Button>
              )}
            </div>

            <SymbolGrid
              result={result}
              status={status}
              onSensitiveClick={setSensitiveSymbolId}
            />
          </motion.section>
        )}
      </AnimatePresence>

      {/* Sensitivity warning dialog */}
      <SensitivityWarning
        symbolId={sensitiveSymbolId}
        onClose={() => setSensitiveSymbolId(null)}
      />
    </div>
  );
}
