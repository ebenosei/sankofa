"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSymbolById } from "@/data/symbols";
import { useProductConfig } from "@/hooks/use-product-config";
import { BraceletPreview } from "@/components/customize/bracelet-preview";
import { MaterialSelector } from "@/components/customize/material-selector";
import { DayNameSection } from "@/components/customize/day-name-section";
import { AdinkraDivider } from "@/components/ui/adinkra-divider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingBag, Check } from "lucide-react";

function CustomizeContent() {
  const searchParams = useSearchParams();
  const symbolId = searchParams.get("symbol") ?? "";
  const symbol = getSymbolById(symbolId);
  const { config, setCustomName, setMaterial, setDayName } = useProductConfig(symbolId);
  const [added, setAdded] = useState(false);

  if (!symbol) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-text-secondary">
          No symbol selected. Start by discovering symbols that speak to you.
        </p>
        <Link href="/">
          <Button variant="primary">Discover Symbols</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    console.log("[Medea] Product added to collection:", {
      ...config,
      symbolName: symbol.name,
    });
    setAdded(true);
  };

  return (
    <div className="space-y-12">
      {/* Back nav */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs tracking-[0.1em] uppercase text-text-secondary hover:text-accent transition-colors"
      >
        <ArrowLeft size={12} />
        Back to Discover
      </Link>

      {/* Symbol header */}
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0 w-24 h-24 rounded-sm bg-surface-raised p-4 flex items-center justify-center border border-border">
          <Image
            src={`/symbols/${symbol.svgFilename}`}
            alt={symbol.name}
            width={64}
            height={64}
            className="opacity-80"
          />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl text-text-primary">{symbol.name}</h1>
          <p className="text-sm text-accent italic">&ldquo;{symbol.literal}&rdquo;</p>
          <p className="text-sm text-text-secondary leading-relaxed">{symbol.coreMeaning}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {symbol.lifeDomains.map((domain) => (
              <Badge key={domain} variant="default">
                {domain}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <AdinkraDivider symbol={symbol.id} />

      {/* Two-column layout */}
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left: Configuration */}
        <div className="space-y-8">
          {/* Custom name */}
          <div className="space-y-2">
            <label className="font-serif text-base text-text-primary">
              Engrave Your Name
            </label>
            <Input
              placeholder="Your name (max 20 characters)"
              value={config.customName}
              onChange={(e) => setCustomName(e.target.value)}
              maxLength={20}
            />
            <p className="text-xs text-text-tertiary">
              {config.customName.length}/20 characters
            </p>
          </div>

          {/* Akan day name */}
          <DayNameSection
            dayName={config.dayName}
            onDayNameChange={setDayName}
          />

          {/* Material */}
          <MaterialSelector
            selected={config.material}
            onSelect={setMaterial}
          />

          {/* Add to collection */}
          <div className="pt-4">
            {added ? (
              <div className="flex items-center gap-3 rounded-sm border border-success/30 bg-success-subtle p-5">
                <Check size={20} className="text-success" />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Added to your collection
                  </p>
                  <p className="text-xs text-text-tertiary">
                    This is an MVP preview. Full checkout coming soon.
                  </p>
                </div>
              </div>
            ) : (
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={16} className="mr-2" />
                Add to Collection
              </Button>
            )}
          </div>
        </div>

        {/* Right: Preview + Cultural context */}
        <div className="space-y-8">
          <BraceletPreview
            symbolSvg={`/symbols/${symbol.svgFilename}`}
            symbolName={symbol.name}
            customName={config.customName}
            dayName={config.dayName}
            material={config.material}
          />

          {/* Cultural note */}
          <div className="rounded-sm border border-border bg-white p-6 space-y-4">
            <h3 className="font-serif text-base text-text-primary">Cultural Context</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{symbol.culturalNote}</p>
            {symbol.secondaryMeanings.length > 0 && (
              <div className="space-y-2 border-t border-border pt-4">
                <p className="text-xs text-text-tertiary uppercase tracking-wider">Also interpreted as</p>
                <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                  {symbol.secondaryMeanings.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomizePage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-text-secondary font-serif italic">Loading...</div>
      }
    >
      <CustomizeContent />
    </Suspense>
  );
}
