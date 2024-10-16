---
title: "Clean Windows 10/11 Installation: 💯 Remove CoPilot and Bloatware"
description:
  Are you sick of windows increasing bloat and unwarranted AI garbage? I am. And
  this is how I get rid of it!
pubDatetime: 2024-10-16T16:52:50.919Z
draft: true
tags:
  - tutorial
---

I am getting sick of windows increasing bloatware and unwarranted "AI" garbage - copilot, recall 🗑️.
And if you agree, then in this post I'll discuss how to remove/disable it all!

**Prereq**: [Downlad](https://www.microsoft.com/en-in/software-download) and create an installation media for windows 10/11.

## Table of Contents

1. Select region as world on when the installation media boots up, this will get rid of all the regional crap
2. install normally now
3. (optional) On windows 11, to bypass the miscrosoft login if you want to use a local account:
   1. hit shift+f10
   2. type `oobe\bypassnro`
   3. **TIP**: you can enable this bypass while creating the installation media using Rufus
4. (optional for windows 11 Pro edition) bitlocker is enabled by default, so hit search "bitlocker" and disable it if you don't want it to cause performance bottlenecks
5. Download [Shut Up 10](https://www.oo-software.com/en/shutup10). It's named 10 but it works on windows 11 as well
6. Use the windows firewall "outbound" rules to disable telemetry and tracking. (optional) recommend portmaster
7. Open it, and select 'Local Machine' tab, and toggle anything that you don't want on. Be careful. I have following toggled:

[TODO: snapped SS]
at `@assets/images/remove-copilot-and-bloatware-from-windows/...jpg`

(the above screenshots also contain)

8. finally, context menu and other tweaks using winaero tweaker
