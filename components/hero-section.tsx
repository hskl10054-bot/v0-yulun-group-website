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
      <div className={`absolute inset-0 overflow-hidden transition-transform duration-[2000ms] ease-out ${show ? "scale-100" : "scale-110"}`}>
        {bgImage.startsWith("http") ? (
          <img src={bgImage} alt="裕綸集團作品" className="w-full h-full object-cover" />
        ) : (
          <img src={bgImage} alt="裕綸集團作品" className="w-full h-full object-cover" />
        )}
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
