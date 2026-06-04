import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

type QrCodeCardProps = {
  label: string
  url: string
  qrSrc?: string
  qrAlt: string
  className?: string
}

export function QrCodeCard({
  label,
  url,
  qrSrc,
  qrAlt,
  className,
}: QrCodeCardProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center gap-3 rounded-lg bg-white p-4 text-center",
        className
      )}
    >
      <p className="text-base font-bold text-dnu-blue">{label}</p>

      <div className="relative flex size-[120px] items-center justify-center overflow-hidden rounded-md bg-gray-100">
        {qrSrc ? (
          <Image src={qrSrc} alt={qrAlt} fill className="object-contain" />
        ) : (
          <span className="px-2 text-xs text-gray-400">QR {label}</span>
        )}
      </div>

      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-xs text-dnu-blue hover:underline sm:text-sm"
      >
        {url}
      </Link>
    </div>
  )
}
