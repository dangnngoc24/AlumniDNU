import { HeroSection } from "@/components/home/hero-section"
import { NotableAlumniSection } from "@/components/home/notable-alumni"
import { QuickAccessSection } from "@/components/home/quick-access"
import { SiteHeader } from "@/components/home/site-header"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <QuickAccessSection />
      <NotableAlumniSection />
    </>
  )
}
