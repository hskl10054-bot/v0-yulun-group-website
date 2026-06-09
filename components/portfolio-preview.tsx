"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useCmsData, getListItemsBySection, getImageUrl, getListItemStyle } from "@/lib/use-cms-data"
import { useWorksData, slugify } from "@/lib/use-works-data"
import { PortfolioModal } from "./portfolio-modal"

const defaultWorks = [
  { title: "同齊咖吡 西區精忠店", type: "2025", image: "/images/home/portfolio/home-portfolio-01.jpg", span2: true },
  { title: "壹偲OnlyEase酵素保健茶飲", type: "2025", image: "/images/home/portfolio/home-portfolio-02.JPG", span2: false },
  { title: "勝麗交響曲", type: "2025", image: "/images/home/portfolio/home-portfolio-03.JPG", span2: false },
  { title: "清水聯馥悅", type: "2024", image: "/images/home/portfolio/home-portfolio-04.jpg", span2: false },
  { title: "居家住宅室內設計", type: "2025", image: "/images/home/portfolio/home-portfolio-05.jpg", span2: false },
]

interface PortfolioPreviewProps {
  colors: Record<string, string>
}

export function PortfolioPreview({ colors }: PortfolioPreviewProps) {
  const [selectedWork, setSelectedWork] = useState<{ title: string; type: string; image: string; sortOrder: number } | null>(null)
  const { content, listItems, images } = useCmsData("home")

  // Resolve a homepage tile to its matching /works case page. The case slug
  // comes from its English name, so we look the case up in the live CMS list
  // and fall back to the /works list if no match is found (never 404s).
  const { cases } = useWorksData()
  const caseHref = (title: string): string | null => {
    const linkTo = (c: typeof cases[number] | undefined) => (c ? `/works/${slugify(c.enName)}` : "/works")
    if (/onlyease|壹偲/i.test(title)) {
      return linkTo(cases.find((c) => /壹偲/.test(c.zhName) || /onlyease/i.test(c.enName)))
    }
    if (/同齊咖吡|西區精忠/.test(title)) {
      return linkTo(cases.find((c) => /同齊咖吡|西區精忠/.test(c.zhName) || /west\s*district/i.test(c.enName)))
    }
    if (/勝麗交響曲|勝利交響曲/.test(title)) {
      return linkTo(cases.find((c) => /墨石/.test(c.zhName) || /smoke/i.test(c.enName)))
    }
    return null
  }

  const cmsPortfolio = getListItemsBySection(listItems, "portfolio")
  const works = cmsPortfolio.length > 0
    ? cmsPortfolio.map((li, i) => ({
        title: li.title,
        type: li.subtitle,
        image: getImageUrl(images, "portfolio", li.sort_order) || `/images/home/portfolio/home-portfolio-0${li.sort_order}.jpg`,
        span2: i === 0,
        sortOrder: li.sort_order,
      }))
    : defaultWorks.map((w, i) => ({ ...w, sortOrder: i + 1 }))

  return (
    <section className="py-24" style={{ backgroundColor: colors.portfolio_bg }}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between border-b pb-6" style={{ borderColor: colors.strengths_card_border }}>
          <div>
            <span className="mb-2 block text-xs font-light tracking-[0.4em] uppercase" style={{ color: colors.portfolio_accent }}>Portfolio</span>
            <h2 className="text-3xl font-bold tracking-wider md:text-4xl" style={{ color: colors.portfolio_heading }}>精選作品</h2>
          </div>
          <Link href="/works" className="group flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-colors" style={{ color: colors.portfolio_accent }}>
            更多作品 <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2 md:grid-cols-3 md:[grid-template-rows:260px_260px]">
          {works.map((w, i) => {
            // Tiles with a matching case page link straight to it; others open the modal.
            const href = caseHref(w.title)
            const cls = `group relative cursor-pointer overflow-hidden aspect-[4/3] md:aspect-auto ${i === 0 ? "sm:row-span-2 sm:aspect-auto" : ""}`
            const inner = (
              <>
                <img
                  src={w.image}
                  alt={w.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-5 transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                  <p className="mb-1 text-xs uppercase tracking-widest text-white/60">{w.type}</p>
                  <h3 className="text-lg font-light tracking-wider text-white" style={{ fontFamily: "'Cormorant Garamond', serif", ...getListItemStyle(content, "portfolio", w.sortOrder, "title", "home") }}>{w.title}</h3>
                </div>
              </>
            )
            return href ? (
              <Link key={w.title} href={href} className={cls}>{inner}</Link>
            ) : (
              <div key={w.title} onClick={() => setSelectedWork(w)} className={cls}>{inner}</div>
            )
          })}
        </div>
      </div>

      {selectedWork && (
        <PortfolioModal
          isOpen={true}
          onClose={() => setSelectedWork(null)}
          title={selectedWork.title}
          subtitle={selectedWork.type}
          coverImage={selectedWork.image}
          page="home"
          sortOrder={selectedWork.sortOrder}
        />
      )}
    </section>
  )
}
