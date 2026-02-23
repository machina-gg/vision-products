---
title: FAQ
description: Frequently asked questions about the VisionFocus Chrome Extension
---

# Frequently Asked Questions

## Installation & Setup

### How do I install VisionFocus?

1. Visit the Chrome Web Store (coming soon)
2. Click **Add to Chrome**
3. Accept the required permissions when prompted
4. The VisionFocus icon will appear in your Chrome toolbar

For a full walkthrough, see [Getting Started](/en/docs/vision-focus/getting-started/).

---

### What permissions does VisionFocus need and why?

VisionFocus requests the following permissions:

| Permission | Reason |
|---|---|
| Access to website URLs | Required to intercept and block sites on your blocklist |
| Local storage | Used to save your blocklist, timer settings, and vision statements on your device |
| Notifications | Used to alert you when a timer session ends |

All data stays on your device. VisionFocus does not collect, transmit, or sell any personal data.

---

### Does VisionFocus work on browsers other than Chrome?

VisionFocus is officially supported on Chrome only. It may work on Chromium-based browsers like Microsoft Edge or Brave, but these configurations are not officially tested or supported.

---

## Website Blocking

### How do I block a website?

1. Click the VisionFocus icon in the Chrome toolbar
2. Open the **Block** tab
3. Enter the site's domain (e.g., `youtube.com`)
4. Click **Add to Blocklist**

The block is active immediately. See [Blocking Websites](/en/docs/vision-focus/blocking-websites/) for more details.

---

### Can I set a time limit instead of a full block?

Yes. Instead of blocking a site completely, you can set a daily time allowance:

- 5 minutes
- 15 minutes
- 30 minutes
- 60 minutes

Once you've used your daily allowance, the site is blocked for the rest of the day. To set a limit, add the site to your blocklist, then click the time limit dropdown next to it.

---

### Does blocking YouTube also block embedded YouTube videos?

No. VisionFocus blocks `youtube.com` and its subdomains, but YouTube videos embedded on other sites are not blocked. If you need to block embedded content, you would need to block each hosting site individually.

---

### Can I temporarily bypass a blocked site?

Yes. On the block page, click the **Bypass** button and confirm the dialog. The bypass allows you to access the site for that visit. All bypasses are logged and counted — your bypass count for each site is displayed on the block page, which helps with self-accountability.

---

### How many sites can I block?

- **Free:** Up to 10 sites
- **Premium:** Unlimited

---

## Focus Timer

### How do I use the Pomodoro timer?

1. Open VisionFocus and go to the **Timer** tab
2. Set the duration to 25 minutes (the classic Pomodoro interval)
3. Click **Start Timer** and begin working
4. When notified, take a 5-minute break
5. Repeat — after 4 sessions, take a longer 15–30 minute break

You can customize the session length to match your working style. See [Timers](/en/docs/vision-focus/timers/) for more.

---

### Can I pause the timer?

Yes. You can pause and resume the timer at any time. Your progress is preserved when you pause.

---

### Will I get notified when the timer ends?

Yes. VisionFocus sends a browser notification when the timer completes, even if the popup is closed. Make sure Chrome notifications are enabled in your system settings.

---

### Why does the timer stop when I switch tabs?

This is a known limitation of how Chrome manages background processes in extensions. To keep the timer running reliably:

- Keep at least one Chrome window open and active
- Don't put your computer to sleep during a session

A more robust background timer implementation is planned for a future release.

---

## Vision Statements

### What is a daily vision statement?

A vision statement is a short personal message you write that appears every time you try to visit a blocked site. It reminds you why you're staying focused — your goals, your intentions, your reason for choosing depth over distraction.

---

### How many vision statements can I have?

- **Free:** 1 vision statement at a time
- **Premium:** Multiple statements, with scheduling and manual switching between presets

---

### Can I add images to my vision statement?

Not in the current version. Vision statements are text only. Image support may be added in a future update.

---

### What's the character limit for vision statements?

- **Free:** 200 characters
- **Premium:** 1,000 characters

---

## Premium Plan

### What's included in Premium?

Premium ($1.99/month or $24/year — 33% off) includes:

- **Unlimited** website blocking (free: 10 sites)
- Advanced timer options
- Multiple vision statements with scheduling
- Custom block page themes
- Cross-device settings sync
- Priority email support

---

### How do I upgrade to Premium?

Click **Upgrade to Premium** in the VisionFocus popup and follow the checkout steps.

---

### Can I cancel my subscription?

Yes, at any time. After canceling, you'll retain Premium access until the end of your current billing period.

---

### Is there a free trial?

Not currently, though one is planned for the future. The free plan gives you enough to evaluate the core features: basic blocking (up to 10 sites), a timer, and one vision statement.

---

## Statistics & Data

### What does the Stats tab show?

The **Stats** tab displays:

- Total time saved by blocking distracting sites
- Number of block triggers (how many times a blocked site was intercepted)
- Your most frequently blocked sites
- Focus timer session history

All statistics are stored locally on your device.

---

### Can I export my settings?

Yes. Go to **Settings → Export/Import → Export Settings** to download your blocklist, timer settings, and vision statements as a JSON file. You can import this file on another device or after reinstalling.

---

### How do I move my settings to a new computer?

1. On your old computer: Settings → Export/Import → **Export Settings**
2. On the new computer: Install VisionFocus
3. Go to Settings → Export/Import → **Import Settings**
4. Select the exported JSON file

Premium users can also enable **Sync across devices** for automatic synchronization without needing to export manually.

---

## Troubleshooting

### A blocked site is still loading — what should I do?

1. Reload the page
2. Make sure your URL format is correct — enter `youtube.com`, not `https://www.youtube.com`
3. Restart Chrome
4. If the issue persists, see [Troubleshooting](/en/docs/vision-focus/troubleshooting/) or [report it on GitHub](https://github.com/machina-gg/vision-focus/issues)

---

### Timer notifications aren't showing up

1. Check Chrome's notification permission: `chrome://settings/content/notifications`
2. Go to Settings → Privacy and security → Site settings → Notifications
3. Make sure VisionFocus is in the allowed list

---

### My settings disappeared after reinstalling

If you exported your settings before reinstalling, you can restore them via **Settings → Export/Import → Import Settings**. If you didn't have a backup, local data cannot be recovered. Enable Premium sync or export regularly to prevent future data loss.

---

## Still Have Questions?

- Browse the full documentation starting from [Getting Started](/en/docs/vision-focus/getting-started/)
- Check [Troubleshooting](/en/docs/vision-focus/troubleshooting/) for detailed fixes
- [Open an issue on GitHub](https://github.com/machina-gg/vision-focus/issues) to ask a question or report a problem
