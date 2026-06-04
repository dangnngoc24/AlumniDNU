import { Mail, MapPin, Phone } from "lucide-react"
import { CONTACT_INFO } from "@/lib/contact-data"
import { cn } from "@/lib/utils"
import { ContactInfoItem } from "./contact-info-item"
import { SocialConnect } from "./social-connect"

const CONTACT_ROWS = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: Phone,
    label: "Số điện thoại",
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Địa chỉ",
    value: CONTACT_INFO.address,
  },
] as const

function ContactDivider() {
  return (
    <div
      className="border-t border-white/25"
      aria-hidden
    />
  )
}

type ContactInfoCardProps = {
  className?: string
}

export function ContactInfoCard({ className }: ContactInfoCardProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-8 rounded-xl bg-dnu-navy px-7 py-10 text-white",
        className
      )}
      aria-labelledby="contact-info-heading"
    >
      <h2
        id="contact-info-heading"
        className="text-center text-[22px] font-bold leading-snug"
      >
        {CONTACT_INFO.organizationNameLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>

      <ul className="flex flex-col">
        {CONTACT_ROWS.map((row, index) => {
          const isFirst = index === 0
          const isLast = index === CONTACT_ROWS.length - 1

          return (
            <li key={row.label}>
              {!isFirst && <ContactDivider />}
              <ContactInfoItem
                icon={row.icon}
                label={row.label}
                value={row.value}
                href={"href" in row ? row.href : undefined}
                className={isFirst ? "pb-8" : isLast ? "pt-8 pb-8" : "py-8"}
              />
              {isLast && <ContactDivider />}
            </li>
          )
        })}
      </ul>

      <SocialConnect />
    </section>
  )
}
