---
title: Dotfile Management Made Easy with GNU Stow
description: Dotfiles are configuration files that store your preferences and settings for your development tools, applications and customizations. They are very handy when you want to migrate to a new system or restore your old system after a clean installation. You can easily apply your dotfiles and get your familiar environment back. In this post, I will demonstrate a neat way to manage your dotfiles and use git to track and sync them across different computers.
pubDatetime: 2023-06-17T00:00:00.000Z
modDatetime: 2024-01-29T11:19:44.639Z
tags:
  - tutorial
---

## Table of Contents

As a developer, you likely have a set of configuration files, or "dotfiles," that you use to customize your development environment. These dotfiles can range from your `.bashrc` file to your Vim configuration and custom aliases.

Managing dotfiles can be a hassle, especially when you have multiple machines or need to set up a new one. That's where GNU Stow comes in. It's a symlink farm manager that simplifies dotfile management by creating symlinks from your dotfiles directory to your home directory.

## ~/.dotfiles

To get started with GNU Stow, you'll need to install it. It's usually named `stow` in your distro's package manager. Once installed, create a `~/.dotfiles` directory to store your config files. Make sure to put your configs in the same name and directory structure as they would be in `~`. For example, if your default neovim config location is `~/.config/nvim/init.vim`, create this file at `~/.dotfiles/.config/nvim/init.vim`.

Now, when you run `stow -v .` from within the `~/.dotfiles` directory, it will create the appropriate symlinks, and your programs can read them. For instance, the `~/.config/nvim/init.vim -> ~/.dotfiles/.config/nvim/init.vim` symlink will be created following from the above example.

Be careful, though. If there's a directory already present with the same name as one inside dotfiles, the symlink will be created inside that directory. For example, if `~/.config/nvim` already exists, running stow will create `~/.config/nvim/nvim -> ~/dotfiles/.config/nvim`.

## Clean Up

Use `stow -Dv .` to remove all dotfiles. You can also remove individual dotfiles by specifying the directory name, such as `stow -Dv .config/nvim`.

It's a good idea to version control your dotfiles with Git, which allows you to easily sync them across multiple machines and track changes. However, be careful not to leak any sensitive information if your dotfiles repo is public on GitHub. Also, test your dotfiles thoroughly before pushing changes to your repository.

## Final Words

In conclusion, managing your dotfiles with GNU Stow and Git can save you time and headaches. With a little setup, you can manage your dotfiles across multiple machines and keep them version controlled.
