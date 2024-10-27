---
title: "Building First Homelab Server | Devlog Week 1"
description: Documenting my journey of getting started with a homelab server
pubDatetime: 2024-10-27T17:08:35.681Z
draft: true
tags:
  - devlog
---

I recently got my father's old computer, which was in working condition. And since I always wanted to dab my feet in setting up a homelab and playing around with self-hosting, I decided to use it. I know nothing about when it comes to homelab-ing and I will be documenting my journey in these devlogs. Perhaps you'll find these valuable for getting started yourself or find the misaps funny!

## Table of Contents

## Acquiring the hardware

- how I recieved the hardware
- the shitty state of the motherboard/cabinet
- specs of the machine
- monitor doesn't work -> it was cable -> no monitor -> it was cable all along -> my diy surgery to fuse two working cables to fix this. I disassembled the monitor in vain.
- keyboard is crap, no mouse
- [attach some pics]
- working state ready

## Choosing an OS & putting it on the home network

- I originally wanted to install freebsd, but couldn't because the installer kept crashing
- because it didn't play nice with ventoy
- so installed ubuntu server, but I've not connected this computer to the internet because this didn't have wifi and I don't have a very long ethernet, so decided to install pop and setup w/o internet at first w/ my usb thetering w/ my mobile
- then I found an old router dusting on the self from last year,
- so I wondered if I could set it up such that it connects wirelessly through my internet router and then use ethernet to connect that router to the server computer??? SHOW THE PROCESS: how did I setup this router to work this way? WISP
- and it worked, albeit w/ pathetic speed of 70Mbps (this is an old 2.4GHz 300Mbps router)
- I went ahead applied updates, installed zsh, neovim, and ssh
- Since it was my first time setting up ssh server, I didnt configure it much, just the defaults and after it was on my home network ssh'ed into it with my user account password. I want to change this to use public-key auth...

## First homelab project: Self-hosted media backup library using Immich

- I go ahead install, docker, system is a bit janky at this point
- and follow the docker guide on the docs to have the immich up and running
- for a couple of minutes, the immich app was not reachable and wondered if I messed something up, but it finally was reachable, probably computer getting laggy
- setup admin, a couple users for my family members
- I used immich-go to upload my google photos library to the server from my other computer on the server
- and it became very slow,
- after the upload was complete, accessing the library with immich client was soooo slow, that it was unusable - at that point I didn't realize about the immich jobs that generate thumbnails, facial scanning and smart scan jobs etc. which were loading the docker container/computer
- I left it as it to process everything but later disabled all the jobs
- I was going to setup backup scripts for Immich but:
- I am considering doing a clean reinstall but with ubuntu server this time, coz that would be much lighter than popos, and likely more reliable as a server

## What next?

Well, I am still in the foreplay stage w/ homelabbing and having lots of fun experimenting so who knows hahaha. I'll probably, try setting up a custom webserver, flash freebsd on ubs stick and try installing it again, or create a minecraft server just because... I also have two arduino uno boards, which I'm thinking of slapping in my setup somewhere.

![computer server](https://media1.tenor.com/m/dDhEzrPZifYAAAAC/nitrado-last-oasis-servers.gif)
