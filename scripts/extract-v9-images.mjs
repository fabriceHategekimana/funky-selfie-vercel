// One-shot extractor: pulls the base64 images out of funkyselfie-final-v9.html
// and writes them to public/images/v9/ with semantic names (in document order).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const html = readFileSync("funkyselfie-final-v9.html", "utf8");
const outDir = "public/images/v9";
mkdirSync(outDir, { recursive: true });

// Match base64 jpeg/png data URIs in document order.
const re = /data:image\/(png|jpeg);base64,([A-Za-z0-9+/=]+)/g;

// Semantic names for the first 21 unique images, in document order.
const names = [
  "hero-bg",     // 0  CSS .hero-bg-photo
  "comment-bg",  // 1  CSS .comment-bg-photo
  "logo",        // 2  nav logo (png)
  "booth-1",     // 3  hero photobooth 360
  "booth-2",     // 4
  "booth-3",     // 5
  "booth-4",     // 6
  "features",    // 7  Le Funky product shot (png)
  "print-1",     // 8  prints carousel
  "print-2",     // 9
  "print-3",     // 10
  "print-4",     // 11
  "event-1",     // 12 baby shower
  "event-2",     // 13 anniversaire
  "event-3",     // 14 mariage
  "event-4",     // 15 fete privee
  "event-5",     // 16 team building
  "event-6",     // 17 corporate
  "event-7",     // 18 club & soiree
  "event-8",     // 19 bar & lounge
  "event-9",     // 20 lancement produit
];

const seen = new Map(); // hash -> filename
const report = [];
let idx = 0;
let m;
while ((m = re.exec(html)) !== null) {
  const ext = m[1] === "jpeg" ? "jpg" : "png";
  const buf = Buffer.from(m[2], "base64");
  const hash = createHash("sha1").update(buf).digest("hex").slice(0, 8);

  if (seen.has(hash)) {
    report.push(`#${idx} dup -> ${seen.get(hash)} (${(buf.length / 1024).toFixed(0)} KB)`);
    idx++;
    continue;
  }
  const base = names[idx] ?? `extra-${idx}`;
  const file = `${base}.${ext}`;
  writeFileSync(`${outDir}/${file}`, buf);
  seen.set(hash, file);
  report.push(`#${idx} ${file}  ${(buf.length / 1024).toFixed(0)} KB  ${ext}`);
  idx++;
}

console.log(report.join("\n"));
console.log(`\nTotal matches: ${idx}, unique files written: ${seen.size}`);
