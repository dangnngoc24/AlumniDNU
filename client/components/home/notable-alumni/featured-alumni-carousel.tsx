"use client"

import { useEffect, useMemo, useState } from "react"
import type { FeaturedAlumniCard } from "@/lib/alumni"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { AlumniAvatar } from "./alumni-avatar"

const AUTOPLAY_INTERVAL_MS = 4000

type FeaturedAlumniCarouselProps = {
  alumni: FeaturedAlumniCard[]
  cardClassName?: string
}

export function FeaturedAlumniCarousel({
  alumni,
  cardClassName,
}: FeaturedAlumniCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const enableLoop = alumni.length >= 4

  const carouselSlides = useMemo(
    () =>
      enableLoop
        ? [...alumni, ...alumni].map((item, index) => ({
            ...item,
            slideKey: `${item.id}-${index}`,
          }))
        : alumni.map((item) => ({
            ...item,
            slideKey: item.id,
          })),
    [alumni, enableLoop]
  )

  useEffect(() => {
    if (!api) return
    api.reInit()
  }, [api, carouselSlides])

  useEffect(() => {
    if (!api) return

    const handleResize = () => api.reInit()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [api])

  useEffect(() => {
    if (!api || !enableLoop) return

    const timer = setInterval(() => {
      api.scrollNext()
    }, AUTOPLAY_INTERVAL_MS)

    return () => clearInterval(timer)
  }, [api, enableLoop])

  if (alumni.length === 0) {
    return (
      <p className="text-center text-sm text-gray-500 sm:text-base">
        Chưa có cựu sinh viên tiêu biểu. Vui lòng quay lại sau.
      </p>
    )
  }

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: enableLoop,
        containScroll: false,
        watchDrag: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-5">
        {carouselSlides.map((item) => (
          <CarouselItem
            key={item.slideKey}
            className="!min-w-[300px] !max-w-[300px] !basis-[300px] shrink-0 grow-0 pl-5 sm:!min-w-[340px] sm:!max-w-[340px] sm:!basis-[340px]"
          >
            <article
              className={cn(
                "flex h-full w-full flex-col items-center rounded-xl bg-white px-6 py-8 text-center shadow-md",
                cardClassName
              )}
            >
              <AlumniAvatar src={item.avatar} alt={item.name} className="mb-4" />
              <p className="text-sm font-medium text-dnu-light">{item.cohort}</p>
              <h3 className="mt-2 text-lg font-bold text-gray-900">{item.name}</h3>
              <p className="mt-2 text-sm italic text-gray-600">{item.role}</p>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
