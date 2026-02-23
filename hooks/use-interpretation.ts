"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { InterpretationResultSchema } from "@/schemas/interpretation";
import { useState } from "react";

export type InterpretationStatus = "idle" | "loading" | "streaming" | "complete" | "error";

export function useInterpretation() {
  const [status, setStatus] = useState<InterpretationStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { object, submit, isLoading, stop } = useObject({
    api: "/api/interpret",
    schema: InterpretationResultSchema,
    onFinish: ({ object, error }) => {
      if (error) {
        setStatus("error");
        setErrorMessage(
          error.message?.includes("credit")
            ? "API credits are low. The site owner needs to add credits."
            : "Something went wrong. Please try again."
        );
      } else if (object) {
        setStatus("complete");
        console.log("[Sankofa] Interpretation complete:", object);
      }
    },
    onError: (error) => {
      setStatus("error");
      setErrorMessage(
        error.message?.includes("credit")
          ? "API credits are low. The site owner needs to add credits."
          : "Failed to connect. Please check your connection and try again."
      );
    },
  });

  const interpret = (message: string) => {
    setStatus("loading");
    setErrorMessage(null);
    submit({ message });
    // After a brief delay, switch to streaming if still loading
    setTimeout(() => {
      setStatus((prev) => (prev === "loading" ? "streaming" : prev));
    }, 500);
  };

  const reset = () => {
    setStatus("idle");
    setErrorMessage(null);
  };

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result: object as any,
    status,
    errorMessage,
    isLoading,
    interpret,
    stop,
    reset,
  };
}
