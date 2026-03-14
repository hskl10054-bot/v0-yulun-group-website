"use client"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface BrandCardProps {
  title: string; subtitle: string; description: string
  imageSrc: string; imageAlt: string; href: string
}

function BrandCard({ title, subtitle, description, imageSrc, imageAlt, href }: BrandCardProps) {
  return (
    <a href={href} className="group relative flex min-h-[400px] flex-1 cursor-pointer items-center justify-center overflow-hidden md:min-h-[600px]">
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" quality={85} />
      <div className="absolute inset-0 bg-[#2F2F2F]/60 transition-colors duration-500 group-hover:bg-[#2F2F2F]/40" />
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        <span className="text-xs font-light tracking-[0.3em] uppercase text-[#D4C5B2]">{subtitle}</span>
        <h2 className="text-2xl font-bold tracking-wider text-[#FAFAF8] md:text-3xl lg:text-4xl">{title}</h2>
        <div className="h-px w-12 bg-[#6B4E31] transition-all duration-500 group-hover:w-20" />
        <p className="max-w-xs text-sm font-light leading-relaxed text-[#FAFAF8]/70 md:text-base">{description}</p>
        <div className="mt-4 flex items-center gap-2 border border-[#FAFAF8]/30 px-6 py-3 text-sm tracking-widest text-[#FAFAF8] transition-all duration-500 group-hover:border-[#6B4E31] group-hover:bg-[#6B4E31]">
          進入品牌官網 <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </a>
  )
}

export function BrandSplit() {
  return (
    <section id="brands" className="flex flex-col md:flex-row">
      <BrandCard title="空房子室內設計" subtitle="Interior Design" description="空間靈魂、美學規劃、機能設計 — 以人為本的空間美學，為每個家注入獨特靈魂。" imageSrc="/images/design-brand.jpg" imageAlt="空房子室內設計" href="/design" />
      <BrandCard title="裕綸室內裝修工程" subtitle="Construction Engineering" description="精準施工、品質控管、專業證照 — 嚴謹工法與透明流程，守護每一吋空間品質。" imageSrc="/images/construction-brand.jpg" imageAlt="裕綸室內裝修工程" href="#" />
    </section>
  )
}
