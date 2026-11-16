// Makes the 1200×630 JPEG share images (the picture WhatsApp, Facebook and X show for a link):
//   public/og/default.jpg           the site-wide image
//   public/og/cars/<car id>.jpg     each car photo on the page background
//   public/og/blog/<slug>.jpg       each journal post's photo
// Run `npm run og` after adding a car or a post. Reads ids and images from lib/cars.ts and lib/blogs.ts.

import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const pub = (p) => path.join(root, "public", p);
const W = 1200;
const H = 630;
const PAPER = "#efebe4"; // the site's page background (themeColor in app/layout.tsx)

// Pulls { id|slug, image } pairs out of a data file without importing TypeScript.
async function pairs(file, key) {
  const src = await readFile(path.join(root, file), "utf8");
  const re = new RegExp(`${key}: "([^"]+)"[\\s\\S]*?image: "([^"]+)"`, "g");
  if (key === "slug") {
    // In lib/blogs.ts the image comes before the slug.
    return [...src.matchAll(/image: "([^"]+)"[\s\S]*?slug: "([^"]+)"/g)].map((m) => ({ key: m[2], image: m[1] }));
  }
  return [...src.matchAll(re)].map((m) => ({ key: m[1], image: m[2] }));
}

async function cover(input, out) {
  await sharp(input).resize(W, H, { fit: "cover", position: "attention" }).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
}

async function onPaper(input, out) {
  const car = await sharp(input).resize(Math.round(W * 0.82), Math.round(H * 0.82), { fit: "inside" }).toBuffer();
  await sharp({ create: { width: W, height: H, channels: 3, background: PAPER } })
    .composite([{ input: car, gravity: "center" }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
}

async function main() {
  await mkdir(pub("og/cars"), { recursive: true });
  await mkdir(pub("og/blog"), { recursive: true });

  // Default: the village-road photo with the light badge logo in the middle.
  const logo = await sharp(pub("brand/logo-full-light.svg"), { density: 300 }).resize({ height: 360 }).png().toBuffer();
  const road = await sharp(pub("images/design/village-road.webp")).resize(W, H, { fit: "cover" }).modulate({ brightness: 0.8 }).toBuffer();
  await sharp(road).composite([{ input: logo, gravity: "center" }]).jpeg({ quality: 82, mozjpeg: true }).toFile(pub("og/default.jpg"));

  const cars = await pairs("lib/cars.ts", "id");
  for (const c of cars) await onPaper(pub(c.image), pub(`og/cars/${c.key}.jpg`));

  const posts = await pairs("lib/blogs.ts", "slug");
  for (const p of posts) await cover(pub(p.image), pub(`og/blog/${p.key}.jpg`));

  console.log(`og: default + ${cars.length} cars + ${posts.length} posts`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
