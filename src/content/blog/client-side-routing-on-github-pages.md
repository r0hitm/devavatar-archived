---
title: "Debugging: Client-Side Routing Not Working | GitHub Pages | React"
description: todo
pubDatetime: 2024-03-11T00:00:00.000Z
draft: true
tags:
  - web
---

So you developed a Single-Page-Application using react (and react router)? And decided to deploy it on github pages, you go to the homepage of the deployed site and you grin, everything seems to be working! But as soon as you navigate to any subroutes, you get a 404. You are caught off-guard, what? How? It's working on my machine! You rerun it locally, check the github actions for any errors, try refreshing, try in incognito tab. Alas! it is not working still! You do start doing web searches and you landed on this post out of many other places. I know you're in a hurry, so I will cut to the chase

## Table of Contents

## Problem 1

## Problem 2

## Problem n

- tips and things to keep in mind if deciding to deploy a SPA on github pages because this is not supported by gh pages
- I have mostly targets static sites deployed on gituhub pages that use react-router for handling the client-side routing and are basically a web app
- client-side routing doesn't work on github pages unless all the other routes are child routes of the `/`
- options, i) use a hashrouter, ii) make every other route a child route of the `/`, iii) deploy it elsewhere, say vercel

---

Final checklist

- [ ] Put images into `src/assets/images/`
- [ ] OG image should be 1200 x 640 px
