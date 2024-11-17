---
title: "Tutorial: Setup TinaCMS and AstroJS with Separate Content Repo"
description: AstroJS for the website code, and tinaCMS for managing the content.
pubDatetime: 2024-11-17T08:42:11.237Z
tags:
  - TinaCMS
  - Astro
  - Tutorial
---

I am rebuilding Dev Avatar (as I posted before [here](/posts/rebuilding-devavatar-devlog-1) and [here](/posts/rebuilding-devavatar-update)). At one point, I almost cancelled the rebuild because the TinaCMS documentation was frustratingly unclear, and their Discord server had been unresponsive. However, they finally responded last week (after almost a month 😬). It turned out that a few key details were missing from the docs. By the time you read this, the official docs _might_ already be updated. In this post, I'll document my working setup since, as of now, they're not fully there yet.

## Table of Contents

## Initial Issues

The docs on the [separate content repo guide](https://tina.io/docs/guides/separate-content-repo) are missing some very important information to get this working. For the most part, follow along with their docs, but also make these additional changes:

1. Add a `localContentPath` to the Tina config file in your website repo. This should point to your content repo locally.
2. Manually copy over the `tina/` folder to the content repo. This needs to be done every time you make changes to the Tina config.
3. For Tina Cloud in production, add the content repo and use its client ID.

Additionally, you may need to remove `astro check` from the build script and create a separate entry for it in the package file.

P.S. Deploying on GitHub Pages is a pain in the neck, and I'm not 100% sure it's even possible. Just use Vercel—it's a breeze, especially when setting up environment variables.

## Working Setup

I got the separate content repo working on a prototype. While it's functional, a few high-severity issues in its dependencies have been identified (see [#5251](https://github.com/tinacms/tinacms/issues/5251)). For now, I think I'll wait until these are fixed.

P.S. [🦙 TinaCMS - UX Roadmap | Seth Daily](https://youtu.be/NCplHfQFOxk?si=DQ_citQs76L_D8if) summarizes Tina's roadmap and all the dev pain points, including this issue.

## Current Status

The rebuild is temporarily ~~paused~~ moving very slowly.
