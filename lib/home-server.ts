import { getSupabaseAdmin } from "@/lib/supabase"

const FALLBACK_HERO = ["/images/hero-bg.jpg"]

// 伺服器端取得首頁 hero 輪播圖（依 sort_order），供 SSR 直出與 preload，改善 LCP。
// 資料表不可用或為空時回退到預設圖，確保不影響建置與渲染。
export async function getHeroImagesServer(): Promise<string[]> {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("images")
      .select("url, sort_order")
      .eq("page", "home")
      .eq("section", "hero")
      .order("sort_order", { ascending: true })
    if (error || !data || data.length === 0) return FALLBACK_HERO
    const urls = data.map((r) => String(r.url)).filter(Boolean)
    return urls.length > 0 ? urls : FALLBACK_HERO
  } catch {
    return FALLBACK_HERO
  }
}
