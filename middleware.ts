import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { gateToken, GATE_COOKIE } from "@/lib/gate"

// 保護後台與 SEO 報表：未設定 ADMIN_PASSWORD 時不啟用（安全預設）。
export const config = {
  matcher: ["/admin", "/admin/:path*", "/seo-report", "/seo-report/:path*"],
}

export async function middleware(req: NextRequest) {
  const pw = process.env.ADMIN_PASSWORD
  if (!pw) return NextResponse.next() // 尚未設定密碼 → 不保護（不影響現況）

  const expected = await gateToken(pw)
  if (req.cookies.get(GATE_COOKIE)?.value === expected) return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = "/gate"
  url.search = `?next=${encodeURIComponent(req.nextUrl.pathname)}`
  return NextResponse.redirect(url)
}
