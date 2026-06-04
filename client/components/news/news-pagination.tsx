"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export const NEWS_PAGE_SIZE_OPTIONS = [6, 12, 24] as const
export const NEWS_POSTS_PER_PAGE = NEWS_PAGE_SIZE_OPTIONS[0]

type NewsPaginationProps = {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  pageSizeOptions?: readonly number[]
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  className?: string
}

function getVisiblePages(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  let start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, start + 4)
  start = Math.max(1, end - 4)

  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

function getResultRange(
  currentPage: number,
  pageSize: number,
  totalItems: number
): { start: number; end: number } {
  if (totalItems === 0) {
    return { start: 0, end: 0 }
  }

  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)
  return { start, end }
}

function PaginationControls({
  safePage,
  pages,
  canGoPrev,
  canGoNext,
  onPageChange,
}: {
  safePage: number
  pages: number[]
  canGoPrev: boolean
  canGoNext: boolean
  onPageChange: (page: number) => void
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => onPageChange(safePage - 1)}
        disabled={!canGoPrev}
        aria-label="Trang trước"
        className={cn(
          "flex size-9 items-center justify-center text-gray-600 transition-colors",
          canGoPrev ? "hover:text-dnu-blue" : "cursor-not-allowed opacity-40"
        )}
      >
        <ChevronLeft className="size-4 stroke-[2]" aria-hidden />
      </button>

      <ul className="flex items-center gap-2">
        {pages.map((page) => {
          const isActive = page === safePage
          return (
            <li key={page}>
              <button
                type="button"
                onClick={() => onPageChange(page)}
                aria-label={`Trang ${page}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "min-w-6 text-sm font-semibold transition-colors",
                  isActive
                    ? "text-[#1D4393]"
                    : "text-gray-400 hover:text-dnu-blue"
                )}
              >
                {page}
              </button>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        onClick={() => onPageChange(safePage + 1)}
        disabled={!canGoNext}
        aria-label="Trang sau"
        className={cn(
          "flex size-9 items-center justify-center text-gray-600 transition-colors",
          canGoNext ? "hover:text-dnu-blue" : "cursor-not-allowed opacity-40"
        )}
      >
        <ChevronRight className="size-4 stroke-[2]" aria-hidden />
      </button>
    </div>
  )
}

export function NewsPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  pageSizeOptions = NEWS_PAGE_SIZE_OPTIONS,
  onPageChange,
  onPageSizeChange,
  className,
}: NewsPaginationProps) {
  if (totalPages < 1) return null

  const safePage = Math.min(Math.max(1, currentPage), totalPages)
  const pages = getVisiblePages(safePage, totalPages)
  const canGoPrev = safePage > 1
  const canGoNext = safePage < totalPages
  const { start, end } = getResultRange(safePage, pageSize, totalItems)

  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-center lg:justify-between",
        className
      )}
    >
      <p className="shrink-0 text-sm text-gray-500 lg:order-1">
        Hiển thị {start} - {end} của {totalItems} kết quả
      </p>

      <nav
        aria-label="Phân trang tin tức"
        className="flex justify-center lg:order-2"
      >
        <PaginationControls
          safePage={safePage}
          pages={pages}
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          onPageChange={onPageChange}
        />
      </nav>

      <div className="flex shrink-0 items-center justify-center gap-2.5 text-sm text-gray-500 lg:order-3 lg:justify-end">
        <span className="shrink-0">Hiển thị</span>
        <Select
          value={String(pageSize)}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger
            aria-label="Số bài hiển thị mỗi trang"
            className="h-auto w-auto min-w-0 justify-center gap-0.5 !rounded-full border border-gray-300 bg-[#F4F4F4] px-3 py-2 text-sm font-medium text-gray-700 shadow-none outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:outline-none data-[state=open]:ring-0 data-[state=open]:ring-offset-0 [&>span]:line-clamp-none [&>svg]:ml-0 [&>svg]:size-3.5 [&>svg]:shrink-0 [&>svg]:opacity-60"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            {pageSizeOptions.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
