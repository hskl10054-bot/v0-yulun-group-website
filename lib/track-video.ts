// 記錄影片／短片的「點擊播放」事件，寫入既有的 /api/track（page_views 表）。
// 路徑用特殊前綴 /__video/ 或 /__short/，報表會據此彙整，並自流量統計中排除。
export function trackVideoPlay(kind: "video" | "short", id: string) {
  try {
    const body = JSON.stringify({ path: `/__${kind}/${id}`, ref: document.referrer })
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }))
    } else {
      fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {})
    }
  } catch {
    /* 靜默略過，不影響播放 */
  }
}
