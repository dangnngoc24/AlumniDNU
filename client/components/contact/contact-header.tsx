import { cn } from "@/lib/utils"

type ContactHeaderProps = {
  className?: string
}

export function ContactHeader({ className }: ContactHeaderProps) {
  return (
    <header className={cn("flex flex-col items-center gap-6 text-center", className)}>
      <h1 className="font-bold text-gray-900 text-[40px]">
        Liên hệ <span className="text-[#1D4393]">Ban Alumni</span>
      </h1>
      <div className="h-1 w-[130px] bg-dnu-blue" aria-hidden />
    </header>
  )
}
