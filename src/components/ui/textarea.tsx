import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border-2",
          "border-[hsl(var(--primary)/0.3)]",               // Light primary by default
          "focus:border-[hsl(var(--primary))]",             // Full primary on focus
          "bg-background px-3 py-2 text-sm placeholder:text-muted-foreground",
          "focus:outline-none",                             // Remove ring outline
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
