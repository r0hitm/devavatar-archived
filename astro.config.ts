import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/admin": "/admin/index.html",
    "/posts/1/": "/posts/",
  },
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
        const isPost = postSlug && isNaN(parseInt(postSlug, 10));
        // console.log({ url, isRoot, isPost, isAbout, isCredits, isHire });

        if (isRoot || isAbout || isCredits || isPost) {
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
