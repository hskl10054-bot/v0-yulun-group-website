// 密碼登入用的 token 工具（Edge / Node 皆相容，使用 Web Crypto）
export const GATE_COOKIE = "yl_auth"

// 由密碼推導出 cookie token（單向雜湊）。cookie 為 httpOnly，且密碼只存在環境變數，
// 因此即使原始碼公開也無法偽造 —— 必須知道密碼才能算出相同 token。
export async function gateToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`yl-gate::${password}`)
  const buf = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("")
}
