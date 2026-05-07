const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ASSETS_DIR = path.join(__dirname, "../src/assets");
const QUALITY = 82;

async function convertAll() {
  const files = fs.readdirSync(ASSETS_DIR).filter((f) => f.endsWith(".png"));

  console.log(`Converting ${files.length} PNG files to WebP (quality ${QUALITY})...\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const inputPath = path.join(ASSETS_DIR, file);
    const outputName = file.replace(".png", ".webp");
    const outputPath = path.join(ASSETS_DIR, outputName);

    const before = fs.statSync(inputPath).size;

    await sharp(inputPath)
      .rotate()                              // applique l'orientation EXIF avant conversion
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(outputPath);

    const after = fs.statSync(outputPath).size;
    totalBefore += before;
    totalAfter += after;

    const saving = Math.round((1 - after / before) * 100);
    console.log(
      `  ${outputName}  ${Math.round(before / 1024)} KB → ${Math.round(after / 1024)} KB  (-${saving}%)`
    );
  }

  console.log(`\nTotal: ${Math.round(totalBefore / 1024 / 1024)} MB → ${Math.round(totalAfter / 1024 / 1024)} MB`);
  console.log(`Saved: ${Math.round((1 - totalAfter / totalBefore) * 100)}% (${Math.round((totalBefore - totalAfter) / 1024 / 1024)} MB)`);
}

convertAll().catch(console.error);
