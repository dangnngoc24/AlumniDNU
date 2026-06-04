"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { getGalleryCoverUrl, GALLERY_DEFAULT_COVER_URL } from "@/lib/gallery-data"
import { cn } from "@/lib/utils"

function resolveGallerySrc(url: string): string {
  return getGalleryCoverUrl(url) || GALLERY_DEFAULT_COVER_URL
}

type GalleryImageProps = {
  src: string
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  fit?: "cover" | "contain"
}

export function GalleryImage({
  src,
  alt,
  fill = true,
  className,
  sizes,
  fit = "cover",
}: GalleryImageProps) {
  const [currentSrc, setCurrentSrc] = useState(() => resolveGallerySrc(src))
  const isDefault = currentSrc === GALLERY_DEFAULT_COVER_URL

  useEffect(() => {
    setCurrentSrc(resolveGallerySrc(src))
  }, [src])

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      className={cn(
        fit === "contain" ? "object-contain" : "object-cover",
        isDefault && "object-contain p-2",
        className
      )}
      sizes={sizes}
      unoptimized
      onError={() => {
        setCurrentSrc((prev) =>
          prev === GALLERY_DEFAULT_COVER_URL ? prev : GALLERY_DEFAULT_COVER_URL
        )
      }}
    />
  )
}

type GallerySlideshowImageProps = {
  src: string
  alt: string
  fullscreen: boolean
  className?: string
}

export function GallerySlideshowImage({
  src,
  alt,
  fullscreen,
  className,
}: GallerySlideshowImageProps) {
  const [currentSrc, setCurrentSrc] = useState(() => resolveGallerySrc(src))
  const isDefault = currentSrc === GALLERY_DEFAULT_COVER_URL

  useEffect(() => {
    setCurrentSrc(resolveGallerySrc(src))
  }, [src])

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center px-2 py-2 sm:px-4 sm:py-3",
        fullscreen ? "max-h-full max-w-full" : "absolute inset-0",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={currentSrc}
        alt={alt}
        className={cn(
          "max-h-full max-w-full object-contain",
          isDefault && "h-auto w-auto max-h-[min(70vh,480px)] p-8"
        )}
        style={
          fullscreen ? { maxHeight: "100vh", maxWidth: "100vw" } : undefined
        }
        draggable={false}
        onError={() => {
          setCurrentSrc((prev) =>
            prev === GALLERY_DEFAULT_COVER_URL ? prev : GALLERY_DEFAULT_COVER_URL
          )
        }}
      />
    </div>
  )
}
