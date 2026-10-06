// Renders the 1200×630 link-preview images into public/og/. Run with: npm run og
// Needs Playwright with Chromium installed (set PLAYWRIGHT_PATH to its index.mjs if not resolvable).
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { chromium } = await import(process.env.PLAYWRIGHT_PATH ?? "playwright");

const seo = readFileSync(resolve(root, "src/lib/seo.ts"), "utf8");
const pages = [...seo.matchAll(/og: "([^"]+)", title: "([^"]+)", eyebrow: "([^"]+)"/g)]
  .map(([, og, title, eyebrow]) => ({ og, title, eyebrow }))
  .filter((p, i, all) => all.findIndex((q) => q.og === p.og) === i && p.og !== "default");
pages.push({ og: "default", title: "The self-hosted cloud platform", eyebrow: "ETDLedger" });

const font = (p) => `data:font/woff2;base64,${readFileSync(resolve(root, "node_modules", p)).toString("base64")}`;
const sans = font("@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2");
const mono = font("@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2");

const logo = (size, stroke = "#f4f4f5") => `
  <svg width="${size}" height="${size}" viewBox="0 0 22 22"><rect x="0.75" y="0.75" width="20.5" height="20.5" rx="5" fill="none" stroke="${stroke}" stroke-width="1.5"/>
  <path d="M6 7.5h10M6 11h6M6 14.5h10" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round"/></svg>`;

const rack = (x, seed) => {
  let r = seed * 9301 + 49297;
  const rand = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  let units = "", y = 40;
  while (y < 600) {
    const h = rand() > 0.75 ? 48 : 22;
    const led = rand() > 0.15 ? "#30a46c" : "#f5a524";
    units += `<rect x="16" y="${y}" width="188" height="${h}" rx="3" fill="#141416" stroke="#3f3f46"/>
      <circle cx="28" cy="${y + 8}" r="2.6" fill="${led}"/><circle cx="37" cy="${y + 8}" r="2.6" fill="#3f3f46"/>
      ${[0, 1, 2, 3, 4].map((k) => `<line x1="${150 + k * 9}" y1="${y + 6}" x2="${150 + k * 9}" y2="${y + h - 6}" stroke="#3f3f46" stroke-width="1.2"/>`).join("")}
      ${[0, 1, 2].map((k) => `<rect x="${50 + k * 26}" y="${y + 5}" width="22" height="${h - 10}" rx="2" fill="#1b1b1e" stroke="#26262a"/>`).join("")}`;
    y += h + 5;
  }
  return `<svg x="${x}" y="40" width="220" height="640" viewBox="0 0 220 640">
    <rect x="1" y="1" width="218" height="638" rx="10" fill="#0f0f11" stroke="#3f3f46" stroke-width="1.5"/>${units}</svg>`;
};

const html = ({ title, eyebrow }) => `<!doctype html><html><head><style>
  @font-face { font-family: "Instrument Sans"; src: url("${sans}") format("woff2"); font-weight: 400 700; }
  @font-face { font-family: "JetBrains Mono"; src: url("${mono}") format("woff2"); }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #0a0a0b; color: #f4f4f5; font-family: "Instrument Sans"; overflow: hidden; position: relative; }
  .racks { position: absolute; right: -20px; top: 0; width: 520px; height: 630px;
    -webkit-mask: linear-gradient(to left, #000 30%, transparent), linear-gradient(to bottom, #000 55%, transparent);
    -webkit-mask-composite: source-in; opacity: .9; }
  .wrap { position: absolute; inset: 0; padding: 64px 72px; display: flex; flex-direction: column; }
  .brand { display: flex; align-items: center; gap: 14px; font-size: 30px; font-weight: 600; letter-spacing: -0.02em; }
  .eyebrow { margin-top: auto; font-size: 26px; color: #a1a1aa; font-weight: 500; }
  h1 { margin-top: 14px; font-size: 68px; line-height: 1.05; font-weight: 600; letter-spacing: -0.03em; max-width: 760px; }
  .foot { margin-top: 40px; display: flex; gap: 14px; align-items: center; font-family: "JetBrains Mono"; font-size: 22px; color: #a1a1aa; }
  .dot { width: 10px; height: 10px; border-radius: 50%; background: #30a46c; }
</style></head><body>
  <svg class="racks" viewBox="0 0 520 630">${rack(20, 3)}${rack(270, 7)}</svg>
  <div class="wrap">
    <div class="brand">${logo(40)}ETDLedger</div>
    <p class="eyebrow">${eyebrow}</p>
    <h1>${title}</h1>
    <div class="foot"><span class="dot"></span>etdledger.com</div>
  </div>
</body></html>`;

const out = resolve(root, "public/og");
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const p of pages) {
  await page.setContent(html(p), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: resolve(out, `${p.og}.png`) });
  console.log("og/" + p.og + ".png");
}
const square = await browser.newPage({ viewport: { width: 512, height: 512 } });
await square.setContent(`<body style="margin:0;width:512px;height:512px;display:grid;place-items:center;background:#0a0a0b">${logo(320)}</body>`);
await square.screenshot({ path: resolve(out, "logo.png") });
console.log("og/logo.png");
await browser.close();
