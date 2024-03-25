---
title: "Playlisty Devlog: Week 1 Update | Successful Login, Skeleton Routing, and Basic Layout Implemented"
description: "Follow my journey building Playlisty, a web app for Spotify users like myself. Discover how I'm solving the challenge of tracking songs across playlists and simplifying music organization. Inspired by my own frustration with Spotify, where finding which playlists contain or lack specific songs is often a hassle."
pubDatetime: 2024-03-26T16:22:13.660Z (`new Date().toISOString()`)
draft: true
tags:
  - devlog
---

- Project Overview: what is it? how is it supposed to work

## Table of Contents

## Motivation

Why do I want to make this project?

## Week 1 Progress

- challenges I faced this week: fighting with bad docs, reading the sdk source code to figure out the sdk first checks for the code in the current url before initiating redirect
- progress of this week:
  - login working: spotify-ts took some time to get used to, in the hindsight the authenticate was running first to see if we have `code` query parameter, first created uncessary context while I was figuring out how to trigger a manual login instead of the given example's automatic
  - skeleton routing: setup client side routing, structure, how the protected component `<App />` works to ensure only the logged in users can see the app layout
  - basic layout: show the app layout, show a comparison w/ designed vs implemented layout so far

## Goals for the next week

- goals for the next week: setup drop-down w/ playlists fetch and talk about what I'm thinking w/ infinite scroller and a drop-down component, + **focus is on to have it working by next week**

- nudge to contact or give feedback

---

Final checklist

- [ ] Put images into `src/assets/images/`
