# Google Sheet Tab Switcher

Google Sheet Tab Switcher is a Chrome extension for quickly searching and switching tabs inside Google Sheets.

## Features

- Runs only on `https://docs.google.com/spreadsheets/*`.
- Opens a sheet switcher with `Cmd/Ctrl + Shift + F`.
- Filters visible sheet tab names as you type.
- Switches to the selected sheet tab locally in the browser.
- Does not use analytics, ads, tracking, external APIs, or remote code.

## Install For Development

```sh
pnpm install
pnpm run build
```

Load the generated `.output/chrome-mv3/` directory from `chrome://extensions` with developer mode enabled.

## Development

This project uses pnpm and WXT for Chrome extension development. Vite+ is used only for formatting, linting, and type checks.

```sh
pnpm install
pnpm run dev
pnpm run check
pnpm run build
pnpm run zip
```

`pnpm run check` validates package scripts, formatting, linting, and type checks. `pnpm check --fix` applies formatter and linter fixes where possible. `pnpm run zip` creates the Chrome Web Store upload archive through WXT.

## Package Scripts Policy

`package.json` scripts are treated as the operational map of this project.

Do not add scripts casually. If a new script is genuinely needed, update both `package.json` and `config/package-scripts.json` with the exact command and a concrete purpose. `pnpm run check` enforces this.

## Privacy

The extension reads visible Google Sheets tab labels locally so it can show a tab switcher. It does not collect, store, sell, or transmit user data.

See `docs/privacy.md` for the full privacy policy.

## Chrome Web Store Release

See `docs/release.md` for the release checklist and `docs/store-listing.md` for store listing draft text.

## Support

Use GitHub issues for support requests, bug reports, and feature proposals. For security-sensitive reports, follow `SECURITY.md`.

## npm Publishing

This project is distributed as a Chrome extension, not as an npm package. `private: true` is kept in `package.json` to prevent accidental npm publication.

## License

MIT
