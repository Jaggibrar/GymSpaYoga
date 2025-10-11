
import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      expand={true}
      richColors={true}
      closeButton={true}
      duration={4000}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-card-foreground group-[.toaster]:border-border group-[.toaster]:shadow-strong group-[.toaster]:rounded-xl group-[.toaster]:backdrop-blur-xl group-[.toaster]:animate-slide-up",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-sm",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:hover:bg-primary/90 group-[.toast]:rounded-lg group-[.toast]:font-semibold group-[.toast]:transition-all",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:hover:bg-muted/80 group-[.toast]:rounded-lg group-[.toast]:transition-all",
          error: "group-[.toast]:bg-red-50 dark:group-[.toast]:bg-red-950 group-[.toast]:text-red-900 dark:group-[.toast]:text-red-100 group-[.toast]:border-red-200 dark:group-[.toast]:border-red-800",
          success: "group-[.toast]:bg-green-50 dark:group-[.toast]:bg-green-950 group-[.toast]:text-green-900 dark:group-[.toast]:text-green-100 group-[.toast]:border-green-200 dark:group-[.toast]:border-green-800",
          warning: "group-[.toast]:bg-yellow-50 dark:group-[.toast]:bg-yellow-950 group-[.toast]:text-yellow-900 dark:group-[.toast]:text-yellow-100 group-[.toast]:border-yellow-200 dark:group-[.toast]:border-yellow-800",
          info: "group-[.toast]:bg-blue-50 dark:group-[.toast]:bg-blue-950 group-[.toast]:text-blue-900 dark:group-[.toast]:text-blue-100 group-[.toast]:border-blue-200 dark:group-[.toast]:border-blue-800",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
