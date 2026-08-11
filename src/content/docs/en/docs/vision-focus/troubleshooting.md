---
title: Troubleshooting
description: Solutions to common issues with the VisionFocus Chrome Extension
---

# Troubleshooting

This page covers the most common issues users encounter with VisionFocus and how to resolve them. If your issue isn't listed here, [report it on GitHub](https://github.com/machina-gg/vision-focus/issues) and the team will help you out.

## Extension Not Working

### Icon doesn't appear after installation

**Symptom:** After installing VisionFocus, the icon doesn't show up in the Chrome toolbar.

**Solution:**

1. Verify the extension is enabled:
   - Go to `chrome://extensions/`
   - Find **VisionFocus** in the list
   - Make sure the toggle switch is turned on (shown in blue)

2. Pin it to the toolbar:
   - Click the puzzle-piece icon in the Chrome toolbar
   - Click the pin icon next to **VisionFocus**

3. Restart Chrome:
   - Close all Chrome windows completely
   - Reopen Chrome and check the toolbar again

---

### Icon appears grayed out or inactive

**Symptom:** The VisionFocus icon is visible but appears grayed out and doesn't respond.

**Solution:**

1. Refresh the current page (`F5` or `Cmd+R` on Mac)
2. Check if you're on a restricted page — Chrome extensions cannot control certain system pages like `chrome://`, the Chrome Web Store, or `chrome-extension://` URLs
3. If it persists on regular websites, try reinstalling VisionFocus

---

## Website Blocking Issues

### A blocked site still loads normally

**Symptom:** A site you added to the blocklist opens without any block page appearing.

**Solution:**

1. Check your URL format:
   - Enter only the domain: `youtube.com` (not `https://www.youtube.com/watch?v=...`)
   - `youtube.com` blocks all subdomains; `www.youtube.com` only blocks the www subdomain

2. Confirm blocking is active:
   - Open VisionFocus → **Block** tab
   - Make sure the blocklist is not paused or disabled

3. Clear your browser cache:
   - Go to `chrome://settings/clearBrowserData`
   - Select **Cached images and files**
   - Click **Delete data**

4. Reload the tab after adding the site — the block applies to new navigations, not already-loaded pages

---

### YouTube isn't being blocked despite being on the blocklist

**Symptom:** `youtube.com` is in the blocklist but YouTube still loads.

**Solution:**

1. Add all YouTube domain variants:
   - `youtube.com`
   - `www.youtube.com`
   - `m.youtube.com`

2. To also block embedded YouTube players elsewhere, add:
   - `youtube-nocookie.com`

3. After adding all variants, restart Chrome

---

### The block page isn't showing my vision statement

**Symptom:** The block page appears but is blank or shows default text instead of your vision statement.

**Solution:**

1. Verify your vision statement is saved:
   - Open VisionFocus → **Vision** tab
   - Confirm text is present in the input field

2. Check that vision display is enabled in settings

3. Reload the blocked page

---

## Timer Issues

### Timer stops running in the background

**Symptom:** When you switch tabs or minimize Chrome, the focus timer pauses or stops counting down.

**Solution:**

1. Keep the VisionFocus popup window open during your timer session
2. Pin the VisionFocus tab if you have it open as a page
3. This is a known Chrome extension limitation. A fix is planned for an upcoming release. In the meantime, keeping one Chrome window focused during sessions works reliably.

---

### Timer notifications aren't coming through

**Symptom:** The timer completes but no notification appears.

**Solution:**

1. Enable Chrome notifications:
   - Go to `chrome://settings/content/notifications`
   - Make sure notifications are allowed
   - Add VisionFocus to the allowed list if needed

2. Check system notification settings:
   - **macOS:** System Settings → Notifications → Google Chrome → Allow Notifications
   - **Windows:** Settings → System → Notifications → Google Chrome → On

3. Make sure Do Not Disturb / Focus Mode is off on your computer

