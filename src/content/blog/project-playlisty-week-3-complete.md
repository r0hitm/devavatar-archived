---
title: "Playlisty Devlog: Week 3 Update | App is complete"
description: "Project Playlisty for Spotify is functional. This post covers how I worked around an API limit and rest of the development through deployment on Vercel."
pubDatetime: 2024-04-05T13:54:30.183Z
tags:
  - devlog
---

This is a continuation and the final devlog on [Project Playlisty](https://github.com/r0hitm/playlisty), which is now complete and functional. Links to the previous devlogs:

1. [Week 1 Update](/posts/project-playlisty-devlog-week-1)
2. [Mid-Week 2 Update](/posts/project-playlisty-devlog-midweek-2)
3. This is the complete Week 2 Update (just published late).

I have submitted the Spotify Quota Extension application, and once it is approved (which could take up to 6 weeks), anyone can use it.

📺 **Demo video**:

<iframe width="560" height="315" src="https://www.youtube.com/embed/9ssFiGuGMhg?si=Dnl5ZeQN_js-i2Xi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

👉 [**Live Link**](https://playlisty-spotify.vercel.app)

## Table of Contents

## Found Workaround For The Missing Spotify API Endpoint

Previously, I encountered a major roadblock:

> there is no API endpoint to check if a song is in a given playlist!
>
> Without having such an endpoint, the filtering part of the `Is-In` and `Not-Is-In` component needs considerable rethinking...

I found a workaround. Now, after the user logs in and requests their playlists, all playlists and their respective songs are fetched. Initially, all playlists are fetched as a set of 50 playlists (as the Spotify API operates this way). Then, each playlist is used to create a `Promise` object that calls the API to fetch the songs. These promises are then resolved simultaneously using `Promise.all` to make concurrent calls and not block the UI. This process is repeated until the `next` property in the response is `null`, indicating that there are no more songs to fetch. I was concerned about potential rate limiting by Spotify, however, I did not encounter any issues. Voila! Now, all the playlists and songs are stored in the app's state, allowing for easy implementation of the `Is-In` and `Not-Is-In` functionalities using a `filter()`.

## Implementing Rest Of The Features

After resolving the API endpoint issue, the rest of the development progressed rather swiftly. Here's a rundown of the implemented features:

- Implemented the `Is-In` and `Not-Is-In` boxes to display the playlists in which the selected song is and is not included.
- Created a new component `<PlaylistItem />` to display the playlists in the `Is-In` and `Not-Is-In` boxes, along with add/remove buttons that are disabled if the user cannot modify the playlist.
- Implemented app disablement when the user goes offline. By disablement, I mean reducing the `<body>` opacity by 50%, disabling all pointer events, and displaying a prominent red message stating "You are offline."
- Implemented the add and remove buttons in such a way that after adding or removing the song, those playlists are not re-fetched. Instead, the local state is appropriately updated to reflect the changes. While I plan to add a global option to display an alert if the API call fails, for now, a failed add/remove API call followed by an optimistically and out-of-sync incorrect updated the local state is not that big of an issue; and I didn't encounter any yet. **Note**: During development, the Privacy Badger browser extension interfered with the app's functionality by blocking access to the Spotify API. If you encounter issues with the app not working, try disabling this extension.
- Lifted the app state up the DOM in the `<Root>` component so that the does not need to re-fetch all the playlists data if user moves between Home, About or Privacy Policy.
- Added animated loading SVG.
- Added keyboard cursor support, allowing users to use the Up/Down keys to navigate quickly between songs.
- Implemented song thumbnails and implemented lazy loading using the Intersection Observer API.
- Added `FUNDING.yml`: You can support this project via GitHub sponsors or buy me a coffee ☕.
- Deployed the app since it supports client-side routing. [See this](/posts/fix-react-router-on-github-pages).

## Known Bugs And Enhancements

As I began using my own app and gave access to a couple of friends, I identified the following bugs and potential enhancements:

- **BUG**: If a user has more than 50 playlists, only 50 are being fetched [See the Issue](https://github.com/r0hitm/playlisty/issues/1).
- **Enhancement**: [Remove a song from the current playlist](https://github.com/r0hitm/playlisty/issues/2).
- **Enhancement**: [Sort playlists and songs alphabetically](https://github.com/r0hitm/playlisty/issues/3).

As previously mentioned, this is the final devlog on this project, so the fixes mentioned above won't receive any new blog post updates. If you wish to follow the updates, ⭐ the project on GitHub: [r0thim/playlisty](https://github.com/r0hitm/playlisty). (Go do it now 😂!)

## Final Notes

In summary, I developed a functional React App to solve a personal problem with a decent UI in just 10 days (from March 21 to March 31). It's gratifying to create something that solves a personal problem and, hopefully, proves useful to others. This project represents my first endeavor of considerable size, and I'm very proud of the outcome 😎.

(P.S.: Although technically complete, the app is in "development mode", and I have requested the Spotify team for "Extended Quota Mode," which can take up to 6 weeks. Consequently, anyone whose email account I do not add manually will not be able to use the app. Let's wait patiently and hope for the best. If you want to try the app nonetheless, please contact me, and I will add your email to the list. Please note that there is a limit of 25 users, so I might not be able to add everyone.)

![I did it anime gif](https://media1.tenor.com/m/7bhQfED5lqkAAAAC/hinata-shoyo.gif)
