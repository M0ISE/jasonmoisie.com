/**
 * Ordered-dither generator.
 *
 * Turns a photo into a 1-bit Bayer-dithered alpha mask: dark pixels become
 * opaque, light pixels transparent. The page then paints it with currentColor,
 * so a dithered image renders in ink on paper, in paper on a flood ground, and
 * in paper again in dark mode — without shipping three copies.
 *
 * Run manually when adding an image; the output is committed.
 *   node scripts/dither.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const OUT = "public/images/dither";
const WIDTH = 1100;

// 8x8 Bayer matrix — finer grain than 4x4, which matters at photo size.
const N = 8;
const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

/**
 * `lift` corrects exposure before thresholding. A night scene dithers to a
 * near-solid slab otherwise; aim for roughly 45–60% ink coverage, which is
 * where the texture actually reads.
 */
const sources = [
  { in: "dither-src/heavens.png", out: "heavens.png", lift: 1.55 },
  { in: "dither-src/her.png", out: "her.png", lift: 1 },
  { in: "dither-src/majorProject.jpeg", out: "major-project.png", lift: 1 },
  /**
   * Sidebar portrait, full frame — the window wall is most of what makes the
   * shot, so cropping to the face threw the picture away. Rendered at 580px
   * for a ~290px column: 2x, so it lands 1:1 on a retina screen and halves
   * cleanly elsewhere. Scaling a 1-bit mask by a non-integer ratio turns the
   * grain to mud.
   *
   * Lands at ~33% ink, under the 45-60 band above. That band is for
   * full-bleed article imagery; this is a backlit portrait against blown-out
   * glass and belongs lighter. Pushing it into the band crushes the face.
   */
  { in: "dither-src/me-met.jpg", out: "me.png", lift: 1.1, width: 580, dark: true },
];

await mkdir(OUT, { recursive: true });

for (const src of sources) {
  let img = sharp(src.in);
  if (src.crop) img = img.extract(src.crop);
  img = img.resize({ width: src.width ?? WIDTH }).greyscale().normalise();
  if (src.lift !== 1) img = img.modulate({ brightness: src.lift });

  const { data, info } = await img
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const rgba = Buffer.alloc(width * height * 4);
  // The mask is opaque where the photo is dark, and gets painted with
  // currentColor — which flips to paper in dark mode, turning a portrait into
  // a negative. `dark` emits the companion mask, opaque where the photo is
  // light, so the page can swap it under prefers-color-scheme and keep the
  // image positive both ways. Alpha is baked in; no filter can undo it.
  const rgbaDark = src.dark ? Buffer.alloc(width * height * 4) : null;
  let ink = 0;
  let inkDark = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const lum = data[(y * width + x) * channels] / 255;
      // +0.5 centres the threshold so mid-grey dithers ~50/50
      const threshold = (BAYER[y % N][x % N] + 0.5) / (N * N);
      const on = lum < threshold; // dark pixel -> ink
      if (on) ink++;
      const o = (y * width + x) * 4;
      rgba[o] = 0;
      rgba[o + 1] = 0;
      rgba[o + 2] = 0;
      rgba[o + 3] = on ? 255 : 0;

      if (rgbaDark) {
        // Dither the negative, rather than bitwise-flipping the mask above —
        // that would invert the dot pattern too and lose the grain.
        const onDark = 1 - lum < threshold;
        if (onDark) inkDark++;
        rgbaDark[o + 3] = onDark ? 255 : 0;
      }
    }
  }

  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9, palette: true })
    .toFile(`${OUT}/${src.out}`);

  if (rgbaDark) {
    const darkOut = src.out.replace(/\.png$/, "-dark.png");
    await sharp(rgbaDark, { raw: { width, height, channels: 4 } })
      .png({ compressionLevel: 9, palette: true })
      .toFile(`${OUT}/${darkOut}`);
  }

  // Coverage is the number to tune `lift` against — see the note above.
  const coverage = ((ink / (width * height)) * 100).toFixed(1);
  const flag = coverage >= 45 && coverage <= 60 ? "" : "  <- outside 45-60";
  const darkNote = rgbaDark
    ? `  + dark ${((inkDark / (width * height)) * 100).toFixed(1)}%`
    : "";
  console.log(
    `  ${src.out.padEnd(18)} ${width}x${height}  ink ${coverage}%${flag}${darkNote}`,
  );
}
