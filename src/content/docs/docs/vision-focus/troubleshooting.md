---
title: Troubleshooting
description: Common issues and solutions for VisionFocus Chrome Extension
---

# Troubleshooting VisionFocus

This guide helps you resolve common issues with VisionFocus. If you don't find your issue here, please [report it on GitHub](https://github.com/machina-gg/vision-focus/issues).

## Extension Not Working

### Extension doesn't appear after installation

**Problem:** VisionFocus icon is not visible in the Chrome toolbar after installation.

**Solutions:**

1. Check if the extension is enabled:
   - Open `chrome://extensions/`
   - Find "VisionFocus" in the list
   - Ensure the toggle switch is ON (blue)

2. Pin the extension to toolbar:
   - Click the puzzle icon in Chrome toolbar
   - Find "VisionFocus" and click the pin icon

3. Restart Chrome:
   - Close all Chrome windows completely
   - Reopen Chrome and check again

### Extension icon is grayed out

**Problem:** VisionFocus icon appears but is grayed out or inactive.

**Solutions:**

1. Refresh the current page (press `F5` or `Cmd+R`)
2. Check if you're on a restricted page (Chrome Web Store, chrome://, or other system pages cannot be controlled by extensions)
3. Reinstall the extension if the issue persists

## Blocking Issues

### Websites are not being blocked

**Problem:** Sites you added to the blocklist still load normally.

**Solutions:**

1. Verify the URL format:
   - Use domain only: `youtube.com` (not `https://youtube.com`)
   - For subdomains: `www.youtube.com` blocks only www, while `youtube.com` blocks all subdomains

2. Check if blocking is enabled:
   - Open VisionFocus
   - Navigate to "Block" tab
   - Ensure the blocklist is not paused or disabled

3. Clear browser cache:
   - Open `chrome://settings/clearBrowserData`
   - Select "Cached images and files"
   - Click "Clear data"

4. Refresh the blocked website after adding it to the blocklist

### YouTube blocking not working

**Problem:** YouTube continues to work despite being on the blocklist.

**Solutions:**

1. Add these variations to your blocklist:
   - `youtube.com`
   - `www.youtube.com`
   - `m.youtube.com`

2. Block YouTube embedded videos by adding:
   - `youtube-nocookie.com`

3. Restart Chrome after adding all variations

### Block page doesn't show vision statement

**Problem:** Blocked pages show blank screen or default message instead of your vision.

**Solutions:**

1. Verify your vision is saved:
   - Open VisionFocus
   - Go to "Vision" tab
   - Check if your vision text is present

2. Ensure vision display is enabled in settings
3. Reload the blocked page

## Timer Problems

### Timer stops when tab is in background

**Problem:** Focus timer pauses or stops when switching tabs.

**Solutions:**

1. Keep VisionFocus popup window open during timer sessions
2. Pin the tab with VisionFocus open
3. This is a known Chrome limitation - we're working on a fix in the next update

### Timer notifications not appearing

**Problem:** No notification when timer completes.

**Solutions:**

1. Enable Chrome notifications:
   - Go to `chrome://settings/content/notifications`
   - Ensure notifications are allowed
   - Add VisionFocus to allowed sites

2. Check system notification settings:
   - **macOS:** System Settings → Notifications → Google Chrome → Allow notifications
   - **Windows:** Settings → System → Notifications → Google Chrome → On

### Timer resets unexpectedly

**Problem:** Timer goes back to zero without completing.

**Solutions:**

1. Avoid closing the VisionFocus popup while timer is running
2. Don't disable or restart the extension during a session
3. Check if Chrome is set to clear data on exit (this will reset the timer)

## Data Loss Issues

### Settings or blocklist disappeared

**Problem:** Your configuration was reset after Chrome update or extension reinstall.

**Solutions:**

1. Check if data sync is enabled (Premium feature):
   - Open VisionFocus
   - Go to Settings
   - Enable "Sync across devices"

2. Export your settings regularly (Free feature coming soon):
   - We're adding backup/restore in the next version

3. If data was lost due to extension reinstall:
   - Unfortunately, local data cannot be recovered
   - We recommend using Premium for cloud sync

## Premium Features Issues

### Premium features not activating

**Problem:** Purchased Premium but features are still locked.

**Solutions:**

1. Verify purchase:
   - Open VisionFocus
   - Go to Settings → Premium
   - Check if "Premium Active" is displayed

2. Refresh Premium status:
   - Click "Restore Purchase" button in Premium settings
   - Wait 10-15 seconds for verification

3. Sign in again:
   - Log out from VisionFocus
   - Log back in with the account used for purchase

4. Check email for purchase confirmation
5. If issue persists, contact support with your purchase receipt

### Premium sync not working

**Problem:** Settings don't sync across devices despite having Premium.

**Solutions:**

1. Ensure you're logged in with the same account on all devices
2. Force sync:
   - Open Settings → Premium
   - Click "Sync Now"

3. Check internet connection
4. Allow up to 5 minutes for sync to complete

## Vision Display Issues

### Vision statement not displaying

**Problem:** Vision tab is empty or doesn't save text.

**Solutions:**

1. Check character limit:
   - Free: 200 characters
   - Premium: 1000 characters

2. Ensure you clicked "Save" after writing your vision
3. Try clearing the vision and writing it again
4. Check browser console for errors (press `F12` → Console tab)

## Performance Issues

### Extension slowing down Chrome

**Problem:** Chrome becomes slow after installing VisionFocus.

**Solutions:**

1. Reduce number of blocked sites (Free users: stay under 10 for best performance)
2. Disable unused features in Settings
3. Update to the latest version of VisionFocus
4. Check if other extensions are conflicting

## Still Having Issues?

If none of these solutions work:

1. **Check for updates:** Ensure you have the latest version of VisionFocus
2. **Browser version:** Update Chrome to the latest version
3. **Conflict check:** Temporarily disable other extensions to see if there's a conflict
4. **Report the bug:** [Create an issue on GitHub](https://github.com/machina-gg/vision-focus/issues) with:
   - Your Chrome version
   - VisionFocus version
   - Steps to reproduce the problem
   - Screenshots if applicable

## Contact Support

- **GitHub Issues:** [github.com/machina-gg/vision-focus/issues](https://github.com/machina-gg/vision-focus/issues)
- **Email:** support@machina.gg (Premium users get priority response)

We typically respond within 24-48 hours.
