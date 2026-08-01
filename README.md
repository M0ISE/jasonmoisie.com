# jasonmoisie.com

The personal site and work archive of Jason Moisiadis — essays, projects and experiments, 2021 onwards.

Built with [Astro](https://astro.build). Static, no client-side JavaScript, deployed to GitHub Pages.

---

## Who this belongs to

I'm Jason (they/he), an experience designer in Sydney.

I turn messy problems into calm, working systems. Right now that's Tech Services
at Lush across Australia and Aotearoa — training, troubleshooting, and building
the tooling that keeps a shop floor running when something breaks.

I got here through immersive and user-centred design: a Master of Visualisation,
Simulation & Immersive Design at UNSW, and a Bachelor of Design Computing at the
University of Sydney before that. It's less of a swerve than it sounds. Working
out what people actually need before you build them something is the same
discipline whether the thing is an immersive experience or a stock system.

This repo is the site itself — an archive of essays, projects and experiments
rather than a portfolio. Some of it is a decade of coursework; some of it is
internal tooling written up at a safe altitude. It's meant to keep growing.

- Site — [jasonmoisie.com](https://jasonmoisie.com)
- LinkedIn — [jasonmoisiadis](https://www.linkedin.com/in/jasonmoisiadis/)
- Photography — [@moisie.jpg](https://www.instagram.com/moisie.jpg/)

---

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # serve the built output
```

Requires Node 22+.

---

## How it's put together

```
src/
  content/work/      one .md per piece — this is the archive
  content.config.ts  the schema every piece is validated against
  layouts/           Base (shell, meta, nav) and Piece (a work page)
  components/        Nav
  pages/             index, about, work index, work/[...slug]
  styles/
    tokens.css       the design system — colour, type scale, spacing
    global.css       fonts, reset, shared utilities
public/
  fonts/  pdf/  images/  brand/  CNAME
scripts/
  dither.mjs         one-off image dithering — run manually, output committed
docs/
  work-template.md   how to add a piece
```

### Adding a piece

Drop a Markdown file into `src/content/work/`. The filename becomes the URL.

**→ [`docs/work-template.md`](docs/work-template.md) is the full guide** — a
copy-paste template, every field explained, how to pick a flood colour, how to
add dithered and undithered imagery, and the writing rules. Start there.

The short version:

```markdown
---
title: "Piece title"
summary: "One or two sentences. Archive list, homepage card, meta description."
year: 2026
month: 6              # optional, 1-12 — orders inside the year
type: project         # essay | project | tool | experiment | model
source: Lush
flood: blue           # blue | red | purple | green | tan
authorship: jason     # jason | ai-from-source | ai-original
draft: true           # start here while writing
---
```

The schema in `src/content.config.ts` is enforced at build time — a typo in
`flood`, a missing `summary` or an unknown `authorship` fails the build rather
than shipping broken.

Two commands:

```bash
npm run dev     # write with live reload
npm run build   # confirm it passes before pushing
```

---

## The design system

**Ink on paper.** Warm off-white ground, warm near-black type, riso grain over
everything. Colour is not decoration — it's the archive index.

Every piece carries a `flood` colour. The work list stays quiet; opening a piece
repaints the entire page in that colour via a single `data-flood` attribute on
`<body>`. Components only ever reference semantic tokens (`--ground`, `--fg`,
`--fg-soft`, `--rule`, `--accent`), never raw palette values — which is what
makes a whole-page repaint a one-attribute change.

| Token | Light | Dark |
|---|---|---|
| `--ground` | `#efe7d7` paper | `#17150f` ink |
| `--fg` | `#1e1b18` | `#efe7d7` |

Floods are self-contained — each carries its own paired foreground, so a flood
page reads identically in light and dark mode.

**Type.** Pixel belongs to the interface, print belongs to the content:
PP Mondwest for nav, labels, captions and the homepage hero; PP Neue Montreal
for everything else.

Both faces are licensed from [Pangram Pangram](https://pangrampangram.com)
and self-hosted in `public/fonts/`.

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages. `public/CNAME` keeps the custom domain
attached.

Set **Settings → Pages → Source** to **GitHub Actions** for this to work.

---

## Licence

Code is [CC0](LICENSE). The writing, images and fonts are not — please don't
reuse those.
