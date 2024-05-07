---
title: "Tutorial: Build a X (Twitter) Bot with V2 Api (2024)"
description:
pubDatetime: 2024-04-28T17:39:01.907Z
draft: true
tags:
  - tutorial
  - python
  - programming
---

Date must be in ISO format. Use `new Date().toISOString()`.

1. Motivation: why am I writing this post? Because internet lacks a modern info on the topic that uses the new v2 w/ pkce api
2. a brief about the api v2 is the new recommended
3. explain the different api tokens, and why we only need client ids and redirect uri
4. tell about the free v2 limitations (can post only), cannot read w/o basic access
5. setup working directory
6. implement wrapper class around tweepy, is what I like to do because it makes working with the entire api much easier + pointers on adding their own methods
7. write the main py file that uses the bot to post
8. add loggers
9. conclusion

## Table of Contents

---

Final checklist

- [ ] Put images into `src/assets/images/` & use `@assets/images/...`
- [ ] OG image should be 1200 x 640 px
