"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Maximize2,
  MonitorPlay,
  X,
} from "lucide-react"
import { GalleryImage, GallerySlideshowImage } from "./gallery-image"
import { splitAlbumTitle, type GalleryAlbumDetail, type GalleryPhoto } from "@/lib/gallery-data"
import { cn } from "@/lib/utils"

type ViewMode = "slideshow" | "grid"

type GalleryAlbumDetailViewProps = {
  album: GalleryAlbumDetail
}

function getPhotoLabel(photo: GalleryPhoto): string | null {
  const label = photo.caption?.trim() || photo.alt?.trim()
  return label || null
}

function scrollThumbIntoView(
  container: HTMLDivElement | null,
  item: HTMLButtonElement | null,
  behavior: ScrollBehavior = "smooth"
) {
  if (!container || !item) return

  const itemLeft = item.offsetLeft
  const itemWidth = item.offsetWidth
  const containerWidth = container.clientWidth
  const scrollLeft = container.scrollLeft
  const maxScroll = Math.max(0, container.scrollWidth - containerWidth)

  let targetScroll = scrollLeft

  if (itemLeft < scrollLeft) {
    targetScroll = itemLeft
  } else if (itemLeft + itemWidth > scrollLeft + containerWidth) {
    targetScroll = itemLeft + itemWidth - containerWidth
  } else {
    return
  }

  container.scrollTo({
    left: Math.min(Math.max(0, targetScroll), maxScroll),
    behavior,
  })
}

