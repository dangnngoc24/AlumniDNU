import type { Metadata } from "next"
import {
  CareerJourneySection,
  CommunityStoriesSection,
  FeaturedAlumniSection,
  StoriesColumnsSection,
} from "@/components/alumni-stories"
import { SiteHeader } from "@/components/home/site-header"

export const metadata: Metadata = {
  title: "Alumni Stories | DNU Alumni",
  description: "Trang câu chuyện cựu sinh viên DNU Alumni.",
}

export default function AlumniStoriesPage() {
  return (
    <>
      <SiteHeader breadcrumbItems={[{ label: "Alumni Stories" }]} />
      <FeaturedAlumniSection />
      <CareerJourneySection />
      <StoriesColumnsSection />
      <CommunityStoriesSection />
    </>
  )
}
