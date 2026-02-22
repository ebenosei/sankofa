"use client";

import { useState, useRef, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type IntentInputProps = {
  onSubmit: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
};

const EXAMPLE_PROMPTS = [
  "I'm starting a new chapter in my life",
  "I want to honor my grandmother's memory",
  "I need strength to face a difficult decision",
  "I'm celebrating a new business venture",
];

export function IntentInput({ onSubmit, isLoading, disabled }: IntentInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
  };

  const handleExampleClick = (prompt: string) => {
    setMessage(prompt);
    textareaRef.current?.focus();
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about a feeling, moment, or intention..."
          rows={3}
          disabled={disabled || isLoading}
          className={cn(
            "w-full resize-none rounded-xl border border-border bg-surface p-4 pr-14 text-sm text-text-primary",
            "placeholder:text-text-tertiary",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
            "disabled:opacity-50 disabled:pointer-events-none",
            "transition-colors duration-150"
          )}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button
          type="submit"
          size="sm"
          disabled={!message.trim() || isLoading || disabled}
          className="absolute bottom-3 right-3"
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
        </Button>
      </form>

      {!disabled && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs text-text-tertiary">Try:</span>
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleExampleClick(prompt)}
              className="rounded-full border border-border px-3 py-1 text-xs text-text-secondary hover:border-border-hover hover:text-text-primary transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
