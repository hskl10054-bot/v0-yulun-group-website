"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-bg.jpg"
        alt="裕綸集團室內設計作品"
        fill
        className="object-cover"
        priority
        quality={90}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#2F2F2F]/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-light tracking-[0.4em] uppercase text-[#D4C5B2]">
            Since 2019
          </span>
          <div className="my-4 h-px w-16 bg-[#6B4E31]" />
        </div>
        <h1 className="text-4xl font-bold tracking-wider text-[#FAFAF8] md:text-6xl lg:text-7xl">
          {"裕綸室內裝修有限公司"}
        </h1>
        <p className="text-lg font-light tracking-[0.2em] text-[#D4C5B2] md:text-xl lg:text-2xl">
          Yulun Group
        </p>
        <div className="my-2 h-px w-24 bg-[#6B4E31]" />
        <p className="max-w-2xl text-base font-light leading-relaxed tracking-wide text-[#FAFAF8]/80 md:text-lg">
          {"打造有溫度的生活空間"}
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
