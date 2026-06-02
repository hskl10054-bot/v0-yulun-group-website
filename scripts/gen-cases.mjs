// Generates data/cases.ts from the slimmed JSX so the case prose/URLs are
// copied verbatim (no hand transcription). Run after transform.mjs:
//   node scripts/gen-cases.mjs

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const lines = readFileSync(join(__dirname, "KongFangZi_Pages.slim.jsx"), "utf8").split("\n");

// 1-indexed, inclusive line ranges from the slim file.
const slice = (a, b) => lines.slice(a - 1, b).join("\n");

const PROCESS_INTRO = slice(14, 17);
const PROCESS_STEPS = slice(18, 27);
const PROCESS_FAQ = slice(28, 33);
const CASES = slice(38, 254);
const SERVICES = slice(393, 397);
const VALUE_ADDS = slice(398, 405);

const out = `// AUTO-GENERATED from scripts/KongFangZi_Pages.slim.jsx via scripts/gen-cases.mjs
// 空房子室內設計 — 合作流程 + 案例資料。要新增/修改案子，改這裡即可。
// 照片為 Cloudinary（cloud name: dfvmjmwb7）網址，public id 規則：
//   kfz/<enName slug>-hero、kfz/<enName slug>-1、-2…

export const RESIDENTIAL = "住宅設計" as const;
export const COMMERCIAL = "商業空間" as const;
export const TODO = "〔待補〕";

export type CaseCategory = typeof RESIDENTIAL | typeof COMMERCIAL;

export interface GalleryItem {
  src: string;
  caption: string;
}

export interface CaseStudy {
  cat: CaseCategory;
  zhName: string;
  enName: string;
  tagline: string;
  hero: string;
  meta: string[];
  story: string;
  problem: string;
  solution: string;
  highlights: string[];
  gallery: GalleryItem[];
}

export interface ProcessStep {
  no: string;
  title: string;
  time: string;
  desc: string;
  prep: string;
  get: string;
  stage?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface IconItem {
  icon: string;
  name?: string;
  t?: string;
  d?: string;
}

export const PROCESS_INTRO = ${PROCESS_INTRO.replace(/^const PROCESS_INTRO = /, "")}

export const PROCESS_STEPS: ProcessStep[] = ${PROCESS_STEPS.replace(/^const PROCESS_STEPS = /, "")}

export const PROCESS_FAQ: FaqItem[] = ${PROCESS_FAQ.replace(/^const PROCESS_FAQ = /, "")}

export const SERVICES: IconItem[] = ${SERVICES.replace(/^const SERVICES = /, "")}

export const VALUE_ADDS: IconItem[] = ${VALUE_ADDS.replace(/^const VALUE_ADDS = /, "")}

export const CASES: CaseStudy[] = ${CASES.replace(/^const CASES = /, "")}

const PRESENT_CATS = [...new Set(CASES.map((c) => c.cat))];
export const CATS: string[] = ["全部", ...[RESIDENTIAL, COMMERCIAL].filter((c) => PRESENT_CATS.includes(c))];

/** enName -> url slug. Keeps "&" as "and". e.g. "Smoke & Stone" -> "smoke-and-stone" */
export function slugify(enName: string): string {
  return enName
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const caseSlugs = CASES.map((c) => slugify(c.enName));

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => slugify(c.enName) === slug);
}
`;

mkdirSync(join(root, "data"), { recursive: true });
writeFileSync(join(root, "data", "cases.ts"), out);
console.log("Wrote data/cases.ts (", Buffer.byteLength(out), "bytes )");
