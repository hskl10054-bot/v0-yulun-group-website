// TASK 1 uploader — run when Cloudinary credentials are available.
//
//   CLOUDINARY_API_KEY=xxx CLOUDINARY_API_SECRET=yyy node scripts/upload-to-cloudinary.mjs
//
// Reads scripts/cloudinary-manifest.json (produced by transform.mjs), which
// lists { publicId, dataUrl } for all 65 embedded images, and uploads each to
// Cloudinary account `dfvmjmwb7` under those exact public IDs. The delivery
// URLs already hard-coded in data/cases.ts then resolve with no code changes.
//
// Idempotent: re-running overwrites the same public IDs (overwrite: true).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { v2 as cloudinary } from "cloudinary";

const __dirname = dirname(fileURLToPath(import.meta.url));

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dfvmjmwb7";
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!API_KEY || !API_SECRET) {
  console.error("Missing CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in env. Aborting.");
  process.exit(1);
}

cloudinary.config({ cloud_name: CLOUD_NAME, api_key: API_KEY, api_secret: API_SECRET, secure: true });

const manifest = JSON.parse(readFileSync(join(__dirname, "cloudinary-manifest.json"), "utf8"));
console.log(`Uploading ${manifest.length} images to cloud "${CLOUD_NAME}"…`);

let ok = 0;
let failed = 0;
for (const { publicId, dataUrl } of manifest) {
  try {
    const res = await cloudinary.uploader.upload(dataUrl, {
      public_id: publicId,
      overwrite: true,
      resource_type: "image",
    });
    ok += 1;
    console.log(`  ✓ ${publicId} -> ${res.secure_url}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${publicId}: ${err?.message || err}`);
  }
}

console.log(`\nDone. ${ok} uploaded, ${failed} failed.`);
process.exit(failed ? 1 : 0);
