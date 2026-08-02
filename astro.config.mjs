// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://jasonmoisie.com",
  trailingSlash: "ignore",
  build: { format: "directory" },
  // Astro 7 defaults this to 'jsx', which strips whitespace between inline
  // elements using JSX rules. On a prose site that silently glues words
  // together across tag boundaries. `true` keeps HTML whitespace rules.
  compressHTML: true,
  integrations: [sitemap()],
});
