import type { Metadata } from "next"
import { AlumniRegisterForm } from "@/components/register"
import { PageContainer } from "@/components/home/page-container"
import { SiteHeader } from "@/components/home/site-header"

export const metadata: Metadata = {
  title: "Đăng ký thông tin Alumni | DNU Alumni",
  description:
    "Tham gia mạng lưới cựu sinh viên Đại học Đồng Nai và mở rộng cơ hội kết nối.",
}

export default function DangKyPage() {
  return (
    <>
      <SiteHeader
        breadcrumbItems={[{ label: "Đăng ký thông tin Alumni" }]}
      />
      <main className="bg-[#EFF7FF] py-[60px]">
        <PageContainer className="px-4 sm:px-0">
          <div className="mx-auto max-w-[700px]">
            <header className="mb-10 text-center">
              <h1 className="text-[28px] font-bold text-gray-900">
                Đăng Ký Thông Tin Alumni
              </h1>
              <p className="mt-2 text-base text-gray-700 sm:text-lg">
                Tham gia mạng lưới cựu sinh viên và mở rộng cơ hội kết nối
              </p>
            </header>
            <AlumniRegisterForm />
          </div>
        </PageContainer>
      </main>
    </>
  )
}
