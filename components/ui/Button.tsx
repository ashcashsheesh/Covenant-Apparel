import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-charcoal text-cream hover:bg-charcoal/90": variant === "primary",
            "bg-stone text-cream hover:bg-stone/90": variant === "secondary",
            "border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream":
              variant === "outline",
            "text-charcoal hover:bg-charcoal/5": variant === "ghost",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-sm tracking-wide uppercase": size === "md",
            "px-8 py-4 text-base tracking-wide uppercase": size === "lg",
          },
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

export { Button };
