
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Supabase-style variants
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-supaGreen focus:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        // Default: Supabase green
        default: "bg-supaGreen text-black border-transparent",
        // Secondary: Slightly muted for less emphasis
        secondary: "bg-[#101113] text-white border-[#222]",
        // Destructive: errors, rejects, etc
        destructive: "bg-red-600 text-white border-transparent",
        // Outline: no fill, only border
        outline: "bg-transparent text-white border-supaGreen",
        // Info/Other (can add as needed)
        ghost: "bg-[#181F1B] text-supaGreen border-transparent",
        // Add more variants if you want e.g. success, warning etc, depending on your needs
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
export { Badge, badgeVariants }
