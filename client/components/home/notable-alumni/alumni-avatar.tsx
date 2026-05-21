"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

type AlumniAvatarProps = {
  src?: string | null
  alt: string
  className?: string
}

function DefaultAlumniAvatarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0 208 208 0 0 1 416 0z"
      />
    </svg>
  )
}

export function AlumniAvatar({ src, alt, className }: AlumniAvatarProps) {
  const [hasError, setHasError] = useState(false)
  const hasImage = Boolean(src?.trim()) && !hasError

  if (!hasImage) {
    return (
      <div
        className={cn(
          "flex size-[100px] shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400",
          className
        )}
      >
        <DefaultAlumniAvatarIcon className="size-14" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative size-[100px] shrink-0 overflow-hidden rounded-full",
        className
      )}
    >
      <Image
        src={src!}
        alt={alt}
        width={100}
        height={100}
        className="h-[100px] w-[100px] object-cover"
        sizes="100px"
        onError={() => setHasError(true)}
      />
    </div>
  )
}
