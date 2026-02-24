import sharp from "sharp";
import path from "path";

interface ProcessOptions {
  generateThumbnail?: boolean;
  watermark?: boolean;
}

export class ImageProcessingFacade {
  constructor(private readonly watermarkPath: string) {}

  async process(
    inputPath: string,
    outputDir: string,
    options: ProcessOptions = {},
  ) {
    const baseName = path.basename(inputPath, path.extname(inputPath));

    if (options.generateThumbnail) {
      await this.createThumbnail(inputPath, outputDir, baseName);
    }

    await this.createMedium(inputPath, outputDir, baseName);

    if (options.watermark) {
      await this.createLargeWithWatermark(inputPath, outputDir, baseName);
    } else {
      await this.createLarge(inputPath, outputDir, baseName);
    }
  }

  private async createThumbnail(
    input: string,
    outputDir: string,
    name: string,
  ) {
    await sharp(input)
      .resize(200, 200)
      .webp({ quality: 80 })
      .toFile(path.join(outputDir, `${name}-thumb.webp`));
  }

  private async createMedium(input: string, outputDir: string, name: string) {
    await sharp(input)
      .resize(800)
      .webp({ quality: 85 })
      .toFile(path.join(outputDir, `${name}-medium.webp`));
  }

  private async createLarge(input: string, outputDir: string, name: string) {
    await sharp(input)
      .resize(1600)
      .jpeg({ quality: 90 })
      .toFile(path.join(outputDir, `${name}-large.jpg`));
  }

  private async createLargeWithWatermark(
    input: string,
    outputDir: string,
    name: string,
  ) {
    await sharp(input)
      .resize(1600)
      .composite([
        {
          input: this.watermarkPath,
          gravity: "southeast",
        },
      ])
      .jpeg({ quality: 90 })
      .toFile(path.join(outputDir, `${name}-large.jpg`));
  }
}

// Example usage
async function main() {
  console.log("Starting image processing with Facade pattern");

  const imageProcessor = new ImageProcessingFacade("watermark.png");

  console.log("Processing image...");
  await imageProcessor.process("photo.jpg", "./uploads", {
    generateThumbnail: true,
    watermark: true,
  });

  console.log("Image processing completed");
}

main().catch(console.error);
