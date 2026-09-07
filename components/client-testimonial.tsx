const GOLD = "#B5956A"

// 真實客戶來信（南投・依先生，老屋翻新）— 由 LINE 長信精選金句呈現。
export function ClientTestimonial() {
  return (
    <section style={{ background: "#F4F1EC", padding: "6rem 0" }}>
      <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
        <p className="mb-6 text-[0.72rem] uppercase tracking-[0.35em]" style={{ color: GOLD }}>真實客戶來信 · Testimonial</p>

        <span aria-hidden="true" className="block select-none leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "4.5rem", color: "rgba(181,149,106,0.35)", marginBottom: "-1rem" }}>“</span>

        <blockquote className="serif" style={{ fontFamily: "'Noto Serif TC', serif", fontSize: "clamp(1.25rem, 2.6vw, 1.65rem)", fontWeight: 300, lineHeight: 2, color: "#2A2520", fontStyle: "italic" }}>
          每一位泥作、油漆、水電師傅都用心誠懇，報價公道實在；很多時候不只把份內的工作做好，還會站在我們的角度，多為我們設想、多做一些。
        </blockquote>

        <p className="mx-auto mt-6 max-w-2xl text-[1rem] font-light leading-[1.95]" style={{ color: "#6B5D4F" }}>
          「從開工到完工，各項協調與監督都聯絡得很到位，工班進退場掌握得宜，遇到突發狀況也都能圓滿解決。很慶幸能遇到這麼用心又實在的裝修團隊。」
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
