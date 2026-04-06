# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal academic website for Chenmu Zhang (condensed matter physics researcher, postdoc at Rice University). The site is hosted via GitHub Pages at `cz2014/cz2014.github.io` with a custom domain `www.chenmuzhang.com` (configured via the `CNAME` file).

## Deployment

There is no build step. Push to `main` branch and GitHub Pages deploys automatically. The site is plain HTML/CSS/JS with no bundler, framework, or static site generator.

To preview locally, open any `.html` file in a browser or use a local server:
```
python3 -m http.server 8000
```

## Architecture

**Static site with Bootstrap 5.3 (CDN-loaded).** All pages share the same structure:
- Dark navbar header with three links: Research, Publications, Bio
- Bootstrap container for main content
- Light footer
- `script.js` and CDN Bootstrap JS loaded at bottom

The navbar HTML is duplicated in every page (no templating system). When modifying the navbar, update it in all HTML files.

### Page Map

| File | Purpose |
|---|---|
| `index.html` | Homepage/Research page. Hero section with interactive figure (hover to swap images), then research cards organized in 4 sections (R1-R4) |
| `publications.html` | Numbered publication list with DOI links. References are manually numbered [1]-[13] |
| `bio.html` | Biography with photo and CV link |
| `e-ph1.html`, `e-ph2.html`, `e-s1.html`, `e-s2.html`, `e-eps.html`, `e-d.html` | Individual research detail pages (figure + abstract + references). Linked from index.html research cards |
| `tmp.html` | Template/scratch page for new research detail pages |

### Key Conventions

- **CSS file** is `styple.css` (note the typo) but `index.html` references `style.css` -- the actual loaded file name varies by page. Check the `<link>` tag in each page.
- **Image naming**: Research card thumbnails are `images/e-{topic}.png`, detail page figures are `images/e-{topic}-si.png`
- **Interactive hero** on index.html: `script.js` swaps `#main-figure` src on hover via inline `onmouseover`/`onmouseout` handlers
- **No CSS framework customization** -- styling relies almost entirely on Bootstrap utility classes inline in HTML
- **Publications** are manually maintained HTML, not generated from BibTeX

### Research Sections (index.html)

- R1: Electron-phonon (e-ph1, e-ph2)
- R2: Electron-boundary (e-s1, e-s2)
- R3: Electron-environment (e-eps)
- R4: Electron-defect (e-d)

## Git Workflow

- Use the `dev` branch for local development. Merge to `main` only when ready to deploy.
- This `CLAUDE.md` file must stay on `dev` only -- do not merge it into `main`.
- All commits must be authored by `cz2014` only. Do not add Co-Authored-By lines.

## Important Notes

- The `CNAME` file must remain as `www.chenmuzhang.com` for custom domain to work
- `Chenmu_CV.pdf` is linked from `bio.html` -- replace the file to update the CV
- There are no tests, linters, or CI pipelines
