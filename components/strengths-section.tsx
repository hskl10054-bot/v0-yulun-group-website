import { HardHat, ShieldCheck, FileText } from "lucide-react"

const strengths = [
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

export function StrengthsSection() {
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
            {"打造有溫度的生活空間，從設計、軟裝到工程統籌的一條龍服務"}
          </p>
        </div>

        {/* Strengths Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {strengths.map((strength) => (
            <div
              key={strength.title}
              className="group flex flex-col items-center gap-6 border border-[#E5E0DB] bg-[#FFFFFF] px-8 py-12 text-center transition-all duration-500 hover:border-[#6B4E31]/30 hover:shadow-lg"
            >
              <div className="flex h-16 w-16 items-center justify-center border border-[#E5E0DB] transition-colors duration-500 group-hover:border-[#6B4E31] group-hover:bg-[#6B4E31]">
                <strength.icon className="h-7 w-7 text-[#6B4E31] transition-colors duration-500 group-hover:text-[#FAFAF8]" />
              </div>
              <h3 className="text-xl font-bold tracking-wider text-[#2F2F2F]">
                {strength.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-[#6B6B6B]">
                {strength.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
