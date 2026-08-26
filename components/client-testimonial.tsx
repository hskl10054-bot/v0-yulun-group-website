const GOLD = "#B5956A"

// 真實客戶來信（南投・依先生，老屋翻新）— 由 LINE 長信精選金句呈現。
export function ClientTestimonial() {
  return (
    <section style={{ background: "#F4F1EC", padding: "6rem 0" }}>
      <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
        <p className="mb-6 text-[0.72rem] uppercase tracking-[0.35em]" style={{ color: GOLD }}>真實客戶來信 · Testimonial</p>

        <span aria-hidden="true" className="block select-none leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "4.5rem", color: "rgba(181,149,106,0.35)", marginBottom: "-1rem" }}>“</span>

        <blockquote className="serif" style={{ fontFamily: "'Noto Serif TC', serif", fontSize: "clamp(1.25rem, 2.6vw, 1.65rem)", fontWeight: 300, lineHeight: 2, color: "#2A2520", fontStyle: "italic" }}>
          各工班泥作、油漆、水電師父，用心誠懇施工，不亂敲詐、漫天開價；很多時候不只完成應該做的工作，而是站在我們的角度，多做一些額外的事。
        </blockquote>

        <p className="mx-auto mt-6 max-w-2xl text-[1rem] font-light leading-[1.95]" style={{ color: "#6B5D4F" }}>
          「工程前、中、後各項協調與監督聯絡，工班進退場有效掌握，突發狀況都能圓滿解決。很欣慰遇到如此用心實在的裝修公司與工班師父。」
        </p>

        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="h-px w-10" style={{ background: GOLD }} />
          <p className="text-[0.95rem] tracking-wide" style={{ color: "#2A2520", fontWeight: 600 }}>依先生</p>
          <p className="text-[0.82rem] tracking-[0.1em]" style={{ color: "#8C8479" }}>南投・老屋翻新</p>
        </div>
      </div>
    </section>
  )
}
