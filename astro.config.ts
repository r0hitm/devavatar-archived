import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap({
      serialize(sitemap_item) {
        const url = sitemap_item.url;
        const isRoot = /^\/$/.test(url);
        const isPost =
          /^\/posts\/[^\/]+$/.test(url) && !/^\/posts\/1$/.test(url);
        const isAbout = /^\/about$/.test(url);
        const isCredits = /^\/credits$/.test(url);
        const isHire = /^\/hire$/.test(url);

        if (isRoot || isPost || isAbout || isCredits || isHire) {
          return sitemap_item;
        } else {
          return undefined;
        }
      },
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});
