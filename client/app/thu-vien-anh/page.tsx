import type { Metadata } from "next"
import { unstable_noStore as noStore } from "next/cache"
import { GalleryAlbumGrid } from "@/components/gallery"
import { PageContainer } from "@/components/home/page-container"
import { SiteHeader } from "@/components/home/site-header"
import { fetchGalleryAlbumsFromStrapi } from "@/lib/gallery-data"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Thư viện ảnh | DNU Alumni",
  description:
    "Thư viện ảnh hoạt động và khoảnh khắc cộng đồng cựu sinh viên Đại học Đồng Nai.",
}

export default async function ThuVienAnhPage() {
  noStore()
  const albums = await fetchGalleryAlbumsFromStrapi()

  return (
    <>
      <SiteHeader breadcrumbItems={[{ label: "Thư viện ảnh" }]} />
      <main className="py-10">
        <PageContainer>
          <GalleryAlbumGrid albums={albums} />
        </PageContainer>
      </main>
    </>
  )
}
