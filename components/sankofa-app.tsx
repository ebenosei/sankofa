"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInterpretation } from "@/hooks/use-interpretation";
import { IntentInput } from "@/components/chat/intent-input";
import { SymbolGrid } from "@/components/symbols/symbol-grid";
import { SensitivityWarning } from "@/components/symbols/sensitivity-warning";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SankofahApp() {
  const { result, status, interpret, isLoading, reset } = useInterpretation();
  const [sensitiveSymbolId, setSensitiveSymbolId] = useState<string | null>(null);

  const showResults = status !== "idle";

  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <section className="text-center space-y-3 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
          Wear Your Story
        </h1>
        <p className="text-text-secondary max-w-xl mx-auto">
          Describe a feeling, moment, or intention — and discover Adinkra symbols
          that speak to your journey. Each symbol carries centuries of wisdom,
          waiting to become part of your story.
        </p>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text-primary">
                {status === "complete"
                  ? "Symbols for your journey"
                  : "Discovering symbols..."}
              </h2>
              {status === "complete" && (
                <Button variant="ghost" size="sm" onClick={reset}>
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
