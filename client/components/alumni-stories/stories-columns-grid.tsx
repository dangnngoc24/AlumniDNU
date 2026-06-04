import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { StoryArticle } from "@/lib/stories-columns-data"
import { cn } from "@/lib/utils"
import { StoryArticleCard } from "./story-article-card"

export type StoriesColumnConfig = {
  title: string
  titleHighlight: string
  viewAllHref: string
  articles: StoryArticle[]
}

type StoriesColumnProps = StoriesColumnConfig

function StoriesColumn({
  title,
  titleHighlight,
  viewAllHref,
  articles,
}: StoriesColumnProps) {
  return (
    <div className="flex h-full min-w-0 flex-col">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-[32px] font-bold leading-snug text-gray-900">
            {title}{" "}
            <span className="text-[#1D4393]">{titleHighlight}</span>
          </h3>
        </div>

        <Link
          href={viewAllHref}
          className="inline-flex shrink-0 items-center gap-0.5 pt-1 text-base font-semibold text-[#378DFA] transition-colors hover:text-[#173673]"
        >
          Xem tất cả
          <ChevronRight className="size-5" aria-hidden />
        </Link>
      </div>
      <div className="mb-5 mt-6 h-1 w-[130px] bg-[#EB3C27]" />
      <div className="flex flex-1 flex-col gap-5">
        {articles.map((article) => (
          <StoryArticleCard key={article.id} article={article} className="flex-1" />
        ))}
      </div>
    </div>
  )
}

type StoriesColumnsGridProps = {
  columns: [StoriesColumnConfig, StoriesColumnConfig]
  className?: string
}

export function StoriesColumnsGrid({ columns, className }: StoriesColumnsGridProps) {
  return (
    <div
      className={cn(
        "grid gap-5 lg:grid-cols-2 lg:items-stretch",
        className
      )}
    >
      {columns.map((column) => (
        <StoriesColumn key={`${column.title}-${column.titleHighlight}`} {...column} />
      ))}
    </div>
  )
}
