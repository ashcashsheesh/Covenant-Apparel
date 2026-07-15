import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 text-xs uppercase tracking-wider bg-stone/10 text-stone",
        className
      )}
    >
      {children}
    </span>
  );
}
