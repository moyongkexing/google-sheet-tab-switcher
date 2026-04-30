import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readJson = (path) => JSON.parse(readFileSync(resolve(process.cwd(), path), 'utf8'));

const packageJson = readJson('package.json');
const scriptsContract = readJson('config/package-scripts.json').scripts;
const actualScripts = packageJson.scripts ?? {};
const expectedNames = Object.keys(scriptsContract);
const actualNames = Object.keys(actualScripts);
const errors = [];

const formatList = (items) => items.map((item) => `  - ${item}`).join('\n');

const extraScripts = actualNames.filter((name) => !expectedNames.includes(name));
const missingScripts = expectedNames.filter((name) => !actualNames.includes(name));

if (extraScripts.length > 0) {
  errors.push(
    [
      'package.json contains unapproved scripts.',
      'Add scripts only when they represent a real project operation, and document them in config/package-scripts.json.',
      formatList(extraScripts),
    ].join('\n'),
  );
}

if (missingScripts.length > 0) {
  errors.push(
    [
      'package.json is missing approved operational scripts from config/package-scripts.json.',
      formatList(missingScripts),
    ].join('\n'),
  );
}

for (const name of expectedNames) {
  const expected = scriptsContract[name];

  if (!expected.purpose || expected.purpose.trim().length < 20) {
    errors.push(`config/package-scripts.json script "${name}" needs a concrete purpose.`);
  }

  if (actualScripts[name] && actualScripts[name] !== expected.command) {
    errors.push(
      [
        `package.json script "${name}" does not match config/package-scripts.json.`,
        `Expected: ${expected.command}`,
        `Actual:   ${actualScripts[name]}`,
      ].join('\n'),
    );
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n\n'));
  process.exit(1);
}

console.log('Package scripts match config/package-scripts.json.');
