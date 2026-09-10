// 全站影片與短片清單（供裝修頁播放器、短片牆與 SEO 報表共用）。
export interface SiteVideo {
  id: string
  title: string
}

export const SITE_VIDEOS: SiteVideo[] = [
  { id: "kzPW1-jJYwM", title: "新屋木作 CP 值最高怎麼做？" },
  { id: "y5lWfTdHLEY", title: "系統櫃還是木作？怎麼選才省錢" },
  { id: "A-JATjSxQJc", title: "逛到眼花！磁磚店到底要怎麼挑？" },
]

export const SITE_SHORTS: SiteVideo[] = [
  { id: "-8aCes467M4", title: "奇奇妙妙屋 短片 ①" },
  { id: "ewYtT1FIF6k", title: "奇奇妙妙屋 短片 ②" },
  { id: "hc5rrl90qvE", title: "奇奇妙妙屋 短片 ③" },
]

// id → 標題（報表用來把點擊事件對應回影片名稱）
export const VIDEO_TITLES: Record<string, string> = Object.fromEntries(
  [...SITE_VIDEOS, ...SITE_SHORTS].map((v) => [v.id, v.title]),
)
