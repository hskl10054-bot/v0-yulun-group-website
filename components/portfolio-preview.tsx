"use client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const works = [
  { title: "同齊咖吡 西區精忠店", type: "2025", image: "/images/home/portfolio/home-portfolio-01.jpg", span2: true },
  { title: "壹偲OnlyEase酵素保健茶飲", type: "2025", image: "/images/home/portfolio/home-portfolio-02.JPG", span2: false },
  { title: "勝麗交響曲", type: "2025", image: "/images/home/portfolio/home-portfolio-03.JPG", span2: false },
  { title: "清水聯馥悅", type: "2024", image: "/images/home/portfolio/home-portfolio-04.jpg", span2: false },
  { title: "居家住宅室內設計", type: "2025", image: "/images/home/portfolio/home-portfolio-05.jpg", span2: false },
]

export function PortfolioPreview() {
  return (
    <section className="bg-[#F5F0E8] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between border-b border-[#E5E0DB] pb-6">
          <div>
            <span className="mb-2 block text-xs font-light tracking-[0.4em] uppercase text-[#B5956A]">Portfolio</span>
            <h2 className="text-3xl font-bold tracking-wider text-[#2F2F2F] md:text-4xl">精選作品</h2>
          </div>
          <Link href="/design" className="group flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#6B4E31] transition-colors hover:text-[#2F2F2F]">
            更多作品 <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2 md:grid-cols-3 md:[grid-template-rows:260px_260px]">
          {works.map((w, i) => (
            <div key={w.title} className={`group relative cursor-pointer overflow-hidden aspect-[4/3] md:aspect-auto ${i === 0 ? "sm:row-span-2 sm:aspect-auto" : ""}`}>
              <img src={w.image} alt={w.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="mb-1 text-xs uppercase tracking-widest text-white/60">{w.type}</p>
                <h3 className="text-lg font-light tracking-wider text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{w.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
