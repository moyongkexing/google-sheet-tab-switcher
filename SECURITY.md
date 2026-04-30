# Security Policy

## Supported Versions

Security fixes are handled on the default branch until versioned releases are introduced.

## Reporting a Vulnerability

Please do not publish sensitive vulnerability details in a public issue.

If GitHub private vulnerability reporting is enabled for this repository, use it. Otherwise, open a minimal public issue asking for a private security contact without including exploit details.

Useful reports include:

- Affected version or commit.
- Browser and operating system.
- Steps to reproduce.
- Expected and actual behavior.
- Whether the issue expands host access, reads unintended page data, or transmits user data.

## Security Expectations

This extension should:

- Run only on Google Sheets URLs declared in the manifest.
- Request the narrowest practical permissions.
- Avoid remotely hosted executable code.
- Avoid analytics, ads, tracking, or external data transmission unless the project scope and privacy policy are deliberately changed first.
