// Browser-side unsigned upload to Cloudinary.
// Cloud name + unsigned preset are hardcoded because Vercel env vars
// were stuck on a wrong value and we couldn't reliably override them.

import { getSupabaseClient } from "@/lib/supabase"

const CLOUD_NAME = "dfvmjmwb7"
const UPLOAD_PRESET = "yulun_admin"

export async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  const fd = new FormData()
  fd.append("file", file)
  fd.append("upload_preset", UPLOAD_PRESET)
  fd.append("folder", folder)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: fd,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body?.error?.message || `Cloudinary 上傳失敗 (${res.status})`)
  }

  const data = await res.json()
  return data.secure_url as string
}

// Upload an image to Cloudinary then insert a row in Supabase `images`.
// Mirrors the previous /api/upload server route behavior so callers can stay simple.
export async function uploadImageRow(
  file: File,
  page: string,
  section: string,
  sortOrder: number,
  alt = "",
): Promise<{ url: string; id: number }> {
  const url = await uploadToCloudinary(file, `yulun-cms/${page}/${section}`)
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("images")
    .insert({ page, section, url, alt, sort_order: sortOrder })
    .select()
    .single()
  if (error) throw new Error(error.message)
  return { url, id: data.id }
}
