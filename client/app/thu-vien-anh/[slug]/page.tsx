import Link from "next/link"
import { unstable_noStore as noStore } from "next/cache"
import { notFound } from "next/navigation"
import { GalleryAlbumDetailView } from "@/components/gallery/gallery-album-detail-view"
import { PageContainer } from "@/components/home/page-container"
import { SiteHeader } from "@/components/home/site-header"
import { fetchGalleryAlbumDetailBySlugFromStrapi } from "@/lib/gallery-data"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function GalleryAlbumDetailPage({ params }: PageProps) {
  noStore()
  const { slug } = await params
  const album = await fetchGalleryAlbumDetailBySlugFromStrapi(slug)

  if (!album) {
    notFound()
  }

  return (
    <>
      <SiteHeader
        breadcrumbItems={[
          { label: "Thư viện ảnh", href: "/thu-vien-anh" },
          { label: album.title },
        ]}
      />
      <main className="py-8 sm:py-10">
        <PageContainer>
          <GalleryAlbumDetailView album={album} />
          <div className="mt-10">
            <Link
              href="/thu-vien-anh"
              className="inline-flex text-base font-semibold text-[#1D4393] hover:underline"
            >
              ← Quay lại thư viện ảnh
            </Link>
          </div>
        </PageContainer>
      </main>
    </>
  )
}
