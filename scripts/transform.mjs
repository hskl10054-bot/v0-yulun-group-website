// Structural transform for KongFangZi_Pages.jsx
//
// Walks the original single-file JSX and rewrites every embedded
// `data:image/...;base64,...` string into its deterministic Cloudinary
// delivery URL. Public IDs follow: kfz/<slug>-hero and kfz/<slug>-<n>,
// where <slug> is enName lowercased with `&`->`and` and non-alphanumerics
// collapsed to hyphens.
//
// Outputs:
//   - KongFangZi_Pages.slim.jsx : same file, base64 replaced with URLs
//   - cloudinary-manifest.json  : [{ publicId, dataUrl }] for the uploader
//
// Run: node scripts/transform.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLOUD_NAME = "dfvmjmwb7";
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

export function slugify(enName) {
  return enName
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const src = readFileSync(join(__dirname, "KongFangZi_Pages.original.jsx"), "utf8");

// Match, in document order, either an enName declaration or an embedded
// base64 image string. Walking them together lets us assign each image to
// the right case and slot.
const token = /enName:\s*"([^"]*)"|"(data:image\/[a-zA-Z]+;base64,[^"]*)"/g;

const manifest = [];
let currentSlug = null;
let heroSeen = false;
let galleryIndex = 0;

const slim = src.replace(token, (whole, enName, dataUrl) => {
  if (enName !== undefined) {
    currentSlug = slugify(enName);
    heroSeen = false;
    galleryIndex = 0;
    return whole; // leave enName untouched
  }
  // dataUrl branch
  if (!currentSlug) throw new Error("Found a base64 image before any enName");
  let publicId;
  if (!heroSeen) {
    heroSeen = true;
    publicId = `kfz/${currentSlug}-hero`;
  } else {
    galleryIndex += 1;
    publicId = `kfz/${currentSlug}-${galleryIndex}`;
  }
  manifest.push({ publicId, dataUrl });
  return `"${BASE}/${publicId}"`;
});

// Sanity checks mirroring the task's validation rules.
const importReactCount = (slim.match(/import React/g) || []).length;
const appCount = (slim.match(/export default function App/g) || []).length;
const open = (slim.match(/{/g) || []).length;
const close = (slim.match(/}/g) || []).length;
const remainingBase64 = (slim.match(/data:image\//g) || []).length;

writeFileSync(join(__dirname, "KongFangZi_Pages.slim.jsx"), slim);
writeFileSync(join(__dirname, "cloudinary-manifest.json"), JSON.stringify(manifest, null, 0));

console.log("images mapped     :", manifest.length);
console.log("import React count:", importReactCount);
console.log("export App count  :", appCount);
console.log("braces { } match  :", open, close, open === close);
console.log("remaining base64  :", remainingBase64);
console.log("slim size (bytes) :", Buffer.byteLength(slim));
console.log("sample publicIds  :", manifest.slice(0, 3).map((m) => m.publicId).join(", "));
