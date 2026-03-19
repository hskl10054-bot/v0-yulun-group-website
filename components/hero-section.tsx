"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { useCmsData, getContentValue, getImageUrl, getContentStyle } from "@/lib/use-cms-data"

export function HeroSection() {
  const { content, images } = useCmsData("home")

  const bgImage = getImageUrl(images, "hero") || "/images/hero-bg.jpg"
  const subtitle = getContentValue(content, "hero", "subtitle") || "Yulun Group"
  const title = getContentValue(content, "hero", "title") || "裕綸集團"
  const slogan = getContentValue(content, "hero", "slogan") || "職人建築，穩健基石，構築空間的永續價值。"

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      {bgImage.startsWith("http") ? (
        <img src={bgImage} alt="裕綸集團作品" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <Image
          src={bgImage}
          alt="裕綸集團作品"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      )}
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#2F2F2F]/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-light tracking-[0.4em] uppercase text-[#D4C5B2]" style={getContentStyle(content, "hero", "subtitle", "home")}>
            {subtitle}
          </span>
          <div className="my-4 h-px w-16 bg-[#6B4E31]" />
        </div>
        <h1 className="text-4xl font-bold tracking-wider text-[#FAFAF8] md:text-6xl lg:text-7xl" style={getContentStyle(content, "hero", "title", "home")}>
          {title}
        </h1>
        <p className="text-lg font-light tracking-[0.2em] text-[#D4C5B2] md:text-xl lg:text-2xl">
          Yulun Group
        </p>
        <div className="my-2 h-px w-24 bg-[#6B4E31]" />
        <p className="max-w-2xl text-base font-light leading-relaxed tracking-wide text-[#FAFAF8]/80 md:text-lg" style={getContentStyle(content, "hero", "slogan", "home")}>
          {slogan}
        </p>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => {
          document.getElementById("brands")?.scrollIntoView({ behavior: "smooth" })
        }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce cursor-pointer"
        aria-label="向下捲動"
      >
        <ChevronDown className="h-8 w-8 text-[#D4C5B2]" />
      </button>
    </section>
  )
}
