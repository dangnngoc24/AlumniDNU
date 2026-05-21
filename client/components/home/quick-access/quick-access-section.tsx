import { ArrowRight } from "lucide-react"
import type { ComponentType, ReactNode } from "react"
import { PageContainer } from "../page-container"
import { cn } from "@/lib/utils"
import {
  ChiaSeCauChuyenIcon,
  DangKyThongTinIcon,
  DongHanhNhaTruongIcon,
  QuickAccessIconSlot,
  TimCoHoiViecLamIcon,
} from "./icons"

type QuickAccessIcon = ComponentType<{ className?: string }>

type QuickAccessCard = {
  title: ReactNode
  description: string
  href: string
  icon: QuickAccessIcon
  theme: {
    border: string
    title: string
    icon: string
  }
}

const QUICK_ACCESS_CARDS: QuickAccessCard[] = [
  {
    title: "Đăng ký thông tin",
    description:
      "Cập nhật thông tin cá nhân và kết nối với mạng lưới cựu sinh viên DNU",
    href: "/dang-ky",
    icon: DangKyThongTinIcon,
    theme: {
      border: "border-dnu-blue",
      title: "text-dnu-blue",
      icon: "text-dnu-blue",
    },
  },
  {
    title: (
      <>
        Chia sẻ câu chuyện
        <br />
        của bạn
      </>
    ),
    description:
      "Kể lại hành trình của bạn và truyền cảm hứng cho thế hệ tiếp theo",
    href: "#stories",
    icon: ChiaSeCauChuyenIcon,
    theme: {
      border: "border-dnu-green",
      title: "text-dnu-green",
      icon: "text-dnu-green",
    },
  },
  {
    title: "Tìm cơ hội việc làm",
    description:
      "Khám phá các cơ hội nghề nghiệp từ mạng lưới doanh nghiệp cựu sinh viên",
    href: "#viec-lam",
    icon: TimCoHoiViecLamIcon,
    theme: {
      border: "border-dnu-red",
      title: "text-dnu-red",
      icon: "text-dnu-red",
    },
  },
  {
    title: (
      <>
        Đồng hành cùng
        <br />
        nhà trường
      </>
    ),
    description: "Đóng góp và hỗ trợ sự phát triển của Đại học Đồng Nai",
    href: "#dong-hanh",
    icon: DongHanhNhaTruongIcon,
    theme: {
      border: "border-dnu-orange",
      title: "text-dnu-orange",
      icon: "text-dnu-orange",
    },
  },
]

export function QuickAccessSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <PageContainer>
        <div className="mb-[60px] flex flex-col gap-5 text-center">
          <h2 className="text-[40px] font-bold text-gray-900">
            Truy Cập <span className="text-dnu-blue"> Nhanh </span>
          </h2>
          <div className="mx-auto flex w-[130px] items-center justify-center bg-[#EB3C27] py-0.5" />
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 overflow-visible pb-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {QUICK_ACCESS_CARDS.map((card) => {
            const Icon = card.icon
            return (
              <a
                key={card.href}
                href={card.href}
                className={cn(
                  "group relative z-0 flex h-full flex-col items-center rounded-xl border-x-[1px] border-b-[1px] border-t-4 bg-white px-5 py-8 text-center",
                  "transition-all duration-300 ease-out",
                  "hover:-translate-y-2 hover:z-10 hover:shadow-lg",
                  card.theme.border
                )}
              >
                <QuickAccessIconSlot className={card.theme.icon}>
                  <Icon />
                </QuickAccessIconSlot>
                {/* Chiều cao cố định 2 dòng — description các thẻ bắt đầu cùng một hàng */}
                <div className="mb-3 flex h-14 w-full items-start justify-center sm:h-[3.75rem]">
                  <h3
                    className={cn(
                      "line-clamp-2 text-base font-bold leading-snug sm:text-lg",
                      card.theme.title
                    )}
                  >
                    {card.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-800">
                  {card.description}
                </p>
                <div className="mt-auto flex min-h-7 w-full items-center justify-center pt-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-sm font-semibold leading-none",
                      "translate-y-1 opacity-0 transition-all duration-300 ease-out",
                      "group-hover:translate-y-0 group-hover:opacity-100",
                      card.theme.title
                    )}
                  >
                    Truy cập
                    <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </PageContainer>
    </section>
  )
}
