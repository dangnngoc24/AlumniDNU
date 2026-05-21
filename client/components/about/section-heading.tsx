import type { ReactNode } from "react"

type SectionHeadingProps = {
  title: ReactNode
  className?: string
}

export function SectionHeading({ title, className }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col items-center gap-5 text-center ${className ?? ""}`}>
      <h2 className="text-3xl font-bold text-dnu-blue sm:text-[40px]">{title}</h2>
      <div className="h-1 w-[130px] bg-[#EB3C27]" aria-hidden />
    </div>
  )
}
