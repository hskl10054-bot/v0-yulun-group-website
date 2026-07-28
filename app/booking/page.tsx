import type { Metadata } from "next"
import Link from "next/link"
import { SiteMenu } from "@/components/site-menu"
import { BookingForm } from "@/components/booking-form"
import { ContactInfo } from "@/components/contact-info"

export const metadata: Metadata = {
  title: "預約諮詢｜台中室內設計與裝修免費諮詢－裕綸集團",
  description:
    "預約裕綸集團台中室內設計與裝修的免費諮詢。留下坪數、需求與預算，專人將於 3 個工作天內與您聯繫，一站式為您規劃理想的家。",
  alternates: { canonical: "https://www.yulungroup.com/booking" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://www.yulungroup.com/booking",
    siteName: "裕綸集團 Yulun Group",
    title: "預約諮詢｜台中室內設計與裝修免費諮詢－裕綸集團",
    description: "預約台中室內設計與裝修的免費諮詢，專人一站式為您規劃。",
    images: [{ url: "/images/hero-bg.jpg", width: 1567, height: 1045, alt: "裕綸集團 預約諮詢" }],
  },
}

export default function BookingPage() {
  return (
    <main style={{ backgroundColor: "#FAF8F4", color: "#2A2520", minHeight: "100vh" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-6 md:px-12" style={{ borderBottom: "0.5px solid #E8E3DA" }}>
        <Link href="/" className="text-sm tracking-[0.2em]" style={{ color: "#8C8479", textDecoration: "none" }}>← 裕綸集團</Link>
        <span style={{ fontSize: "clamp(1.05rem, 3.5vw, 1.5rem)", fontWeight: 300, letterSpacing: "0.15em", color: "#2A2520" }}>預約諮詢</span>
        <SiteMenu color="#2A2520" />
      </nav>

      {/* Heading + form */}
      <section className="mx-auto max-w-4xl px-6 py-20 md:px-12 md:py-28">
        <div className="mb-12 text-center">
          <span aria-hidden="true" className="mb-1 block select-none font-semibold uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "rgba(107,78,49,0.09)", letterSpacing: "0.1em" }}>Booking</span>
          <p className="mb-4 text-[0.85rem] tracking-[0.35em] uppercase" style={{ color: "#B5956A" }}>Free Consultation</p>
          <h1 style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 500, letterSpacing: "0.06em", color: "#2A2520" }}>預約諮詢</h1>
          <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] font-light leading-loose" style={{ color: "#6B5D4F" }}>
            不用先想好所有答案，也不用先準備設計圖。留下需求與預算，
            <span className="whitespace-nowrap" style={{ color: "#B5956A" }}>空房子室內設計 × 裕綸室內裝修</span>
            專人將於 3 個工作天內與您聯繫，一站式為您規劃理想的家。初次諮詢完全免費。
          </p>
        </div>

        <BookingForm source="預約頁" />
      </section>

      {/* 直接聯繫（表單以外的即時聯絡方式）*/}
      <section className="mx-auto max-w-4xl px-6 pb-24 md:px-12">
        <div className="rounded-3xl px-6 py-12 md:px-14 md:py-14" style={{ background: "#F3ECE1", border: "1px solid #E4DED4" }}>
          <div className="mb-9 text-center">
            <p className="mb-2 text-[0.82rem] tracking-[0.35em] uppercase" style={{ color: "#B5956A" }}>Contact Us</p>
            <h2 style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.1rem)", fontWeight: 600, letterSpacing: "0.08em", color: "#2A2520" }}>不方便填表單？直接聯繫我們</h2>
            <p className="mt-3 text-[0.98rem] font-light" style={{ color: "#6B5D4F" }}>來電、線上詢問或親臨門市都歡迎，我們很樂意為您解答。</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* 電話 */}
            <a href="tel:0422479068" className="flex flex-col items-center gap-3 rounded-2xl bg-white px-5 py-8 text-center transition-transform hover:-translate-y-1" style={{ textDecoration: "none", boxShadow: "0 20px 50px -30px rgba(42,37,32,0.3)" }}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "rgba(181,149,106,0.12)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B5956A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </span>
              <span className="text-[0.8rem] tracking-[0.15em]" style={{ color: "#8C8479" }}>電話諮詢</span>
              <span style={{ fontSize: "1.25rem", fontWeight: 600, color: "#2A2520", letterSpacing: "0.03em" }}>04-2247-9068</span>
              <span className="text-[0.8rem] font-light" style={{ color: "#A99E90" }}>週一至週五 09:00–18:00</span>
            </a>

            {/* 線上詢問 Messenger */}
            <a href="https://m.me/61564720748448" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 rounded-2xl bg-white px-5 py-8 text-center transition-transform hover:-translate-y-1" style={{ textDecoration: "none", boxShadow: "0 20px 50px -30px rgba(42,37,32,0.3)" }}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "rgba(226,164,171,0.16)" }}>
                <svg viewBox="0 0 24 24" fill="#E2A4AB" width="24" height="24"><path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.19.16.14.26.35.27.57l.05 1.78c.02.57.6.94 1.12.71l1.98-.87c.17-.08.36-.09.54-.04 1.03.28 2.12.43 3.3.43 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm6 7.46l-2.93 4.64c-.47.73-1.46.92-2.16.4l-2.33-1.74a.6.6 0 0 0-.72 0l-3.15 2.39c-.42.32-.97-.18-.68-.62l2.93-4.64c.47-.73 1.46-.92 2.16-.4l2.33 1.74a.6.6 0 0 0 .72 0l3.15-2.39c.42-.32.97.18.68.62z" /></svg>
              </span>
              <span className="text-[0.8rem] tracking-[0.15em]" style={{ color: "#8C8479" }}>線上詢問</span>
              <span style={{ fontSize: "1.25rem", fontWeight: 600, color: "#2A2520", letterSpacing: "0.03em" }}>Messenger</span>
              <span className="text-[0.8rem] font-light" style={{ color: "#A99E90" }}>即時線上為您解答</span>
            </a>

            {/* 門市地址 */}
            <a href="https://www.google.com/maps/search/?api=1&query=空房子室內設計%20台中市北屯區瀋陽北路73號" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 rounded-2xl bg-white px-5 py-8 text-center transition-transform hover:-translate-y-1" style={{ textDecoration: "none", boxShadow: "0 20px 50px -30px rgba(42,37,32,0.3)" }}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "rgba(181,149,106,0.12)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B5956A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </span>
              <span className="text-[0.8rem] tracking-[0.15em]" style={{ color: "#8C8479" }}>門市地址</span>
              <span style={{ fontSize: "1.05rem", fontWeight: 600, color: "#2A2520", letterSpacing: "0.03em" }}>台中市北屯區<br />瀋陽北路 73 號</span>
              <span className="text-[0.8rem] font-light" style={{ color: "#B5956A" }}>開啟 Google 地圖 →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <ContactInfo showCta={false} />
    </main>
  )
}
