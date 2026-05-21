import { cn } from "@/lib/utils"

type PageContainerProps = {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
}

export function PageContainer({
  children,
  className,
  fullWidth = false,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        fullWidth ? "max-w-full" : "max-w-content",
        className
      )}
    >
      {children}
    </div>
  )
}
