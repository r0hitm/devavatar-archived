import type { APIRoute } from "astro";
import { SITE } from "@config";

const robots = `
User-agent: Googlebot
Disallow: /nogooglebot/

# GPTBot
User-agent: GPTBot
Disallow: /

# ChatGPT-User
User-agent: ChatGPT-User
Disallow: /

# Google-Extended
User-agent: Google-Extended
Disallow: /

# PerplexityBot
User-agent: PerplexityBot
Disallow: /

# Amazonbot
User-agent: Amazonbot
Disallow: /

# ClaudeBot
User-agent: ClaudeBot
Disallow: /

# Omgilibot
User-agent: Omgilibot
Disallow: /

# FacebookBot
User-agent: FacebookBot
Disallow: /

# Applebot
User-agent: Applebot
Disallow: /

# anthropic-ai
User-agent: anthropic-ai
Disallow: /

# Bytespider
User-agent: Bytespider
Disallow: /

# Claude-Web
User-agent: Claude-Web
Disallow: /

# Diffbot
User-agent: Diffbot
Disallow: /

# ImagesiftBot
User-agent: ImagesiftBot
Disallow: /

# Omgili
User-agent: Omgili
Disallow: /

# YouBot
User-agent: YouBot
Disallow: /

User-agent: *
Disallow: /tags/
Allow: /$
Allow: /about/
Allow: /credits/
Allow: /hire/
Allow: /posts/

Sitemap: ${new URL("sitemap-index.xml", SITE.website).href}
`.trim();

export const GET: APIRoute = () =>
  new Response(robots, {
    headers: { "Content-Type": "text/plain" },
  });
