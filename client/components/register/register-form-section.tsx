import type { LucideIcon } from "lucide-react"
import type { ComponentType, ReactNode } from "react"

type SectionIcon = LucideIcon | ComponentType<{ className?: string }>

type RegisterFormSectionProps = {
  icon: SectionIcon
  title: string
  children: ReactNode
  lucide?: boolean
}

export function RegisterFormSection({
  icon: Icon,
  title,
  children,
  lucide = false,
}: RegisterFormSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex shrink-0 items-center justify-center text-dnu-blue">
          {lucide ? (
            <Icon className="size-7" strokeWidth={1.75} aria-hidden />
          ) : (
            <Icon aria-hidden />
          )}
        </div>
        <h2 className="text-lg font-semibold text-dnu-blue sm:text-xl">{title}</h2>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  )
}
