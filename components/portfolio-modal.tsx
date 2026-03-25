"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"

interface PortfolioModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle: string
  coverImage: string
  page: string
  sortOrder: number
}

export function PortfolioModal({ isOpen, onClose, title, subtitle, coverImage, page, sortOrder }: PortfolioModalProps) {
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isOpen) return
    setSelectedIndex(0)
    setLoading(true)

    const supabase = getSupabaseClient()
    supabase
      .from("images")
      .select("url, sort_order")
      .eq("page", page)
      .eq("section", `portfolio_gallery_${sortOrder}`)
      .order("sort_order")
      .then(({ data }) => {
        const urls = data?.map((img) => img.url) || []
        setGalleryImages([coverImage, ...urls])
        setLoading(false)
      })
  }, [isOpen, page, sortOrder, coverImage])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") setSelectedIndex((prev) => Math.max(0, prev - 1))
      if (e.key === "ArrowRight") setSelectedIndex((prev) => Math.min(galleryImages.length - 1, prev + 1))
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, galleryImages.length])

  if (!isOpen) return null

  const allImages = galleryImages.length > 0 ? galleryImages : [coverImage]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#1a1a1a", borderRadius: "8px" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6" style={{ background: "#1a1a1a", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div>
            <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>{subtitle}</p>
            <h2 className="serif text-xl font-light tracking-wider text-white mt-1">{title}</h2>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors p-2">
            <X size={24} />
          </button>
        </div>

        {/* Main Image */}
        <div className="relative" style={{ background: "#111" }}>
          <img
            src={allImages[selectedIndex]}
            alt={`${title} - ${selectedIndex + 1}`}
            className="w-full object-contain"
            style={{ maxHeight: "60vh" }}
          />
          {allImages.length > 1 && (
            <>
              {selectedIndex > 0 && (
                <button
                  onClick={() => setSelectedIndex((prev) => prev - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors"
                  style={{ background: "rgba(0,0,0,0.5)", color: "white" }}
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              {selectedIndex < allImages.length - 1 && (
                <button
                  onClick={() => setSelectedIndex((prev) => prev + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors"
                  style={{ background: "rgba(0,0,0,0.5)", color: "white" }}
                >
                  <ChevronRight size={24} />
                </button>
              )}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs text-white/70" style={{ background: "rgba(0,0,0,0.5)" }}>
                {selectedIndex + 1} / {allImages.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnail Grid */}
        {allImages.length > 1 && (
          <div className="p-6 grid grid-cols-4 sm:grid-cols-6 gap-2">
            {allImages.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedIndex(i)}
                className="cursor-pointer overflow-hidden rounded aspect-square"
                style={{
                  border: i === selectedIndex ? "2px solid rgba(255,255,255,0.6)" : "2px solid transparent",
                  opacity: i === selectedIndex ? 1 : 0.6,
                  transition: "all 0.2s",
                }}
              >
                <img src={img} alt={`${title} - ${i + 1}`} className="h-full w-full object-cover hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
