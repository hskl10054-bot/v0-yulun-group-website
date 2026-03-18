import { MapPin, Phone, Mail } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-[#2F2F2F] py-16 text-[#FAFAF8]/80 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Top Section */}
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <h3 className="text-2xl font-bold tracking-wider text-[#FAFAF8] md:text-3xl">
            {"裕綸室內裝修"}
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
              {"台中市北屯區"}
              <br />
              {"瀋陽北路73號"}
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

          {/* LINE Links */}
          <div className="flex flex-col items-center gap-4 text-center">
            <Mail className="h-5 w-5 text-[#6B4E31]" />
            <div className="flex flex-col gap-2">
              <a
                href="https://www.instagram.com/human_design.space/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-light transition-colors hover:text-[#6B4E31]"
              >
                {"Instagram"}
              </a>
              <a
                href="mailto:yulun83417215@gmail.com"
                className="text-sm font-light transition-colors hover:text-[#6B4E31]"
              >
                {"yulun83417215@gmail.com"}
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px w-full bg-[#FAFAF8]/10" />

        {/* Copyright */}
        <p className="text-center text-xs font-light tracking-wide text-[#FAFAF8]/40">
          {"© 2026 裕綸室內裝修有限公司 Yulun Group. All Rights Reserved."}
        </p>
      </div>
    </footer>
  )
}
