import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"
import { ContactInfo } from "@/components/contact-info"

// 空房子社群平台
const FB_URL = "https://www.facebook.com/p/%E7%A9%BA%E6%88%BF%E5%AD%90%E8%A8%AD%E8%A8%88-61564720748448/"
const IG_URL = "https://www.instagram.com/human_design.space/"

interface ContactSectionProps {
  colors: Record<string, string>
}

// 首頁最下方：聯絡資訊（含預約 CTA → /booking）＋ footer。內嵌表單已移到 /booking。
export function ContactSection({ colors }: ContactSectionProps) {
  return (
    <>
      <ContactInfo showCta bg={colors.contact_bg || "#F0EAE0"} />
      <footer style={{ background: colors.footer_bg, padding: "2.5rem 1.5rem" }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <a href={FB_URL} target="_blank" rel="noopener noreferrer" aria-label="空房子 Facebook" className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/20 transition-colors hover:bg-white/10" style={{ color: "#B5956A" }}>
              <Facebook className="h-5 w-5" />
            </a>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" aria-label="空房子 Instagram" className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/20 transition-colors hover:bg-white/10" style={{ color: "#B5956A" }}>
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          <p style={{ fontSize: "0.9rem", letterSpacing: "0.06em", color: "rgba(255,255,255,0.45)" }}>
            Copyright © 裕綸集團 Yulun Group All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1" style={{ fontSize: "0.9rem", letterSpacing: "0.06em", color: "rgba(255,255,255,0.4)" }}>
            <span>台中室內設計</span>
            <span style={{ opacity: 0.45 }}>｜</span>
            <span>台中室內裝修</span>
            <span style={{ opacity: 0.45 }}>｜</span>
            <Link href="/blog" className="hover:opacity-70 transition-opacity" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>裝修知識</Link>
            <span style={{ opacity: 0.45 }}>｜</span>
            <Link href="/privacy" className="hover:opacity-70 transition-opacity" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>隱私權政策</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
