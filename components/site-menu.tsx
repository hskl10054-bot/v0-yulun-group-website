"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const ITEMS = [
  { label: "首頁", href: "/" },
  { label: "空房子室內設計", href: "/design" },
  { label: "裕綸室內裝修", href: "/construction" },
  { label: "案例分享", href: "/works" },
  { label: "裝修知識", href: "/blog" },
  { label: "聯絡我們", href: "/#contact" },
]

// 共用的漢堡選單（☰）— 放在各子頁導覽列，行為與首頁一致。
export function SiteMenu({ color = "#2F2F2F" }: { color?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="選單"
        aria-expanded={open}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem", color, display: "flex", alignItems: "center" }}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9995,
          background: "rgba(26,21,16,0.95)",
          backdropFilter: "blur(8px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="關閉選單"
          style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#FAFAF8", display: "flex" }}
        >
          <X size={26} />
        </button>
        {ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setOpen(false)}
            style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "1.4rem", fontWeight: 300, letterSpacing: "0.2em", color: "#FAFAF8", textDecoration: "none" }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  )
}
