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
      <div className="text-center py-16 space-y-4">
        <p className="text-text-secondary">
          No symbol selected. Start by discovering symbols that speak to you.
        </p>
        <Link href="/">
          <Button variant="primary">Discover symbols</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    console.log("[Sankofa] Product added to cart:", {
      ...config,
      symbolName: symbol.name,
    });
    setAdded(true);
  };

  return (
    <div className="space-y-8">
      {/* Back nav */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft size={14} />
        Back to discover
      </Link>

      {/* Symbol header */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-surface-raised p-3 flex items-center justify-center border border-border">
          <Image
            src={`/symbols/${symbol.svgFilename}`}
            alt={symbol.name}
            width={56}
            height={56}
            className="opacity-90"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{symbol.name}</h1>
          <p className="text-sm text-accent italic">&ldquo;{symbol.literal}&rdquo;</p>
          <p className="mt-1 text-sm text-text-secondary">{symbol.coreMeaning}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {symbol.lifeDomains.map((domain) => (
              <Badge key={domain} variant="default">
                {domain}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Configuration */}
        <div className="space-y-6">
          {/* Custom name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Engrave your name
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

          {/* Add to cart */}
          <div className="pt-4">
            {added ? (
              <div className="flex items-center gap-2 rounded-xl border border-success bg-success-subtle p-4">
                <Check size={20} className="text-success" />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Added to your collection!
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

        {/* Right: Preview */}
        <div>
          <BraceletPreview
            symbolSvg={`/symbols/${symbol.svgFilename}`}
            symbolName={symbol.name}
            customName={config.customName}
            dayName={config.dayName}
            material={config.material}
          />

          {/* Cultural note */}
          <div className="mt-6 rounded-xl border border-border bg-surface p-4">
            <p className="text-xs font-medium text-accent mb-1">Cultural Context</p>
            <p className="text-sm text-text-secondary">{symbol.culturalNote}</p>
            {symbol.secondaryMeanings.length > 0 && (
              <div className="mt-3 space-y-1">
                <p className="text-xs text-text-tertiary">Also interpreted as:</p>
                <ul className="list-disc list-inside text-sm text-text-secondary space-y-0.5">
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
        <div className="text-center py-16 text-text-secondary">Loading...</div>
      }
    >
      <CustomizeContent />
    </Suspense>
  );
}
