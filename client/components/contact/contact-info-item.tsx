import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type ContactInfoItemProps = {
  icon: LucideIcon
  label: string
  value: string
  href?: string
  className?: string
}

export function ContactInfoItem({
  icon: Icon,
  label,
  value,
  href,
  className,
}: ContactInfoItemProps) {
  const valueElement = href ? (
    <a
      href={href}
      className="text-base font-bold leading-snug text-white transition-opacity hover:opacity-90 sm:text-lg"
    >
      {value}
    </a>
  ) : (
    <p className="text-base font-bold leading-snug text-white sm:text-lg">{value}</p>
  )

  return (
    <div
      className={cn("flex items-start gap-3", className)}
    >
      <Icon
        className="size-6 shrink-0 text-white"
        strokeWidth={1.75}
        aria-hidden
      />
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-lg font-normal text-white">{label}</p>
        {valueElement}
      </div>
    </div>
  )
}
