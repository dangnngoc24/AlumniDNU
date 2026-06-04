"use client"

import { useEffect, useState } from "react"
import type { FeaturedAlumniCard } from "@/lib/alumni"
import { PageContainer } from "../page-container"
import { FeaturedAlumniCarousel } from "./featured-alumni-carousel"

export function NotableAlumniSection() {
  const [alumni, setAlumni] = useState<FeaturedAlumniCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadFeatured() {
      try {
        const response = await fetch("/api/alumni/featured")
        if (!response.ok) return
        const json = (await response.json()) as { data?: FeaturedAlumniCard[] }
        if (!cancelled && Array.isArray(json.data)) {
          setAlumni(json.data)
        }
      } catch {
        // Giữ danh sách rỗng
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadFeatured()
    return () => {
      cancelled = true
    }
  }, [])

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

        {loading ? (
          <p className="text-center text-sm text-white/80 sm:text-base">
            Đang tải danh sách cựu sinh viên tiêu biểu...
          </p>
        ) : (
          <FeaturedAlumniCarousel alumni={alumni} />
        )}
      </PageContainer>
    </section>
  )
}
