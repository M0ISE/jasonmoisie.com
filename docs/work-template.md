# Adding a piece

Copy the template below into `src/content/work/your-piece-name.md`.
**The filename becomes the URL** — `sun-stealer.md` → `/work/sun-stealer`. Use
lowercase and hyphens, no spaces, no capitals.

Run `npm run dev` and it appears. If you got the frontmatter wrong the build
fails with the reason — it won't ship broken.

---

## The template

```markdown
---
title: "Piece title"
subtitle: "Optional line under the title"
summary: "One or two sentences. Shows in the archive list, on the homepage card, and as the page's meta description for search and link previews. Write it last."
year: 2026
month: 6
type: project
source: UNSW
flood: blue
pdf: filename.pdf
featured: false
pinned:
authorship: jason
authorshipNote: "Who wrote what, if it needs saying."
draft: true
---

Open cold, in the middle of the thing. No definition, no scene-setting, no
restating the question. The first line should already be doing work.

## Headings are plain speech and usually contain a verb

"Start with an honest audit", "Where it still needed a person", "What actually
changed" — not "Methodology" or "Key Learnings".

**Bold lead-ins instead of sub-headings** inside a section. Keeps a long piece
scannable without chopping it into fragments.

Three or four sentences per paragraph. Longer than that and a bolded lead-in is
missing.
```

---

## Every field

| Field | Required | What it does |
|---|---|---|
| `title` | ✅ | The piece name. Rendered uppercase, so don't shout in the source. |
| `subtitle` | — | Sits under the title in Mondwest. Good for a second thought, not a repeat of the first. |
| `summary` | ✅ | Archive list, homepage card, and meta description. Two sentences max. |
| `year` | ✅ | Which year block it files under. |
| `month` | — | `1`–`12`. Orders the piece *inside* its year and makes the dateline read "Jun 2026" instead of "2026". Leave it out if you genuinely don't know — it sorts to the end of the year. |
| `endYear` | — | For ongoing or multi-year work. The piece files under `endYear`, so ongoing work sits at the top of the archive. |
| `type` | ✅ | `essay` · `project` · `tool` · `experiment` · `model` |
| `source` | ✅ | Where it came from. `UNSW`, `Lush`, `Personal`, or something specific like `UNSW × ACM SIGGRAPH`. |
| `flood` | ✅ | `blue` · `red` · `purple` · `green` · `tan`. The colour the whole page floods when opened. |
| `pdf` | — | Filename only, e.g. `sunStealer.pdf`. **The file must exist in `public/pdf/`.** Adds a button in the header and a download block at the end. |
| `pdfOnly` | — | `true` while the PDF is still the real artefact and the page is only a framing. Aim to never need this. |
| `featured` | — | `true` puts it in the running for the homepage. |
| `pinned` | — | A number. Lower sits first. Only matters if `featured: true`. |
| `authorship` | ✅ | `jason` · `ai-from-source` · `ai-original`. See below. |
| `authorshipNote` | — | Free text for nuance the enum can't hold. |
| `draft` | — | `true` hides it from the build completely. **Start here** while you're writing. |

---

## Picking a flood colour

There are five, and twelve pieces, so repeats are fine. What matters is that
**two pinned pieces sitting next to each other on the homepage don't share
one.** Check `/` after you pin something.

| | Reads as |
|---|---|
| `blue` | research, modelling, data |
| `red` | urgency, health, argument |
| `purple` | abstract, essayistic, art |
| `green` | systems, tools, things that run |
| `tan` | material, earthy, meta |

Green and tan take dark type; blue, red and purple take light. That's handled
for you — you only pick the name.

---

## Authorship

An internal record of who actually wrote the prose. It isn't rendered
anywhere. It exists so provenance is explicit rather than remembered, and so
adding a piece forces the question.

- **`jason`** — your writing, reproduced. Formatting and typo repair only.
  Nobody edits the substance of a `jason` piece to fit a style guide.
- **`ai-from-source`** — Claude wrote the page, working from a document of
  yours: a PDF, a repo, a transcript.
- **`ai-original`** — Claude wrote it with no source document behind it.

---

## Images

**Photographs** get the dither treatment. Put the original in `dither-src/`
— not in `public/`, which is served, and originals have no business shipping.
Add it to the `sources` list in `scripts/dither.mjs`, run
`node scripts/dither.mjs`, then:

```html
<figure>
<div class="dither" role="img" aria-label="Describe what is in the image."
     style="--img: url(/images/dither/your-image.png); aspect-ratio: 1100 / 619;"></div>
<figcaption>A caption that says something the image doesn't.</figcaption>
</figure>
```

The dither is a 1-bit mask painted with the page's own colour, so one file
works on paper, on a flood ground and in dark mode. Aim for **45–60% ink
coverage** — the script prints it. A night scene needs a `lift` above 1 or it
thresholds to a solid slab.

That band is for full-bleed imagery. A photo that is mostly bright — a portrait
against a window, say — will land nearer 30% and should be left there; forcing
it into the band crushes the subject. Judge it by looking at it, not by the
number. `crop` runs before the resize, so its values are in source pixels.

**Diagrams, charts and documents** stay as normal images — dithering destroys
their legibility:

```html
<figure>
<img src="/images/your-folder/chart.png" alt="Describe what it shows." loading="lazy" />
<figcaption>Caption.</figcaption>
</figure>
```

**Several views of one thing** — `<figure class="stack">` with multiple `<img>`
and one `<figcaption>`.

**A set of related images** — `<div class="gallery">` with the images inside.
Five across on desktop, two on mobile, uncropped.

Body text is held to a reading measure; figures are allowed to run wider, so
charts stay readable.

---

## Writing

Full guidance is in Jason's style guide, §5.5 long-form. The short version:

- **Numbers instead of adjectives.** "1.3 MB down to 16 KB" beats "dramatically
  smaller". If an adjective is carrying a claim, a number probably should be.
- **Name the counter-argument before making the claim.** "It's less of a swerve
  than it sounds."
- **Cash out the abstraction in the same breath.** If a line sounds like a
  flourish, show the mechanism immediately underneath. Never leave a
  nice-sounding sentence standing alone.
- **Mistakes are evidence.** State them flatly and use them. No cringing.
- **Close wry, not grand.** End on the line that deflates.
- **Australian English.** Aotearoa, never New Zealand, in your own writing.
- **No exclamation marks.** Em-dashes are load-bearing here and welcome.
- Banned: delve, testament, moreover, tapestry, unlock, foster, synergy,
  leverage, utilise, streamline, robust, seamless.

---

## Before you publish

1. Set `draft: false`.
2. If you wrote "the PDF below", check `pdf:` is actually set.
3. Check `/` if you pinned it — no two adjacent cards sharing a flood colour.
4. `npm run build` passes.
