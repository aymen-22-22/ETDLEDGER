import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL || "https://etdledger.com",
  base: process.env.BASE_PATH || "/",
  redirects: {
    "/platform": "/product",
    "/enterprise": "/services",
    "/about": "/company",
  },
});
