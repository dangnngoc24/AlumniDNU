import type { NewsListItem } from "@/lib/news-data"
import { cn } from "@/lib/utils"
import { NewsPostCard } from "./news-post-card"

type NewsPostGridProps = {
  posts?: NewsListItem[]
  categoryId?: string
  className?: string
}

export function filterPostsByCategory(
  posts: NewsListItem[],
  categoryId: string
): NewsListItem[] {
  if (categoryId === "all") return posts
  return posts.filter((post) => post.filterCategory === categoryId)
}

export function NewsPostGrid({
  posts = [],
  categoryId = "all",
  className,
}: NewsPostGridProps) {
  const visiblePosts = filterPostsByCategory(posts, categoryId)

  if (visiblePosts.length === 0) {
    return (
      <p className={cn("py-12 text-center text-gray-600", className)}>
        Không có bài viết nào trong danh mục này.
      </p>
    )
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-5",
        className
      )}
    >
      {visiblePosts.map((post) => (
        <NewsPostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
