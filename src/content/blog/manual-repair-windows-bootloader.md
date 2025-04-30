---
pubDatetime: 2025-04-30T19:15:25.000Z
title: "Repair Windows 10/11 Bootloader Manually Without Re-installing Windows"
tags:
  - tutorial
  - debug
  - windows
description: "Cannot boot Windows? Broken EFI partition? Repair it without doing a reinstallation."
---

Bricked your EFI partition, or stuck in a boot loop for whatever reason, resulting in Windows failing to boot? And even Windows Startup Repair seems to need repairing itself? Well, at this point, the
straightforward way to fix it would be to do a reinstall. However, that's often overkill. Try this method to manually repair the Windows bootloader:

1. Boot into the Windows installation media.
2. Press `Shift + F10` to open the command prompt.
3. Run `diskpart`.
4. Run `list disk`. This will show all connected disks.
5. Select your system disk, usually `0`. You can identify it by its size. If you don't remember the size, you might need to guess. 🤞
6. List all volumes using `list vol`. Look for a volume that has no assigned letter and is formatted as `FAT32`. This is your EFI partition.
7. Select this volume using `sel vol x`, where `x` is the volume number of the EFI partition.
8. Assign a drive letter to mount it by running `assign letter=v`. (I'm using `v`, but feel free to use any available letter – just remember to use that letter in the subsequent commands).
9. Type `exit` to leave diskpart.
10. Format the EFI partition: `format v: /fs:fat32`. Press `y` to confirm, then Enter at the next prompt.
11. Windows is typically installed on `C:`. Verify this by checking if the `C:` drive contains the `Windows` directory. If it's on a different drive letter for your system, use that letter instead.
12. Run `bcdboot c:\windows /s v: /f UEFI`. This command creates the necessary boot files on the EFI partition (`v:`) using the Windows installation from `c:\windows`, making the system bootable again.

Now, you can type `exit` and shut down the computer. You should be able to boot into Windows. Once booted, I recommend opening an administrator command prompt and running the following commands: `sfc /scannow` followed by `DISM /Online /Cleanup-Image /RestoreHealth`. Reboot your system afterward and check for system updates to fix any potentially corrupted files. This assumes your update service, SFC, and DISM are not corrupted, which is unlikely but possible.
If you still encounter problems, <a href="https://youtu.be/yidWdy-Xwdk?si=DNpe98hFBaSvUV2g" target="_blank">check out this video by Theo</a> for additional steps not covered here.

![windows error gif](https://media1.tenor.com/m/i23_TqaZFVcAAAAd/windows-error.gif)
