"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useCmsData, getContentValue, getContentStyle } from "@/lib/use-cms-data"

export function HomeNavbar() {
  const { content } = useCmsData("home")
  const [hidden, setHidden] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [show, setShow] = useState(false)

  const title = getContentValue(content, "hero", "title") || "裕綸集團"
  const slogan = getContentValue(content, "hero", "slogan") || "職人建築，穩健基石，構築空間的永續價值。"

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setAtTop(y < 10)
      setHidden(y > lastY && y > 80)
      lastY = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 1.8s ease, background 1.8s ease, box-shadow 1.8s ease",
          background: atTop ? "transparent" : "rgba(255,255,255,0.95)",
          backdropFilter: atTop ? "none" : "blur(12px)",
          boxShadow: atTop ? "none" : "0 1px 0 rgba(0,0,0,0.06)",
        }}
      >
        <div
          className="px-4 md:px-12"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: 1400,
            margin: "0 auto",
            minHeight: atTop ? "33vh" : "auto",
            paddingTop: atTop ? "0" : "1.6rem",
            paddingBottom: atTop ? "0" : "1.6rem",
            transition: "min-height 2s ease-in-out, padding 2s ease-in-out",
          }}
        >
          {/* Left - Contact */}
          <a
            href="#contact"
            className="left-4 md:left-12"
            style={{
              position: "absolute",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: atTop ? "#FAFAF8" : "#2F2F2F",
              textDecoration: "none",
              transition: "color 0.3s",
              fontWeight: 400,
            }}
          >
            Contact
          </a>

          {/* Center - Branding */}
          <Link
            href="/"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textDecoration: "none",
              gap: "0.2rem",
            }}
          >
            <span
              className={`transition-all duration-1000 ease-out text-lg md:text-xl ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
              style={{
                fontSize: atTop ? undefined : "1.1rem",
                fontWeight: 700,
                letterSpacing: "0.35em",
                color: atTop ? "#FAFAF8" : "#2F2F2F",
                textShadow: atTop ? "0 2px 8px rgba(0,0,0,0.5)" : "none",
                transition: "color 1.5s, font-size 1.5s, text-shadow 1.5s",
                ...getContentStyle(content, "hero", "title", "home"),
              }}
            >
              {title}
            </span>
            <span
              className={`transition-all duration-1000 ease-out delay-200 text-[0.5rem] md:text-[0.6rem] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
              style={{
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: atTop ? "rgba(250,250,248,0.6)" : "#8C8479",
                transition: "color 1.5s",
                fontWeight: 300,
              }}
            >
              Yulun Group
            </span>
            <span
              className={`transition-all duration-1000 ease-out delay-500 text-[0.45rem] md:text-[0.55rem] ${show ? "opacity-100" : "opacity-0"}`}
              style={{
                letterSpacing: "0.15em",
                color: atTop ? "rgba(250,250,248,0.5)" : "#8C8479",
                transition: "color 1.5s",
                fontWeight: 300,
                marginTop: "0.15rem",
                maxHeight: atTop ? "2rem" : "0",
                overflow: "hidden",
                transitionProperty: "color, max-height, opacity, margin",
                transitionDuration: "1.5s",
                ...getContentStyle(content, "hero", "slogan", "home"),
              }}
            >
              {slogan}
            </span>
          </Link>

          {/* Right - Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="right-4 md:right-12"
            style={{
              position: "absolute",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.25rem",
              color: atTop ? "#FAFAF8" : "#2F2F2F",
              transition: "color 0.3s",
            }}
            aria-label="選單"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "rgba(26,21,16,0.95)",
          backdropFilter: "blur(8px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      >
        {[
          { label: "首頁", href: "/" },
          { label: "空房子室內設計", href: "/design" },
          { label: "裕綸室內裝修", href: "/construction" },
          { label: "聯絡我們", href: "#contact" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: "1.4rem",
              fontWeight: 300,
              letterSpacing: "0.2em",
              color: "#FAFAF8",
              textDecoration: "none",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  )
}
