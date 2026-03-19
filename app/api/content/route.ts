import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"

export const dynamic = "force-dynamic"

// GET /api/content?page=home
export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page")
  const supabase = getSupabaseAdmin()

  let query = supabase.from("page_content").select("*")
  if (page) query = query.eq("page", page)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
  })
}

// PUT /api/content — upsert a single key-value
// Body: { page, section, key, value }
export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { page, section, key, value } = body
  const supabase = getSupabaseAdmin()

  // Check if exists
  const { data: existing } = await supabase
    .from("page_content")
    .select("id")
    .eq("page", page)
    .eq("section", section)
    .eq("key", key)
    .maybeSingle()

  if (existing) {
    const { error } = await supabase
      .from("page_content")
      .update({ value, updated_at: new Date().toISOString() })
      .eq("id", existing.id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  } else {
    const { error } = await supabase
      .from("page_content")
      .insert({ page, section, key, value })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

// POST /api/content — bulk upsert
// Body: { items: [{ page, section, key, value }, ...] }
export async function POST(req: NextRequest) {
  const { items } = await req.json()
  const supabase = getSupabaseAdmin()

  for (const item of items) {
    const { page, section, key, value } = item
    const { data: existing } = await supabase
      .from("page_content")
      .select("id")
      .eq("page", page)
      .eq("section", section)
      .eq("key", key)
      .maybeSingle()

    if (existing) {
      await supabase
        .from("page_content")
        .update({ value, updated_at: new Date().toISOString() })
        .eq("id", existing.id)
    } else {
      await supabase.from("page_content").insert({ page, section, key, value })
    }
  }

  return NextResponse.json({ ok: true })
}
