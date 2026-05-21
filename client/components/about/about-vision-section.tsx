import type { ComponentType, ReactNode } from "react"
import { PageContainer } from "@/components/home/page-container"
import { cn } from "@/lib/utils"
import {
  CareerVisionIcon,
  CommunityVisionIcon,
  DataCollectionVisionIcon,
  SupportVisionIcon,
} from "./vision-icons"
import { SectionHeading } from "./section-heading"

type VisionCard = {
  id: string
  title: ReactNode
  description: string
  icon: ComponentType<{ className?: string }>
  theme: {
    border: string
    bg: string
    title: string
    icon: string
  }
}

const VISION_CARDS: VisionCard[] = [
  {
    id: "data",
    title: (
      <>
        Thu thập dữ liệu
        <br />
        cựu sinh viên
      </>
    ),
    description:
      "Thu thập và cập nhật thông tin cựu sinh viên, tăng cường kết nối và phát triển cộng đồng Alumni DNU.",
    icon: DataCollectionVisionIcon,
    theme: {
      border: "border-[#378DFA]",
      bg: "bg-[#EFF7FF]",
      title: "text-[#378DFA]",
      icon: "text-[#378DFA]",
    },
  },
  {
    id: "community",
    title: (
      <>
        Kết nối cộng đồng
        <br />
        cựu sinh viên
      </>
    ),
    description:
      "Xây dựng mạng lưới cựu sinh viên gắn kết, hỗ trợ lẫn nhau và đồng hành cùng sự phát triển bền vững của Nhà trường.",
    icon: CommunityVisionIcon,
    theme: {
      border: "border-[#1BAE64]",
      bg: "bg-[#EDFCF2]",
      title: "text-[#1BAE64]",
      icon: "text-[#1BAE64]",
    },
  },
  {
    id: "career",
    title: (
      <>
        Kết nối nghề nghiệp cho
        <br />
        sinh viên và cựu sinh viên
      </>
    ),
    description:
      "Mở rộng cơ hội việc làm, hợp tác và chia sẻ kinh nghiệm giữa cựu sinh viên, sinh viên và doanh nghiệp.",
    icon: CareerVisionIcon,
    theme: {
      border: "border-[#FC4C37]",
      bg: "bg-[#FFF3F1]",
      title: "text-[#FC4C37]",
      icon: "text-[#FC4C37]",
    },
  },
  {
    id: "support",
    title: (
      <>
        Đồng hành và hỗ trợ
        <br />
        sinh viên hiện tại
      </>
    ),
    description:
      "Đồng hành cùng thế hệ sinh viên hiện tại qua hoạt động cố vấn, định hướng nghề nghiệp, kết nối thực tập.",
    icon: SupportVisionIcon,
    theme: {
      border: "border-[#F3790D]",
      bg: "bg-[#FFF8EB]",
      title: "text-[#F3790D]",
      icon: "text-[#F3790D]",
    },
  },
]

export function AboutVisionSection() {
  return (
    <section className=" pb-12 sm:pb-16">
      <PageContainer>
        <SectionHeading
          title="Tầm Nhìn & Mục Tiêu"
          className="mb-10 sm:mb-12" 
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VISION_CARDS.map((card) => {
            const Icon = card.icon
            return (
              <article
                key={card.id}
                className={cn(
                  "flex h-full flex-col items-center rounded-xl border py-8 px-5 text-center gap-4",
                  card.theme.border,
                  card.theme.bg
                )}
              >
                <div
                  className={cn(
                    "flex size-[60px] items-center justify-center rounded-full bg-gray-50",
                    card.theme.icon
                  )}
                >
                  <Icon className="size-[60px]" aria-hidden />
                </div>
                <h3
                  className={cn(
                    "min-h-[3.5rem] text-center text-[22px] font-bold leading-snug",
                    card.theme.title
                  )}
                >
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed text-gray-800">
                  {card.description}
                </p>
              </article>
            )
          })}
        </div>
      </PageContainer>
    </section>
  )
}
