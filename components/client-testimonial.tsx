const GOLD = "#B5956A"
const ROSE = "#E2A4AB"

// 客戶好評牆 — 皆為真實客戶來信中的原話（僅正面潤飾），不具名、不標地址。
const REVIEWS = [
  "各工班泥作、油漆、水電師傅都用心誠懇，報價公道實在，讓人很放心。",
  "很多時候不只把份內的工作做好，還會站在我們的角度，多為我們設想、多做一些。",
  "從一開始就不嫌麻煩、不在乎生意，而是真心站在屋主的立場替我們著想。",
  "工程前、中、後各項協調與監督都聯絡得很到位，工班進退場掌握得宜，遇到突發狀況也都能圓滿解決。",
  "家中老宅圓滿解決了當初房屋老舊的各種問題，很欣慰能遇到這麼用心又實在的團隊。",
  "再多的言語，也無法表達我們內心的歡喜與感謝。",
]

export function ClientTestimonial() {
  return (
    <section style={{ background: "#F4F1EC", padding: "6rem 0" }}>
      <style>{`
        .tm-card { position: relative; transition: transform .45s cubic-bezier(.2,.7,.2,1), box-shadow .45s ease; box-shadow: 0 16px 40px -34px rgba(42,37,32,.42); }
        .tm-card:hover { transform: rotate(0deg) translateY(-7px) scale(1.015) !important; box-shadow: 0 34px 64px -34px rgba(181,149,106,.5); z-index: 2; }
        .tm-0 { transform: rotate(-1.6deg); background: #FFFFFF; }
        .tm-1 { transform: rotate(1.4deg); background: #FBF6ED; }
        .tm-2 { transform: rotate(-0.7deg); background: #FBF2F1; }
        @media (prefers-reduced-motion: reduce) { .tm-card, .tm-card:hover { transform: none !important; } }
      `}</style>
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[0.72rem] uppercase tracking-[0.35em]" style={{ color: GOLD }}>Testimonials · 客戶真實回饋</p>
          <h2 style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.95rem, 4vw, 2.5rem)", fontWeight: 700, letterSpacing: "0.1em", color: "#2A2520" }}>客戶怎麼說</h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-[2px] w-14 rounded-full" style={{ background: `linear-gradient(90deg, ${GOLD}, ${ROSE})` }} />
        </div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {REVIEWS.map((quote, i) => (
            <figure
              key={i}
              className={`tm-card tm-${i % 3} mb-6 inline-block w-full break-inside-avoid rounded-2xl border p-6 md:p-7`}
              style={{ borderColor: "#EEE7DB" }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-full text-white"
                  style={{ background: `linear-gradient(135deg, ${GOLD}, ${ROSE})`, fontFamily: "'Cormorant Garamond', serif", fontSize: "1.7rem", lineHeight: 1, paddingTop: "0.5rem", boxShadow: "0 8px 18px -10px rgba(181,149,106,.7)" }}
                >
                  “
                </span>
                <span aria-hidden="true" className="text-[0.9rem] tracking-[0.12em]" style={{ color: GOLD }}>★★★★★</span>
              </div>
              <blockquote className="text-[1.02rem] font-light leading-[1.95] [text-wrap:pretty]" style={{ color: "#42392F" }}>
                「{quote}」
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
