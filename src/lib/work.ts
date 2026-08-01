import type { CollectionEntry } from "astro:content";

type Piece = CollectionEntry<"work">;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Ongoing work belongs to its most recent year, not the year it started. */
export const shelf = (p: Piece) => p.data.endYear ?? p.data.year;

/** Sort key: year then month, newest first. Undated months sort last in a year. */
const stamp = (p: Piece) => shelf(p) * 100 + (p.data.month ?? 0);

/** Newest first, ties broken alphabetically so the order is stable. */
export const byNewest = (a: Piece, b: Piece) =>
  stamp(b) - stamp(a) || a.data.title.localeCompare(b.data.title);

/**
 * Homepage order: pinned pieces first in their pin order, then everything
 * else newest first. Pinning is the deliberate override; chronological is
 * what happens when nobody pins anything.
 */
export const byPinThenNewest = (a: Piece, b: Piece) => {
  const pa = a.data.pinned ?? Infinity;
  const pb = b.data.pinned ?? Infinity;
  if (pa !== pb) return pa - pb;
  return byNewest(a, b);
};

/** "June 2026", or "2021" when the month isn't known. */
export function dateline(p: Piece) {
  const { year, month, endYear } = p.data;
  const start = month ? `${MONTHS[month - 1]} ${year}` : `${year}`;
  if (!endYear || endYear === year) return start;
  return `${start} – ${endYear}`;
}

/** Short form for dense lists: "Jun 2026". */
export function datelineShort(p: Piece) {
  const { year, month } = p.data;
  return month ? `${MONTHS[month - 1].slice(0, 3)} ${year}` : `${year}`;
}

/**
 * "2021 – present". Never hardcodes either end: the start is the oldest
 * piece in the archive, so adding undergrad work moves it on its own.
 */
export function span(all: Piece[]) {
  const oldest = Math.min(...all.map((p) => p.data.year));
  const newest = Math.max(...all.map(shelf));
  const isCurrent = newest >= new Date().getFullYear();
  return `${oldest} – ${isCurrent ? "present" : newest}`;
}
