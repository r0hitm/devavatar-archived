---
title: Example Draft Post
description:
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel
  fringilla est
pubDatetime: 2022-06-06T04:06:31Z
modDatetime: only add after modification (optional)
author: defaults to SITE.author (optional)
slug: example-draft-post (optional)
featured: NOT using this feature of the template
draft: true
tags:
  - TypeScript
  - Astro
ogImage: default is SITE.ogImage or generated OG image (need to look into it)
canonicalURL: default = Astro.site + Astro.url.pathname (optional)
---

Users cannot see this post because it is in draft.

Date must be in ISO format. Use `new Date().toISOString()`.

(remove the next heading if no headings in the post)

## Table of Contents

...rest of the blog...

---

Final checklist

- [ ] Put images into `src/assets/images/` & use `@assets/images/...`
- [ ] OG image should be 1200 x 640 px
