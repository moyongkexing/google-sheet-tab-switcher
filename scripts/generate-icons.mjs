import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const outputDir = resolve(process.cwd(), 'public/icons');
const sizes = [16, 32, 48, 128];

const crcTable = new Uint32Array(256).map((_, index) => {
  let value = index;

  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }

  return value >>> 0;
});

const crc32 = (buffer) => {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
};

const chunk = (type, data) => {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  const crc = Buffer.alloc(4);
  const content = Buffer.concat([typeBuffer, data]);

  length.writeUInt32BE(data.length, 0);
  crc.writeUInt32BE(crc32(content), 0);

  return Buffer.concat([length, content, crc]);
};

const png = (width, height, pixels) => {
  const rows = Buffer.alloc((width * 4 + 1) * height);

  for (let y = 0; y < height; y += 1) {
    const rowOffset = y * (width * 4 + 1);
    rows[rowOffset] = 0;
    pixels.copy(rows, rowOffset + 1, y * width * 4, (y + 1) * width * 4);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(rows)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
};

const makeCanvas = (size) => {
  const pixels = Buffer.alloc(size * size * 4);

  const setPixel = (x, y, color) => {
    if (x < 0 || y < 0 || x >= size || y >= size) {
      return;
    }

    const index = (Math.floor(y) * size + Math.floor(x)) * 4;
    pixels[index] = color[0];
    pixels[index + 1] = color[1];
    pixels[index + 2] = color[2];
    pixels[index + 3] = color[3];
  };

  const fillRect = (x, y, width, height, color) => {
    for (let py = Math.floor(y); py < Math.ceil(y + height); py += 1) {
      for (let px = Math.floor(x); px < Math.ceil(x + width); px += 1) {
        setPixel(px, py, color);
      }
    }
  };

  const fillRoundedRect = (x, y, width, height, radius, color) => {
    const right = x + width - 1;
    const bottom = y + height - 1;

    for (let py = Math.floor(y); py <= Math.ceil(bottom); py += 1) {
      for (let px = Math.floor(x); px <= Math.ceil(right); px += 1) {
        const cx = px < x + radius ? x + radius : px > right - radius ? right - radius : px;
        const cy = py < y + radius ? y + radius : py > bottom - radius ? bottom - radius : py;
        const dx = px - cx;
        const dy = py - cy;

        if (dx * dx + dy * dy <= radius * radius + 0.5) {
          setPixel(px, py, color);
        }
      }
    }
  };

  const fillCircle = (x, y, radius, color) => {
    const r2 = radius * radius;

    for (let py = Math.floor(y - radius); py <= Math.ceil(y + radius); py += 1) {
      for (let px = Math.floor(x - radius); px <= Math.ceil(x + radius); px += 1) {
        const dx = px - x;
        const dy = py - y;

        if (dx * dx + dy * dy <= r2) {
          setPixel(px, py, color);
        }
      }
    }
  };

  const drawLine = (x1, y1, x2, y2, width, color) => {
    const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1), 1) * 2;

    for (let step = 0; step <= steps; step += 1) {
      const progress = step / steps;
      fillCircle(x1 + (x2 - x1) * progress, y1 + (y2 - y1) * progress, width / 2, color);
    }
  };

  return { pixels, fillRect, fillRoundedRect, drawLine };
};

const renderIcon = (size) => {
  const scale = size / 128;
  const canvas = makeCanvas(size);
  const s = (value) => value * scale;

  canvas.fillRoundedRect(s(6), s(6), s(116), s(116), s(24), [19, 124, 78, 255]);
  canvas.fillRoundedRect(s(18), s(21), s(26), s(15), s(5), [187, 247, 208, 255]);
  canvas.fillRoundedRect(s(49), s(21), s(26), s(15), s(5), [187, 247, 208, 255]);
  canvas.fillRoundedRect(s(80), s(21), s(30), s(15), s(5), [187, 247, 208, 255]);
  canvas.fillRoundedRect(s(18), s(36), s(92), s(70), s(10), [250, 253, 250, 255]);
  canvas.fillRect(s(29), s(52), s(70), Math.max(1, s(6)), [220, 252, 231, 255]);
  canvas.fillRect(s(29), s(68), s(48), Math.max(1, s(6)), [220, 252, 231, 255]);
  canvas.fillRect(s(29), s(84), s(59), Math.max(1, s(6)), [220, 252, 231, 255]);
  canvas.drawLine(s(42), s(88), s(84), s(54), Math.max(2, s(8)), [16, 185, 129, 255]);
  canvas.drawLine(s(84), s(54), s(83), s(71), Math.max(2, s(8)), [16, 185, 129, 255]);
  canvas.drawLine(s(84), s(54), s(67), s(55), Math.max(2, s(8)), [16, 185, 129, 255]);

  return png(size, size, canvas.pixels);
};

mkdirSync(outputDir, { recursive: true });

for (const size of sizes) {
  const outputPath = resolve(outputDir, `icon${size}.png`);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, renderIcon(size));
  console.log(`Wrote ${outputPath}`);
}
