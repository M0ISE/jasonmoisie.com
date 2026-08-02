---
title: "Rebuilding this site"
subtitle: "Designing with an AI, out loud"
summary: "Three years stale, rebuilt in one long conversation. What AI co-design was actually good at, where it was confidently wrong, and the thing I had to build so I could tell the difference."
year: 2026
month: 8
type: project
source: Personal
flood: tan
featured: true
pinned: 4
authorship: ai-original
authorshipNote: "Written by Claude in Jason's first person, about working with Claude — which is exactly the conflict of interest the piece is about. Jason's own reflection still to be added at the end."
---

[The old site](/work/the-old-site) had been frozen since August 2023. I knew roughly what was wrong with it. I did not have a spare fortnight to fix it.

So I rebuilt it as a conversation — the audit, the plan, the design direction and the code, worked through with Claude in one long back-and-forth. This is a note on how that actually went, written on the site it produced.

Which is the obvious problem with it. A piece about AI collaboration, drafted by the AI, published under my name. Hold that thought; it turns out to be the most interesting part.

## Start with an honest audit

The first useful thing was not code. It was being told, plainly, that the problem wasn't the design.

The site *looked* fine. What it actually said was "student, almost finished, 2023." Every project was coursework. The footer said 2023. Three years of professional work existed and none of it was here. It would have been easy to spend the whole effort on a new colour palette and ship something just as stale.

It also surfaced things I'd stopped seeing:

- The About page's skills map had been a **broken image for years** — a `.PNG` / `.png` mismatch that only breaks on case-sensitive servers, which is exactly what GitHub Pages is.
- The phone number wasn't a `tel:` link, so it 404'd.
- Every page shipped **1.3 MB of logo** to draw a 34-pixel mark — a 10576 × 7813 PNG, twice over, one hidden by CSS.
- My résumé had a **typo in my own email address**, `jason.mosie@` instead of `jason.moisie@`. That one wasn't even the website. Replies had been bouncing.

## Where the collaboration was strongest

**Naming a contradiction I hadn't noticed.** I sent five reference sites and three reference images. I was told that four of the five sites are essentially monochrome — Crumpler, the one I like most, is pure black on white in a single typeface, with every scrap of colour coming from photography — while every image I'd sent was loud, flat colour.

That was true and I hadn't clocked it. The resolution wasn't to split the difference; it was to work out *where* the colour lives. Which became the system this site runs on: the archive index stays quiet, and opening a piece floods the whole page in that piece's colour. One loud moment, spent deliberately.

**Turning a design idea into an architecture.** "Colour is the index" sounds like a flourish. In practice it meant every piece carries a `flood` value in its frontmatter, the layout repaints from a single attribute, and every component reads semantic tokens rather than raw colours. Colour became *content*. That translation is tedious by hand and fast in conversation.

**Recovering things I thought were gone.** The two best essays had their full text trapped inside JavaScript string literals — 4,600 words appended with `$("#BodyText").append("…")`, invisible to search, gone if JS failed. They came out, got their paragraph breaks back, and had the missing spaces the original concatenation had eaten repaired: `pathwayand`, `aboutnothing`.

Then the same trick on something harder. My SIGGRAPH paper looked like it existed only as pixels — a screenshot of two pages sitting on slide 14 of a presentation, no source file I could find. Cropping into the original at full resolution and upscaling made it legible enough to read back into text, reference list and all.

The actual PDF turned up later the same day, in an iCloud folder I hadn't thought to check. That accident is the only real audit of the technique I'm ever likely to get, so I ran the comparison: **95% of roughly 1,500 words matched**, no misread words, no invented sentences, and all nine DOIs correct. Reading a paper off its own pixels works better than it has any right to.

Two of the differences weren't whitespace, and they both went the same way — the transcription was *tidier* than the paper. A broken DOI prefix quietly repaired. A duplicated journal abbreviation quietly collapsed. Both corrections are almost certainly what my team meant to write in 2023. Both were still wrong to make without saying so, because a transcription that improves its source is no longer a transcription. They're marked `[sic]` now.

## Where it still needed a person

Plenty.

**Taste is not delegable.** Every real decision here was mine: paper over charcoal, the ■ that runs the flood colours on hover, ΗΟΜΕ in Greek because that's my background, "The Human" instead of "About Me", cutting the greeting from the hero. What I got back were options and consequences. The choosing was the job.

**It gets things wrong, confidently.** A folder called `untitled folder` got deleted as junk. It held the complete PP Neue Montreal family, eight weights and italics. Recovered from git — but "obviously disposable" is a judgement, and judgements can be wrong.

**It overclaims in your favour, which is worse.** This piece originally described the SIGGRAPH paper as peer-reviewed, and called it my only peer-reviewed publication. It isn't. We took it through the full submission process and it wasn't accepted. Nobody lied; a gap got filled with the flattering version, and the flattering version sat on my portfolio under my name until I caught it.

That failure mode is quieter than deleting a font folder and considerably more dangerous. A broken build tells you it's broken. An inflated credential just sits there looking correct.

**Facts need checking against reality.** My LinkedIn and my résumé disagreed on the name of my Masters and on a job title. Neither recorded that the last year has been in Tech Services rather than store operations. No amount of reading the documents would have caught that. I had to say it.

**Knowing what not to publish.** [B.O.T](/work/bot-ai-chat-helper) is internal tooling. Its case study names no systems, no codes, no escalation paths, no knowledge base content — because I drew that line and was specific about where it sat.

## Build the thing that tells you who wrote what

Partway through, I gave Claude a guide to writing in my voice. Sensible enough: the pages were starting to sound like a competent stranger.

It immediately created a problem. A style guide about how the machine should write, pointed at an archive where some pages are the machine's prose and some are mine from 2021, is a licence to quietly edit my own essays until they match a rule I wrote last week.

So every piece now carries an `authorship` field. Three values — `jason`, `ai-from-source`, `ai-original` — plus a note for the nuance the enum can't hold. It isn't rendered anywhere. It exists so provenance is explicit rather than remembered, and so adding a piece forces the question.

It earned its place within the hour. The guide bans the word "leverage". The audit found "leverage" in my HIV essay, where it's my own 2023 wording. It stayed. Without the tag I'd have shipped a silent edit to my own writing to satisfy a rule about somebody else's.

The same check flagged two false positives worth keeping: `prefers-color-scheme` is a CSS property, and *AIDS and Behavior* is a journal title. Neither is an Americanism to correct.

**That's the piece of infrastructure I'd tell anyone else to build first.** Not prompts, not a style guide. A record of who wrote what, kept next to the thing it describes.

## What actually changed

The site ships **zero client-side JavaScript**. jQuery, animate.css and three Google font families are gone. The theme is one token block instead of five hundred duplicated lines. The logo is 16 KB instead of 1.3 MB. Five megabytes of orphaned imagery became 96 KB of dithered masks that take their colour from whatever page they land on.

Thirteen pieces, all with real text — none of them a PDF link pretending to be a page. Adding another means dropping a Markdown file in a folder, and a typo in its metadata fails the build instead of shipping broken.

That last one matters most. The old site went stale because updating it was work. This one is built so keeping it current is the path of least resistance, which is the only maintenance strategy I actually trust myself with.

The repo used to be called `022_PPS` — Personal Project 2022. It's `jasonmoisie.com` now. Naming a thing after the year you started it guarantees it will look abandoned eventually. It did.

---

## My reflection

*To come. Everything above this line was drafted by Claude from what happened in the session, then checked and corrected by me. This part won't be.*
