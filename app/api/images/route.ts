import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"

// GET /api/images?page=home&section=hero
export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page")
  const section = req.nextUrl.searchParams.get("section")
  const supabase = getSupabaseAdmin()

  let query = supabase.from("images").select("*").order("sort_order")
  if (page) query = query.eq("page", page)
  if (section) query = query.eq("section", section)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// PUT /api/images — update image record
// Body: { id, url?, alt?, sort_order? }
export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { id, ...updates } = body
  const supabase = getSupabaseAdmin()

  const { error } = await supabase.from("images").update(updates).eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
