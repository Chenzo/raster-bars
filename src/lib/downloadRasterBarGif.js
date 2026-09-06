import { GIFEncoder, quantize, applyPalette } from "gifenc";

function buildPatternBuffer(colorArray, stretchFactor, interlace) {
  const buffer = [];

  colorArray.forEach((color, index) => {
    for (let i = 0; i < stretchFactor; i++) {
      buffer.push(color);
    }
    if (interlace && index < colorArray.length - 1) {
      buffer.push("#000");
    }
  });

  return buffer;
}

export function downloadRasterBarGif({
  colorArray,
  stretchFactor,
  interlace,
  width,
  speed,
  sizeMultiplier = 1,
  filename = "raster-bar.gif",
}) {
  const pattern = buildPatternBuffer(colorArray, stretchFactor, interlace);
  const cycleLength = pattern.length;
  const height = Math.round(cycleLength * sizeMultiplier);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  const gif = GIFEncoder();
  const delay = Math.max(20, Math.round(speed * (1000 / 60)));
  let palette;

  for (let frame = 0; frame < cycleLength; frame++) {
    for (let y = 0; y < height; y++) {
      ctx.fillStyle = pattern[(frame + y) % cycleLength];
      ctx.fillRect(0, y, width, 1);
    }

    const { data } = ctx.getImageData(0, 0, width, height);

    if (!palette) {
      palette = quantize(data, 64);
    }

    const index = applyPalette(data, palette);
    gif.writeFrame(index, width, height, {
      palette,
      delay,
      repeat: frame === 0 ? 0 : undefined,
    });
  }

  gif.finish();

  const blob = new Blob([gif.bytes()], { type: "image/gif" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
