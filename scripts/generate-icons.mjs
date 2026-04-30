import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const sourcePath = resolve(process.cwd(), 'docs/assets/chrome-web-store-icon-e-source.png');
const outputDir = resolve(process.cwd(), 'public/icons');
const sizes = [16, 32, 48, 128];

if (!existsSync(sourcePath)) {
  console.error(`Icon source not found: ${sourcePath}`);
  process.exit(1);
}

const sipsCheck = spawnSync('sips', ['--version'], { encoding: 'utf8' });

if (sipsCheck.error || sipsCheck.status !== 0) {
  console.error('The icons:generate script requires the macOS sips command.');
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

for (const size of sizes) {
  const outputPath = resolve(outputDir, `icon${size}.png`);
  mkdirSync(dirname(outputPath), { recursive: true });

  const result = spawnSync(
    'sips',
    ['-z', String(size), String(size), sourcePath, '--out', outputPath],
    {
      encoding: 'utf8',
      stdio: 'pipe',
    },
  );

  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }

  console.log(`Wrote ${outputPath}`);
}
