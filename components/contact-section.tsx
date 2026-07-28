import { ContactInfo } from "@/components/contact-info"

interface ContactSectionProps {
  colors: Record<string, string>
}

// 首頁最下方：精簡深色 footer（含預約 CTA → /booking、地址、電話、社群、版權）。
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ContactSection({ colors }: ContactSectionProps) {
  return <ContactInfo showCta />
}
