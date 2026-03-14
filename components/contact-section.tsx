"use client"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="grid md:grid-cols-2">
      <div className="flex flex-col justify-center bg-[#F5F0E8] px-12 py-16 md:px-16 md:py-20">
        <span className="mb-3 text-xs font-light tracking-[0.4em] uppercase text-[#B5956A]">Contact Us</span>
        <h2 className="mb-10 text-3xl font-bold tracking-wider text-[#2F2F2F] md:text-4xl">聯絡裕綸集團</h2>
        <div className="flex flex-col gap-7">
          {[
            { icon: MapPin, label: "地址", value: "台灣台中市 ○○區○○路○○號" },
            { icon: Phone, label: "電話", value: "04 - XXXX - XXXX" },
            { icon: Mail, label: "Email", value: "hello@yulungroup.com.tw" },
            { icon: Clock, label: "營業時間", value: "週一至週六  10:00 — 18:00" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#6B4E31]" />
              <div>
                <p className="mb-0.5 text-xs tracking-[0.25em] uppercase text-[#8C8479]">{label}</p>
                <p className="font-light text-[#2F2F2F]" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem" }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center bg-[#2F2F2F] px-12 py-16 md:px-16 md:py-20">
        <span className="mb-3 text-xs font-light tracking-[0.4em] uppercase text-[#B5956A]">Send Message</span>
        <h2 className="mb-8 text-3xl font-bold tracking-wider text-[#FAFAF8] md:text-4xl">預約諮詢</h2>
        <div className="flex flex-col gap-5">
          {[
            { label: "姓名", placeholder: "您的大名", type: "text" },
            { label: "聯絡電話", placeholder: "0900-000-000", type: "tel" },
            { label: "有興趣的服務", placeholder: "室內設計 / 裝修工程 / 兩者皆是", type: "text" },
          ].map(({ label, placeholder, type }) => (
            <div key={label}>
              <label className="mb-1.5 block text-xs tracking-[0.3em] uppercase text-white/40">{label}</label>
              <input type={type} placeholder={placeholder} className="w-full border-0 border-b border-white/20 bg-transparent pb-2 pt-1 text-sm font-light tracking-wide text-[#FAFAF8] placeholder:text-white/25 outline-none focus:border-[#B5956A] transition-colors" />
            </div>
          ))}
          <div>
            <label className="mb-1.5 block text-xs tracking-[0.3em] uppercase text-white/40">需求說明</label>
            <textarea placeholder="請簡單描述您的空間需求或想法..." rows={3} className="w-full resize-none border-0 border-b border-white/20 bg-transparent pb-2 pt-1 text-sm font-light tracking-wide text-[#FAFAF8] placeholder:text-white/25 outline-none focus:border-[#B5956A] transition-colors" />
          </div>
          <button className="mt-2 w-fit bg-[#6B4E31] px-8 py-3 text-xs tracking-[0.3em] uppercase text-[#FAFAF8] transition-colors hover:bg-[#8B6B45]">送出諮詢 →</button>
        </div>
      </div>
    </section>
  )
}
