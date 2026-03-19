"use client"

import { useState, useEffect } from "react"
import { getDefaultContentFont, getDefaultListFont } from "@/lib/default-fonts"

interface ContentRow {
  id?: number; page: string; section: string; key: string; value: string
}
interface ListItem {
  id?: number; page: string; section: string; sort_order: number
  title: string; subtitle: string; description: string; extra: string
}
interface ImageRow {
  id?: number; page: string; section: string; url: string; alt: string; sort_order: number
}

interface CmsData {
  content: ContentRow[]
  listItems: ListItem[]
  images: ImageRow[]
  loading: boolean
  page: string
}

export function useCmsData(page: string): CmsData {
  const [content, setContent] = useState<ContentRow[]>([])
  const [listItems, setListItems] = useState<ListItem[]>([])
  const [images, setImages] = useState<ImageRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function fetchAll() {
      try {
        const [c, l, i] = await Promise.all([
          fetch(`/api/content?page=${page}`).then((r) => r.ok ? r.json() : []),
          fetch(`/api/list-items?page=${page}`).then((r) => r.ok ? r.json() : []),
          fetch(`/api/images?page=${page}`).then((r) => r.ok ? r.json() : []),
        ])
        if (!cancelled) {
          setContent(c)
          setListItems(l)
          setImages(i)
        }
      } catch {
        // Silently fail — fallback to defaults
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchAll()
    return () => { cancelled = true }
  }, [page])

  return { content, listItems, images, loading, page }
}

// Helper: get a content value by section + key
export function getContentValue(content: ContentRow[], section: string, key: string): string {
  return content.find((c) => c.section === section && c.key === key)?.value || ""
}

// Helper: get list items for a section, sorted
export function getListItemsBySection(listItems: ListItem[], section: string): ListItem[] {
  return listItems
    .filter((li) => li.section === section)
    .sort((a, b) => a.sort_order - b.sort_order)
}

// Helper: get image URL by section and sort order
export function getImageUrl(images: ImageRow[], section: string, sortOrder: number = 1): string {
  return images.find((i) => i.section === section && i.sort_order === sortOrder)?.url || ""
}

// Helper: get inline style for a content field (font size + font family)
// Falls back to DEFAULT_CONTENT_FONTS if no CMS value is set
export function getContentStyle(content: ContentRow[], section: string, key: string, page?: string): React.CSSProperties {
  const fontSize = getContentValue(content, section, `${key}_font_size`)
  const fontFamily = getContentValue(content, section, `${key}_font_family`)
  const defaults = page ? getDefaultContentFont(page, section, key) : {}
  const style: React.CSSProperties = {}
  const finalFontSize = fontSize || defaults.fontSize
  const finalFontFamily = fontFamily || defaults.fontFamily
  if (finalFontSize) style.fontSize = finalFontSize
  if (finalFontFamily) style.fontFamily = finalFontFamily
  return style
}

// Helper: get inline style for a list item field
// Falls back to DEFAULT_LIST_FONTS if no CMS value is set
export function getListItemStyle(content: ContentRow[], sectionKey: string, sortOrder: number, field: string, page?: string): React.CSSProperties {
  const fontSize = getContentValue(content, `${sectionKey}_styles`, `item_${sortOrder}_${field}_font_size`)
  const fontFamily = getContentValue(content, `${sectionKey}_styles`, `item_${sortOrder}_${field}_font_family`)
  const defaults = page ? getDefaultListFont(page, sectionKey, field) : {}
  const style: React.CSSProperties = {}
  const finalFontSize = fontSize || defaults.fontSize
  const finalFontFamily = fontFamily || defaults.fontFamily
  if (finalFontSize) style.fontSize = finalFontSize
  if (finalFontFamily) style.fontFamily = finalFontFamily
  return style
}
