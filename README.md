# MitoSpectra holding site

Private review source for the MitoSpectra website under construction page.

## Local preview

```sh
npm run preview
```

Open <http://localhost:4173>.

## Verification

```sh
npm test
```

The check validates the required approved copy and confirms that the page contains no form, registered mark symbol, external script, or disallowed product and clinical claim phrases.

The NZBN wording was verified on 15 October 2026 against the canonical Companies Office document `MitoSpectra-buisness-NB.pdf`, which is retained outside this site repository. The page describes operation by a registered New Zealand sole trader and does not imply that MitoSpectra is a separately registered company.

The mark is a byte-for-byte copy of the current canonical monochrome brand asset `MitoSpectra_white_mark_transparent.png`. Its SHA-256 checksum is `dedaf94363478bf38f987f81d05cd4337e3082c970f18acf8b27cfe3658a2378`. The separate legacy full-colour artwork was not used because it includes wording outside the approved holding-page copy.

## Publication status

This repository is private. GitHub Pages is not configured. The page must not be published or connected to a domain without Jules's explicit approval.
