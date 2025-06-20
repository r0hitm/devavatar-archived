import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import rehypeExternalLinks from "rehype-external-links";

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
        const isRoot = /devavatar.com\/$/.test(url);
        const isAbout = /about\/$/.test(url);
        const isCredits = /credits\/$/.test(url);
        // const isHire = /hire\/$/.test(url); // Temporarily removed
        const postSlug = url.match(/\/posts\/([^\/]+)\/?$/)?.[1] ?? false;
        const isPost = postSlug && isNaN(Number(postSlug));
        // console.log({ url, isRoot, isPost, isAbout, isCredits, isHire });

        if (isRoot || isAbout || isCredits || isPost) {
          if (isPost) {
            sitemap_item.priority = 1;
          }
          return sitemap_item;
        } else {
          return undefined;
        }
      },
      changefreq: "weekly",
      lastmod: new Date(),
      priority: 0.8,
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
    rehypePlugins: [
      [rehypeExternalLinks, { rel: ["nofollow", "noopener", "noreferrer"] }],
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
