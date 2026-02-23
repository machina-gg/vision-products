---
title: Blocking Websites
description: How to block distracting websites and set daily time limits with VisionFocus
---

# Blocking Websites

VisionFocus helps you build a distraction-free browsing environment by blocking the sites that consume your attention. You can choose between a full block or a daily time limit — whichever fits your workflow best.

## Adding a Site to Your Blocklist

1. Click the VisionFocus icon in the Chrome toolbar
2. Open the **Block** tab
3. Type the site's domain in the URL field (e.g., `youtube.com`, `twitter.com`)
4. Click **Add to Blocklist**

The block takes effect immediately. You don't need to reload the page or restart Chrome. When you (or your browser) navigates to a blocked site, VisionFocus replaces the page with your vision statement and block details.

> **Tip:** Enter the root domain only — `youtube.com` not `https://www.youtube.com`. VisionFocus automatically covers all subdomains for that entry.

## Removing a Site from the Blocklist

1. Open VisionFocus and go to the **Block** tab
2. Find the site in your blocklist
3. Click the **Remove** button next to it

The site becomes accessible again as soon as it's removed.

## Setting Daily Time Limits

If a full block feels too restrictive, you can allow limited daily access instead. Once the limit is reached, the site is blocked for the remainder of the day.

1. Add the site to your blocklist (see above)
2. Click the time limit dropdown next to the site entry
3. Choose one of the available limits:
   - **5 minutes**
   - **15 minutes**
   - **30 minutes**
   - **60 minutes**

The timer counts down as you browse that site. When your limit runs out, VisionFocus automatically blocks it and shows how much of your daily allowance you've used.

## Blocking YouTube

YouTube has multiple subdomains (e.g., `www.youtube.com`, `m.youtube.com`). The simplest approach is to add `youtube.com` — VisionFocus will block all its subdomains automatically.

If you also want to block YouTube's cookie-free embed domain, add `youtube-nocookie.com`.

> **Note:** YouTube videos embedded on other websites are not blocked by these rules. If you need to block embedded videos, you would need to block each host site separately.

## The Block Page

Every time you try to access a blocked site, you'll see a block page instead. It displays:

- **Your vision statement** — shown large at the top so it's impossible to miss
- **The blocked URL** — so you know exactly which site was blocked
- **Remaining daily time** — visible if you're using a time limit
- **Bypass count** — how many times you've unlocked this site today

This momentary pause is intentional. It gives you the chance to ask yourself: "Do I really need to go here right now?"

## Temporarily Bypassing a Block

Sometimes you genuinely need to access a site that's on your blocklist. VisionFocus allows this without requiring you to remove the site permanently.

1. Navigate to the blocked site
2. On the block page, click the **Bypass** button
3. Confirm in the dialog that appears

The bypass is logged and counted. Each bypass entry is visible in your statistics so you can reflect on your browsing patterns over time.

:::caution
Every bypass is recorded. VisionFocus tracks how many times you've bypassed each blocked site and displays this count on the block page. If you find yourself bypassing frequently, consider switching to a time limit instead of removing the site entirely.
:::

## Tips for Effective Blocking

- **Start small**: Add just one or two sites that most consistently pull you off track. Blocking everything at once can feel overwhelming.
- **Use time limits for moderation**: If you need occasional access to a site for legitimate reasons, a time limit is more sustainable than a full block.
- **Block domains, not individual pages**: Adding `youtube.com` is more effective than adding specific video URLs, which change constantly.
- **Review weekly**: Check your bypass stats and blocked-site access attempts in the **Stats** tab. Adjust your blocklist based on what you learn.
- **Combine with timers**: Running a focus timer alongside your blocklist reinforces the session boundary — see [Timers](/en/docs/vision-focus/timers/) for more.

## Commonly Blocked Sites

Here are some sites that users frequently add to their blocklists:

| Category | Examples |
|---|---|
| Social media | `twitter.com`, `facebook.com`, `instagram.com`, `tiktok.com` |
| Video | `youtube.com`, `netflix.com`, `twitch.tv` |
| News & discussion | `reddit.com`, `news.ycombinator.com` |
| Gaming | `steam.com` |

## Tracking Your Progress

VisionFocus automatically tracks:

- Number of times you attempted to visit each blocked site
- Number of bypasses per site
- Time spent on sites with daily limits

Open the **Stats** tab to review these numbers and identify patterns in your browsing behavior.

## Need Help?

- [FAQ](/en/docs/vision-focus/faq/) — Common questions about blocking
- [Troubleshooting](/en/docs/vision-focus/troubleshooting/) — What to do if a site isn't being blocked
- [GitHub](https://github.com/machina-gg/vision-focus/issues) — Report a bug or request a feature