---

### Timer resets unexpectedly

**Symptom:** The timer jumps back to zero before the session completes.

**Solution:**

1. Do not close the VisionFocus popup while a timer is running
2. Do not disable or reload the extension mid-session
3. Check if Chrome is set to clear data on exit — this can reset the timer state. Go to `chrome://settings/clearBrowserData` → **On exit** to review

---

## Data Loss Issues

### Settings or blocklist disappeared after an update

**Symptom:** After a Chrome update or reinstalling VisionFocus, your blocklist, timers, or vision statements are gone.

**Solution:**

1. Enable sync (Premium feature):
   - Open VisionFocus → Settings → **Sync across devices**
   - This backs up your settings to the cloud so they persist through reinstalls

2. Export your settings regularly (available to all users):
   - Settings → Export/Import → **Export Settings**
   - Save the JSON file somewhere safe
   - To restore: Settings → Export/Import → **Import Settings**

3. If your data is already lost and you don't have a backup or sync enabled, unfortunately local extension data cannot be recovered. We recommend enabling sync or periodic exports going forward.

---

## Premium Feature Issues

### Premium features are still locked after purchasing

**Symptom:** You completed a purchase but the extension still shows free-tier limits.

**Solution:**

1. Verify your purchase status:
   - Open VisionFocus → Settings → **Premium**
   - Look for a "Premium Active" confirmation

2. Restore your purchase:
   - On the Premium settings page, click **Restore Purchase**
   - Wait 10–15 seconds for authentication to complete

3. Sign out and sign back in:
   - Sign out from VisionFocus
   - Sign back in with the same account used at checkout

4. Check your purchase confirmation email to confirm the transaction succeeded

5. If none of the above works, contact support with your purchase receipt

---

### Premium sync isn't working across devices

**Symptom:** Your settings aren't syncing between devices even though you have Premium.

**Solution:**

1. Make sure you're signed into the same account on all devices

2. Force a sync:
   - Settings → Premium → **Sync Now**

3. Check your internet connection on both devices

4. Sync can take up to 5 minutes — wait and then check again

---

## Vision Statement Issues

### Vision statement isn't saving

**Symptom:** The Vision tab is blank after you thought you saved, or text disappears when you reopen the popup.

**Solution:**

1. Check the character limit:
   - Free plan: 200 characters
   - Premium: 1,000 characters

2. Make sure you clicked **Save Vision** after typing — the text won't persist without an explicit save action

3. Try deleting the existing statement and writing a new one from scratch

4. Open the browser console (`F12` → Console tab) and look for any error messages while saving

---

## Performance Issues

### Chrome feels slower after installing VisionFocus

**Symptom:** Chrome's overall speed decreased noticeably after installing VisionFocus.

**Solution:**

1. Reduce the number of blocked sites — free-tier users should aim for 10 or fewer entries for optimal performance
2. Disable unused features in Settings
3. Update VisionFocus to the latest version (performance improvements are released regularly)
4. Check for conflicts with other extensions — try disabling other extensions temporarily to isolate the cause

---

## Still Stuck?

If none of the above resolved your issue, here are the next steps:

1. **Update VisionFocus** — Make sure you're on the latest version
2. **Update Chrome** — Some issues are caused by outdated browser versions
3. **Isolate extension conflicts** — Temporarily disable other extensions and test VisionFocus alone
4. **File a bug report** — [Open an issue on GitHub](https://github.com/machina-gg/vision-focus/issues) and include:
   - Your Chrome version
   - Your VisionFocus version
   - Exact steps to reproduce the problem
   - Screenshots if relevant

## Support Channels

- **GitHub Issues:** [github.com/machina-gg/vision-focus/issues](https://github.com/machina-gg/vision-focus/issues)
- **Email:** support@machina.gg (Premium users receive priority responses)

We aim to respond to all support requests within 24–48 hours.
