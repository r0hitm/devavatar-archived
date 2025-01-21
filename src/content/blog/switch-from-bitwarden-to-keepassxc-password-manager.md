---
title: "Do not put your passwords on someone else's computer"
description: "Why I switched from Bitwarden to KeePassXC, and why you should too."
pubDatetime: 2025-01-21T07:29:08.459Z
tags:
  - Tutorial
  - Security
---

I had been using Bitwarden for about 3 years. It is a great password manager with enough features to be useful on the free tier. Recently, though, I moved to KeePassXC for two main reasons: 1) I wanted full control over my data, and 2) I needed offline access to my passwords.

## Table of Contents

## My Issues with Bitwarden

Bitwarden is a great password manager, definitely better than not using one at all, and personally I think it's also better than some of the other password managers out there. But some of the nuances of Bitwarden started to bother me, and I decided to switch to KeePassXC.

1. **Someone else has my data**: Though they claim to have end-to-end encryption for passwords, the fact remains that my passwords are stored on someone else's computer.
2. **Without internet, I am locked out**: There have been times when I needed to access my passwords or secure notes, but due to dodgy internet connections, I was unable to do so. This was initially just a nuisance, but soon became a serious deal-breaker for me.

Also, there was a recent controversy about Bitwarden changing its open-source license (See [Bitwarden Open Source Concerns](https://www.phoronix.com/news/Bitwarden-Open-Source-Concerns)), which nudged me to explore other options.

## And I landed on KeePassXC

After some research, I decided to try out [KeePassXC](https://keepassxc.org/). It is an open-source and fully offline password manager. It has most of the features that I care about - auto-fill, browser integration, and mobile support (through [KeePassDX](https://play.google.com/store/apps/details?id=com.kunzisoft.keepass.free), which isn't official but is recommended).

The general workflow is that you create a database file, which is encrypted with a master password. You can then store your passwords, secure notes, etc. in this database. You can then use the database file to access your passwords on any device. Another neat thing is that you can split your passwords/notes into multiple files instead of one big file! I can separate out critical accounts from the rest of the accounts. I didn't know I needed this feature until I saw it.

Before you say, "But what if I lose the database file? What if I need to access my passwords across devices?" - you can do that too. Unlike Bitwarden, the syncing falls on you. The database file is encrypted, so you can store it on cloud storage like Google Drive, Dropbox, etc. if you want, and let your cloud storage provider handle the syncing. Or, you can set up Syncthing like I do. Either way, you are in control.

Of course, nothing is perfect. KeePassXC has some issues as well. For example, the browser integration is not as seamless as Bitwarden's - you must have KeePassXC running and unlocked for the browser integration to work. You also need to be diligent about backing up your database file, as losing it means losing all your passwords. The secure notes feature isn't as polished as Bitwarden's either. However, I think these trade-offs are worth it, at least for me.

## How to switch from Bitwarden to KeePassXC

1. **Export your passwords from Bitwarden**
2. **Import your passwords into KeePassXC**
3. **Setup syncing**: You can use cloud storage or Syncthing to sync your database file across devices.
4. **Setup browser integration**: This is optional but recommended. You can install the KeePassXC browser extension and configure it to work with your database file. This enables password auto-fill functionality.
5. **Install KeePassXC on your mobile device**: You can install KeePassDX on your mobile device and configure it to use your database file for password access on the go.
6. **Backup your database file**: This is important. You should backup your database file regularly, so that you don't lose your passwords. You can backup your database file to cloud storage, or to an external drive, or to a USB stick, etc.

I have skimmed over some of the details; the best place to start would be the [Official Getting Started Guide](https://keepassxc.org/docs/KeePassXC_GettingStarted).

## Conclusion

After test-driving KeePassXC for a couple of months, I can confidently say that I like it. I appreciate having full control over my data and being able to access my passwords even without internet. The ability to split passwords into multiple files is a bonus. While there are some convenience trade-offs, overall it provides everything I need and want from a password manager. I encourage you to try it out and see if it fits your needs as well.

![what password gif](https://media1.tenor.com/m/5RpdcuMAqh8AAAAd/runie-ruse-what%27s-the-passord.gif)
