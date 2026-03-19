"use client"

import { useCmsData, getListItemsBySection, getListItemStyle } from "@/lib/use-cms-data"

const defaultTestimonials = [
  { quote: "從設計到施工一條龍，省去了我很多協調的麻煩，完工後品質遠超預期。", name: "陳先生", info: "全室設計+施工・台中西屯" },
  { quote: "設計師非常有耐心，把我們家人不同的需求都融合在同一個空間裡，太厲害了。", name: "林太太", info: "三代同堂住宅・台中北區" },
  { quote: "報價透明、工期準時，完全沒有追加費用的情況，這在業界真的很難得。", name: "張老闆", info: "辦公室裝修・台中南區" },
]

interface TestimonialsSectionProps {
  colors: Record<string, string>
}

export function TestimonialsSection({ colors }: TestimonialsSectionProps) {
  const { content, listItems } = useCmsData("home")

  const cmsTestimonials = getListItemsBySection(listItems, "testimonials")
  const testimonials = cmsTestimonials.length > 0
    ? cmsTestimonials.map((li) => ({ quote: li.description, name: li.title, info: li.subtitle, sortOrder: li.sort_order }))
    : defaultTestimonials.map((t, i) => ({ ...t, sortOrder: i + 1 }))

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: colors.testimonials_bg }}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16 flex flex-col items-center gap-3 text-center">
          <span className="text-xs font-light tracking-[0.35em] uppercase" style={{ color: colors.testimonials_accent }}>Testimonials</span>
          <h2 className="text-3xl font-bold tracking-wider md:text-4xl" style={{ color: colors.testimonials_heading }}>客戶怎麼說</h2>
          <div className="h-px w-12" style={{ backgroundColor: colors.testimonials_accent }} />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="p-8 transition-colors duration-500" style={{ borderWidth: "1px", borderStyle: "solid", borderColor: colors.testimonials_card_border }}>
              <p className="mb-6 font-light italic leading-relaxed" style={{ color: colors.testimonials_text, fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", lineHeight: 1.9, ...getListItemStyle(content, "testimonials", t.sortOrder, "description", "home") }}>「{t.quote}」</p>
              <p className="text-xs tracking-[0.2em] uppercase" style={{ color: colors.testimonials_accent, ...getListItemStyle(content, "testimonials", t.sortOrder, "title", "home") }}>{t.name}</p>
              <p className="mt-1 text-xs tracking-wide" style={{ color: colors.contact_text, ...getListItemStyle(content, "testimonials", t.sortOrder, "subtitle", "home") }}>{t.info}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
