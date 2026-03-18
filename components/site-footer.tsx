import { MapPin, Phone, Mail } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-[#2F2F2F] py-16 text-[#FAFAF8]/80 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Top Section */}
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <h3 className="text-2xl font-bold tracking-wider text-[#FAFAF8] md:text-3xl">
            {"裕綸集團"}
          </h3>
          <p className="text-sm font-light tracking-[0.15em] text-[#D4C5B2]">
            Yulun Group
          </p>
          <div className="h-px w-16 bg-[#6B4E31]" />
        </div>

        {/* Contact Info */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Address */}
          <div className="flex flex-col items-center gap-3 text-center">
            <MapPin className="h-5 w-5 text-[#6B4E31]" />
            <p className="text-sm font-light leading-relaxed">
              {"台中市北屯區瀋陽北路73號"}
            </p>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center gap-3 text-center">
            <Phone className="h-5 w-5 text-[#6B4E31]" />
            <p className="text-sm font-light leading-relaxed">
              <a href="tel:+886-4-2247-9068" className="transition-colors hover:text-[#6B4E31]">
                04-2247-9068
              </a>
            </p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center gap-3 text-center">
            <Mail className="h-5 w-5 text-[#6B4E31]" />
            <p className="text-sm font-light leading-relaxed">
              <a
                href="mailto:yulun83417215@gmail.com"
                className="transition-colors hover:text-[#6B4E31]"
              >
                {"yulun83417215@gmail.com"}
              </a>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px w-full bg-[#FAFAF8]/10" />

        {/* Copyright */}
        <p className="text-center text-xs font-light tracking-wide text-[#FAFAF8]/40">
          {"© 2026 裕綸集團 Yulun Group. All Rights Reserved."}
        </p>
      </div>
    </footer>
  )
}
