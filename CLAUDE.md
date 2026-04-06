# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal academic website for Chenmu Zhang (postdoc at Rice University, building AI agents for computational materials science). Hosted via GitHub Pages at `cz2014/cz2014.github.io` with custom domain `www.chenmuzhang.com` (configured via `CNAME` file).

## Build & Preview

Jekyll static site generator. GitHub Pages builds automatically on push to `main`.

To preview locally:
```
export PATH="/opt/homebrew/opt/ruby/bin:/opt/homebrew/lib/ruby/gems/4.0.0/bin:$HOME/.gem/ruby/4.0.0/bin:$PATH"
bundle exec jekyll serve
```

## Architecture

**Jekyll + Bootstrap 5.3 (CDN) + Inter font (Google Fonts).**

### Layouts (`_layouts/`)

- `default.html` -- Base layout for all pages. Dark navbar ("Chenmu" as home link), three nav links (Research, Publications, Bio), light footer. Loads Inter font, Bootstrap CSS/JS, and `style.css`.
- `research-detail.html` -- Extends default. For research detail pages. Takes `figure`, `figure_alt`, `references` from frontmatter; content becomes the abstract.

### Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage. Hero name + subtitle, AI section (MatClaw description + figure + paper/GitHub links), physics foundation section (4 project cards) |
| `publications.html` | Auto-generated from `_data/publications.yml` via Liquid loop. 14 papers with DOI links |
| `bio.html` | Photo, bio text, links to CV page and GitHub |
| `cv.html` | Embedded PDF viewer (`<embed>`) for `Chenmu_CV.pdf` + download link |
| `e-ph1.html`, `e-ph2.html`, `e-s1.html`, `e-s2.html`, `e-eps.html`, `e-d.html` | Research detail pages (research-detail layout) |

### Styling

- `style.css` -- Design system: typography scale (`.hero-name`, `.hero-subtitle`, `.section-heading`, `.section-subtext`), project cards (`.project-card`), pill links (`.pill-link`), spacing helpers, responsive breakpoints
- Color palette: `#1a1a1a` (text), `#6b7280` (secondary), `#2563eb` (accent), `#e5e7eb` (borders)

### Data

- `_data/publications.yml` -- Structured publication entries (number, authors, title, journal, volume, issue, pages, year, doi)

## Git Workflow

- Use `dev` branch for development. Merge to `main` only when ready to deploy.
- `CLAUDE.md`, `plan.md`, `research.md` are in `_config.yml` exclude list (won't appear on live site).
- All commits must be authored by `cz2014` only. Do not add Co-Authored-By lines.

## Important Notes

- `CNAME` file must remain as `www.chenmuzhang.com`
- Replace `Chenmu_CV.pdf` to update the CV (embedded viewer on cv.html will reflect changes automatically)
- No tests, linters, or CI pipelines
