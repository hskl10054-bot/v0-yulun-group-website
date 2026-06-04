// Browser-side unsigned upload to Cloudinary.
// Requires a Cloudinary unsigned upload preset (Dashboard → Settings → Upload → Add upload preset → Signing Mode: Unsigned).
//
// Env vars (baked at build time):
//   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
//   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

export async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary 未設定：缺少 NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME 或 NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET")
  }

  const fd = new FormData()
  fd.append("file", file)
  fd.append("upload_preset", uploadPreset)
  fd.append("folder", folder)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
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
