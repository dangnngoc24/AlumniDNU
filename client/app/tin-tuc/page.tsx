import type { Metadata } from "next"
import { NewsPageContent } from "@/components/news"
import { PageContainer } from "@/components/home/page-container"
import { SiteHeader } from "@/components/home/site-header"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Tin tức & Sự kiện | DNU Alumni",
  description:
    "Cập nhật tin tức và sự kiện dành cho cộng đồng cựu sinh viên Đại học Đồng Nai.",
}

export default function TinTucPage() {
  return (
    <>
      <SiteHeader breadcrumbItems={[{ label: "Tin tức & Sự kiện" }]} />
      <main className="py-10">
        <PageContainer>
          <NewsPageContent />
        </PageContainer>
      </main>
    </>
  )
}
