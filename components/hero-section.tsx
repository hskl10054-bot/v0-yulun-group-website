"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { useCmsData, getContentValue, getImageUrl, getContentStyle } from "@/lib/use-cms-data"

interface HeroSectionProps {
  colors: Record<string, string>
}

export function HeroSection({ colors }: HeroSectionProps) {
  const { content, images } = useCmsData("home")
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  const bgImage = getImageUrl(images, "hero") || "/images/hero-bg.jpg"
  const subtitle = getContentValue(content, "hero", "subtitle") || "Yulun Group"
  const title = getContentValue(content, "hero", "title") || "裕綸集團"
  const slogan = getContentValue(content, "hero", "slogan") || "職人建築，穩健基石，構築空間的永續價值。"

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image with slow zoom */}
      <div className={`absolute inset-0 transition-transform duration-[2000ms] ease-out ${show ? "scale-100" : "scale-110"}`} style={{ position: "relative" }}>
        {bgImage.startsWith("http") ? (
          <img src={bgImage} alt="裕綸集團作品" className="w-full h-full object-cover" />
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
      </div>
      {/* Dark Overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: colors.hero_overlay }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <h1
          className={`text-4xl font-bold tracking-wider md:text-6xl lg:text-7xl transition-all duration-1000 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ color: colors.hero_heading, ...getContentStyle(content, "hero", "title", "home") }}
        >
          {title}
        </h1>
        <p
          className={`text-lg font-light tracking-[0.2em] md:text-xl lg:text-2xl transition-all duration-1000 ease-out delay-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ color: colors.hero_text }}
        >
          Yulun Group
        </p>
        <div
          className={`my-2 h-px transition-all duration-1000 ease-out delay-500 ${show ? "w-24 opacity-100" : "w-0 opacity-0"}`}
          style={{ backgroundColor: colors.hero_accent }}
        />
        <p
          className={`max-w-2xl text-base font-light leading-relaxed tracking-wide md:text-lg transition-all duration-1000 ease-out delay-700 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ color: colors.hero_heading, opacity: show ? 0.8 : 0, ...getContentStyle(content, "hero", "slogan", "home") }}
        >
          {slogan}
        </p>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => {
          document.getElementById("brands")?.scrollIntoView({ behavior: "smooth" })
        }}
        className={`absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce cursor-pointer transition-opacity duration-1000 delay-1000 ${show ? "opacity-100" : "opacity-0"}`}
        aria-label="向下捲動"
      >
        <ChevronDown className="h-8 w-8" style={{ color: colors.hero_text }} />
      </button>
    </section>
  )
}
