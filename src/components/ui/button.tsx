
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform hover:scale-105 active:scale-98 shadow-lg hover:shadow-xl hover:brightness-110 duration-300 text-center relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:from-emerald-600 hover:to-blue-600 font-bold border-0",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-emerald-500 bg-transparent text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-600",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300",
        ghost: "text-gray-900 hover:bg-gray-100 hover:text-gray-900 shadow-none hover:shadow-md hover:scale-102",
        link: "text-emerald-600 underline-offset-4 hover:underline shadow-none hover:shadow-none hover:scale-100",
        gradient: "bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:from-emerald-600 hover:to-blue-600 font-black border-0",
        urgent: "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 font-black animate-pulse border-0",
      },
      size: {
        default: "h-10 px-4 py-2 min-h-[40px] text-sm",
        sm: "h-9 rounded-md px-3 min-h-[36px] text-sm",
        lg: "h-12 rounded-lg px-8 text-lg min-h-[48px]",
        xl: "h-16 rounded-xl px-12 text-xl min-h-[64px]",
        icon: "h-10 w-10",
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
  ({ className, variant, size, asChild = false, children, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()
      
      setRipples(prev => [...prev, { x, y, id }])
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== id))
      }, 600)

      onClick?.(e)
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
            }}
          />
        ))}
        <span className="relative z-10 flex items-center justify-center gap-2 text-inherit font-inherit">
          {children}
        </span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
