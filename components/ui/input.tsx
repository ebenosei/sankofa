"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-sm border border-border bg-white px-4 py-3 text-sm text-text-primary",
        "placeholder:text-text-tertiary",
        "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent",
        "disabled:opacity-50 disabled:pointer-events-none",
        "transition-colors duration-200",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
