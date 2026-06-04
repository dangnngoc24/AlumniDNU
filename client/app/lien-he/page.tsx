import type { Metadata } from "next"
import { ContactPageContent } from "@/components/contact"
import { PageContainer } from "@/components/home/page-container"
import { SiteHeader } from "@/components/home/site-header"

export const metadata: Metadata = {
  title: "Liên hệ | DNU Alumni",
  description:
    "Thông tin liên hệ Ban Alumni Đại học Đồng Nai — kết nối với cộng đồng cựu sinh viên.",
}

export default function LienHePage() {
  return (
    <>
      <SiteHeader breadcrumbItems={[{ label: "Liên hệ" }]} />
      <main className="py-10">
        <PageContainer>
          <ContactPageContent />
        </PageContainer>
      </main>
    </>
  )
}
