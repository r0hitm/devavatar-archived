---
title: "Playlisty Devlog: Week 1 Update | Successful Login, Skeleton Routing, and Basic Layout Implemented"
description: "Follow my journey building Playlisty, a web app for Spotify users like myself. Discover how I'm solving the challenge of tracking songs across playlists and simplifying music organization. Inspired by my own frustration with Spotify, where finding which playlists contain or lack specific songs is often a hassle."
pubDatetime: 2024-03-26T05:40:42.343Z
tags:
  - devlog
---

I recently embarked on a new project to address a personal issue that I believe others may also encounter.

I am calling the project Playlisty and is aimed at solving this problem. My goal is to provide users with the ability to easily see which playlists a specific track is included in at a glance! And quickly move/remove among these.

Playlisty will be a serverless Single Page Application (SPA) developed using React.

This post marks the first of a series of upcoming devlog entries as I progress with this project.

## Table of Contents

## Motivation & Scope

In Spotify, there is a lack of an intuitive way to identify playlists containing a particular song and those that do not. While the recent update in the Desktop official client allows users to check a green checkmark that opens a dropdown menu for adding/removing a selected track to/from multiple playlists, it can still be a cumbersome process for each individual track with a limited small-sized menu.

The goals of this project are:

- To display the playlists in which a selected song is or is not present within other playlists
- To enable users to add or remove the selected song from/into these playlists with a simple button click
- Both of these on a single page!

In addition to addressing a real-world issue, this project also aims to showcase my developer skills to potential employers, and I plan to utilize this project for the [MLH fellowship](https://fellowship.mlh.io/programs/software-engineering) demo project.

The following aspects are currently out of scope:

- Creation/deletion of playlists
- Editing playlist details
- Displaying cover art for songs and playlists
- Mobile device compatibility (while the web app will function on mobile, a minimum width property is set to 1024px resulting in a horizontal scroll bar on smaller devices)
- Adding new songs not present in the selected playlist
- Playing songs

## Week 1 Progress

I am developing this project with [React + TypeScript + Vite](eslint-and-prettier-in-react-ts-project-setup) and using the official [Spotify Web API TypeScript SDK](https://github.com/spotify/spotify-web-api-ts-sdk).

### Challenges

- Addressed challenges faced this week include grappling with poor documentation and deciphering the SDK source code to understand that the SDK first checks for the authorization `code` in the current URL prior to initiating a redirect.

### Progress Highlights

- Successfully developed working login functionality using [PKCE authorization strategy](https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow), after modifying the custom hook in the SDK's react example code to trigger manual login instead of relying on the automatic login on page load.
- Implemented skeleton routing for client-side routing, and outlined the structure of the protected component `<App />` to ensure only authenticated users can view the app layout.
- Established the basic layout of the app: it includes a grid with four boxes: two equal-sized columns. The first column features a playlist selector drop-down and the tracks in the selected playlist. The two boxes on the right display the playlists where the currently selected song from the tracks' box is or is not included. (_see the sneak peek image below_)

Initially, I complicated the structure with context APIs but simplified it by replacing them with a custom hook `useSpotify`, which provides the SDK object along with login and logout functions. I also utilize the [`Outlet`](https://reactrouter.com/en/main/hooks/use-outlet-context) context from React-router to share the `SpotifyApi` instance across the app's routes post-login.

I discovered that the `/callback` route was unnecessary since the authorization code was directly passed to the redirect URI. I now use an `useEffect` on the `Root` route to check for the `code` query parameter and run the login function from the SDK to complete the login flow. Success - the user is logged in!

In hindsight, the setup appears obvious and simple, yet it took me two days to figure everything out (I feel stupid). Nevertheless, I'm pleased with the progress.

### Key Learnings

- Through the invoked SDK for manual authentication via `SpotifyApi.authenticate()`, I learned that it checks for the `code` parameter in the URL. If present, it acquires the access token to complete the login flow; otherwise, it redirects to obtain it.
- Bug fix: The `rootLoader` causing data retention post-logout, by replacing it with `URLSearchParams` and using the `has()` property to verify the `code` existence. The application now functions smoothly.
- Implemented redirects to restrict unauthorized users from accessing the `/app` route and guide logged-in users from `/` to `/app`.

A sneak peek of the post-login view of Playlisty:

![Playlisty Sneak Peak - Logged In](@assets/images/playlisty-devlog-1-sneakpeak.webp)

## Goals for the Next Week

My aim is to have the app mostly functional by the end of this month (March 2024). Below is a breakdown of my to-do list for the upcoming week:

- ~~Implemented the drop-down for selecting the playlist~~ (already implemented at the time of editing. More details in the subsequent post)
- Fetch and display the songs of the selected playlists
- Ensure the two boxes on the right reflect the current selected track, then
- Update it to show the playlists containing and not containing the current selected song
- Add a 'remove' button to the '_is-in_' box and implement the delete-from-playlist functionality
- Include an 'add' button to the _'not-in_' box and implement the add-to-playlist functionality
- Create `/about` and `/privacy-policy` pages
- Implement the footer
- Test thoroughly and deploy the application
- Apply for an extended quota limit from Spotify

If you wish to test the app before the official launch or have any feedback or suggestions, feel free to reach out!

Stay tuned for updates by following me on Twitter and/or LinkedIn!
