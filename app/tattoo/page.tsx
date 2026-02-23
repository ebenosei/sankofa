"use client";

import { useState } from "react";
import Image from "next/image";
import { ADINKRA_SYMBOLS } from "@/data/symbols";
import { TattooStyleSelector } from "@/components/tattoo/style-selector";
import { TattooPlacementSelector } from "@/components/tattoo/placement-selector";
import { TattooResults } from "@/components/tattoo/tattoo-results";
import { AdinkraDivider } from "@/components/ui/adinkra-divider";
import { Button } from "@/components/ui/button";
import { useTattooIdeas } from "@/hooks/use-tattoo-ideas";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function TattooPage() {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [style, setStyle] = useState<string | undefined>();
  const [placement, setPlacement] = useState<string | undefined>();
  const { result, status, isLoading, generateIdeas, reset } = useTattooIdeas();

  const selectedSymbolData = selectedSymbol
    ? ADINKRA_SYMBOLS.find((s) => s.id === selectedSymbol)
    : null;

  const handleGenerate = () => {
    if (!selectedSymbol) return;
    generateIdeas(selectedSymbol, style || undefined, placement || undefined);
  };

  const handleReset = () => {
    setSelectedSymbol(null);
    setStyle(undefined);
    setPlacement(undefined);
    reset();
  };

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6 pt-16 pb-4">
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-text-primary tracking-tight">
          Tattoo Ideas
        </h1>
        <p className="text-text-secondary max-w-xl mx-auto text-base leading-relaxed">
          Explore how Adinkra symbols translate into meaningful body art.
          Select a symbol and discover personalized tattoo designs.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
          <Image
            src="/symbols/duafe.svg"
            alt=""
            width={16}
            height={16}
            className="opacity-15"
          />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
        </div>
      </section>

      {/* Symbol selection grid */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl text-text-primary">Choose Your Symbol</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {ADINKRA_SYMBOLS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedSymbol(s.id);
                if (status !== "idle") reset();
              }}
              className={cn(
                "flex flex-col items-center gap-1.5 p-3 rounded-sm border transition-all duration-200",
                selectedSymbol === s.id
                  ? "border-accent bg-accent-subtle shadow-sm"
                  : "border-border bg-white hover:border-accent/40"
              )}
            >
              <Image
                src={`/symbols/${s.svgFilename}`}
                alt={s.name}
                width={36}
                height={36}
                className="opacity-75"
              />
              <p className="text-[10px] text-text-secondary truncate w-full text-center">
                {s.name}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Selected symbol detail + options */}
      {selectedSymbolData && (
        <>
          <AdinkraDivider symbol={selectedSymbolData.id} />

          {/* Symbol info */}
          <section className="text-center space-y-2">
            <h2 className="font-serif text-2xl text-text-primary">{selectedSymbolData.name}</h2>
            <p className="text-sm text-accent italic">&ldquo;{selectedSymbolData.literal}&rdquo;</p>
            <p className="text-sm text-text-secondary max-w-lg mx-auto leading-relaxed">
              {selectedSymbolData.coreMeaning}
            </p>
          </section>

          {/* Style + Placement selectors */}
          <TattooStyleSelector selected={style} onSelect={(s) => setStyle(s || undefined)} />
          <TattooPlacementSelector selected={placement} onSelect={(p) => setPlacement(p || undefined)} />

          {/* Generate button */}
          <div className="flex justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleGenerate}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Tattoo Ideas"
              )}
            </Button>
            {status === "complete" && (
              <Button variant="ghost" size="lg" onClick={handleReset}>
                Start Over
              </Button>
            )}
          </div>
        </>
      )}

      {/* Results */}
      {status !== "idle" && selectedSymbolData && (
        <>
          <AdinkraDivider />
          <TattooResults
            result={result}
            status={status}
            symbolSvg={`/symbols/${selectedSymbolData.svgFilename}`}
            symbolName={selectedSymbolData.name}
          />
        </>
      )}
    </div>
  );
}
