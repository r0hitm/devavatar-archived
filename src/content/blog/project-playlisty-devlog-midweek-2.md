---
title: "Playlisty Devlog: Mid-Week 2 Update | Functional Progress"
description: As I work on Playlisty, it turned out that Spotify Web API does not have endpoint to check if a given song is in a playlist. I have to rethink how to make this happen without slowing the UX or rate limited by Spotify.
pubDatetime: 2024-03-28T08:15:00.000Z
modDatetime: 2024-04-02T11:38:54.128Z
tags:
  - devlog
---

This is a continuation of the previous devlog on Project Playlisty, which I am currently working on. If you haven't read it yet or need a refresher on what this project is about, you can check out the previous post: [Project Playlisty Devlog: Week 1 Update](/project-playlisty-devlog-week-1).

In the last 3 days, I made some considerable progress on the project. In order, they are:

## Table of Contents

## Playlist selection drop-down menu is working

I used `<select>` & `<option>` elements to implement the drop-down. The app fetches all of the user's playlists and populates the drop-down entries using `useEffect`, which runs only once when the user logs in. The fetched playlists and the currently selected playlist state are managed by the parent component. These two states will be used by the other components for their functionality.

## Tracks component displays the tracks of the active playlist

- The tracks of the selected playlist in the drop-down are now fetched and rendered inside the Tracks component.
- Users can select any track (selected track is highlighted), and this track is set as the `selectedTrack` in the parent component state.
- Deferred implementing the writing of a custom infinite scroll component for this component and the drop-down entries component after considering `react-infinite-observer`, because I want a slightly different behavior from my implementation of infinite scroll that these components do not have.

Found a bug in the Spotify's TS SDK with `makeRequest` that was giving a `404: service not found` response when I requested the next page of tracks. So I ended up using a manual function using `fetch` instead. Perhaps I will raise an issue on GitHub later.

- Lifted the state of the currently selected track from the `Tracks` component to the parent, where it is shared along with the `playlists` state to the `Is-In` and `Not-Is-In` components.

The following tasks have been moved to waiting because I want to have an MVP functional before polishing:

- Write a custom infinite scroller component
- Implement cursor up/down keys for changing the active track.

Also right now, the user's liked songs playlist (user's library) is not available in the drop-down because the API endpoint for fetching all playlists apparently doesn't include that one. So, I need to use a different endpoint. I will do that later as well.

App so far:
![|500](@assets/images/playlisty-mid-week-2.webp)

## Current Roadblock: No API endpoint to check a track in a given playlist

Today (2024 March 28), I discovered that there is no API endpoint to check if a song is in a given playlist! Anticlimactic, and I was hoping the project would almost be done by today. Without having such an endpoint, the filtering part of the `Is-In` and `Not-Is-In` component needs considerable rethinking...

Right now, one approach would be to fetch all tracks from each playlist and compare, but the fact that I can only fetch a maximum of 100 items per request from a single playlist makes it a bit complicated. For a lengthy playlist, I will need to make many requests to check the presence of a song, and I have to do this for each playlist. Too slow, too many requests. I wonder if this will trigger a rate limit from Spotify's side.

Or maybe I could make a call to every playlist and resolve them simultaneously using `Promise.all()`, but I might be rate-limited again.

Or maybe, I fetch every playlist item (just the first 100 entries), cache it in local storage. Then when the user selects a track, compare it with the first 100 and then fetch as necessary... ah, I would end up fetching the next page of entries for every playlist nonetheless!

Or maybe, I fetch every playlist, all items, and cache the state in the local storage. Write a helper function that looks up the cached value. On first login, and playlist modification (add/remove), that particular playlist is refreshed. And perhaps I would be able to use the [snapshot_id](https://developer.spotify.com/documentation/web-api/concepts/playlists) of Spotify to prevent refreshing the entire playlist 🤔 Looks promising, but I would still have to make an initial fetch of all playlists and all playlist entries when a new user logs in.

This will be the challenge of this week.
