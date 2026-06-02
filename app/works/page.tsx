"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { KfzShell } from "@/components/kfz-shell";
import { CASES, CATS, slugify } from "@/data/cases";

export default function WorksIndexPage() {
  const [filter, setFilter] = useState("全部");

  return (
    <KfzShell>
      <div className="wrap">
        <section className="works-head reveal">
          <div className="kicker">WORKS</div>
          <h1 className="serif">每個空間，都有自己的故事</h1>
          <p>從住宅到商業，看我們怎麼把使用者的生活，變成可以走進去的空間。</p>
        </section>

        <div className="filter">
          {CATS.map((c) => (
            <button key={c} className={filter === c ? "on" : ""} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="works-grid">
          {CASES.map((c) => {
            if (filter !== "全部" && c.cat !== filter) return null;
            const todo = !c.hero;
            const slug = slugify(c.enName);
            return (
              <Link
                key={slug}
                href={`/works/${slug}`}
                className={"card reveal" + (todo ? " todo" : "")}
              >
                <div className="thumb">
                  {todo && <span className="badge">準備中</span>}
                  {c.hero ? (
                    <Image src={c.hero} alt={c.zhName} fill sizes="(max-width:640px) 100vw, 480px" style={{ objectFit: "cover" }} />
                  ) : (
                    <span className="ph">{c.zhName}</span>
                  )}
                </div>
                <div className="cap">
                  <div className="en-name">{c.enName}</div>
                  <h3>{c.zhName}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </KfzShell>
  );
}
