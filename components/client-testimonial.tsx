const GOLD = "#B5956A"

// 客戶好評牆 — 皆為真實客戶來信中的原話（僅正面潤飾），不具名呈現。
const REVIEWS = [
  "各工班泥作、油漆、水電師傅都用心誠懇，報價公道實在，讓人很放心。",
  "工程前、中、後各項協調與監督都聯絡得很到位，工班進退場掌握得宜，遇到突發狀況也都能圓滿解決。",
  "很多時候不只把份內的工作做好，還會站在我們的角度，多為我們設想、多做一些。",
  "家中老宅圓滿解決了當初房屋老舊的各種問題，很欣慰能遇到這麼用心又實在的團隊。",
  "從一開始就不嫌麻煩、不在乎生意，而是真心站在屋主的立場替我們著想。",
  "再多的言語，也無法表達我們內心的歡喜與感謝。",
]

const TAG = "老屋翻新 · 南投"

export function ClientTestimonial() {
  return (
    <section style={{ background: "#F4F1EC", padding: "6rem 0" }}>
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[0.72rem] uppercase tracking-[0.35em]" style={{ color: GOLD }}>Testimonials · 客戶真實回饋</p>
          <h2 style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.875rem, 4vw, 2.35rem)", fontWeight: 700, letterSpacing: "0.1em", color: "#2A2520" }}>客戶怎麼說</h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-[2px] w-12 rounded-full" style={{ background: GOLD }} />
        </div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {REVIEWS.map((quote, i) => (
            <figure
              key={i}
              className="mb-5 inline-block w-full break-inside-avoid rounded-2xl border p-6 md:p-7"
              style={{ borderColor: "#EAE3D8", background: "#FFFFFF", boxShadow: "0 16px 40px -32px rgba(42,37,32,0.4)" }}
            >
              <div aria-hidden="true" className="mb-3 text-[0.9rem] tracking-[0.15em]" style={{ color: GOLD }}>★★★★★</div>
              <blockquote className="text-[1rem] font-light leading-[1.95] [text-wrap:pretty]" style={{ color: "#4A4237" }}>
                「{quote}」
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-2 text-[0.8rem]" style={{ color: "#8C8479" }}>
                <span className="h-px w-5" style={{ background: "#D8CDBC" }} />
                {TAG}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
