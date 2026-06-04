import { cn } from "@/lib/utils"
import { ContactContentGrid } from "./contact-content-grid"
import { ContactHeader } from "./contact-header"
import { ContactMap } from "./contact-map"

type ContactPageContentProps = {
  className?: string
}

export function ContactPageContent({ className }: ContactPageContentProps) {
  return (
    <div className={cn("flex flex-col gap-10", className)}>
      <ContactHeader />
      <ContactContentGrid />
      <ContactMap />
    </div>
  )
}
