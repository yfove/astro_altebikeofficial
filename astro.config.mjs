import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from './remark-reading-time.mjs';


import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-moon-landing.netlify.app/",
  integrations: [
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    mdx(),
    react(),
  ],
  vite: {
    ssr: {
      noExternal: ["accessible-astro-components"],
      external: ["svgo"],
    },
  },

  markdown: {
    remarkPlugin: [remarkReadingTime],
  }
  
});
