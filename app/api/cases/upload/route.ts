import { NextRequest, NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"

export const dynamic = "force-dynamic"

// POST /api/cases/upload — upload a case image to Cloudinary, return its URL.
// FormData: file
// Unlike /api/upload this does NOT write to the images table; the returned URL
// is stored directly inside the case row's hero/gallery JSON.
export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("file") as File | null
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const base64 = `data:${file.type};base64,${Buffer.from(bytes).toString("base64")}`

  try {
    const result = await cloudinary.uploader.upload(base64, {
      folder: "kfz-images",
      resource_type: "image",
    })
    return NextResponse.json({ url: result.secure_url })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "upload failed" },
      { status: 500 },
    )
  }
}
