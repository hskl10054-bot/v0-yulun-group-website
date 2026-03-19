import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"

export const dynamic = "force-dynamic"

// GET /api/list-items?page=home&section=strengths
export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page")
  const section = req.nextUrl.searchParams.get("section")
  const supabase = getSupabaseAdmin()

  let query = supabase.from("list_items").select("*").order("sort_order")
  if (page) query = query.eq("page", page)
  if (section) query = query.eq("section", section)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
  })
}

// POST /api/list-items — create new item
// Body: { page, section, sort_order, title, subtitle?, description?, extra? }
export async function POST(req: NextRequest) {
  const body = await req.json()
  const supabase = getSupabaseAdmin()

  const { data, error } = await supabase
    .from("list_items")
    .insert(body)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// PUT /api/list-items — update item
// Body: { id, title?, subtitle?, description?, extra?, sort_order? }
export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { id, ...updates } = body
  const supabase = getSupabaseAdmin()

  const { error } = await supabase
    .from("list_items")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// DELETE /api/list-items?id=123
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })
  const supabase = getSupabaseAdmin()

  const { error } = await supabase.from("list_items").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
