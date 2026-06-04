"use client"

import { useCallback, useRef, useState } from "react"
import { Search } from "lucide-react"
import type { NewsFilterTab } from "@/lib/news-data"
import { cn } from "@/lib/utils"

type NewsSearchFiltersProps = {
  categories: NewsFilterTab[]
  activeCategory: string
  onSearch?: (query: string) => void
  onCategoryChange?: (categoryId: string) => void
  className?: string
}

const tabButtonClass = (isActive: boolean) =>
  cn(
    "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors select-auto",
    isActive
      ? "border-[#378DFA] bg-[#378DFA] text-white"
      : "border-[#378DFA] bg-[#EFF7FF] text-[#378DFA] hover:bg-[#E0EFFF]"
  )

export function NewsSearchFilters({
  categories,
  activeCategory,
  onSearch,
  onCategoryChange,
  className,
}: NewsSearchFiltersProps) {
  const [query, setQuery] = useState("")
  const [isDraggingTabs, setIsDraggingTabs] = useState(false)
  const tabsScrollRef = useRef<HTMLDivElement>(null)
  const tabsDragRef = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    dragged: false,
  })
  const suppressTabClickRef = useRef(false)

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch?.(query.trim())
  }

  function handleCategorySelect(categoryId: string) {
    if (suppressTabClickRef.current) {
      suppressTabClickRef.current = false
      return
    }
    onCategoryChange?.(categoryId)
  }

  const allTab = categories.find((tab) => tab.id === "all") ?? {
    id: "all",
    label: "Tất cả",
  }
  const scrollableFilterTabs = categories.filter((tab) => tab.id !== "all")

  const endTabsDrag = useCallback((pointerId: number) => {
    const el = tabsScrollRef.current
    if (el?.hasPointerCapture(pointerId)) {
      el.releasePointerCapture(pointerId)
    }
    if (tabsDragRef.current.dragged) {
      suppressTabClickRef.current = true
    }
    tabsDragRef.current.active = false
    setIsDraggingTabs(false)
  }, [])

  const handleTabsPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0 || e.pointerType !== "mouse") return
      const el = tabsScrollRef.current
      if (!el) return
      tabsDragRef.current = {
        active: true,
        startX: e.clientX,
        scrollLeft: el.scrollLeft,
        dragged: false,
      }
      el.setPointerCapture(e.pointerId)
      setIsDraggingTabs(true)
    },
    []
  )

  const handleTabsPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!tabsDragRef.current.active) return
      const el = tabsScrollRef.current
      if (!el) return
      const delta = e.clientX - tabsDragRef.current.startX
      if (Math.abs(delta) > 4) {
        tabsDragRef.current.dragged = true
      }
      el.scrollLeft = tabsDragRef.current.scrollLeft - delta
    },
    []
  )

  const handleTabsPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!tabsDragRef.current.active) return
      endTabsDrag(e.pointerId)
    },
    [endTabsDrag]
  )

  return (
    <div
      className={cn(
        "flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center lg:gap-3 justify-between",
        className
      )}
    >
      <form
        onSubmit={handleSearchSubmit}
        className="flex shrink-0 items-center gap-2"
      >
        <div className="relative w-[200px] min-w-0 sm:w-[360px]">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm"
            className="h-12 w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-0"
          />
        </div>
        <button
          type="submit"
          className="h-12 shrink-0 rounded-md bg-dnu-navy px-6 text-base font-normal text-white transition-colors hover:bg-dnu-navy/90 sm:px-8"
        >
          Tìm kiếm
        </button>
      </form>

      <div
        className={cn(
          "flex min-w-0 items-center gap-2 lg:ml-auto",
          "max-w-full sm:max-w-[min(100%,26rem)] md:max-w-[min(100%,32rem)] lg:max-w-[min(100%,36rem)]"
        )}
        role="tablist"
        aria-label="Lọc theo danh mục"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === allTab.id}
          onClick={() => handleCategorySelect(allTab.id)}
          className={tabButtonClass(activeCategory === allTab.id)}
        >
          {allTab.label}
        </button>

        <div
          ref={tabsScrollRef}
          onPointerDown={handleTabsPointerDown}
          onPointerMove={handleTabsPointerMove}
          onPointerUp={handleTabsPointerUp}
          onPointerCancel={handleTabsPointerUp}
          className={cn(
            "min-w-0 touch-pan-x overflow-x-auto overscroll-x-contain",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            "cursor-grab select-none",
            isDraggingTabs && "cursor-grabbing"
          )}
        >
          <div className="flex w-max flex-nowrap gap-2">
            {scrollableFilterTabs.map((tab) => {
              const isActive = activeCategory === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategorySelect(tab.id)}
                  className={tabButtonClass(isActive)}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
