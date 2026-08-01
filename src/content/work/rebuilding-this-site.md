---
title: "Rebuilding this site"
subtitle: "Designing with an AI, out loud"
summary: "Three years stale, rebuilt in an afternoon of conversation. What AI co-design was actually good at, and where it still needed someone with taste in the room."
year: 2026
type: project
source: Personal
flood: red
featured: true
---

[The old site](/work/the-old-site) had been frozen since August 2023. I knew roughly what was wrong with it. I did not have a spare fortnight to fix it.

So I rebuilt it as a conversation — working through the audit, the plan, the design direction and the code with Claude, in one long back-and-forth. This is a note on how that actually went, written on the site it produced.

## Start with an honest audit

The first useful thing was not code. It was being told, plainly, that the problem wasn't the design.

The site *looked* fine. What it actually said was "student, almost finished, 2023." Every project was coursework. The footer said 2023. Three years of professional work existed and none of it was here. No amount of restyling fixes that, and it would have been easy to spend the whole effort on a new colour palette and ship something just as stale.

It also surfaced things I'd stopped seeing:

- The About page's skills map had been a **broken image for years** — a `.PNG` / `.png` mismatch that only breaks on case-sensitive servers.
- The phone number wasn't a `tel:` link, so it 404'd.
- Every page was shipping **1.3 MB of logo** to draw a 34-pixel mark.
- My résumé had a **typo in my own email address** — `jason.mosie@` instead of `jason.moisie@`. That one wasn't even the website. Replies had been bouncing.

## Where the collaboration was strongest

**Naming a contradiction I hadn't noticed.** I sent five reference sites and three reference images. I was told that four of the five sites are essentially monochrome — Crumpler, the one I like most, is pure black on white in a single typeface, with all its colour coming from photography — while every image I'd sent was loud, flat colour.

That was true and I hadn't clocked it. The resolution wasn't to split the difference; it was to work out *where* the colour lives. Which became the system this site runs on: the archive index stays quiet, and opening a piece floods the entire page in that piece's colour. One loud moment, spent deliberately.

**Turning a design idea into an architecture.** "Colour is the index" sounds like a visual flourish. In practice it meant every piece carries a `flood` value in its frontmatter, the layout repaints from a single attribute, and every component reads semantic tokens rather than raw colours. Colour became *content*. That's the kind of translation that's tedious to do by hand and fast in conversation.

**Freeing the essays.** The 4,600 words trapped in JavaScript string literals came out, got their paragraph breaks back, and had the missing spaces the original string concatenation had eaten — `pathwayand`, `aboutnothing` — repaired. Then the twelve model graphs from the PrEP paper were matched back to the discussion sections they belonged to. Mechanical, exacting, and the sort of thing I would have kept putting off.

## Where it still needed a person

Plenty.

**Taste is not delegable.** Every real decision here was mine: paper over charcoal, the ∆ that runs through the flood colours on hover, "The Human" instead of "About Me", cutting the greeting from the hero. What I got back were options and consequences. The choosing was the job.

**It gets things wrong, confidently.** A folder called `untitled folder` got deleted as junk — it held the complete PP Neue Montreal family, eight weights and italics. Recovered from git, but a good reminder that "obviously disposable" is a judgement, and judgements can be wrong.

**Facts need checking against reality.** My LinkedIn and my résumé disagreed on the name of my Masters and on a job title. Neither of them recorded that the last year has been in Tech Services rather than store operations. No amount of reading the documents would have caught that — I had to say it.

**Knowing what not to publish.** B.O.T is internal tooling. The case study on it names no systems, no codes, no escalation paths, no knowledge base content — because I said so, and because when asked what was sensitive I was specific about it. That boundary was mine to draw.

## What actually changed

The site now ships **zero client-side JavaScript**. jQuery, animate.css and three Google font families are gone. The theme is one token block instead of five hundred duplicated lines. The logo is 16 KB instead of 1.3 MB. Adding a piece means dropping a Markdown file into a folder, and a typo in its metadata fails the build instead of shipping broken.

That last one matters most. The old site went stale because updating it was work. This one is designed so that keeping it current is the path of least resistance — which is the only maintenance strategy I actually trust myself with.

---

*Written in 2026. If it's badly out of date by the time you read this, the joke is on me and the point still stands.*
