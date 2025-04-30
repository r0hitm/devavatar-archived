---
title: 'Removing Windows Bloatware, Spyware and Unwanted "AI" Features'
description: I'm sick of the fact that Windows keeps adding bloatware, spyware and "AI" features like Copilot and Recall 🗑️.
pubDatetime: 2024-10-19T17:53:48.595Z
modDatetime: 2024-10-21T16:25:46.866Z
tags:
  - tutorial
  - windows
---

I'm sick of the fact that Windows keeps adding bloatware and unnecessary "AI" features like Copilot and Recall 🗑️. If you're fed up too, let's walk through how to clean it all up! Or switch to Linux (no pressure!) 😉

**Prerequisite:** Download and create a Windows 10/11 installation media. We're starting with a clean installation.

## Table of Contents

## 1. Setup Without Regional Bloat

When booting from the installation media, select "World" as the region and follow the installation process as usual.  
Then, manually set your region in the settings afterward (to avoid Microsoft Store errors). This removes region-specific bloat.

[ThioJoe's video on this](https://youtu.be/mZm6mY3I7J4?si=3B8fNCscnO5qbFwy)

## 2. (Optional) Bypass Microsoft (mandatory) Login on Windows 11

If you want to use a local account, when the installation reboots and asks you to connect to the internet:

1. Press `Shift + F10` to open the command prompt.
2. Type `oobe\bypassnro` and press enter. This will cause a reboot. You can now skip the internet setup and/or use a local account.
   - **TIP:** Use Rufus when creating the installation media to automate this.

## 3. (Optional) Disable BitLocker (Windows 11 Pro)

Pro installations have BitLocker enabled by default. Search for "BitLocker" and turn it off if you don't want it affecting performance.

## 4. Block Spying via Firewall

Use Windows Firewall outbound rules to block tracking. Hit Start, type "firewall," and on the right, choose "outbound rules." Here, you can see all the apps that send data out. Disable internet access for apps you don't want connecting to the internet.

[PC Security Channel's video on this](https://youtu.be/IZ_yccX8eys?si=iSh-C7C2jU9dAD7c)

## 5. Download ShutUp10++

Grab [Shut Up 10++](https://www.oo-software.com/en/shutup10), which works for both Windows 10 and 11.  
It gives you granular control over privacy settings. Toggle off the features you don't want. Here's what I've disabled:

- ![ShutUp10 Settings 1](@assets/images/remove-copilot-and-bloatware-from-windows/shutup10-1.jpg)
- ![ShutUp10 Settings 2](@assets/images/remove-copilot-and-bloatware-from-windows/shutup10-2.jpg)
- ![ShutUp10 Settings 3](@assets/images/remove-copilot-and-bloatware-from-windows/shutup10-3.jpg)
- ![ShutUp10 Settings 4](@assets/images/remove-copilot-and-bloatware-from-windows/shutup10-4.jpg)
- ![ShutUp10 Settings 5](@assets/images/remove-copilot-and-bloatware-from-windows/shutup10-5.jpg)
- ![ShutUp10 Settings 6](@assets/images/remove-copilot-and-bloatware-from-windows/shutup10-6.jpg)

## 6. (Optional but Recommended) Customize with Winaero Tweaker

Download [Winaero Tweaker](https://winaerotweaker.com/) to bring back features like:

- Full classic context menu (Windows 11's context menu requires too many clicks to be useful).
- Disable Copilot and other annoying features.
- Tweak additional settings. Be cautious with what you change — don't touch anything you don't understand to avoid breaking something.

## 7. ⚠️ Warning: Upcoming 24H2 Update is Making Recall Mandatory!

In a really low move by Microsoft, the 24H2 update is making "Recall" an Explorer dependency, so disabling it may break Explorer. For now, **don't update**. Let's see how this plays out. If things go south, Linux is bound to get more traffic — and that's a good thing!

Here's the command to disable it just in case:

![Disble Recall Windows Feature](@assets/images/remove-copilot-and-bloatware-from-windows/disable-recall.png)

```
Dism /Online /Disable-Feature /Featurename:Recall
```
