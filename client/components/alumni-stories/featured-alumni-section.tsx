"use client"

import { useEffect, useState } from "react"
import type { FeaturedAlumniCard } from "@/lib/alumni"
import { FeaturedAlumniCarousel } from "@/components/home/notable-alumni/featured-alumni-carousel"

export function FeaturedAlumniSection() {
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
    <div className="bg-[#EFF7FF] py-14">
      <div className="mx-auto w-full max-w-[1420px]">
        <div className="mb-[28px] flex flex-col gap-5 text-center">
          <div className="text-[40px] font-bold text-gray-900">
            Cựu sinh viên <span className="text-[#1D4393]"> tiêu biểu </span>
          </div>
          <div className="mx-auto flex w-[130px] items-center justify-center bg-[#1D4393] py-0.5" />
        </div>
        <div className="flex justify-center text-center text-base font-normal text-gray-700">
          Những gương mặt tiêu biểu đại diện cho bản lĩnh, tri thức và tinh thần đổi mới sáng tạo <br />
          của thế hệ sinh viên Đại học Đồng Nai
        </div>
        <div className="my-10">
          {loading ? (
            <p className="text-center text-sm text-gray-500 sm:text-base">
              Đang tải danh sách cựu sinh viên tiêu biểu...
            </p>
          ) : (
            <FeaturedAlumniCarousel
              alumni={alumni}
              cardClassName="border border-[#E9E9E9] shadow-none"
            />
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="rounded-lg bg-[#1D4393] px-16 py-4 text-xl font-normal text-white"
          >
            Xem tất cả
          </button>
        </div>
      </div>
    </div>
  )
}
