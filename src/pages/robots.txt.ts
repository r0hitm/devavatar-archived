import type { APIRoute } from "astro";
import { SITE } from "@config";

const robots = `
User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: *
Allow: /$
Allow: /about/
Allow: /credits/
Allow: /hire/
Disallow: /posts/$
Disallow: /posts/[0-9]+/
Allow: /posts/*
Disallow: /tags/

Sitemap: ${new URL("sitemap-index.xml", SITE.website).href}
`.trim();

export const GET: APIRoute = () =>
  new Response(robots, {
    headers: { "Content-Type": "text/plain" },
  });
