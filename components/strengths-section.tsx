"use client"

import { useState } from "react"
import { HardHat, ShieldCheck, FileText } from "lucide-react"
import { useCmsData, getListItemsBySection, getListItemStyle } from "@/lib/use-cms-data"

const defaultStrengths = [
  {
    icon: HardHat,
    title: "自有工班",
    description: "擁有專屬施工團隊，確保品質與進度全程掌控，減少外包風險。",
  },
  {
    icon: ShieldCheck,
    title: "專業執照",
    description: "持有政府核定之室內裝修專業技術人員證照，合法合規、安心保障。",
  },
  {
    icon: FileText,
    title: "透明報價",
    description: "逐項清單式報價，無隱藏費用，讓每一分預算都花在刀口上。",
  },
]

const defaultIcons = [HardHat, ShieldCheck, FileText]

interface StrengthsSectionProps {
  colors: Record<string, string>
}

export function StrengthsSection({ colors }: StrengthsSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const { content, listItems } = useCmsData("home")

  const cmsStrengths = getListItemsBySection(listItems, "strengths")
  const strengths = cmsStrengths.length > 0
    ? cmsStrengths.map((li, i) => ({
        icon: defaultIcons[i % defaultIcons.length],
        title: li.title,
        description: li.description,
        sortOrder: li.sort_order,
      }))
    : defaultStrengths.map((s, i) => ({ ...s, sortOrder: i + 1 }))

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: colors.strengths_bg }}>
      <div className="mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center gap-4 text-center md:mb-20">
          <span className="text-xs font-light tracking-[0.3em] uppercase" style={{ color: colors.strengths_accent }}>
            Our Strengths
          </span>
          <h2 className="text-3xl font-bold tracking-wider md:text-4xl" style={{ color: colors.strengths_heading }}>
            {"集團實力"}
          </h2>
          <div className="h-px w-16" style={{ backgroundColor: colors.strengths_accent }} />
          <p className="max-w-lg text-sm font-light leading-relaxed" style={{ color: colors.strengths_text }}>
            {"以穩健的經營與職人精神，為每一位客戶守護家的品質"}
          </p>
        </div>

        {/* Strengths Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {strengths.map((strength, index) => {
            const isActive = activeIndex === index
            return (
              <div
                key={strength.title}
                onClick={() => setActiveIndex(isActive ? null : index)}
                className="group flex flex-col items-center gap-6 border px-8 py-12 text-center transition-all duration-500"
                style={{
                  borderColor: isActive ? colors.strengths_accent : colors.strengths_card_border,
                  backgroundColor: isActive ? colors.strengths_accent : colors.strengths_card_bg,
                  boxShadow: isActive ? "0 10px 15px -3px rgba(0,0,0,0.1)" : undefined,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = colors.strengths_accent
                    e.currentTarget.style.backgroundColor = colors.strengths_accent
                    e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1)"
                    const title = e.currentTarget.querySelector("[data-strength-title]") as HTMLElement
                    const desc = e.currentTarget.querySelector("[data-strength-desc]") as HTMLElement
                    const iconBox = e.currentTarget.querySelector("[data-strength-icon-box]") as HTMLElement
                    if (title) title.style.color = colors.strengths_bg
                    if (desc) { desc.style.color = colors.strengths_bg; desc.style.opacity = "0.8" }
                    if (iconBox) { iconBox.style.borderColor = `${colors.strengths_bg}66`; iconBox.style.backgroundColor = colors.strengths_bg }
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = colors.strengths_card_border
                    e.currentTarget.style.backgroundColor = colors.strengths_card_bg
                    e.currentTarget.style.boxShadow = "none"
                    const title = e.currentTarget.querySelector("[data-strength-title]") as HTMLElement
                    const desc = e.currentTarget.querySelector("[data-strength-desc]") as HTMLElement
                    const iconBox = e.currentTarget.querySelector("[data-strength-icon-box]") as HTMLElement
                    if (title) title.style.color = colors.strengths_heading
                    if (desc) { desc.style.color = colors.strengths_text; desc.style.opacity = "1" }
                    if (iconBox) { iconBox.style.borderColor = colors.strengths_card_border; iconBox.style.backgroundColor = "" }
                  }
                }}
              >
                <div
                  data-strength-icon-box
                  className="flex h-16 w-16 items-center justify-center border transition-colors duration-500"
                  style={{
                    borderColor: isActive ? `${colors.strengths_bg}66` : colors.strengths_card_border,
                    backgroundColor: isActive ? colors.strengths_bg : undefined,
                  }}
                >
                  <strength.icon className="h-7 w-7 transition-colors duration-500" style={{ color: colors.strengths_icon }} />
                </div>
                <h3
                  data-strength-title
                  className="text-xl font-bold tracking-wider transition-colors duration-500"
                  style={{
                    color: isActive ? colors.strengths_bg : colors.strengths_heading,
                    ...getListItemStyle(content, "strengths", strength.sortOrder, "title", "home"),
                  }}
                >
                  {strength.title}
                </h3>
                <p
                  data-strength-desc
                  className="text-sm font-light leading-relaxed transition-colors duration-500"
                  style={{
                    color: isActive ? colors.strengths_bg : colors.strengths_text,
                    opacity: isActive ? 0.8 : 1,
                    ...getListItemStyle(content, "strengths", strength.sortOrder, "description", "home"),
                  }}
                >
                  {strength.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
