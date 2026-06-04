import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"
import type { StoryArticle } from "@/lib/stories-columns-data"
import {
  getNewsCoverUrl,
  NEWS_DEFAULT_COVER_URL,
} from "@/lib/news-data"
import { cn, formatNewsDate } from "@/lib/utils"

function CategoryTag({ label }: { label: string }) {
  return (
    <span className="inline-flex w-fit rounded-full bg-[#DAECFF] px-2 py-1 text-sm font-semibold text-[#378DFA]">
      {label}
    </span>
  )
}

function ArticleDate({ publishedAt }: { publishedAt: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <Calendar className="size-4 shrink-0 stroke-[1.75]" aria-hidden />
      <time dateTime={publishedAt}>{formatNewsDate(publishedAt)}</time>
    </div>
  )
}

type StoryArticleCardProps = {
  article: StoryArticle
  className?: string
}

export function StoryArticleCard({ article, className }: StoryArticleCardProps) {
  const coverSrc = getNewsCoverUrl(article.coverUrl)
  const isDefaultCover = coverSrc === NEWS_DEFAULT_COVER_URL

  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      <Link
        href={`/tin-tuc/${article.slug}`}
        className="group flex h-full min-h-0 flex-1 flex-col items-stretch gap-4 p-4 sm:flex-row sm:gap-5"
      >
        <div className="relative aspect-[16/9] w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 sm:aspect-auto sm:h-[180px] sm:w-[320px]">
          <Image
            src={coverSrc}
            alt={isDefaultCover ? "Ảnh mặc định bài viết" : article.coverAlt}
            fill
            className={cn(
              "transition-transform duration-300 group-hover:scale-[1.02]",
              isDefaultCover ? "object-contain" : "object-cover"
            )}
            sizes="(max-width: 640px) 50vw, 320px"
          />
        </div>

        <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col justify-between">
          <CategoryTag label={article.categoryLabel} />

          <div className="flex flex-col gap-1">
            <h3 className="line-clamp-2 text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-dnu-blue">
              {article.title}
            </h3>

            <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
              {article.description}
            </p>
          </div>

          <ArticleDate publishedAt={article.publishedAt} />
        </div>
      </Link>
    </article>
  )
}
