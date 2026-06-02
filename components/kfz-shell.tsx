"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { KfzStyles } from "./kfz-styles";

// Wraps the 空房子室內設計 pages with the shared `.kfz` design system, a
// sticky brand topbar, and a footer — mirroring the lightweight nav/footer
// used by the /design and /construction brand pages.
export function KfzShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";
  const isWorks = pathname.startsWith("/works");
  const isProcess = pathname.startsWith("/process");

  return (
    <div className="kfz">
      <KfzStyles />
      <header className="topbar">
        <Link href="/" className="brand">
          <span className="en">Yulun</span>空房子室內設計
        </Link>
        <nav>
          <Link href="/works" className={isWorks ? "on" : ""}>案例作品</Link>
          <Link href="/process" className={isProcess ? "on" : ""}>合作流程</Link>
          <Link href="/" className="home">裕綸集團</Link>
        </nav>
      </header>

      {children}

      <footer className="site-foot">
        <span className="serif">空房子室內設計</span>
        <p>© 2026 空房子室內設計・裕綸集團</p>
        <Link href="/">裕綸集團</Link>
      </footer>
    </div>
  );
}
