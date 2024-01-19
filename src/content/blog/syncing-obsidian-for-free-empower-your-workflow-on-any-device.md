---
title: "Syncing Obsidian for Free: Empower Your Workflow on Any Device"
description: Sync your Obsidian notes between multiple devices for free using Git and GitHub
pubDatetime: 2023-06-07T00:00:00.000Z
tags:
  - tutorial
---

## Table of Contents

[Obsidian](https://obsidian.md/) is more than just a note-taking app—it's a powerful tool for organizing your thoughts and ideas. In this blog post, I'll be sharing my personal setup for syncing Obsidian notes between multiple devices (except iPhone) using Git and GitHub. Note that I'll assume that you're already familiar with Git and GitHub. So, let's dive in!

## Desktop (PC or Mac)

Assuming you have Git installed and configured with your username and email (using the same email associated with your GitHub account), follow these steps:

1. Open your Notes vault using the command-line interface (CLI) and initialize it as a Git repository.

2. Create a `.gitignore` file and add the following content to it:

```plaintext
.obsidian/workspace-mobile.json
.obsidian/workspace.json
.obsidian/workspaces.json
.obsidian/graph.json
.obsidian/cache
.trash/
.DS_Store
```

1. Commit all the changes you made.

2. Create a remote GitHub repository and set it as the upstream for your local Notes vault.

3. Install the Obsidian Git community plugin in Obsidian. This plugin will automatically commit and push any changes you make to your GitHub repository.
4. Adjust the commit and push frequency according to your preference in the plugin settings.

Note: If like me, you have gpg commit signing enabled for all your repositories, you may want to consider disabling it specifically for your Notes vault. This is because gpg commit signing can either prevent commits (due to the lack of a TTY) or require you to enter your passphrase frequently, which can be quite inconvenient. Disable using `git config commit.gpgsign false`.

## Android

To sync your Obsidian notes on Android, follow these steps:

1. Install Termux and Termux Widget Addon from F-Droid.

2. Run the following commands in Termux (customize them based on your specific case):

```bash
# Grant storage access
# The following also creates symlink ~/storage/shared that points to
# the internal storage of the device
$ termux-setup-storage

$ pkg upgrade
$ pkg install gnupg openssh git gh

# (optional) If you have GPG commit signing keys, import them.
# Set up SSH to access your GitHub repositories (refer to GitHub Docs).
# Configure your Git settings (or copy .gitconfig from PC to ~)

# Authenticate Termux using GitHub CLI.
$ gh auth login
# Use SSH for repository access when prompted by the command.

# Now, navigate to ~/storage/shared and clone your notes.
$ cd ~/storage/shared
$ git clone git@github.com:YOUR-USERNAME/YOUR-NOTES-REPO

# Disabling commit signing (see the last paragraph of pervious section)
$ git config commit.gpgsign false
```

Unfortunately, Obsidian Git doesn't work on mobile devices as intended and it's best to check the `Disable on this Device` of the plugin for the mobile devices. However, you can use a script to sync your notes using Termux. While it's possible to automate this script using Tasker or a cron job, that would require running an app in the background constantly. To preserve battery life, I prefer using the Termux:Widget addon to create a launcher icon for the script. I place it beside Obsidian and run it before opening and after closing the app. This way, my notes sync only when I need them, saving precious battery power.

### Sync Script

```bash
#!/bin/bash
NOTES_DIR=~/storage/shared/Notes # Path to your Notes

cd $NOTES_DIR

timestamp=$(date +'%Y-%m-%d %H-%M-%S')

git pull
if [ $? -ne 0 ]; then
    echo "Error: Failed to pull changes from the remote repository."
    exit 1
fi

# Commit and Push local changes
if [[ $(git status --porcelain | wc -l) -ne 0 ]]; then
    git add -A
    git commit -a -m "Android Vault Sync: $timestamp"
    git push
    if [ $? -ne 0 ]; then
        echo "Error: Failed to push local changes."
        exit 1
    fi
fi

git pull
if [ $? -ne 0 ]; then
    echo "Error: Failed to pull changes after committing."
    exit 1
fi

echo "Sync completed successfully."
read -n 1 -s -r -p "Press any key to exit..."
```

### Create Laucher Icon for the Sync Script

You can refer to the wiki for more Termux:widget options. But here is my minimal working setup:

```bash
$ mkdir -p ~/.shortcuts
$ chmod 700 -R ~/.shortcuts

# Use any editor to copy the sync script,
# I am using neovim (pkg install neovim)
$ nvim ~/.shortcuts/sync.bash

# Fix shebangs (Termux specific thing)
$ termux-fix-shebang ~/.shortcuts/sync.bash
```

Now you can add Termux:Widget shortcut to your home screen to quickly run the sync script.

![taking notes gif](https://media.tenor.com/hph-YFUYCvUAAAAC/my-hero-academia-izuku.gif)
