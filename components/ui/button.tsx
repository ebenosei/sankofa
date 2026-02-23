"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-hover font-medium tracking-wide uppercase text-xs",
  secondary:
    "bg-white text-text-primary border border-border hover:border-accent hover:text-accent",
  ghost:
    "text-text-secondary hover:text-accent hover:bg-transparent",
  terracotta:
    "bg-terracotta text-white hover:bg-terracotta/90 font-medium tracking-wide uppercase text-xs",
  heritage:
    "bg-heritage-green text-white hover:bg-heritage-green/90 font-medium tracking-wide uppercase text-xs",
  outline:
    "border border-accent text-accent hover:bg-accent hover:text-white",
} as const;

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-xs",
  lg: "px-8 py-3.5 text-sm",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-sm transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    />
  )
);
Button.displayName = "Button";
