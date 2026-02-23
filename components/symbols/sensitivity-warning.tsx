"use client";

import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getSymbolById } from "@/data/symbols";
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
    console.log(`[Medea] User confirmed sensitive symbol: ${symbol.id}`);
    router.push(`/customize?symbol=${symbol.id}`);
    onClose();
  };

  return (
    <Dialog open={!!symbolId} onClose={onClose}>
      <div className="flex flex-col gap-5">
        <div className="space-y-1">
          <h2 className="font-serif text-xl text-text-primary">Cultural Context</h2>
          <div className="h-px w-12 bg-heritage-green/40" />
        </div>

        <div className="space-y-4">
          <p className="text-sm text-text-primary leading-relaxed">
            <span className="font-semibold">{symbol.name}</span> carries deep cultural
            significance that requires thoughtful consideration.
          </p>

          {symbol.usageCautions && (
            <div className="border-l-2 border-heritage-green pl-4">
              <p className="text-sm text-text-secondary leading-relaxed">{symbol.usageCautions}</p>
            </div>
          )}

          <p className="text-sm text-text-secondary leading-relaxed">
            {symbol.culturalNote}
          </p>

          <p className="text-xs text-text-tertiary italic">
            By proceeding, you acknowledge the cultural weight of this symbol and
            commit to wearing it with respect and understanding.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="ghost" size="md" onClick={onClose} className="flex-1">
            Choose another
          </Button>
          <Button variant="heritage" size="md" onClick={handleConfirm} className="flex-1">
            I understand, proceed
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
