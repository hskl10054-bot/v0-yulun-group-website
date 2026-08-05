import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "登入｜裕綸集團",
  robots: { index: false, follow: false },
}

const GOLD = "#B5956A"
const INK = "#2A2520"

export default async function GatePage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; err?: string }>
}) {
  const { next = "/admin", err } = await searchParams
  const safeNext = next.startsWith("/") ? next : "/admin"

  return (
    <main style={{ minHeight: "100vh", background: "#FAF8F4", color: INK, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div className="w-full max-w-sm rounded-3xl bg-white px-8 py-12" style={{ boxShadow: "0 30px 80px -40px rgba(42,37,32,0.28)" }}>
        <p className="mb-2 text-[0.78rem] tracking-[0.35em] uppercase" style={{ color: GOLD }}>Restricted</p>
        <h1 style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "1.6rem", fontWeight: 600, letterSpacing: "0.06em" }}>內部管理登入</h1>
        <p className="mt-2 text-[0.9rem] font-light leading-relaxed" style={{ color: "#8C8479" }}>此區域受密碼保護，請輸入管理密碼。</p>

        <form action="/api/gate" method="POST" className="mt-7 flex flex-col gap-4">
          <input type="hidden" name="next" value={safeNext} />
          <div>
            <label htmlFor="password" className="mb-2 block text-[0.85rem] font-medium" style={{ letterSpacing: "0.08em" }}>密碼</label>
            <input
              id="password"
              name="password"
              type="password"
              autoFocus
              required
              autoComplete="current-password"
              className="w-full rounded-xl px-4 py-3 text-[1rem] outline-none"
              style={{ border: `1px solid ${err ? "#D89B94" : "#E4DED4"}`, background: "#FCFAF7", color: INK }}
              placeholder="請輸入管理密碼"
            />
            {err && <p className="mt-2 text-[0.82rem]" style={{ color: "#C2685E" }}>密碼錯誤，請再試一次。</p>}
          </div>
          <button
            type="submit"
            className="mt-1 w-full rounded-full py-3.5 text-[0.92rem] tracking-[0.2em] transition-transform hover:-translate-y-0.5"
            style={{ background: GOLD, color: "#FFFFFF", border: "none", cursor: "pointer" }}
          >
            登入 →
          </button>
        </form>
      </div>
    </main>
  )
}
