import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"

export const dynamic = "force-dynamic"

// GET /api/cases — all cases ordered by sort_order
export async function GET() {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from("cases").select("*").order("sort_order")
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
  })
}

// POST /api/cases — create a case
// Body: { sort_order?, cat?, zh_name?, en_name?, tagline?, hero?, meta?, story?, problem?, solution?, highlights?, gallery? }
export async function POST(req: NextRequest) {
  const body = await req.json()
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from("cases").insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// PUT /api/cases — update a case
// Body: { id, ...fields }
export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { id, ...updates } = body
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from("cases").update(updates).eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// DELETE /api/cases?id=123
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from("cases").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
