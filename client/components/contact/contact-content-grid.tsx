import { cn } from "@/lib/utils"
import { ContactFormCard } from "./contact-form-card"
import { ContactInfoCard } from "./contact-info-card"

type ContactContentGridProps = {
  className?: string
}

export function ContactContentGrid({ className }: ContactContentGridProps) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-5 lg:grid-cols-[580px_minmax(0,1fr)]",
        className
      )}
    >
      <ContactInfoCard />
      <ContactFormCard />
    </div>
  )
}
