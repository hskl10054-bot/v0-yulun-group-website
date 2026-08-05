import { NextResponse } from "next/server"
import { gateToken, GATE_COOKIE } from "@/lib/gate"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  const form = await req.formData()
  const password = String(form.get("password") ?? "")
  const nextRaw = String(form.get("next") ?? "/admin")
  const next = nextRaw.startsWith("/") ? nextRaw : "/admin" // 只允許站內相對路徑

  const pw = process.env.ADMIN_PASSWORD
  if (pw && password === pw) {
    const token = await gateToken(pw)
    const res = NextResponse.redirect(new URL(next, req.url), 303)
    res.cookies.set(GATE_COOKIE, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 天
    })
    return res
  }
  return NextResponse.redirect(new URL(`/gate?next=${encodeURIComponent(next)}&err=1`, req.url), 303)
}
