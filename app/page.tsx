import { HeroSection } from "@/components/hero-section"
import { BrandSplit } from "@/components/brand-split"
import { StrengthsSection } from "@/components/strengths-section"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BrandSplit />
      <StrengthsSection />
      <SiteFooter />
    </main>
  )
}
