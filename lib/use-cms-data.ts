"use client"

import { useState, useEffect } from "react"

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

  return { content, listItems, images, loading }
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
