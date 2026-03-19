"use client"

import { useCmsData, getListItemsBySection, getListItemStyle } from "@/lib/use-cms-data"

const defaultTestimonials = [
  { quote: "從設計到施工一條龍，省去了我很多協調的麻煩，完工後品質遠超預期。", name: "陳先生", info: "全室設計+施工・台中西屯" },
  { quote: "設計師非常有耐心，把我們家人不同的需求都融合在同一個空間裡，太厲害了。", name: "林太太", info: "三代同堂住宅・台中北區" },
  { quote: "報價透明、工期準時，完全沒有追加費用的情況，這在業界真的很難得。", name: "張老闆", info: "辦公室裝修・台中南區" },
]

export function TestimonialsSection() {
  const { content, listItems } = useCmsData("home")

  const cmsTestimonials = getListItemsBySection(listItems, "testimonials")
  const testimonials = cmsTestimonials.length > 0
    ? cmsTestimonials.map((li) => ({ quote: li.description, name: li.title, info: li.subtitle, sortOrder: li.sort_order }))
    : defaultTestimonials.map((t, i) => ({ ...t, sortOrder: i + 1 }))

  return (
    <section className="bg-[#F5F0E8] py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16 flex flex-col items-center gap-3 text-center">
          <span className="text-xs font-light tracking-[0.35em] uppercase text-[#B5956A]">Testimonials</span>
          <h2 className="text-3xl font-bold tracking-wider text-[#2F2F2F] md:text-4xl">客戶怎麼說</h2>
          <div className="h-px w-12 bg-[#6B4E31]" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="border border-[#E8E3DA] p-8 transition-colors duration-500 hover:border-[#6B4E31]/40">
              <p className="mb-6 font-light italic leading-relaxed text-[#2F2F2F]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", lineHeight: 1.9, ...getListItemStyle(content, "testimonials", t.sortOrder, "description") }}>「{t.quote}」</p>
              <p className="text-xs tracking-[0.2em] uppercase text-[#B5956A]" style={getListItemStyle(content, "testimonials", t.sortOrder, "title")}>{t.name}</p>
              <p className="mt-1 text-xs tracking-wide text-[#8C8479]" style={getListItemStyle(content, "testimonials", t.sortOrder, "subtitle")}>{t.info}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
