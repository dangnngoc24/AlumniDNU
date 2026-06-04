import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"
import {
  careerJourneyFeatured,
  careerJourneySidebar,
  type CareerJourneyArticle,
} from "@/lib/career-journey-data"
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

type CareerJourneyFeaturedCardProps = {
  article: CareerJourneyArticle
  className?: string
}

function CareerJourneyFeaturedCard({
  article,
  className,
}: CareerJourneyFeaturedCardProps) {
  const coverSrc = getNewsCoverUrl(article.coverUrl)
  const isDefaultCover = coverSrc === NEWS_DEFAULT_COVER_URL

  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      <Link href={`/tin-tuc/${article.slug}`} className="group flex h-full flex-1 flex-col">
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-gray-100 lg:aspect-auto lg:h-[394px]">
          <Image
            src={coverSrc}
            alt={isDefaultCover ? "Ảnh mặc định bài viết" : article.coverAlt}
            fill
            className={cn(
              "transition-transform duration-300 group-hover:scale-[1.02]",
              isDefaultCover ? "object-contain" : "object-cover"
            )}
            sizes="(max-width: 1024px) 100vw, 700px"
            priority
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-8">
          <CategoryTag label={article.categoryLabel} />

          <div className="flex flex-col gap-2">
            <h3 className="text-[22px] font-bold leading-snug text-gray-900 transition-colors group-hover:text-dnu-blue">
              {article.title}
            </h3>

            <p className="line-clamp-3 text-base text-gray-500">
              {article.description}
            </p>
          </div>

          <div className="mt-auto">
            <ArticleDate publishedAt={article.publishedAt} />
          </div>
        </div>
      </Link>
    </article>
  )
}

type CareerJourneyCompactCardProps = {
  article: CareerJourneyArticle
  className?: string
}

function CareerJourneyCompactCard({
  article,
  className,
}: CareerJourneyCompactCardProps) {
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
        className="group flex h-full min-h-0 flex-1 items-stretch gap-5 p-4"
      >
        <div className="relative h-[180px] w-[320px] shrink-0 self-start overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={coverSrc}
            alt={isDefaultCover ? "Ảnh mặc định bài viết" : article.coverAlt}
            fill
            className={cn(
              "transition-transform duration-300 group-hover:scale-[1.02]",
              isDefaultCover ? "object-contain" : "object-cover"
            )}
            sizes="320px"
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

export function CareerJourneySection() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto w-full max-w-[1420px]">
        <div className="mb-10 flex flex-col items-center gap-5 text-center sm:mb-12">
          <h2 className="text-[32px] font-bold text-gray-900 sm:text-[40px]">
            Hành Trình <span className="text-[#1D4393]">Nghề Nghiệp</span>
          </h2>
          <div className="h-1 w-[130px] bg-[#EB3C27]" />
        </div>

        <div className="grid gap-5 lg:grid-cols-[700px_minmax(0,1fr)] lg:items-stretch">
          <div className="h-full w-full lg:w-[700px]">
            <CareerJourneyFeaturedCard
              article={careerJourneyFeatured}
              className="h-full"
            />
          </div>
          <div className="flex h-full min-w-0 flex-col gap-5">
            {careerJourneySidebar.map((article) => (
              <CareerJourneyCompactCard
                key={article.id}
                article={article}
                className="lg:flex-1 lg:min-h-0"
              />
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center justify-center rounded-lg bg-[#1D4393] px-16 py-4 text-xl font-normal text-white transition-colors hover:bg-[#173673]"
          >
            Xem tất cả
          </Link>
        </div>
      </div>
    </section>
  )
}
