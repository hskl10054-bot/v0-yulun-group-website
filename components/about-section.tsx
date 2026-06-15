"use client"

interface AboutSectionProps {
  colors: Record<string, string>
}

// 關於裕綸 — left image + right text block, placed under 集團實力 on the homepage.
export function AboutSection({ colors }: AboutSectionProps) {
  return (
    <section className="px-6 py-20 md:px-12 md:py-28" style={{ backgroundColor: "#F4F1EC" }}>
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mb-10 flex items-baseline gap-4 border-b pb-5 md:mb-14" style={{ borderColor: "rgba(43,39,34,0.12)" }}>
          <h2 className="text-2xl font-light tracking-[0.18em] md:text-3xl" style={{ color: "#2F2F2F" }}>關於裕綸</h2>
          <span className="text-[0.65rem] font-light uppercase tracking-[0.35em]" style={{ color: "#A98C78" }}>About</span>
        </div>

        {/* Content: image + text */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div className="overflow-hidden rounded-sm">
            <img
              src="/images/design-brand.jpg"
              alt="關於裕綸集團"
              className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>

          <div>
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
