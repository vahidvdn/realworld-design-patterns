import { ImageProcessingFacade } from "./facade-pattern";
import path from "path";

// Mock sharp module
jest.mock("sharp", () => {
  // Create mock functions
  const sharpMock = jest.fn();

  // Define the chain methods
  const chainMethods = {
    resize: jest.fn().mockReturnThis(),
    webp: jest.fn().mockReturnThis(),
    jpeg: jest.fn().mockReturnThis(),
    composite: jest.fn().mockReturnThis(),
    toFile: jest.fn().mockResolvedValue(undefined),
  };

  // Make sharp return the chain methods
  sharpMock.mockReturnValue(chainMethods);

  // Add the chain methods to the mock for testing
  Object.assign(sharpMock, {
    __chainMethods: chainMethods,
  });

  return sharpMock;
});

// Import the mocked module
import sharp from "sharp";

describe("ImageProcessingFacade", () => {
  let facade: ImageProcessingFacade;

  beforeEach(() => {
    jest.clearAllMocks();
    facade = new ImageProcessingFacade("watermark.png");
  });

  it("should process an image with all options enabled", async () => {
    jest.clearAllMocks();

    await facade.process("input.jpg", "./output", {
      generateThumbnail: true,
      watermark: true,
    });

    expect(sharp).toHaveBeenCalledTimes(3);

    expect((sharp as any).__chainMethods.composite).toHaveBeenCalledTimes(1);
  });

  it("should process an image without thumbnail", async () => {
    jest.clearAllMocks();

    await facade.process("input.jpg", "./output", {
      generateThumbnail: false,
      watermark: true,
    });

    expect(sharp).toHaveBeenCalledTimes(2);
  });

  it("should process an image without watermark", async () => {
    jest.clearAllMocks();

    await facade.process("input.jpg", "./output", {
      generateThumbnail: true,
      watermark: false,
    });

    expect(sharp).toHaveBeenCalledTimes(3);
  });

  it("should process an image with default options", async () => {
    jest.clearAllMocks();

    await facade.process("input.jpg", "./output");

    expect(sharp).toHaveBeenCalledTimes(2);
  });
});
