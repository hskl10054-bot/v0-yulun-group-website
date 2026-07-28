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
        <span className="text-sm font-medium tracking-[0.2em]" style={{ color: "#2A2520" }}>預約諮詢</span>
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

      {/* Contact info + footer */}
      <ContactInfo showCta={false} />
    </main>
  )
}
