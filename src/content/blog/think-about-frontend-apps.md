---
title: This is How to Think About Server for a Frontend App
description: Learn why frontend applications still need servers to function properly, despite running primarily on the client's device.
pubDatetime: 2024-06-22T11:07:13.971Z
tags:
  - web
---

When people think about frontend web applications, they usually imagine something that runs on their end, on their device. Except for data fetching, the concept of a server or backend is a totally separate thing in the minds of most users. Yet, a frontend app requires a server to actually work!

It's important to understand that a frontend app, at its core, is a full-stack application in the sense that it has its own server. That server is responsible for actually serving up the HTML and other important files necessary for a working frontend app, such as getting static assets and managing user sessions. The term "server" refers to the backend that supports the front-end functionality.

When we talk about the usual backend, that is usually another opaque program running on another server, responsible for data and API endpoints. It can have more than one frontend client or none at all. Also, the server can serve up frontend files, but given the scale and expectations of a modern frontend, these can get very complex. So having the backend only deal with the data side of things and having the frontend handle the UX side makes things much more manageable.
