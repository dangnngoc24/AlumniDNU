import type { Metadata } from "next"
import {
  AboutIntroSection,
  AboutQuoteSection,
  AboutVisionSection,
} from "@/components/about"
import { SiteHeader } from "@/components/home/site-header"

export const metadata: Metadata = {
  title: "Giới thiệu | DNU Alumni",
  description:
    "Giới thiệu phân hệ Alumni DNU — kết nối cựu sinh viên, sinh viên, nhà trường và doanh nghiệp.",
}

export default function GioiThieuPage() {
  return (
    <>
      <SiteHeader breadcrumbItems={[{ label: "Giới thiệu" }]} />
      <main>
        <AboutIntroSection />
        <AboutVisionSection />
        <AboutQuoteSection />
      </main>
    </>
  )
}
