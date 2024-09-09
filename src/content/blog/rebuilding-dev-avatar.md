---
title: "Rebuilding Dev Avatar: Never Put Your Content And Code In The Same Repo"
description: "I made the mistake of mixing content with code, combined with issues from the initial template I used."
pubDatetime: 2024-09-09T12:21:51.718Z
# modDatetime: only add after modification (optional)
tags:
  - devlog
  - web
---

I started out on Hashnode, then [moved to devavatar.com](/posts/move-hashnode-blog-to-astrojs), built with Astro using the Astro Paper template as a starting point. This week, I was working on decoupling the content from the code — something that, for whatever reason, didn’t occur to me last year — and I decided to use TinaCMS, a markdown CMS with self-hosting. After setting it up on dev-cli and working on removing the Astro content to integrate TinaCMS with a separate content repo, I realized that the template creator had made everything tightly integrated—especially with the blog schema and other parts.

Instead of using Astro's native pagination, for example, there was a custom function for it. I had my issues with some of these implementation decisions, but it worked for me until now, so it didn’t bother me much. However, after a failed attempt to move to TinaCMS, I realized it would be less frustrating and simpler to rebuild the site from scratch. I'll still use Astro but start fresh, as I’ve lost confidence in "good" templates.

You may ask why move at all? Well, it’s getting more and more annoying to keep my Obsidian vault in the same repo, and it handles line endings differently between PC and Linux — something I’d rather not deal with moving forward. I want to keep using markdown, but this time, decoupled from the code, so I don’t have to make a new commit to publish posts, along with a list of other reasons why data should be decoupled.

I've also been thinking about expanding my blog to cover other interests and reworking some of my earlier design decisions. This site rebuild will be the perfect chance to do that, and I plan to add more personal flair and style. I’ll get rid of the bloat, set up a separate content repo, and make everything simpler — and most importantly, have the content separate from the code!

That’s all I know for now. Next, I’ll be working on a new design draft, keeping it dead simple (_with some anime flair!_). I will devlog the entire process!
