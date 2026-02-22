"use client";

import { useState, useCallback } from "react";
import type { DayNameResult } from "@/schemas/day-name";
import type { Material } from "@/lib/constants";

export type ProductConfigState = {
  symbolId: string;
  customName: string;
  dayName: DayNameResult | null;
  material: Material;
};

export function useProductConfig(initialSymbolId: string) {
  const [config, setConfig] = useState<ProductConfigState>({
    symbolId: initialSymbolId,
    customName: "",
    dayName: null,
    material: "gold",
  });

  const setCustomName = useCallback((name: string) => {
    setConfig((prev) => ({ ...prev, customName: name.slice(0, 20) }));
  }, []);

  const setMaterial = useCallback((material: Material) => {
    setConfig((prev) => ({ ...prev, material }));
  }, []);

  const setDayName = useCallback((dayName: DayNameResult | null) => {
    setConfig((prev) => ({ ...prev, dayName }));
  }, []);

  return { config, setCustomName, setMaterial, setDayName };
}
