// Browser-side unsigned upload to Cloudinary.
// Cloud name + unsigned preset are hardcoded because Vercel env vars
// were stuck on a wrong value and we couldn't reliably override them.

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
