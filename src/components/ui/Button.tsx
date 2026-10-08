import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variants: Record<string, string> = {
  primary: "bg-ink text-paper hover:bg-charcoal",
  secondary: "bg-paper text-ink hover:bg-paper-dim border border-ink",
  outline: "bg-transparent text-ink border border-ink/40 hover:border-ink",
  ghost: "bg-transparent text-ink hover:bg-black/5",
};

const sizes: Record<string, string> = {
  sm: "text-xs px-4 py-2.5 tracking-[0.08em]",
  md: "text-[13px] px-6 py-3.5 tracking-[0.1em]",
  lg: "text-sm px-8 py-4.5 tracking-[0.12em]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 uppercase font-medium whitespace-nowrap transition-all duration-300 ease-out disabled:opacity-40 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
