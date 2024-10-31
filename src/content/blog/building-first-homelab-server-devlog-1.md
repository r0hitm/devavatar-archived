---
title: "Building First Homelab Server | Devlog Week 1"
description: "Documenting my journey of getting started with a homelab server - missaps, learnings - everything!"
pubDatetime: 2024-10-31T13:21:41.528Z
tags:
  - devlog
  - homelab
---

I recently got my father's old computer, which was in working condition. Since I always wanted to dabble in setting up a homelab and playing around with self-hosting, I decided to use it. I know nothing about homelabbing, and I will be documenting my journey in these devlogs. Perhaps you’ll find these valuable for getting started yourself or find the mishaps amusing!

## Table of Contents

## Acquiring the Hardware

I received my father's old computer, which has an i5 2nd gen processor, 6GB of RAM, and a 500GB HDD. The monitor has a black hole in the lower left corner, and the cabinet was in rough shape when I got it—dust and debris had accumulated everywhere, and the thermal paste under the cooler was no longer a paste; it had turned into a crust. I took it apart, cleaned it, and reassembled it neatly.

However, I experienced a funny incident with the monitor. It wasn't working at first. I thought it was the monitor and disassembled it, only to realize the issue was with the power cable. No, wait, it was the monitor after all—oh, it was the cable all along! This cost me two days! What are the chances that four power cables turn out to be faulty in succession?! Since the issue was either the adapter or the plug, I cut the two different cables and joined their working parts together to create a working power cable. Who's shelling out for a new one when the old one can be fixed? 😼

The keyboard is trash—it uses some weird layout with the \ button beside the Enter key, an upside-down Enter key shape, and a Euro key for the left Shift 😕. And to top it off, there was no mouse.

<div className="flex justify-evenly flex-wrap items-center w-full">

![](@assets/images/building-first-homelab-server-devlog-1/01-init-state.webp)

![](@assets/images/building-first-homelab-server-devlog-1/02-dirty-mb-cpu.webp)

![](@assets/images/building-first-homelab-server-devlog-1/03-cleaned.webp)

</div>

Fortunately, everything turned on and was working, so I loaded up my Ventoy boot drive to install an operating system.

## Choosing an OS & Putting It on the Home Network

I originally wanted to install FreeBSD, but I couldn't because the installer kept crashing and didn’t play nicely with Ventoy, leading to installation failures with error 19. So, I decided to install Ubuntu Server instead. However, this computer wasn’t connected to the internet, and I couldn’t connect it because it didn't have Wi-Fi, and I didn't have a very long Ethernet cable to connect it to my wall-mounted internet router from where it was placed. I opted to install Pop!\_OS and set it up without the internet at first, but later used USB tethering with my mobile for internet access.

I found an old router gathering dust on a shelf from 2-3 years ago. I wondered if I could set it up to connect wirelessly through my internet router and then use Ethernet to connect that router to the server computer. To my surprise, it worked! The box of the router, which fortunately was not damaged, stated it had a WISP mode, allowing it to extend and enable other devices to connect to the network. I connected the Ethernet cable to the device port on the TP-Link router and the other end to the computer. After visiting the gateway URL, I followed the steps to change the network mode to extend, entered my home Wi-Fi credentials, and, apparently, this router was extending the Wi-Fi. I didn’t want that, so I hid the SSID of this router. Initially, I thought this setup wouldn’t work, but it surprisingly did—albeit at a pathetic speed of 72 Mbps (this is an old 2.4GHz, 300 Mbps router, and the Ethernet cable was also not very great—good enough for now, I guess).

I went ahead and applied updates, installed Zsh, Neovim, and SSH. Since it was my first time setting up an SSH server, I didn't configure it much—just the defaults. Once it was on my home network, I SSH’d into it using my user account password.

## First Homelab Project: Self-Hosted Media Backup Library Using Immich

Next, I moved on to my first homelab project: setting up a self-hosted media backup library using Immich. I installed Docker, but the system was a bit janky at this point. I followed the Docker guide in the docs to get Immich up and running. For a couple of minutes, the Immich app was not reachable, and I wondered if I had messed something up, but eventually, it became reachable—probably due to the computer lagging.

I’m seriously wondering if Pop!\_OS will consume resources, leaving little room for anything worthwhile to do. I set up an admin account and a couple of user accounts for my family members. I used Immich-go to upload my Google Photos library to the server from another computer. Unfortunately, it became very slow. After the upload was complete, accessing the library with the Immich client was so slow that it was practically unusable. At that point, I didn’t realize the Immich jobs were generating thumbnails, performing facial scanning, and running smart scan jobs, all of which were loading the Docker container and the computer. I left it to process everything but later disabled all the jobs.

I suspect choosing Pop!\_OS was not a good decision because everything was super slow, especially the Immich app, which was practically unusable. I was going to set up backup scripts for Immich but am now considering doing a clean reinstall, this time with Ubuntu Server, since it would be much lighter than Pop!\_OS and likely more reliable as a server.

So, I decided to nuke everything and install Ubuntu Server, which I plan to do next week.

**PS**: If you're curious, the command I used for the photo upload was:

```sh
immich-go -server="http://<machine-address>:2283" -key="<your-immich-key" upload  -google-photos .\takeout-*.zip
```

## What Next?

What’s next? Well, I am still in the early stages of homelabbing and having lots of fun experimenting, so who knows? I might try setting up a custom web server, flashing FreeBSD on a USB stick to attempt the installation again, or creating a Minecraft server just for fun. I also have two Arduino Uno boards, which I’m thinking of incorporating into my setup somehow.

## Update Preview

Since this post got delayed, I have already installed Ubuntu Server and set up Immich on it. As expected, the performance is much better without the GUI overhead. During the Ubuntu Server setup, I also configured SSH, as it came with nice server-oriented setup tools. Apparently, you can pull your SSH keys from your GitHub username, and it works!

My server setup is quite messy; I’m using three wall outlets on three different walls, creating a spiderweb-like appearance. I don’t run it 24/7, though!

![computer server](https://media1.tenor.com/m/dDhEzrPZifYAAAAC/nitrado-last-oasis-servers.gif)
