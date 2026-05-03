import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const PUBLIC = new URL("../public/images/", import.meta.url).pathname;

async function compress(src, opts) {
  const before = (await stat(src)).size;
  await sharp(src).png({ quality: opts.quality ?? 80, compressionLevel: 9 }).toFile(src + ".tmp");
  const after = (await stat(src + ".tmp")).size;
  if (after < before) {
    await sharp(src + ".tmp").toFile(src);
    console.log(`  ✓ ${basename(src)}: ${kb(before)} → ${kb(after)} KB`);
  } else {
    console.log(`  – ${basename(src)}: already optimal (${kb(before)} KB), skipped`);
  }
  await import("node:fs").then(({ promises: { unlink } }) => unlink(src + ".tmp").catch(() => {}));
}

function kb(bytes) { return (bytes / 1024).toFixed(0); }

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { await walk(p); continue; }
    if (extname(e.name).toLowerCase() !== ".png") continue;

    const name = e.name.toLowerCase();
    if (name === "avatar.png") {
      await compress(p, { quality: 80 });
    } else if (name.includes("wordmark") || name === "icon.png") {
      await compress(p, { quality: 90 });
    } else {
      await compress(p, { quality: 75 });
    }
  }
}

console.log("Compressing PNG assets...");
await walk(PUBLIC);
console.log("Done.");
