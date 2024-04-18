// import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { remarkExcerpt, remarkReadingTime } from "./src/utils/remark-reading-time.mjs";
import react from "@astrojs/react";
import db from "@astrojs/db";
import svelte from "@astrojs/svelte";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-moon-landing.netlify.app/",
  integrations: [tailwind(),
  // image({
  //   serviceEntryPoint: "@astrojs/image/sharp",
  // }),
  mdx(), react(), db(), svelte()],
  vite: {
    ssr: {
      noExternal: ["accessible-astro-components"]
    }
  },
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkExcerpt],
    extendDefaultPlugins: true
  },
  output: "hybrid",
  adapter: netlify()
});