"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { KfzStyles } from "./kfz-styles";

// Wraps the 空房子室內設計 pages with the shared `.kfz` design system, a
// fixed three-zone brand topbar (back-link / centered brand / CTA) and a
// footer — matching the visual layout of the /design and /cafe brand pages.
export function KfzShell({ children }: { children: ReactNode }) {
  return (
    <div className="kfz">
      <KfzStyles />
      <header className="topbar">
        <Link href="/" className="lead"><ArrowLeft size={14} /> 裕綸集團</Link>
        <Link href="/works" className="center-link">案例作品</Link>
        <nav className="navlinks">
          <Link href="/process">合作流程</Link>
          <span className="sep">·</span>
          <Link href="/design#contact" className="accent">預約諮詢</Link>
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
