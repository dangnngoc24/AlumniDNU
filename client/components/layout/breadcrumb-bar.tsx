import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { PageContainer } from "@/components/home/page-container"
import { cn } from "@/lib/utils"

export type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbBarProps = {
  items: BreadcrumbItem[]
  className?: string
}

export function BreadcrumbBar({ items, className }: BreadcrumbBarProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("border-b border-gray-200 bg-[#F4F4F4]", className)}
    >
      <PageContainer className="">
        <ol className="flex min-h-[44px] items-center gap-2 py-3 text-sm text-gray-600">
          <li className="flex items-center">
            <Link
              href="/"
              className="flex items-center text-gray-500 transition-colors hover:text-dnu-blue"
              aria-label="Trang chủ"
            >
              <Home className="size-4 shrink-0" aria-hidden />
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                <ChevronRight className="size-4 shrink-0 text-gray-400" aria-hidden />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-dnu-blue"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={cn(isLast && "font-semibold text-base text-gray-500")}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </PageContainer>
    </nav>
  )
}
