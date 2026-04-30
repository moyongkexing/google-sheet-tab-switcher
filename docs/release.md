# Chrome Web Store Release Checklist

This project is intended to stay compatible with a future global Chrome Web Store release.

## Product Scope

Single purpose:

> Quickly search and switch tabs inside Google Sheets.

Do not add unrelated Google Sheets automation, analytics, ads, or account features to this extension. Separate products should be separate extensions.

## Manifest Readiness

- Manifest V3 is used.
- Extension metadata is localized through `public/_locales`.
- PNG icons are declared for 16, 32, 48, and 128 pixel surfaces.
- Host access is limited to `https://docs.google.com/spreadsheets/*`.
- Requested permissions should stay minimal. Re-check every permission before publishing.

## Privacy Positioning

Current expected privacy claim:

- The extension reads tab labels from the active Google Sheets page.
- The extension does not transmit sheet names or document content to an external server.
- The extension does not execute remotely hosted code.
- If analytics or sync is ever added, revisit the privacy policy and Chrome Web Store privacy disclosures before release.

## Store Listing Assets

Prepare before submission:

- Store summary and full description in English. Use `docs/store-listing.md` as the draft source.
- At least one screenshot of the extension in use. Use `docs/assets/chrome-web-store-screenshot-1280x800.png` as the initial asset.
- Privacy policy URL. Use `https://moyongkexing.github.io/google-sheet-tab-switcher/privacy/` after GitHub Pages is enabled.
- Support URL. Use `https://moyongkexing.github.io/google-sheet-tab-switcher/support/` after GitHub Pages is enabled.
- Clear review instructions: open a Google Sheets spreadsheet, then press `Cmd+Shift+F` on macOS or `Ctrl+Shift+F` on Windows/Linux.

## GitHub Pages

The `Pages` workflow publishes the `docs/` directory as the public project site.

Before using the URLs in the Chrome Web Store Developer Dashboard:

- Publish this repository to GitHub under `moyongkexing/google-sheet-tab-switcher`.
- In repository settings, set Pages to use GitHub Actions.
- Push to `main` and confirm the `Pages` workflow succeeds.

## Build And Package

```sh
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
pnpm run zip
```

Upload the WXT-generated ZIP from `.output/` to the Chrome Developer Dashboard.

`pnpm run check` is also the guard against casual package script additions. If a new operational script is truly needed, update both `package.json` and `config/package-scripts.json` with a concrete purpose.

## Icons

Regenerate extension icons after changing icon artwork:

```sh
pnpm run icons:generate
```

The generated files are written to `public/icons/` and copied into WXT's `.output/` directory during build.
