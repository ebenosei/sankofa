import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

const variants = {
  default: "bg-accent-subtle text-accent border-accent/15",
  warning: "bg-terracotta-subtle text-terracotta border-terracotta/15",
  success: "bg-success-subtle text-success border-success/15",
  heritage: "bg-heritage-green-subtle text-heritage-green border-heritage-green/15",
} as const;

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof typeof variants;
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
