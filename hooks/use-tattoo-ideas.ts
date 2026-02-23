"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { TattooIdeasResultSchema } from "@/schemas/tattoo";
import { useState } from "react";

export type TattooStatus = "idle" | "loading" | "streaming" | "complete" | "error";

export function useTattooIdeas() {
  const [status, setStatus] = useState<TattooStatus>("idle");

  const { object, submit, isLoading, stop } = useObject({
    api: "/api/tattoo-ideas",
    schema: TattooIdeasResultSchema,
    onFinish: ({ object, error }) => {
      if (error) {
        setStatus("error");
      } else if (object) {
        setStatus("complete");
        console.log("[Medea] Tattoo ideas generated:", object);
      }
    },
    onError: () => {
      setStatus("error");
    },
  });

  const generateIdeas = (symbolId: string, style?: string, placement?: string) => {
    setStatus("loading");
    submit({ symbolId, style, placement });
    setTimeout(() => {
      setStatus((prev) => (prev === "loading" ? "streaming" : prev));
    }, 500);
  };

  const reset = () => setStatus("idle");

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result: object as any,
    status,
    isLoading,
    generateIdeas,
    stop,
    reset,
  };
}
