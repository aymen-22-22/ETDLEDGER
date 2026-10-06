// Shared by the sitemap, the sharing-image generator (scripts/og.mjs) and the page <head>.
export const pages = [
  { path: "/", og: "home", title: "The self-hosted cloud platform", eyebrow: "InfraLedger", priority: 1.0 },
  { path: "/product", og: "product", title: "Everything a platform team would build", eyebrow: "Product", priority: 0.9 },
  { path: "/docs", og: "docs", title: "Getting started with InfraLedger", eyebrow: "Docs", priority: 0.8 },
  { path: "/pricing", og: "pricing", title: "Editions that grow with your infrastructure", eyebrow: "Pricing", priority: 0.8 },
  { path: "/security", og: "security", title: "Your data stays on your infrastructure", eyebrow: "Security", priority: 0.7 },
  { path: "/services", og: "services", title: "Security, SAP, Oracle, Odoo and Kubernetes", eyebrow: "Services", priority: 0.8 },
  { path: "/labs", og: "labs", title: "Training environments for your security team", eyebrow: "Cyber labs", priority: 0.7 },
  { path: "/company", og: "company", title: "We build infrastructure you can account for", eyebrow: "Company", priority: 0.6 },
  { path: "/contact", og: "contact", title: "Tell us what you run", eyebrow: "Contact", priority: 0.6 },
  { path: "/legal/privacy", og: "default", title: "Privacy policy", eyebrow: "Legal", priority: 0.2 },
  { path: "/legal/terms", og: "default", title: "Terms of use", eyebrow: "Legal", priority: 0.2 },
] as const;

export const ogFor = (path: string) => pages.find((p) => p.path === path)?.og ?? "default";
