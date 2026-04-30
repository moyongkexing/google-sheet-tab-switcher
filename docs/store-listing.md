---
layout: default
title: Chrome Web Store Listing Draft
permalink: /store-listing/
---

# Chrome Web Store Listing Draft

Use this file as the source text for the Chrome Web Store Developer Dashboard.

## Public URLs

Use these after GitHub Pages is enabled for this repository:

- Privacy policy: `https://moyongkexing.github.io/google-sheet-tab-switcher/privacy/`
- Support: `https://moyongkexing.github.io/google-sheet-tab-switcher/support/`

## Summary

Quickly search and switch tabs in Google Sheets with a keyboard shortcut.

## Full Description

Google Sheet Tab Switcher helps you move between tabs in large Google Sheets files.

Press `Cmd+Shift+F` on macOS or `Ctrl+Shift+F` on Windows and Linux, type part of a sheet tab name, then choose the tab you want to open.

The extension is intentionally narrow:

- It only runs on Google Sheets spreadsheet pages.
- It reads visible sheet tab labels from the page interface.
- It does not transmit sheet names or spreadsheet content to any server.
- It does not use analytics, ads, tracking, external APIs, or remote code.

## Single Purpose

Quickly search and switch visible sheet tabs inside Google Sheets.

## Permission Justification

### Host access: `https://docs.google.com/spreadsheets/*`

Required to run the content script on Google Sheets spreadsheet pages. The extension uses this access to read visible sheet tab labels and switch to the selected tab.

## Remote Code Declaration

No. The extension does not execute remotely hosted code.

## Data Usage Disclosure

The extension does not collect, store, sell, or transmit user data.

It reads visible sheet tab labels locally in the browser only to provide the tab-switching interface.

## Review Instructions

1. Open a Google Sheets spreadsheet with multiple sheet tabs.
2. Press `Cmd+Shift+F` on macOS or `Ctrl+Shift+F` on Windows/Linux.
3. Type part of a sheet tab name.
4. Select a result to switch to that sheet tab.

## Screenshot Plan

Prepare at least one screenshot before submission:

- Size: `1280x800` preferred, or `640x400`.
- Content: a Google Sheets file with multiple non-sensitive sheet tabs and the tab switcher open.
- Avoid private spreadsheet names, personal data, customer data, or internal company data.

Prepared asset:

- Store icon: `public/icons/icon128.png`
- Store icon source: `docs/assets/chrome-web-store-icon-e-source.png`
- `docs/assets/chrome-web-store-screenshot-1280x800.png`
- Source: `docs/assets/chrome-web-store-screenshot-1280x800.html`
- Small promotional image: `docs/assets/chrome-web-store-small-promo-440x280.png`
