import { CONTACT_MAP_EMBED_URL } from "@/lib/contact-data"
import { cn } from "@/lib/utils"

type ContactMapProps = {
  className?: string
}

export function ContactMap({ className }: ContactMapProps) {
  return (
    <section
      className={cn("w-full overflow-hidden rounded-xl", className)}
      aria-label="Bản đồ Trường Đại học Đồng Nai"
    >
      <iframe
        title="Bản đồ Trường Đại học Đồng Nai"
        src={CONTACT_MAP_EMBED_URL}
        className="aspect-[16/7] w-full min-h-[280px] border-0 sm:min-h-[360px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </section>
  )
}
