import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"
import {
  getNewsCoverUrl,
  NEWS_DEFAULT_COVER_URL,
  type NewsListItem,
} from "@/lib/news-data"
import { cn, formatNewsDate } from "@/lib/utils"

type NewsPostCardProps = {
  post: NewsListItem
  className?: string
}

export function NewsPostCard({ post, className }: NewsPostCardProps) {
  const coverSrc = getNewsCoverUrl(post.coverUrl)
  const isDefaultCover = coverSrc === NEWS_DEFAULT_COVER_URL

  return (
    <article
      className={cn(
        "overflow-hidden rounded-xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.12)]",
        className
      )}
    >
      <Link href={`/tin-tuc/${post.slug}`} className="group flex h-full flex-col">
        <div className="relative h-[260px] shrink-0 overflow-hidden bg-gray-100">
          <Image
            src={coverSrc}
            alt={isDefaultCover ? "Ảnh mặc định bài viết" : post.coverAlt}
            fill
            className={cn(
              "transition-transform duration-300 group-hover:scale-[1.02]",
              isDefaultCover ? "object-contain" : "object-cover"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <span className="inline-flex w-fit rounded-full bg-[#DAECFF] px-2 py-1 text-sm font-semibold text-[#378DFA]">
            {post.categoryLabel}
          </span>

          <h3 className="line-clamp-3 text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-dnu-blue sm:text-[17px]">
            {post.title}
          </h3>

          <div className="mt-auto flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="size-4 shrink-0 stroke-[1.75]" aria-hidden />
            <time dateTime={post.publishedAt}>{formatNewsDate(post.publishedAt)}</time>
          </div>
        </div>
      </Link>
    </article>
  )
}
