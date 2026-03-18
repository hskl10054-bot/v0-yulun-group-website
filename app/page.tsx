import { HeroSection } from "@/components/hero-section"
import { BrandSplit } from "@/components/brand-split"
import { StrengthsSection } from "@/components/strengths-section"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
export default function Home() {
  return (
    <main>
      <HeroSection />
      <BrandSplit />
      <StrengthsSection />
      <PortfolioPreview />
      <TestimonialsSection />
      <ContactSection />
    </main>
  )
}
