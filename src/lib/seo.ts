// Shared by the sitemap, the sharing-image generator (scripts/og.mjs) and the page <head>.
export const pages = [
  { path: "/product", og: "product", title: "A self-service platform on your own servers", eyebrow: "InfraLedger", accent: "#3FB6C4", priority: 0.9 },
  { path: "/docs", og: "docs", title: "Getting started with InfraLedger", eyebrow: "InfraLedger docs", accent: "#3FB6C4", priority: 0.8 },
  { path: "/security", og: "security", title: "Your data stays on your infrastructure", eyebrow: "InfraLedger security", accent: "#3FB6C4", priority: 0.7 },
  { path: "/", og: "home", title: "Platform, security and enterprise systems", eyebrow: "ETDLedger", priority: 1.0 },
  { path: "/sap", og: "sap", title: "SAP, connected to the rest of your business", eyebrow: "SAP solutions", accent: "#0070F2", priority: 0.8 },
  { path: "/oracle", og: "oracle", title: "Oracle databases that stay up", eyebrow: "Oracle solutions", accent: "#C74634", priority: 0.8 },
  { path: "/odoo", og: "odoo", title: "Odoo, set up for how your business works", eyebrow: "Odoo solutions", accent: "#714B67", priority: 0.8 },
  { path: "/labs", og: "labs", title: "Training environments for your security team", eyebrow: "Cyber labs", accent: "#15803D", priority: 0.7 },
  { path: "/company", og: "company", title: "We build infrastructure you can account for", eyebrow: "Company", priority: 0.6 },
  { path: "/contact", og: "contact", title: "Tell us what you run", eyebrow: "Contact", priority: 0.6 },
  { path: "/legal/privacy", og: "default", title: "Privacy policy", eyebrow: "Legal", priority: 0.2 },
  { path: "/legal/terms", og: "default", title: "Terms of use", eyebrow: "Legal", priority: 0.2 },
] as const;

export const ogFor = (path: string) => pages.find((p) => p.path === path)?.og ?? "default";
