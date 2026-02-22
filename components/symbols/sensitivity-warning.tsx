"use client";

import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getSymbolById } from "@/data/symbols";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

type SensitivityWarningProps = {
  symbolId: string | null;
  onClose: () => void;
};

export function SensitivityWarning({ symbolId, onClose }: SensitivityWarningProps) {
  const router = useRouter();
  const symbol = symbolId ? getSymbolById(symbolId) : null;

  if (!symbol) return null;

  const handleConfirm = () => {
    console.log(`[Sankofa] User confirmed sensitive symbol: ${symbol.id}`);
    router.push(`/customize?symbol=${symbol.id}`);
    onClose();
  };

  return (
    <Dialog open={!!symbolId} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 text-terracotta">
          <AlertTriangle size={24} />
          <h2 className="text-lg font-semibold">Cultural Sensitivity Notice</h2>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-text-primary">
            <span className="font-semibold">{symbol.name}</span> carries deep cultural
            significance that requires thoughtful consideration.
          </p>

          {symbol.usageCautions && (
            <div className="rounded-lg bg-terracotta-subtle border border-terracotta/20 p-3">
              <p className="text-sm text-text-secondary">{symbol.usageCautions}</p>
            </div>
          )}

          <p className="text-sm text-text-secondary">
            {symbol.culturalNote}
          </p>

          <p className="text-xs text-text-tertiary">
            By proceeding, you acknowledge the cultural weight of this symbol and
            commit to wearing it with respect and understanding.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="ghost" size="md" onClick={onClose} className="flex-1">
            Choose another
          </Button>
          <Button variant="terracotta" size="md" onClick={handleConfirm} className="flex-1">
            I understand, proceed
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
