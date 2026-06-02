// Generates scripts/cases-table.sql: a dedicated `cases` table + seed INSERTs
// for the 15 existing cases (read verbatim from data/cases.ts). Run once:
//   node scripts/gen-cases-sql.mjs
// Then paste scripts/cases-table.sql into the Supabase SQL editor and run it.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const txt = readFileSync(join(root, "data", "cases.ts"), "utf8");
const RESIDENTIAL = "住宅設計";
const COMMERCIAL = "商業空間";

// Extract the CASES array literal and evaluate it (plain JS-compatible).
const start = txt.indexOf("export const CASES");
const arrStart = txt.indexOf("[", start);
const arrEnd = txt.indexOf("\n];", arrStart);
const literal = txt.slice(arrStart, arrEnd + 2); // include the closing ]
// eslint-disable-next-line no-new-func
const CASES = new Function("RESIDENTIAL", "COMMERCIAL", "return " + literal)(RESIDENTIAL, COMMERCIAL);

const q = (s) => "'" + String(s ?? "").replace(/'/g, "''") + "'";
const j = (v) => "'" + JSON.stringify(v ?? []).replace(/'/g, "''") + "'::jsonb";

const rows = CASES.map((c, i) => {
  const gallery = (c.gallery || []).map((g) => ({ src: g.src, caption: g.caption }));
  return `(${i + 1}, ${q(c.cat)}, ${q(c.zhName)}, ${q(c.enName)}, ${q(c.tagline)}, ${q(c.hero)}, ` +
    `${j(c.meta)}, ${q(c.story)}, ${q(c.problem)}, ${q(c.solution)}, ${j(c.highlights)}, ${j(gallery)})`;
});

const sql = `-- 空房子室內設計 案例後台資料表 + 既有 15 筆匯入
-- 在 Supabase → SQL Editor 貼上整段執行一次即可。可重複執行（會先清空再匯入）。

create table if not exists cases (
  id          bigint generated always as identity primary key,
  sort_order  int  not null default 0,
  cat         text not null default '${RESIDENTIAL}',
  zh_name     text not null default '',
  en_name     text not null default '',
  tagline     text default '',
  hero        text default '',
  meta        jsonb default '[]'::jsonb,
  story       text default '',
  problem     text default '',
  solution    text default '',
  highlights  jsonb default '[]'::jsonb,
  gallery     jsonb default '[]'::jsonb,
  created_at  timestamptz default now()
);

-- 與專案其他資料表一致：關閉 RLS（用 service role 從 API 讀寫）
alter table cases disable row level security;

-- 匯入既有 15 筆（重跑會先清空，避免重複）
truncate table cases restart identity;
insert into cases
  (sort_order, cat, zh_name, en_name, tagline, hero, meta, story, problem, solution, highlights, gallery)
values
${rows.join(",\n")};
`;

writeFileSync(join(__dirname, "cases-table.sql"), sql);
console.log("Wrote scripts/cases-table.sql (", CASES.length, "cases,", Buffer.byteLength(sql), "bytes )");
