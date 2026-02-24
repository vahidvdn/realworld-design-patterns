import sharp from "sharp";
import fs from "fs";

async function processImage(inputPath: string) {
  console.log("Processing image without Facade pattern");

  const image = sharp(inputPath);

  // Thumbnail
  console.log("Creating thumbnail...");
  await image
    .resize(200, 200)
    .composite([{ input: "watermark.png", gravity: "southeast" }])
    .webp({ quality: 80 })
    .toFile("output-thumb.webp");

  // Medium
  console.log("Creating medium size...");
  await sharp(inputPath)
    .resize(800)
    .webp({ quality: 85 })
    .toFile("output-medium.webp");

  // Large
  console.log("Creating large size...");
  await sharp(inputPath)
    .resize(1600)
    .jpeg({ quality: 90 })
    .toFile("output-large.jpg");

  console.log("Image processing completed");
}

// Run the example if this file is executed directly
if (require.main === module) {
  processImage("photo.jpg").catch(console.error);
}
