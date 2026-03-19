"use client"

import { useState } from "react"
import { HardHat, ShieldCheck, FileText } from "lucide-react"
import { useCmsData, getListItemsBySection } from "@/lib/use-cms-data"

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

export function StrengthsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const { listItems } = useCmsData("home")

  const cmsStrengths = getListItemsBySection(listItems, "strengths")
  const strengths = cmsStrengths.length > 0
    ? cmsStrengths.map((li, i) => ({
        icon: defaultIcons[i % defaultIcons.length],
        title: li.title,
        description: li.description,
      }))
    : defaultStrengths

  return (
    <section className="bg-[#FAFAF8] py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center gap-4 text-center md:mb-20">
          <span className="text-xs font-light tracking-[0.3em] uppercase text-[#6B4E31]">
            Our Strengths
          </span>
          <h2 className="text-3xl font-bold tracking-wider text-[#2F2F2F] md:text-4xl">
            {"集團實力"}
          </h2>
          <div className="h-px w-16 bg-[#6B4E31]" />
          <p className="max-w-lg text-sm font-light leading-relaxed text-[#6B6B6B]">
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
                className={`group flex flex-col items-center gap-6 border px-8 py-12 text-center transition-all duration-500 ${
                  isActive
                    ? "border-[#6B4E31] bg-[#6B4E31] shadow-lg"
                    : "border-[#E5E0DB] bg-[#FFFFFF] hover:border-[#6B4E31] hover:bg-[#6B4E31] hover:shadow-lg"
                }`}
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center border transition-colors duration-500 ${
                    isActive
                      ? "border-[#FAFAF8]/40 bg-[#FAFAF8]"
                      : "border-[#E5E0DB] group-hover:border-[#FAFAF8]/40 group-hover:bg-[#FAFAF8]"
                  }`}
                >
                  <strength.icon className="h-7 w-7 text-[#6B4E31] transition-colors duration-500" />
                </div>
                <h3
                  className={`text-xl font-bold tracking-wider transition-colors duration-500 ${
                    isActive ? "text-[#FAFAF8]" : "text-[#2F2F2F] group-hover:text-[#FAFAF8]"
                  }`}
                >
                  {strength.title}
                </h3>
                <p
                  className={`text-sm font-light leading-relaxed transition-colors duration-500 ${
                    isActive ? "text-[#FAFAF8]/80" : "text-[#6B6B6B] group-hover:text-[#FAFAF8]/80"
                  }`}
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
