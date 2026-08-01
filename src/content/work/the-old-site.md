---
title: "The old site"
subtitle: "Hand-written, then frozen for three years"
summary: "The site this one replaced — built by hand in 2022, abandoned in 2023, and still telling everyone I was almost finished with my Masters until 2026."
year: 2022
month: 8
endYear: 2023
type: project
source: Personal
flood: tan
authorship: ai-original
authorshipNote: "Written by Claude from its own audit of the 2022 codebase."
---

HTML files in a folder, `skeleton.css` for the grid, jQuery for the interactions, and a Google Font import at the top of every page. No framework, no build step.

I liked building it that way. It taught me a lot. It also stopped dead on **9 August 2023** and then sat there for three years telling anyone who visited that I was *"almost done studying my Masters degree."*

## What it got right

Worth saying first, because plenty of it survived into the rebuild:

- **The identity was genuinely distinctive.** PP Mondwest — a pixel serif — against a purple and green isometric mark. Most designer portfolios are Inter on white. This one wasn't.
- **It respected `prefers-color-scheme`,** with a matching `theme-color` so mobile browser chrome changed with it. That's a thoughtful detail most hand-rolled sites skip.
- **The show/hide essay pattern** was a good instinct: don't dump ten minutes of reading on someone, let them opt in.

## What it got wrong

The design wasn't the problem. The structure was.

**The writing was invisible.** Two essays — around 4,600 words — lived inside JavaScript string literals, appended to the page with `$("#BodyText").append("…")`. One 6,000-character line each. That meant no search engine could read them, they vanished entirely if JavaScript failed, and editing them meant editing a single unbroken line of code. The best content on the site was the least accessible thing on it.

**The theme was written twice.** `custom.css` ran to 1,119 lines, of which lines 208–444 were the dark theme and 445–707 were the same rules again for light. No CSS custom properties anywhere. Changing one colour meant finding it in two places and hoping you got both.

**Every page shipped 1.3 MB of logo.** The isometric mark was a 10576 × 7813 pixel PNG, displayed at about 34 pixels wide — and there were *two* of them on every page, one hidden by CSS depending on the theme.

**Two things were simply broken.** The skills map on the About page requested `skillSet023.PNG` when the file was `skillSet023.png`; GitHub Pages is case-sensitive, so it had been a broken-image icon for years. And the phone number was `<a href="0449043843">`, which isn't a `tel:` link — it was a relative path that 404'd.

Plus 44 MB of PDFs, jQuery pulled from a CDN to power about forty lines of show/hide, and `animate.css` loaded on every single page and never used once.

## The actual lesson

None of that is why it went stale. It went stale because **updating it was work.** Adding an essay meant hand-writing HTML. Adding a project meant editing two near-identical pages that had drifted apart. Changing a colour meant two edits in two places.

A site you have to fight to update is a site you stop updating. The 2022 version was a nice piece of craft that made its own maintenance expensive, and then quietly charged me three years of being out of date.

That's the thing the rebuild was actually trying to fix.
