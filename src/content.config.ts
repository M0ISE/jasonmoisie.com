import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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

export const collections = { work };