export function GalleryAlbumDetailView({ album }: GalleryAlbumDetailViewProps) {
  const photos = album.photos
  const [viewMode, setViewMode] = useState<ViewMode>("slideshow")
  const [activeIndex, setActiveIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const viewerRef = useRef<HTMLDivElement>(null)
  const thumbStripRef = useRef<HTMLDivElement>(null)
  const thumbItemRefs = useRef<(HTMLButtonElement | null)[]>([])

  const { primary, accent } = splitAlbumTitle(album.title)
  const activePhoto = photos[activeIndex]

  const goPrev = useCallback(() => {
    if (photos.length === 0) return
    setActiveIndex((i) => (i - 1 + photos.length) % photos.length)
  }, [photos.length])

  const goNext = useCallback(() => {
    if (photos.length === 0) return
    setActiveIndex((i) => (i + 1) % photos.length)
  }, [photos.length])

  const openFullscreen = useCallback(async () => {
    setFullscreen(true)
    try {
      await viewerRef.current?.requestFullscreen()
    } catch {
      /* overlay fallback */
    }
  }, [])

  const closeFullscreen = useCallback(async () => {
    setFullscreen(false)
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => undefined)
    }
  }, [])

  const scrollActiveThumbIntoView = useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      scrollThumbIntoView(
        thumbStripRef.current,
        thumbItemRefs.current[activeIndex] ?? null,
        behavior
      )
    },
    [activeIndex]
  )

  useEffect(() => {
    scrollActiveThumbIntoView("smooth")
  }, [scrollActiveThumbIntoView])

  useEffect(() => {
    function onFullscreenChange() {
      if (!document.fullscreenElement) {
        setFullscreen(false)
      }
    }
    document.addEventListener("fullscreenchange", onFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange)
  }, [])

  useEffect(() => {
    if (!fullscreen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeFullscreen()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [fullscreen, goPrev, goNext, closeFullscreen])

  if (photos.length === 0) {
    return (
      <div className="py-16 text-center text-gray-600">
        Album chưa có ảnh nào.
      </div>
    )
  }

  return (
    <div className="mx-auto">
      <header className="text-center">
        <h1 className="text-[40px] font-bold leading-snug text-[#1D4393]">
          {primary}
          {accent ? (
            <>
              {" "}
              {accent}
            </>
          ) : null}
        </h1>
        {accent ? (
          <div className="mx-auto mt-2 h-1 w-32 bg-[#1D4393]" />
        ) : null}
      </header>

      <div className="mt-14 flex justify-end">
        <div className="inline-flex overflow-hidden rounded-lg border border-gray-200 bg-gray-100 p-0.5">
          <button
            type="button"
            onClick={() => setViewMode("slideshow")}
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              viewMode === "slideshow"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <MonitorPlay className="size-4 shrink-0" aria-hidden />
            Trình chiếu
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              viewMode === "grid"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <LayoutGrid className="size-4 shrink-0" aria-hidden />
            Dạng lưới
          </button>
        </div>
      </div>

      {viewMode === "slideshow" ? (
        <div className="mt-6">
          <div
            ref={viewerRef}
            className={cn(
              "relative mx-auto flex w-full max-w-[1420px] flex-col overflow-hidden rounded-xl bg-neutral-900",
              fullscreen
                ? "fixed inset-0 z-50 max-w-none rounded-none"
                : "h-[600px]"
            )}
          >
            <div
              className={cn(
                "relative flex w-full items-center justify-center",
                fullscreen ? "min-h-0 flex-1" : "h-[600px]"
              )}
            >
              {activePhoto ? (
                <GallerySlideshowImage
                  src={activePhoto.url}
                  alt={activePhoto.alt}
                  fullscreen={fullscreen}
                />
              ) : null}

              <button
                type="button"
                onClick={goPrev}
                className="absolute left-0 top-0 z-10 flex h-full w-12 items-center justify-center bg-black/25 text-white transition-colors hover:bg-black/40 sm:w-14"
                aria-label="Ảnh trước"
              >
                <ChevronLeft className="size-8 stroke-[2]" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-0 top-0 z-10 flex h-full w-12 items-center justify-center bg-black/25 text-white transition-colors hover:bg-black/40 sm:w-14"
                aria-label="Ảnh sau"
              >
                <ChevronRight className="size-8 stroke-[2]" />
              </button>

              <button
                type="button"
                onClick={fullscreen ? closeFullscreen : openFullscreen}
                className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-md bg-black/40 text-white transition-colors hover:bg-black/55"
                aria-label={fullscreen ? "Thu nhỏ" : "Phóng to"}
              >
                {fullscreen ? (
                  <X className="size-5" />
                ) : (
                  <Maximize2 className="size-5" />
                )}
              </button>

              {activePhoto && getPhotoLabel(activePhoto) ? (
                <div className="absolute inset-x-0 bottom-0 z-[5] bg-white/45 px-5 py-4 backdrop-blur-md">
                  <p className="text-center text-sm font-medium leading-relaxed text-gray-800 sm:text-base">
                    {getPhotoLabel(activePhoto)}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="relative mt-5 overflow-hidden">
            <div
              ref={thumbStripRef}
              className="flex gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {photos.map((photo, index) => (
                <ThumbnailButton
                  key={photo.id}
                  ref={(el) => {
                    thumbItemRefs.current[index] = el
                  }}
                  photo={photo}
                  isActive={index === activeIndex}
                  onSelect={() => setActiveIndex(index)}
                  onFocus={() => {
                    setActiveIndex(index)
                    requestAnimationFrame(() => {
                      scrollThumbIntoView(
                        thumbStripRef.current,
                        thumbItemRefs.current[index] ?? null,
                        "smooth"
                      )
                    })
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex max-w-[1420px] flex-wrap gap-x-5 gap-y-10">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => {
                setActiveIndex(index)
                setViewMode("slideshow")
              }}
              className="group relative h-[192px] w-[340px] shrink-0 overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-shadow hover:shadow-md"
            >
              <GalleryImage
                src={photo.url}
                alt={photo.alt}
                className="transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="340px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ThumbnailButton({
  photo,
  isActive,
  onSelect,
  onFocus,
  ref,
}: {
  photo: GalleryPhoto
  isActive: boolean
  onSelect: () => void
  onFocus: () => void
  ref?: (el: HTMLButtonElement | null) => void
}) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        onSelect()
        e.currentTarget.blur()
      }}
      onFocus={onFocus}
      className={cn(
        "relative h-[124px] w-[220px] shrink-0 snap-center overflow-hidden rounded-lg bg-gray-200 transition-all",
        isActive
          ? "ring-2 ring-[#1D4393] ring-offset-2"
          : "opacity-80 hover:opacity-100"
      )}
      aria-label={photo.alt}
      aria-current={isActive}
    >
      <GalleryImage src={photo.url} alt={photo.alt} sizes="220px" />
    </button>
  )
}
