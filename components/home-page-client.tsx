"use client"

import { HomeNavbar } from "@/components/home-navbar"
import { HeroSection } from "@/components/hero-section"
import { BrandSplit } from "@/components/brand-split"
import { StrengthsSection } from "@/components/strengths-section"
import { AboutSection } from "@/components/about-section"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { SplashScreen } from "@/components/splash-screen"
import { useCmsData, usePageColors } from "@/lib/use-cms-data"

export function HomePageClient() {
  const { content, loading } = useCmsData("home")
  const colors = usePageColors(content, "home")

  return (
    <>
      <SplashScreen loading={loading} />
      <main
        className={`transition-opacity duration-700 ease-in-out ${loading ? "opacity-0" : "opacity-100"}`}
      >
        <HomeNavbar />
        <HeroSection colors={colors} />
        <section className="bg-[#F7F4EF] px-6 py-24 text-center md:py-32" aria-label="服務引言">
          <div className="mx-auto max-w-2xl">
            <span
              className="mb-4 block text-[0.7rem] font-light uppercase tracking-[0.35em] md:text-xs md:tracking-[0.4em]"
              style={{ color: "#A98C78" }}
            >
              Our Services
            </span>
            <h1 className="text-xl font-light leading-[1.7] tracking-[0.05em] text-[#2F2F2F] [text-wrap:balance] md:text-4xl md:leading-snug md:tracking-[0.12em]">
              台中室內設計與裝修，一站構築理想家
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[0.82rem] font-light leading-[2] text-[#6B5D4F] [text-wrap:pretty] md:mt-5 md:text-base md:leading-loose">
              空房子室內設計 × 裕綸室內裝修，<br className="md:hidden" />從美學規劃到專業施工完整整合
            </p>
          </div>
        </section>
        <BrandSplit colors={colors} />
        <StrengthsSection colors={colors} />
        <AboutSection colors={colors} />
        <PortfolioPreview colors={colors} />
        <TestimonialsSection colors={colors} />
        <ContactSection colors={colors} />
      </main>
    </>
  )
}
