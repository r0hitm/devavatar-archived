---
title: "Rebuilding Dev Avatar | DevLog Week 1"
description: 'By "this week," I mean last week... since this post is a little late, haha. But let’s talk about the progress I made in that time.'
pubDatetime: 2024-09-23T14:18:40.836Z
tags:
  - devlog
---

In the [last blog post](/posts/rebuilding-dev-avatar), I mentioned my decision to rebuild Dev Avatar. To give a quick recap: 1) I wanted to separate the content from the website code, and 2) revisit some design decisions, especially the ones tied to the starter template I used previously.

## Table of Contents

## This Week

By "this week," I mean last week... since this post is a little late, haha. But let’s talk about the progress I made in that time. Here's a rough plan I came up with for the redesign:

1. Brainstorm features: What pages should the rebuild have? What types of posts, UI elements, etc.?
2. Decide on the new color schemes and anime-inspired aesthetics.
3. Draft a design based on those ideas.
4. Set up a separate CMS repo using TinaCMS.
5. Start coding the website.

### On Brainstorming

This time around, I’m treating this as a proper personal blog, which I was hesitant to do before.

- **Mobile-first design:** No collapsible header for navs; keep it simple and straightforward.
- **Pages:** Home, all posts, topics (plus per-topic pages), about.
- **Tagging:** "One post, one ~~tag~~ topic"— and, removing the search bar for now.
- **Post Topics:** this will replace multi-tag setup that I currently use.
  - **Programming:** For CS & theory, tutorials, etc.
  - **Devlog:** For Project updates, etc.
  - **Web Development:** (Still debating the name and function...)
  - **日本語 (Japanese):** TBD
  - **Opinions:** TBD
  - **Misc:** TBD
- **No pagination** on the /posts/ page.
- **Social Links:** Fewer of them.
- **Sitemap Improvements:** Adding last modified date, priority settings, etc.
- **Localization:** Thinking about supporting both English and Japanese, but not sure if I’ll localize the entire site or just some sections. TBD

### On Design

I already had the new dark and light color schemes prepared, so that didn’t take much time. Here's the palette:

![new color palette](@assets/images/new-color-pallete.png)

But finding the right anime aesthetic was tricky. I toyed around with Avatar, Zelda, and computer-themed anime styles, even tried generating some ideas with AI, but I’m still undecided.

### About TinaCMS...

I decided to tackle step 4 (setting up the CMS) before step 3 (design), but things didn’t go as planned. I followed the official TinaCMS and Astro integration docs, double-checked everything, but I kept running into this error from `tinacms` on build, but the `main` branch DOES EXIST on the Tina Cloud, and I've pushed all the changes from both the repos!

```sh
ERROR: Branch 'main' is not on Tina Cloud. Please make sure that branch 'main' exists in your repository and that you have pushed all changes to the remote.
```

I’m rebuilding my blog site with a separate content repo, and while everything works in local dev mode - well, I don't count this because this uses the local filesystem of the website repo and not the content repo. It might be outdated docs or just a bug (TinaCMS).

I even tried their recommended starter template with Next.js and Tina preconfigured. It worked... sort of. The default blog post didn’t publish properly— instead, the processed AST showed up on the page 😱. I’m pretty sure it’s a bug! I reached out on their Discord yesterday, but no response yet.

So yeah, I’m kind of stuck with a simple Astro website. My options now are:

1. Stick with Astro’s content collection (which I’m already using).
2. Set up TinaCMS on the same repo (but after the Next.js fail, I’m skeptical).
3. _Not rewrite at all?_ 🤔 I mean, that’s a fair point, but I really need a better system for publishing posts.

## Plans for Next Week

I haven’t decided yet which option I’ll go with. Since the whole point of the rewrite was to decouple the content, if I don’t hear back from TinaCMS by Wednesday, I’ll probably start looking into other CMS options. Let’s see how it goes.

![anime headache gif](https://media1.tenor.com/m/kYPq0Rm6LkIAAAAC/thinking-headache.gif)
