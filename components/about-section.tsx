"use client"

import { useEffect, useRef, useState } from "react"

interface AboutSectionProps {
  colors: Record<string, string>
}

// 關於裕綸 — left image + right text block, placed under 集團實力 on the homepage.
// 滑到此區塊時，照片從左邊捲入滑進、文字淡入。
export function AboutSection({ colors }: AboutSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="px-6 py-24 md:px-12 md:py-32" style={{ backgroundColor: "#F4F1EC" }}>
      <div className="relative mx-auto max-w-[100rem]">
        {/* 右下角浮水印 logo */}
        <img
          src="/logo-icon.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 w-20 opacity-20 md:w-28"
        />
        {/* Section heading */}
        <div className="mb-10 border-b pb-5 md:mb-14" style={{ borderColor: "rgba(43,39,34,0.12)" }}>
          <span className="mb-2 block text-[0.65rem] font-light uppercase tracking-[0.35em]" style={{ color: "#A98C78" }}>About</span>
          <h2 className="text-2xl font-light tracking-[0.18em] md:text-3xl" style={{ color: "#2F2F2F" }}>關於裕綸</h2>
        </div>

        {/* Content: image + text */}
        <div ref={ref} className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16">
          {/* 照片：滑到此處時從左邊捲入 */}
          <div
            className="overflow-hidden rounded-sm"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-48px)",
              clipPath: visible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
              transition:
                "opacity 1s ease-out, transform 1.2s cubic-bezier(.2,.7,.2,1), clip-path 1.2s cubic-bezier(.2,.7,.2,1)",
            }}
          >
            <img
              src="/images/about-yulun.jpg"
              alt="關於裕綸集團"
              className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>

          {/* 文字：淡入上移 */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1s ease-out 0.25s, transform 1s ease-out 0.25s",
            }}
          >
            <h3 className="mb-6 text-lg font-medium tracking-[0.08em] md:text-2xl" style={{ color: "#2F2F2F" }}>
              裕綸集團，深耕台中超過 14 年
            </h3>
            <p
              className="text-[0.85rem] font-light leading-[2] [text-wrap:pretty] md:text-[0.95rem]"
              style={{ color: "#5B5349", textAlign: "justify" }}
            >
              從室內設計、裝修工程到生活場域，裕綸集團以職人精神，整合「空房子室內設計」的美學提案與「裕綸室內裝修」的專業施工。我們堅持自有工班、絕不外包，工程保固一年，從設計到完工一站到位，為每一位客戶守護家的品質。
            </p>
            <p className="mt-7 text-base font-medium tracking-[0.1em] md:text-lg" style={{ color: "#2F2F2F" }}>
              讓專業，成為你安心的依靠。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
