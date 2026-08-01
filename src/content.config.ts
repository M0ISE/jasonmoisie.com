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
    endYear: z.number().optional(),
    type: z.enum(["essay", "project", "tool", "experiment", "model"]),
    source: z.string(),
    flood: z.enum(["blue", "red", "purple", "green", "tan"]),
    /** Path under /pdf/ — set when a PDF version exists alongside the page. */
    pdf: z.string().optional(),
    /** True when the piece has no native text yet and the PDF is the artefact. */
    pdfOnly: z.boolean().default(false),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work };
