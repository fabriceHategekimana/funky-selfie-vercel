// Génère public/images/og-image.jpg (1200×630) — style hero : photo + voile sombre + texte.
// Brief §8.2. One-shot.
import sharp from "sharp";

const W = 1200;
const H = 630;

// Fond : photo hero en cover plein cadre.
const bg = await sharp("public/images/v9/hero-bg.jpg")
  .resize(W, H, { fit: "cover", position: "centre" })
  .toBuffer();

const logo = await sharp("public/images/v9/logo.png").resize(72, 72).toBuffer();

// Voile sombre dégradé (texte lisible à gauche) + texte.
const overlay = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="v" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0D1B1E" stop-opacity="0.96"/>
      <stop offset="55%" stop-color="#0D1B1E" stop-opacity="0.78"/>
      <stop offset="100%" stop-color="#0D1B1E" stop-opacity="0.55"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#v)"/>
  <text x="170" y="240" font-family="'DejaVu Sans',sans-serif" font-size="68" font-weight="800" fill="#FFFFFF">Funky<tspan fill="#B03FAA">Selfie</tspan></text>
  <text x="80" y="324" font-family="'DejaVu Sans',sans-serif" font-size="40" font-weight="700" fill="#4AABAA">Location de photobooth en Suisse</text>
  <text x="80" y="378" font-family="'DejaVu Sans',sans-serif" font-size="27" font-weight="400" fill="#FFFFFF" opacity="0.78">Livré, installé, géré de A à Z</text>
  <rect x="80" y="428" width="330" height="58" rx="29" fill="#4AABAA"/>
  <text x="245" y="466" font-family="'DejaVu Sans',sans-serif" font-size="25" font-weight="700" fill="#FFFFFF" text-anchor="middle">Devis gratuit sous 48h</text>
</svg>
`);

await sharp(bg)
  .composite([
    { input: overlay, left: 0, top: 0 },
    { input: logo, left: 80, top: 184 },
  ])
  .jpeg({ quality: 82 })
  .toFile("public/images/og-image.jpg");

const out = await sharp("public/images/og-image.jpg").metadata();
console.log(`og-image.jpg written: ${out.width}x${out.height}`);
