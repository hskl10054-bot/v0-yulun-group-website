"use client"

import { HeroSection } from "@/components/hero-section"
import { BrandSplit } from "@/components/brand-split"
import { StrengthsSection } from "@/components/strengths-section"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { useCmsData, usePageColors } from "@/lib/use-cms-data"

export default function Home() {
  const { content } = useCmsData("home")
  const colors = usePageColors(content, "home")

  return (
    <main>
      <HeroSection colors={colors} />
      <BrandSplit colors={colors} />
      <StrengthsSection colors={colors} />
      <PortfolioPreview colors={colors} />
      <TestimonialsSection colors={colors} />
      <ContactSection colors={colors} />
    </main>
  )
}
