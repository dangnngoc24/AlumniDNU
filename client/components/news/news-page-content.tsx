"use client"

import { useEffect, useMemo, useState } from "react"
import {
  buildNewsFilterTabs,
  type NewsFilterTab,
  type NewsListItem,
} from "@/lib/news-data"
import { filterPostsByCategory, NewsPostGrid } from "./news-post-grid"
import {
  NewsPagination,
  NEWS_PAGE_SIZE_OPTIONS,
  NEWS_POSTS_PER_PAGE,
} from "./news-pagination"
import { NewsSearchFilters } from "./news-search-filters"

export function NewsPageContent() {
  const [posts, setPosts] = useState<NewsListItem[]>([])
  const [tabs, setTabs] = useState<NewsFilterTab[]>([{ id: "all", label: "Tất cả" }])
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState<number>(NEWS_POSTS_PER_PAGE)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadNews() {
      try {
        const response = await fetch("/api/news", { cache: "no-store" })
        if (!response.ok) {
          throw new Error("Không tải được dữ liệu tin tức.")
        }

        const json = (await response.json()) as {
          data?: {
            posts?: NewsListItem[]
            tabs?: NewsFilterTab[]
          }
        }

        const nextPosts = Array.isArray(json.data?.posts) ? json.data?.posts : []
        const nextTabs =
          Array.isArray(json.data?.tabs) && json.data.tabs.length > 0
            ? json.data.tabs
            : buildNewsFilterTabs(nextPosts)

        if (!cancelled) {
          setPosts(nextPosts)
          setTabs(nextTabs)
          setLoadError(null)
        }
      } catch {
        if (!cancelled) {
          setPosts([])
          setTabs([{ id: "all", label: "Tất cả" }])
          setLoadError("Không thể tải dữ liệu từ hệ thống quản trị.")
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadNews()
    return () => {
      cancelled = true
    }
  }, [])

  const filteredPosts = useMemo(
    () => filterPostsByCategory(posts, activeCategory),
    [posts, activeCategory]
  )

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize))

  const safePage = Math.min(currentPage, totalPages)

  const paginatedPosts = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return filteredPosts.slice(start, start + pageSize)
  }, [filteredPosts, safePage, pageSize])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    if (!tabs.some((tab) => tab.id === activeCategory)) {
      setActiveCategory("all")
    }
  }, [tabs, activeCategory])

  function handleCategoryChange(categoryId: string) {
    setActiveCategory(categoryId)
  }

  function handlePageChange(page: number) {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handlePageSizeChange(nextPageSize: number) {
    setPageSize(nextPageSize)
    setCurrentPage(1)
  }

  return (
    <>
      <NewsSearchFilters
        categories={tabs}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      {loadError && <p className="mt-4 text-sm text-[#FC4C37]">{loadError}</p>}
      {loading ? (
        <p className="mt-8 text-center text-gray-600">Đang tải tin tức...</p>
      ) : (
        <>
      <NewsPostGrid posts={paginatedPosts} className="mt-8 sm:mt-10" />
      {filteredPosts.length > 0 && (
        <NewsPagination
          currentPage={safePage}
          totalPages={totalPages}
          totalItems={filteredPosts.length}
          pageSize={pageSize}
          pageSizeOptions={NEWS_PAGE_SIZE_OPTIONS}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          className="mt-8 sm:mt-10"
        />
      )}
        </>
      )}
    </>
  )
}
