"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useCmsData, getContentValue, getImageUrl, getImagesBySection, getContentStyle } from "@/lib/use-cms-data"

interface HeroSectionProps {
  colors: Record<string, string>
}

const AUTOPLAY_INTERVAL = 5000 // 5 seconds per slide
const FALLBACK_IMAGES = ["/images/hero-bg.jpg"]

export function HeroSection({ colors }: HeroSectionProps) {
  const { content, images } = useCmsData("home")
  const [show, setShow] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Gather all hero images from CMS, fallback to single default
  const heroImages = (() => {
    const cmsImages = getImagesBySection(images, "hero")
    if (cmsImages.length > 0) return cmsImages.map((img) => img.url)
    const singleImage = getImageUrl(images, "hero")
    if (singleImage) return [singleImage]
    return FALLBACK_IMAGES
  })()

  const slideCount = heroImages.length

  // Auto-play
  const startAutoplay = useCallback(() => {
    if (slideCount <= 1) return
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount)
    }, AUTOPLAY_INTERVAL)
  }, [slideCount])

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    startAutoplay()
    return stopAutoplay
  }, [startAutoplay, stopAutoplay])

  // Reset index if images change
  useEffect(() => {
    setActiveIndex(0)
  }, [slideCount])

  const goToSlide = (index: number) => {
    setActiveIndex(index)
    startAutoplay() // Reset timer
  }

  const subtitle = getContentValue(content, "hero", "subtitle") || "Yulun Group"
  const title = getContentValue(content, "hero", "title") || "裕綸集團"
  const slogan = getContentValue(content, "hero", "slogan") || "職人建築，穩健基石，構築空間的永續價值。"

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Images — crossfade carousel */}
      {heroImages.map((src, i) => (
        <div
          key={src + i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: 0 }}
        >
          <div className={`w-full h-full overflow-hidden transition-transform duration-[2000ms] ease-out ${show ? "scale-100" : "scale-110"}`}>
            <img
              src={src}
              alt={`裕綸集團作品 ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      {slideCount > 1 && (
        <div className={`absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 gap-2 transition-opacity duration-1000 delay-1000 ${show ? "opacity-100" : "opacity-0"}`}>
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-8 bg-white/90" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`切換至第 ${i + 1} 張圖片`}
            />
          ))}
        </div>
      )}

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
