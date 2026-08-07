"use client"

import Link from "next/link"
import { HardHat, ShieldCheck, FileText } from "lucide-react"
import { useCmsData, getListItemsBySection, getListItemStyle } from "@/lib/use-cms-data"

// 空房子獨創色：金 → 玫瑰粉
const GOLD = "#B5956A"
const ROSE = "#E2A4AB"

const defaultStrengths = [
  { icon: HardHat, title: "自有工班", description: "擁有專屬施工團隊，確保品質與進度全程掌控，減少外包風險。" },
  { icon: ShieldCheck, title: "專業執照", description: "持有政府核定之室內裝修專業技術人員證照，合法合規、安心保障。" },
  { icon: FileText, title: "透明報價", description: "逐項清單式報價，無隱藏費用，讓每一分預算都花在刀口上。" },
]

// 目前不設任何卡片連結（點擊不跳頁）
const strengthLinks: Record<string, string> = {}

const defaultIcons = [HardHat, ShieldCheck, FileText]

interface StrengthsSectionProps {
  colors: Record<string, string>
}

export function StrengthsSection({ colors }: StrengthsSectionProps) {
  const { content, listItems } = useCmsData("home")

  const cmsStrengths = getListItemsBySection(listItems, "strengths")
  const strengths = cmsStrengths.length > 0
    ? cmsStrengths.map((li, i) => ({
        icon: defaultIcons[i % defaultIcons.length],
        title: li.title,
        description: li.description,
        href: strengthLinks[li.title],
        sortOrder: li.sort_order,
      }))
    : defaultStrengths.map((s, i) => ({ href: undefined, ...s, sortOrder: i + 1 }))

  const border = colors.strengths_card_border || "#E8E3DA"
  const cardBg = colors.strengths_card_bg || "#FFFFFF"

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: colors.strengths_bg }}>
      <style>{`
        .st-card { position: relative; overflow: hidden; border-radius: 24px; transition: transform .5s cubic-bezier(.2,.7,.2,1), box-shadow .5s ease, border-color .5s ease; box-shadow: 0 12px 30px -26px rgba(42,37,32,.3); }
        .st-card:hover { transform: translateY(-9px); border-color: transparent !important; box-shadow: 0 36px 66px -32px rgba(181,149,106,.55); }
        .st-glow { position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .55s ease; background: radial-gradient(125% 80% at 50% 120%, rgba(226,164,171,.22), rgba(181,149,106,.12) 44%, transparent 74%); }
        .st-card:hover .st-glow { opacity: 1; }
        .st-bar { position: absolute; left: 0; right: 0; bottom: 0; height: 4px; transform: scaleX(0); transform-origin: center; transition: transform .55s ease; background: linear-gradient(90deg, ${GOLD}, ${ROSE}); }
        .st-card:hover .st-bar { transform: scaleX(1); }
        .st-badge { transition: background .5s ease, transform .5s ease, box-shadow .5s ease; }
        .st-card:hover .st-badge { background: linear-gradient(135deg, ${GOLD}, ${ROSE}) !important; transform: translateY(-2px) scale(1.06); box-shadow: 0 14px 26px -12px rgba(181,149,106,.55); }
        .st-icn { transition: color .5s ease; }
        .st-card:hover .st-icn { color: #fff !important; }
        .st-title { transition: color .5s ease; }
        .st-card:hover .st-title { color: ${GOLD} !important; }
        @media (prefers-reduced-motion: reduce) { .st-card, .st-card:hover { transform: none; } }
      `}</style>
      <div className="mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center gap-4 text-center md:mb-20">
          <span className="text-xs font-light tracking-[0.3em] uppercase" style={{ color: colors.strengths_accent }}>Our Strengths</span>
          <h2 className="text-3xl font-bold tracking-wider md:text-4xl" style={{ color: colors.strengths_heading }}>集團實力</h2>
          <div className="h-px w-16" style={{ background: `linear-gradient(90deg, ${GOLD}, ${ROSE})` }} />
          <p className="max-w-lg text-[1.05rem] font-light leading-relaxed md:text-[1.15rem]" style={{ color: colors.strengths_text }}>
            以穩健的經營與職人精神，為每一位客戶守護家的品質
          </p>
        </div>

        {/* Strengths Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {strengths.map((strength) => {
            const card = (
              <div
                className="st-card group flex h-full flex-col items-center gap-6 border px-8 py-14 text-center"
                style={{ borderColor: border, backgroundColor: cardBg }}
              >
                <span className="st-glow" aria-hidden="true" />
                <span
                  className="st-badge relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(181,149,106,0.10)", boxShadow: "inset 0 0 0 1px rgba(181,149,106,0.18)" }}
                >
                  <strength.icon className="st-icn h-7 w-7" style={{ color: GOLD }} />
                </span>
                <h3
                  className="st-title relative z-10 text-xl font-bold tracking-wider"
                  style={{ color: colors.strengths_heading, ...getListItemStyle(content, "strengths", strength.sortOrder, "title", "home") }}
                >
                  {strength.title}
                </h3>
                <p
                  className="relative z-10 text-[1.02rem] font-light leading-relaxed md:text-[1.1rem]"
                  style={{ color: colors.strengths_text, ...getListItemStyle(content, "strengths", strength.sortOrder, "description", "home") }}
                >
                  {strength.description}
                </p>
                <span className="st-bar" aria-hidden="true" />
              </div>
            )

            return strength.href ? (
              <Link key={strength.title} href={strength.href} className="block h-full">
                {card}
              </Link>
            ) : (
              <div key={strength.title} className="h-full">
                {card}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
