import { NextRequest, NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"
import { getSupabaseAdmin } from "@/lib/supabase"

// POST /api/upload
// FormData: file, page, section, alt?, sort_order?
export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("file") as File | null
  const page = formData.get("page") as string
  const section = formData.get("section") as string
  const alt = (formData.get("alt") as string) || ""
  const sortOrder = parseInt((formData.get("sort_order") as string) || "0", 10)

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  // Convert file to base64 for Cloudinary upload
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`

  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(base64, {
    folder: `yulun-cms/${page}/${section}`,
    resource_type: "image",
  })

  // Save to Supabase images table
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("images")
    .insert({
      page,
      section,
      url: result.secure_url,
      alt,
      sort_order: sortOrder,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ url: result.secure_url, id: data.id })
}

// DELETE /api/upload?id=123
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })

  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from("images").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
