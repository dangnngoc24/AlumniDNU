"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { PageContainer } from "../page-container"
import { AlumniAvatar } from "./alumni-avatar"

type NotableAlumni = {
  id: string
  name: string
  cohort: string
  role: string
  avatar?: string | null
}

const NOTABLE_ALUMNI: NotableAlumni[] = [
  {
    id: "1",
    name: "Nguyễn Hoàng Anh",
    cohort: "K22 - FIN",
    role: "Founder - Skyline Production",
    avatar: "",
  },
  {
    id: "2",
    name: "Lê Thị Hạnh",
    cohort: "K15 - MKD",
    role: "Founder - BrightStar Media",
    avatar: "",
  },
  {
    id: "3",
    name: "Nguyễn Hải Yến",
    cohort: "K14 - MKD",
    role: "Creative Planner - BrightWave Media",
    avatar: "",
  },
  {
    id: "4",
    name: "Trần Minh Hoàng",
    cohort: "K07 - HRM",
    role: "Co-Founder - Nova Creative",
    avatar: "",
  },
  {
    id: "5",
    name: "Phạm Thị Lan",
    cohort: "K18 - QTKD",
    role: "Marketing Director - Horizon Group",
    avatar: "",
  },
]

const AUTOPLAY_INTERVAL_MS = 4000

export function NotableAlumniSection() {
  const [api, setApi] = useState<CarouselApi>()
  const enableLoop = NOTABLE_ALUMNI.length >= 4

  /** Nhân đôi slide để Embla loop mượt khi kéo/autoplay vòng vô hạn */
  const carouselSlides = useMemo(
    () =>
      enableLoop
        ? [...NOTABLE_ALUMNI, ...NOTABLE_ALUMNI].map((alumni, index) => ({
            ...alumni,
            slideKey: `${alumni.id}-${index}`,
          }))
        : NOTABLE_ALUMNI.map((alumni) => ({
            ...alumni,
            slideKey: alumni.id,
          })),
    [enableLoop]
  )

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

  return (
    <section className="bg-dnu-blue py-14 sm:py-16 lg:py-20">
      <PageContainer>
        <div className="mb-10 flex flex-col items-center gap-4 text-center sm:mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-[40px]">
            Cựu sinh viên{" "}
            <span className="text-[#EB3C27]">tiêu biểu</span>
          </h2>
          <div className="h-1 w-[130px] bg-[#EB3C27]" />
          <p className="max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base">
            Những gương mặt tiêu biểu đại diện cho bản lĩnh, tri thức và tinh thần
            đổi mới sáng tạo
            <br />
            <span>của thế hệ sinh viên Đại học Đồng Nai</span>
          </p>
        </div>

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
          <CarouselContent className="-ml-0">
            {carouselSlides.map((alumni) => (
              <CarouselItem
                key={alumni.slideKey}
                className="min-w-[340px] shrink-0 grow-0 basis-[340px] pl-0 pr-0 mr-5"
              >
                <article className="flex h-full flex-col items-center rounded-xl bg-white px-6 py-8 text-center shadow-md">
                  <AlumniAvatar
                    src={alumni.avatar}
                    alt={alumni.name}
                    className="mb-4"
                  />
                  <p className="text-sm font-medium text-dnu-light">
                    {alumni.cohort}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">
                    {alumni.name}
                  </h3>
                  <p className="mt-2 text-sm italic text-gray-600">
                    {alumni.role}
                  </p>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </PageContainer>
    </section>
  )
}
