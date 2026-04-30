# Contributing

Thanks for considering a contribution to Google Sheet Tab Switcher.

## Project Scope

This extension has one purpose: quickly search and switch tabs inside Google Sheets.

Keep contributions inside that scope. Features such as analytics, ads, account systems, cloud sync, unrelated Google Sheets automation, or broad browser permissions should be proposed in an issue before implementation.

## Development

```sh
pnpm install
pnpm run check
pnpm run build
```

Load the generated `.output/chrome-mv3/` directory from `chrome://extensions` with developer mode enabled.

## Package Scripts

Do not add `package.json` scripts casually.

The scripts list is treated as an operations map for the project. If a new script is genuinely needed, update both `package.json` and `config/package-scripts.json` with the exact command and a concrete purpose. `pnpm run check` enforces this.

## Pull Requests

Before opening a pull request:

- Run `pnpm run check`.
- Run `pnpm run build` if the change can affect extension output.
- Explain user-facing behavior changes.
- Mention any manifest permission changes explicitly.

## Chrome Extension Constraints

- Keep permissions minimal.
- Do not execute remotely hosted code.
- Do not add data collection without updating the privacy documentation and Chrome Web Store disclosures.
- Keep localized extension metadata in `public/_locales`.
