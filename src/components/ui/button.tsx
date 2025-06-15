import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-bold ring-offset-background shadow transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supaGreen focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-supaGreen text-black hover:bg-[#32bf73]",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border-2 border-supaGreen bg-black text-white hover:bg-[#101113] hover:border-[#32bf73]",
        secondary: "bg-secondary text-white hover:bg-accent",
        ghost: "bg-transparent text-supaGreen shadow-none hover:bg-[#181F1B]",
        link: "bg-transparent text-supaGreen underline-offset-4 hover:underline shadow-none px-0",
        gradient: "bg-gradient-to-r from-[#3ECF8E] to-[#32bf73] text-black font-black",
        urgent: "bg-gradient-to-r from-red-500 to-orange-500 text-white font-black animate-pulse",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-xl px-8 text-lg",
        xl: "h-16 rounded-2xl px-12 text-xl",
        icon: "h-10 w-10 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
