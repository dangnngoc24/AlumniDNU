import Link from "next/link"
import { Calendar } from "lucide-react"
import { notFound } from "next/navigation"
import BlockRenderer from "@/components/block-renderer"
import { NewsArticleMetaBar } from "@/components/news/news-article-meta-bar"
import { PageContainer } from "@/components/home/page-container"
import { SiteHeader } from "@/components/home/site-header"
import {
  fetchLatestNewsPosts,
  fetchNewsDetailBySlugFromStrapi,
  fetchRelatedNewsPosts,
  getNewsCoverUrl,
  type NewsListItem,
} from "@/lib/news-data"
import { formatNewsDate } from "@/lib/utils"
import { StrapiImage } from "@/components/custom/strapi-image"

export const dynamic = "force-dynamic"
export const revalidate = 0

type PageProps = {
  params: Promise<{ slug: string }>
}

function SidebarPostCard({ post }: { post: NewsListItem }) {
  const coverSrc = getNewsCoverUrl(post.coverUrl)

  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className="group flex gap-5 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:bg-[#F8FAFF]"
    >
      <div className="relative h-[124px] w-[220px] shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <StrapiImage
          src={coverSrc}
          alt={post.coverAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <span className="inline-flex w-fit rounded-full bg-[#DAECFF] px-2 py-1 text-xs font-semibold text-[#378DFA]">
          {post.categoryLabel}
        </span>
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-gray-900">
          {post.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="size-4 shrink-0 stroke-[1.75]" aria-hidden />
          <time dateTime={post.publishedAt}>{formatNewsDate(post.publishedAt)}</time>
        </div>
      </div>
    </Link>
  )
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const detail = await fetchNewsDetailBySlugFromStrapi(slug)

  if (!detail) {
    notFound()
  }

  const excludePost = { documentId: detail.documentId, id: detail.id }
  const [newestPosts, relatedPosts] = await Promise.all([
    fetchLatestNewsPosts(excludePost, 3),
    fetchRelatedNewsPosts(excludePost, detail.category, 3),
  ])

  const hasBodyBlocks = detail.bodyBlocks.length > 0

  return (
    <>
      <SiteHeader
        breadcrumbItems={[
          { label: "Tin tức & Sự kiện", href: "/tin-tuc" },
          { label: detail.title },
        ]}
      />
      <main className="py-8 sm:py-10">
        <PageContainer>
          <div className="grid gap-[52px] lg:grid-cols-[minmax(0,1fr)_minmax(580px,580px)]">
            <article>
              <span className="inline-flex rounded-full bg-[#DAECFF] px-2 py-1 text-sm font-semibold text-[#378DFA]">
                {detail.categoryLabel}
              </span>

              <h1 className="mt-3 text-[28px] font-bold leading-tight text-gray-900 sm:text-[32px]">
                {detail.title}
              </h1>

              <NewsArticleMetaBar publishedAt={detail.publishedAt} viewCount={0} />

              {detail.description && (
                <p className="mt-5 text-base font-bold italic leading-relaxed text-gray-900 text-justify">
                  {detail.description}
                </p>
              )}

              <div
                id="news-article-print-root"
                className="mt-6 space-y-4 text-base leading-8 text-gray-700 text-justify"
              >
                {hasBodyBlocks ? (
                  detail.bodyBlocks.map((block, index) => (
                    <BlockRenderer key={index} block={block as never} />
                  ))
                ) : (
                  <p>{detail.description || "Nội dung đang được cập nhật."}</p>
                )}
              </div>

              {detail.author ? (
                <p className="mt-8 text-right text-base font-semibold text-gray-900">
                  {detail.author}
                </p>
              ) : null}
            </article>

            <aside className="space-y-8 print:hidden lg:min-w-[580px]">
              <section>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Bài viết mới nhất</h2>
                  <Link
                    href="/tin-tuc"
                    className="text-sm font-normal text-[#1958DC] transition-colors hover:text-[#173673] hover:underline"
                  >
                    Xem thêm
                  </Link>
                </div>
                <div className="mt-4 space-y-5">
                  {newestPosts.length > 0 ? (
                    newestPosts.map((post) => (
                      <SidebarPostCard key={post.documentId} post={post} />
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">Chưa có bài viết mới nhất.</p>
                  )}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Bài viết liên quan</h2>
                  <Link
                    href="/tin-tuc"
                    className="text-sm font-normal text-[#1958DC] transition-colors hover:text-[#173673] hover:underline"
                  >
                    Xem thêm
                  </Link>
                </div>
                <div className="mt-4 space-y-5">
                  {relatedPosts.length > 0 ? (
                    relatedPosts.map((post) => (
                      <SidebarPostCard key={post.documentId} post={post} />
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      Chưa có bài viết liên quan trong cùng danh mục.
                    </p>
                  )}
                </div>
              </section>
            </aside>
          </div>
        </PageContainer>
      </main>
    </>
  )
}
