import Link from "next/link"

// 可見的導覽路徑（麵包屑）。例：首頁 › 作品案例 › 墨石
export function Breadcrumb({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.8rem]" style={{ color: "#8C8479", listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {it.href ? (
              <Link href={it.href} className="transition-colors hover:text-[#B5956A]" style={{ textDecoration: "none", color: "inherit" }}>{it.name}</Link>
            ) : (
              <span style={{ color: "#2A2520" }}>{it.name}</span>
            )}
            {i < items.length - 1 && <span aria-hidden="true" style={{ color: "#C0B8AB" }}>›</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
