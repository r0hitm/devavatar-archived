---
title: Fixing broken Client-Side React Router on GitHub Pages Deployment
description: The reasons behind the malfunctioning of React Router of a React App deployed on GitHub Pages and three strategies to fix this.
pubDatetime: 2024-03-11T09:12:27.940Z
tags:
  - web
  - debug
---

So you've built a React Single-Page-Application (SPA) with React Router and deployed it on GitHub Pages. Initially, everything looks good on the homepage, but once you try navigating to other routes, a 404 error pops up. You're left puzzled – it worked perfectly on your local machine! You've tried refreshing, incognito mode, even checking GitHub Actions for errors, but the issue persists.

Here's the deal:

- GitHub Pages doesn't support client-side routing out of the box unless all routes are children of `/`.
- **Solutions**, do either of the following:
  1. Use [HashRouter](https://reactrouter.com/en/main/router-components/hash-router), or
  2. Make all routes children of `/`, or
  3. Consider deploying elsewhere, like [Vercel](https://vercel.com/)

**Note**: Deploying a serverless web app on Vercel may encounter a bug where routes other than index don't work. To fix it, create a `vercel.json` at the root of the project ([Source](https://stackoverflow.com/a/65644138/10857172)):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```
