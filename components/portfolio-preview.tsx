"use client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const works = [
  { title: "台中・純白宅", type: "空房子室內設計・2024", image: "/images/home/portfolio/home-portfolio-01.jpg", span2: true },
  { title: "輕工業咖啡廳", type: "空房子室內設計・2023", image: "/images/home/portfolio/home-portfolio-02.JPG", span2: false },
  { title: "北歐極簡宅", type: "空房子室內設計・2023", image: "/images/home/portfolio/home-portfolio-03.JPG", span2: false },
  { title: "精品辦公室", type: "裕綸裝修工程・2024", image: "/images/home/portfolio/home-portfolio-04.jpg", span2: false },
  { title: "老屋翻新案", type: "裕綸裝修工程・2023", image: "/images/home/portfolio/home-portfolio-05.jpg", span2: false },
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
        <div className="grid grid-cols-3 gap-0.5" style={{ gridTemplateRows: "260px 260px" }}>
          {works.map((w, i) => (
            <div key={w.title} className="group relative cursor-pointer overflow-hidden" style={{ gridRow: i === 0 ? "span 2" : undefined }}>
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
