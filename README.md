# jasonmoisie.com

The personal site and work archive of Jason Moisiadis — essays, projects and experiments, 2021 onwards.

Built with [Astro](https://astro.build). Static, no client-side JavaScript, deployed to GitHub Pages.

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
legacy/              the pre-2026 hand-written site, kept for reference
```

### Adding a piece

Drop a Markdown file into `src/content/work/`. The filename becomes the URL.

```markdown
---
title: "Piece title"
subtitle: "Optional line under the title"
summary: "One or two sentences. Shown in the archive list and used as the meta description."
year: 2026
endYear: 2026        # optional, for ongoing work
type: essay          # essay | project | tool | experiment | model
source: UNSW         # where it came from
flood: blue          # blue | red | purple | green | tan
pdf: filename.pdf    # optional, must exist in public/pdf/
pdfOnly: false       # true while the PDF is still the real artefact
featured: false      # surfaces it on the homepage
draft: false         # true hides it from the build entirely
---

Body copy in Markdown.
```

The schema in `src/content.config.ts` is enforced at build time — a typo in
`flood` or a missing `summary` fails the build rather than shipping broken.

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
