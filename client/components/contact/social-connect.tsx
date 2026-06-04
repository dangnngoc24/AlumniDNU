import { CONTACT_SOCIAL } from "@/lib/contact-data"
import { cn } from "@/lib/utils"
import { QrCodeCard } from "./qr-code-card"

type SocialConnectProps = {
  className?: string
}

export function SocialConnect({ className }: SocialConnectProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-base font-bold text-white sm:text-lg">
        Kết nối trực tuyến
      </h3>
      <div className="flex flex-col gap-5 sm:flex-row">
        <QrCodeCard
          label={CONTACT_SOCIAL.zalo.label}
          url={CONTACT_SOCIAL.zalo.url}
          qrAlt={CONTACT_SOCIAL.zalo.qrAlt}
        />
        <QrCodeCard
          label={CONTACT_SOCIAL.facebook.label}
          url={CONTACT_SOCIAL.facebook.url}
          qrAlt={CONTACT_SOCIAL.facebook.qrAlt}
        />
      </div>
    </div>
  )
}
