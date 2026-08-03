import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
// Astro 6 deprecated re-exporting `z` from astro:content. Zod is v4 here.
import { z } from "astro/zod";

/**
 * One .md per piece. `flood` is the page's colour — the layout reads it
 * and repaints via a single data attribute, so colour is content rather
 * than stylesheet.
 */
const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    summary: z.string(),
    year: z.number(),
    /** 1-12. Gives the archive real ordering inside a year, not just a bucket. */
    month: z.number().int().min(1).max(12).optional(),
    endYear: z.number().optional(),
    type: z.enum(["essay", "project", "tool", "experiment", "model"]),
    source: z.string(),
    flood: z.enum(["blue", "red", "purple", "green", "tan"]),
    /** Path under /pdf/ — set when a PDF version exists alongside the page. */
    pdf: z.string().optional(),
    /** True when the piece has no native text yet and the PDF is the artefact. */
    pdfOnly: z.boolean().default(false),
    featured: z.boolean().default(false),
    /**
     * Homepage ordering. Lower numbers sit first. Anything without a pin
     * falls in behind the pinned ones, newest first — so the default is
     * chronological and pinning is the deliberate override.
     */
    pinned: z.number().int().optional(),
    draft: z.boolean().default(false),

    /**
     * Internal record of who actually wrote the prose on the page. Not
     * rendered — it exists so the provenance of every piece is explicit
     * rather than remembered, and so new pieces have to declare it.
     *
     *  jason          — Jason's own writing, reproduced. Formatting and
     *                   typo repair only.
     *  ai-from-source — Claude wrote the page prose, working from a source
     *                   document of Jason's (a PDF, a repo, a transcript).
     *  ai-original    — Claude wrote it with no source document behind it.
     */
    authorship: z.enum(["jason", "ai-from-source", "ai-original"]),
    /** Nuance the enum can't carry — which parts are whose. */
    authorshipNote: z.string().optional(),
  }),
});

/**
 * CV data. It lived inline in about.astro, which meant it could only ever
 * render on that one page — the résumé needs the same records, so it moved
 * out to YAML and gets validated here like everything else.
 */
const project = z.object({
  year: z.string(),
  text: z.string(),
  /** Set when the piece has a page in the archive. */
  href: z.string().optional(),
  /** Include on the printed CV, which has a page to fit into. */
  resume: z.boolean().default(false),
  /** Tighter wording for the CV. Falls back to `text`. */
  resumeText: z.string().optional(),
});

const role = z.object({
  years: z.string(),
  role: z.string(),
  note: z.string(),
  /** The role currently held. Draws the ● marker. */
  current: z.boolean().default(false),
  /** Store or site, where it differs from the employer's own location. */
  place: z.string().optional(),
  projects: z.array(project).optional(),
});

const experience = defineCollection({
  loader: file("src/data/experience.yaml"),
  schema: z.object({
    org: z.string(),
    place: z.string(),
    span: z.string(),
    /** Only set where the total time is worth stating on its own. */
    tenure: z.string().optional(),
    roles: z.array(role),
  }),
});

const education = defineCollection({
  loader: file("src/data/education.yaml"),
  schema: z.object({
    years: z.string(),
    award: z.string(),
    place: z.string(),
  }),
});

export const collections = { work, experience, education };
