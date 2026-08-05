import crypto from "crypto"

// Google Search Console (Search Analytics API) — 服務帳戶自動連結，免手動匯出。
// 需要環境變數：GSC_CLIENT_EMAIL、GSC_PRIVATE_KEY、GSC_SITE_URL
const TOKEN_URL = "https://oauth2.googleapis.com/token"
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly"

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

let cachedToken: { token: string; exp: number } | null = null

// 回傳 access token 或錯誤訊息
async function getAccessToken(): Promise<{ token: string | null; error: string | null }> {
  const email = process.env.GSC_CLIENT_EMAIL
  let key = process.env.GSC_PRIVATE_KEY
  if (!email || !key) return { token: null, error: "缺少 GSC_CLIENT_EMAIL 或 GSC_PRIVATE_KEY" }
  key = key.replace(/\\n/g, "\n") // Vercel 環境變數常以 \n 儲存換行

  const now = Math.floor(Date.now() / 1000)
  if (cachedToken && cachedToken.exp > now + 60) return { token: cachedToken.token, error: null }

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
    if (!res.ok) {
      const body = await res.text()
      return { token: null, error: `取得存取權杖失敗 ${res.status}：${body.slice(0, 300)}` }
    }
    const json = (await res.json()) as { access_token?: string; expires_in?: number }
    if (!json.access_token) return { token: null, error: "回應中沒有 access_token" }
    cachedToken = { token: json.access_token, exp: now + (json.expires_in ?? 3600) }
    return { token: json.access_token, error: null }
  } catch (e) {
    return { token: null, error: `簽章/認證錯誤（金鑰格式可能有誤）：${e instanceof Error ? e.message : String(e)}` }
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

// 回傳資料列或錯誤訊息（錯誤會顯示在內部報表頁以利排查）
export async function gscQueryEx(opts: {
  startDate: string
  endDate: string
  dimensions: string[]
  rowLimit?: number
}): Promise<{ rows: GscRow[] | null; error: string | null }> {
  const site = process.env.GSC_SITE_URL
  if (!site) return { rows: null, error: "缺少 GSC_SITE_URL" }
  const { token, error: tokErr } = await getAccessToken()
  if (!token) return { rows: null, error: tokErr }
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
    if (!res.ok) {
      const body = await res.text()
      return { rows: null, error: `GSC API ${res.status}（資源：${site}）：${body.slice(0, 400)}` }
    }
    const json = (await res.json()) as { rows?: GscRow[] }
    return { rows: json.rows ?? [], error: null }
  } catch (e) {
    return { rows: null, error: `查詢錯誤：${e instanceof Error ? e.message : String(e)}` }
  }
}

export async function gscQuery(opts: {
  startDate: string
  endDate: string
  dimensions: string[]
  rowLimit?: number
}): Promise<GscRow[] | null> {
  const { rows } = await gscQueryEx(opts)
  return rows
}
