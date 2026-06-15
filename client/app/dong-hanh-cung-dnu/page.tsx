import type { Metadata } from "next"
import { ContributionFormCard } from "@/components/dong-hanh"
import { PageContainer } from "@/components/home/page-container"
import { SiteHeader } from "@/components/home/site-header"

export const metadata: Metadata = {
  title: "Đồng hành cùng DNU | DNU Alumni",
  description:
    "Đồng hành cùng Đại học Đồng Nai — đóng góp và hỗ trợ sự phát triển của Nhà trường.",
}

export default function DongHanhCungDnuPage() {
  return (
    <>
      <SiteHeader breadcrumbItems={[{ label: "Đồng hành cùng DNU" }]} />
      <main className="py-10 sm:py-14 bg-[#EFF7FF]">
        <PageContainer>
          <ContributionFormCard />
        </PageContainer>
      </main>
    </>
  )
}