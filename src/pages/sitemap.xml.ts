import type { APIRoute } from "astro";
import { pages } from "../lib/seo";

export const GET: APIRoute = ({ site }) => {
  const base = (site?.href ?? "https://etdledger.com/").replace(/\/$/, "");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${base}${p.path}</loc><priority>${p.priority.toFixed(1)}</priority></url>`).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
