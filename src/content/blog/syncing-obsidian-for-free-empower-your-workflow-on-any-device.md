---
title: "Updated: Syncing Obsidian across Multiple Devices Using Git and/or Syncthing for Free"
description: Step-by-Step tutorial for setting up Obsidian Vault sync across devices for free, using git version control or via Syncthing.
pubDatetime: 2023-06-07T00:00:00.000Z
modDatetime: 2024-10-15T15:13:48.999Z
tags:
  - tutorial
---

[Obsidian](https://obsidian.md/) is more than just a note-taking app — it's a powerful tool for organizing your thoughts and ideas. In this blog post, I'll be sharing my personal setup for syncing Obsidian notes between multiple devices (except iPhone) using Git/GitHub and Syncthing.

**Updated**: Now you do not need to be terminal savvy to set up the sync that uses Syncthing. _This is recommended if you are not familiar with Git/terminal_.

## Table of Contents

## Method 1 (Using Syncthing)

This is the general method that I recommend to most users because it is simpler and allows for configuring more than two devices quickly. The only requirement is that any device that you set up for the sync must be connected to the same network, not always, but occasionally, whenever you have something to sync.

**Optional**: If you're going to also use Method 2 along with this method, then add `.stfolder` to the `.gitignore` file. And create `.stignore` and add `.git`.

1. Download and install Syncthing from the official website for your devices. \[[Syncthing Download Page](https://syncthing.net/downloads/)\]. Refer to Syncthing documentation. (Install the F-Droid version on Android.)
2. Connect them to the same network.

### Desktop (PC/Mac)

1. Let's set up sync from the desktop. Visit the config page in the browser (usually http://localhost:8384/).
2. Click the menu on the top-left bar -> show QR. Now scan this via the mobile client of Syncthing to connect. Or manually enter the string to a different computer. If this is successful, you should now see that device under "Connected Devices" on the same page.
3. On the left, click 'Add folder' and choose your Obsidian vault. Give it a name and note down the ID (auto-generated but editable; I recommend giving it a friendly name like "notes"). Under the share tab, check your connected device so that it is actually synced.

### Mobile/Another Computer

(Assuming you didn't skip the above section.)

1. Similarly, add a folder (create it if it doesn't exist) on your mobile/another computer, and give it a label.
2. VERY IMPORTANT: **Change the ID (key icon) to match the ID of the folder from the first computer.**
3. Toggle/select the first computer to give it share permission.

If everything is correct, you should see the status of the folder being updated to "preparing to sync" -> "syncing" -> "idle."

Now, any changes made on any device will be automatically synced whenever they're on the same network.

## Method 2 (Using Git/GitHub)

This method is for those who are relatively familiar with Git and want to also version control their notes. I use this now for backing up my notes to GitHub. Since Termux doesn't work nicely on newer Android versions, I use Syncthing for my mobile <-> PC syncing now.

### Desktop (PC or Mac)

Assuming you have Git installed and configured with your username and email (using the same email associated with your GitHub account), follow these steps:

1. Open your Notes vault using the command-line interface (CLI) and initialize it as a Git repository.

2. Create a `.gitignore` file and add the following content to it:

```plaintext
.obsidian/workspace-mobile.json
.obsidian/workspace.json
.obsidian/workspaces.json
.obsidian/cache
.trash/
.DS_Store
.stfolder # if you're also using Method 1
```

1. Commit all the changes you made.

2. Create a remote GitHub repository and set it as the upstream for your local Notes vault.

3. Install the Obsidian Git community plugin in Obsidian. This plugin will automatically commit and push any changes you make to your GitHub repository.
4. Adjust the commit and push frequency according to your preference in the plugin settings.

**Note 1**: If like me, you have gpg commit signing enabled for all your repositories, you may want to consider disabling it specifically for your Notes vault. This is because gpg commit signing can either prevent commits (due to the lack of a TTY) or require you to enter your passphrase frequently, which can be quite inconvenient. Disable using `git config commit.gpgsign false`.

**Note 2**: Obsidian uses LF line endings, so it might break the newline characters on devices that use different line endings (say Windows and Mac) because on Windows, git auto converts LF line endings to CRLF (windows default). If you run into this issue, make sure you disable `autocrlf` using: `git config core.autocrlf false`.

### Android

**Note**: I have not seen any recent developments on Termux for a while, and it may result in issues if you run it on recent Android versions (13+). I have set up Method 1 specifically for my phone for this reason.

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

# Authenticate Termux using GitHub CLI.
$ gh auth login
# Use SSH for repository access when prompted by the command.
# This automatically sets up a SSH key and adds to your GitHub Account.

# Configure your Git settings (or copy .gitconfig from PC to ~)

# Now, navigate to ~/storage/shared and clone your notes.
$ cd ~/storage/shared
$ git clone git@github.com:YOUR-USERNAME/YOUR-NOTES-REPO

# It is likely that you'll get following error & git will not work
$ cd Notes
$ git status
fatal: detected dubious owenership in repository at '<LOCATION>'

To add an exception for this repository, call:
     git config --global --add safe.directory <LOCATION>

# Go ahead and run this command.

# Finally, disable commit signing (see the last paragraph of pervious section)
$ git config commit.gpgsign false
```

Unfortunately, Obsidian Git doesn't work on mobile devices as intended and it's best to check the `Disable on this Device` of the plugin for the mobile devices.

#### Making syncing a click away

I use a script to sync my notes using [Termux](https://termux.dev) (Get the F-Droid version, it's more up to date). It's possible to automate this script using Tasker or a cron job, to run in the background constantly.
To preserve battery life, I prefer using the `Termux:Widget` addon to create a launcher icon for the script. I place it beside Obsidian icon on my home screen. This way, my notes sync only when I need them, saving precious battery power.

You can refer to the wiki for more Termux:widget options. But here is my minimal working setup:

```bash
$ mkdir -p ~/.shortcuts
$ chmod 700 -R ~/.shortcuts

# Use any editor to copy the sync script,
# I am using neovim (pkg install neovim)
$ nvim ~/.shortcuts/sync.bash

# Copy over the sync-script see below.

# After saving, fix shebangs (Termux specific thing)
$ termux-fix-shebang ~/.shortcuts/sync.bash
```

#### Sync Script

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

---

Happy noting (_is this even a word?!_) 📝

![taking notes gif](https://media.tenor.com/hph-YFUYCvUAAAAC/my-hero-academia-izuku.gif)
