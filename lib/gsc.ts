import crypto from "crypto"

// Google Search Console (Search Analytics API) — 服務帳戶自動連結，免手動匯出。
// 需要環境變數：GSC_CLIENT_EMAIL、GSC_PRIVATE_KEY、GSC_SITE_URL
const TOKEN_URL = "https://oauth2.googleapis.com/token"
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly"

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

let cachedToken: { token: string; exp: number } | null = null

async function getAccessToken(): Promise<string | null> {
  const email = process.env.GSC_CLIENT_EMAIL
  let key = process.env.GSC_PRIVATE_KEY
  if (!email || !key) return null
  key = key.replace(/\\n/g, "\n") // Vercel 環境變數常以 \n 儲存換行

  const now = Math.floor(Date.now() / 1000)
  if (cachedToken && cachedToken.exp > now + 60) return cachedToken.token

  try {
    const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))
    const claim = b64url(JSON.stringify({ iss: email, scope: SCOPE, aud: TOKEN_URL, exp: now + 3600, iat: now }))
    const signingInput = `${header}.${claim}`
    const signer = crypto.createSign("RSA-SHA256")
    signer.update(signingInput)
    const signature = b64url(signer.sign(key))
    const jwt = `${signingInput}.${signature}`

    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
    })
    if (!res.ok) return null
    const json = (await res.json()) as { access_token?: string; expires_in?: number }
    if (!json.access_token) return null
    cachedToken = { token: json.access_token, exp: now + (json.expires_in ?? 3600) }
    return json.access_token
  } catch {
    return null
  }
}

export interface GscRow {
  keys: string[]
  clicks: number
  impressions: number
  ctr: number // 0–1
  position: number
}

export function gscConfigured(): boolean {
  return !!(process.env.GSC_CLIENT_EMAIL && process.env.GSC_PRIVATE_KEY && process.env.GSC_SITE_URL)
}

export async function gscQuery(opts: {
  startDate: string
  endDate: string
  dimensions: string[]
  rowLimit?: number
}): Promise<GscRow[] | null> {
  const site = process.env.GSC_SITE_URL
  if (!site) return null
  const token = await getAccessToken()
  if (!token) return null
  try {
    const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate: opts.startDate,
        endDate: opts.endDate,
        dimensions: opts.dimensions,
        rowLimit: opts.rowLimit ?? 25,
      }),
    })
    if (!res.ok) return null
    const json = (await res.json()) as { rows?: GscRow[] }
    return json.rows ?? []
  } catch {
    return null
  }
}
