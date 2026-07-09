import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-hairline-strong bg-card focus-visible:border-primary focus-visible:ring-ring aria-invalid:ring-destructive/20 aria-invalid:border-destructive h-12 w-full min-w-0 rounded-md border px-4 py-2 text-base transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:outline-none aria-invalid:ring-1 file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
