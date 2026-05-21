import Image from "next/image"
import { cn } from "@/lib/utils"

type DnuLogoProps = {
  className?: string
  priority?: boolean
}

export function DnuLogo({ className, priority = false }: DnuLogoProps) {
  return (
    <Image
      src="/logo_alumni.png"
      alt="DNU Alumni"
      width={147}
      height={48}
      priority={priority}
      className={cn("h-[48px] w-[147px] shrink-0 object-contain object-left", className)}
    />
  )
}
