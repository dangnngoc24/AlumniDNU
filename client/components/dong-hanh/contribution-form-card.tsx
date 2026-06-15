import { cn } from "@/lib/utils"
import { ContributionForm } from "./contribution-form"

type ContributionFormCardProps = {
  className?: string
}

export function ContributionFormCard({ className }: ContributionFormCardProps) {
  return (
    <section
      className={cn(
        "mx-auto max-w-[700px]",
        className
      )}
      aria-labelledby="contribution-form-heading"
    >
      <div className="mb-10 space-y-2 text-center">
        <h1
          id="contribution-form-heading"
          className="text-[22px] font-bold leading-snug text-gray-900 sm:text-2xl"
        >
          Gửi Đóng Góp Của Bạn
        </h1>
        <p className="text-sm text-gray-600 sm:text-base">
          Cùng nhau xây dựng tương lai – Kết nối cựu sinh viên và sinh viên.
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 sm:p-8">
        <ContributionForm />
      </div>
    </section>
  )
}
