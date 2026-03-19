"use client"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useCmsData, getListItemsBySection, getImageUrl, getListItemStyle } from "@/lib/use-cms-data"

interface BrandCardProps {
  title: string; subtitle: string; description: string
  imageSrc: string; imageAlt: string; href: string
  titleStyle?: React.CSSProperties; subtitleStyle?: React.CSSProperties; descriptionStyle?: React.CSSProperties
  colors: Record<string, string>
}

function BrandCard({ title, subtitle, description, imageSrc, imageAlt, href, titleStyle, subtitleStyle, descriptionStyle, colors }: BrandCardProps) {
  return (
    <a href={href} className="group relative flex min-h-[400px] flex-1 cursor-pointer items-center justify-center overflow-hidden md:min-h-[600px]" style={{ backgroundColor: colors.brands_accent }}>
      {imageSrc.startsWith("http") ? (
        <img src={imageSrc} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
      ) : (
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" quality={85} />
      )}
      <div className="absolute inset-0 transition-colors duration-500" style={{ backgroundColor: colors.brands_overlay }} />
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        <span className="text-xs font-light tracking-[0.3em] uppercase" style={{ color: colors.brands_text, opacity: 0.7, ...subtitleStyle }}>{subtitle}</span>
        <h2 className="text-2xl font-bold tracking-wider md:text-3xl lg:text-4xl" style={{ color: colors.brands_heading, ...titleStyle }}>{title}</h2>
        <div className="h-px w-12 transition-all duration-500 group-hover:w-20" style={{ backgroundColor: colors.brands_accent }} />
        <p className="max-w-xs text-sm font-light leading-relaxed md:text-base" style={{ color: colors.brands_text, opacity: 0.7, ...descriptionStyle }}>{description}</p>
        <div className="mt-4 flex items-center gap-2 px-6 py-3 text-sm tracking-widest transition-all duration-500 group-hover:border-[#fff1a8] group-hover:bg-[#fff1a8] group-hover:text-[#2A2520]" style={{ borderWidth: "1px", borderStyle: "solid", borderColor: `${colors.brands_heading}4D`, color: colors.brands_heading }}>
          進入品牌官網 <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </a>
  )
}

const defaultCards = [
  { title: "空房子室內設計", subtitle: "Interior Design", description: "為你的空間注入魔法 — 空房開門，幸福進門。透過細膩的動線規劃與美學比例，將居住者的情感與性格注入每一寸留白。", imageSrc: "/images/design-brand.jpg", href: "/design" },
  { title: "裕綸室內裝修", subtitle: "Construction Engineering", description: "匠心傳承，穩健工程，構築世代安居。標準化 SOP 工程管理，讓美學建立在穩固且安全的結構之上。", imageSrc: "/images/construction-brand.jpg", href: "/construction" },
]

interface BrandSplitProps {
  colors: Record<string, string>
}

export function BrandSplit({ colors }: BrandSplitProps) {
  const { content, listItems, images } = useCmsData("home")

  const cmsCards = getListItemsBySection(listItems, "brand_cards")
  const cards = cmsCards.length > 0
    ? cmsCards.map((li, i) => ({
        title: li.title,
        subtitle: li.subtitle,
        description: li.description,
        imageSrc: getImageUrl(images, i === 0 ? "brand_design" : "brand_construction") || defaultCards[i]?.imageSrc || "/images/design-brand.jpg",
        href: li.extra || defaultCards[i]?.href || "/",
        sortOrder: li.sort_order,
      }))
    : defaultCards.map((c, i) => ({ ...c, sortOrder: i + 1 }))

  return (
    <section id="brands" className="flex flex-col md:flex-row">
      {cards.map((card) => (
        <BrandCard
          key={card.title}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
          imageSrc={card.imageSrc}
          imageAlt={card.title}
          href={card.href}
          titleStyle={getListItemStyle(content, "brand_cards", card.sortOrder, "title", "home")}
          subtitleStyle={getListItemStyle(content, "brand_cards", card.sortOrder, "subtitle", "home")}
          descriptionStyle={getListItemStyle(content, "brand_cards", card.sortOrder, "description", "home")}
          colors={colors}
        />
      ))}
    </section>
  )
}
