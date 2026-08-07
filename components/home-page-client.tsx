"use client"

import { HomeNavbar } from "@/components/home-navbar"
import { HeroSection } from "@/components/hero-section"
import { BrandSplit } from "@/components/brand-split"
import { StrengthsSection } from "@/components/strengths-section"
import { AboutSection } from "@/components/about-section"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { ServiceItems } from "@/components/service-items"
import { ServiceProcess } from "@/components/service-process"
import { FaqSection } from "@/components/faq-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { SplashScreen } from "@/components/splash-screen"
import { useCmsData, usePageColors } from "@/lib/use-cms-data"

// 金色點綴（空房子副色）—— 強制套用到首頁的 accent／icon／line，
// 避免被 CMS 舊有的深棕值覆蓋，讓全站點綴色一致。
const GOLD = "#B5956A"
const GOLD_ACCENTS = [
  "hero_accent",
  "brands_accent",
  "strengths_accent",
  "strengths_icon",
  "portfolio_accent",
  "testimonials_accent",
  "contact_accent",
  "footer_accent",
]

export function HomePageClient({ initialHero }: { initialHero?: string[] }) {
  const { content, loading } = useCmsData("home")
  const baseColors = usePageColors(content, "home")
  const colors = { ...baseColors, ...Object.fromEntries(GOLD_ACCENTS.map((k) => [k, GOLD])) }

  return (
    <>
      <SplashScreen loading={loading} />
      {/* 內容一開始就顯示（首圖已於 SSR 直出），不再等待前端抓取 CMS，改善 LCP */}
      <main>
        <HomeNavbar />
        <HeroSection colors={colors} initialHero={initialHero} />
        <section className="bg-[#F7F4EF] px-6 py-24 text-center md:py-32" aria-label="服務引言">
          <div className="mx-auto max-w-5xl">
            <span
              className="mb-4 block text-[0.7rem] font-light uppercase tracking-[0.35em] md:text-xs md:tracking-[0.4em]"
              style={{ color: "#A98C78" }}
            >
              Our Services
            </span>
            <h1 className="whitespace-nowrap text-[clamp(0.8rem,3.8vw,1.05rem)] font-bold tracking-[0.02em] text-[#2F2F2F] md:text-4xl md:tracking-[0.1em]">
              台中室內設計與裝修，一站構築理想家
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[1.05rem] font-light leading-[2] text-[#6B5D4F] [text-wrap:pretty] md:mt-5 md:text-[1.15rem] md:leading-loose">
              空房子室內設計 × 裕綸室內裝修，<br className="md:hidden" />從美學規劃到專業施工完整整合
            </p>
          </div>
        </section>
        <BrandSplit colors={colors} />
        <StrengthsSection colors={colors} />
        <AboutSection colors={colors} />
        <PortfolioPreview colors={colors} />
        <ServiceItems colors={colors} />
        <ServiceProcess colors={colors} />
        <FaqSection colors={colors} />
        <TestimonialsSection colors={colors} />
        <ContactSection colors={colors} />
      </main>
    </>
  )
}
