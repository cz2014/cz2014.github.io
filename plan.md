# Implementation Plan

All work happens on the `dev` branch. Merge to `main` only when verified. Visual design stays unchanged.

---

## Phase 1: Migrate to Jekyll (keep same design)

Jekyll uses a `_layouts` folder for templates and optional `_data` folder for structured data. GitHub Pages builds it automatically -- no local build step required, though `jekyll serve` can be used for local preview.

### Step 1.1: Create Jekyll project structure

Create these new files/folders:

```
_config.yml              <-- site-wide settings (title, url, description)
_layouts/
  default.html           <-- shared shell: <head>, navbar, footer, scripts
  research-detail.html   <-- layout for the 6 research detail pages (e-ph1, e-s1, etc.)
_data/
  publications.yml       <-- structured publication data (replaces hand-written HTML list)
Gemfile                  <-- Jekyll dependency (for optional local preview)
```

### Step 1.2: Extract the shared layout (`_layouts/default.html`)

Take the common parts from every page:
- `<head>` block (charset, viewport, Bootstrap CDN, custom CSS link, page-specific `<title>`)
- Navbar `<header>` block
- Footer `<footer>` block
- Bottom scripts (Bootstrap JS, script.js)

Wrap them around a `{{ content }}` placeholder. The layout will accept `title` and `description` from each page's frontmatter for SEO (see Phase 4).

### Step 1.3: Create the research detail layout (`_layouts/research-detail.html`)

The 6 research detail pages (e-ph1, e-ph2, e-s1, e-s2, e-eps, e-d) share identical structure:
- Full-width figure
- Abstract heading + text
- Reference heading + text

Create a layout that takes `figure`, `abstract`, and `references` from frontmatter or content, so each research page becomes a short Markdown/HTML file instead of a full page with duplicated navbar/footer.

### Step 1.4: Convert existing pages to use layouts

Each page gets stripped down to just its unique content, with a YAML frontmatter header. Example for `publications.html`:

```yaml
---
layout: default
title: Chenmu Zhang - Publications
description: Publication list of Chenmu Zhang, condensed matter physics.
---

<!-- only the <main> content goes here -->
```

Pages to convert:
- `index.html` -> uses `default` layout, keeps all research card HTML as content
- `publications.html` -> uses `default` layout (or auto-generates from `_data/publications.yml` -- see Step 1.5)
- `bio.html` -> uses `default` layout
- `e-ph1.html` -> uses `research-detail` layout
- `e-ph2.html` -> uses `research-detail` layout
- `e-s1.html` -> uses `research-detail` layout
- `e-s2.html` -> uses `research-detail` layout
- `e-eps.html` -> uses `research-detail` layout
- `e-d.html` -> uses `research-detail` layout

### Step 1.5: Publications as structured data (optional but recommended)

Create `_data/publications.yml` with each paper as an entry:

```yaml
- number: 13
  authors: "<u>C. Zhang</u>*, Z. Xiao, R. Paddock, M. Cullinan, M. Tehrani, and Y. Liu"
  title: "Effects of Graphene Doping on the Electrical Conductivity of Copper"
  journal: "Advanced Functional Materials"
  volume: "34"
  issue: "45"
  pages: "2407569"
  year: 2024
  doi: "https://doi.org/10.1002/adfm.202407569"
```

Then `publications.html` uses a Liquid loop to render the list automatically. Adding a new paper = adding a YAML entry. No HTML editing needed.

### Step 1.6: Create `_config.yml`

```yaml
title: Chenmu Zhang
url: https://www.chenmuzhang.com
description: Personal website of Chenmu Zhang
markdown: kramdown
exclude:
  - CLAUDE.md
  - research.md
  - plan.md
  - Gemfile
  - Gemfile.lock
  - README.md
```

The `exclude` list keeps dev-only files out of the built site. This replaces the need to manually avoid merging CLAUDE.md -- Jekyll simply won't include it in the output even on `main`.

**Important note:** With the `exclude` list in `_config.yml`, `CLAUDE.md` will not appear on the live site even if it's on `main`. However, we will still keep it on `dev` only as a preference.

### Step 1.7: Delete `tmp.html`

Remove the placeholder page with lorem ipsum content.

---

## Phase 2: Fix CSS filename bug

Rename `styple.css` to `style.css` so the `<link>` tag in the layout actually loads it. Since we'll have a single layout file after Phase 1, this only needs to be correct in one place.

---

## Phase 3: Compress images

### Step 3.1: Resize images

Detail page images (`*-si.png`) display at `max-width: 1000px`. Resize to max 2000px wide (for retina) if they are larger.

Card thumbnails display at 400px wide. Resize to max 800px wide.

### Step 3.2: Compress PNGs

Use `pngquant` or `optipng` to compress all PNG files. Target: every image under 200 KB.

Alternatively, convert to WebP for better compression. However, since the current HTML uses `.png` extensions everywhere, and WebP requires either renaming files + updating references or using `<picture>` tags with fallbacks, the simplest approach is to keep PNG format but compress aggressively.

### Expected results

| File | Current | Target |
|---|---|---|
| e-s2-si.png | 2.4 MB | < 200 KB |
| e-s1-si.png | 1.9 MB | < 200 KB |
| e-eps-si.png | 1.8 MB | < 200 KB |
| e-ph2-si.png | 1.3 MB | < 200 KB |
| e-eps.png | 694 KB | < 150 KB |
| e-ph1-si.png | 657 KB | < 150 KB |
| Others | < 450 KB | < 100 KB |

---

## Phase 4: SEO -- page-specific titles and meta descriptions

With Jekyll layouts in place, each page sets its own `title` and `description` in frontmatter. The layout template renders them:

```html
<title>{{ page.title | default: site.title }}</title>
<meta name="description" content="{{ page.description | default: site.description }}">
```

### Titles per page

| Page | Title |
|---|---|
| index.html | Chenmu Zhang - Research |
| publications.html | Chenmu Zhang - Publications |
| bio.html | Chenmu Zhang - Bio |
| e-ph1.html | Chenmu Zhang - Phonon-limited Transport: Quadrupole Scattering |
| e-ph2.html | Chenmu Zhang - High-Mobility 2D Semiconductors |
| e-s1.html | Chenmu Zhang - Electron-Surface Scattering |
| e-s2.html | Chenmu Zhang - Graphene-Copper Conductivity |
| e-eps.html | Chenmu Zhang - Dielectric Screening in vdW Heterostructures |
| e-d.html | Chenmu Zhang - Electron-Defect Scattering in TMDCs |

---

## Phase 5: Fix mobile responsiveness

### Step 5.1: Responsive navbar with hamburger menu

Replace the current `<header>` with Bootstrap's responsive navbar component (`navbar-expand-md` + `navbar-toggler`). This collapses the nav links into a hamburger menu on screens below `md` (768px). Same dark background, same link text -- just wrapped in Bootstrap's responsive navbar markup.

### Step 5.2: Responsive research cards

Replace fixed inline styles `style="width: 400px; height: 400px;"` with Bootstrap responsive classes. The cards should:
- Fill the available column width on all screen sizes
- Use `img-fluid` (already present) for image scaling
- Let height be determined by content rather than fixed at 400px, or use a responsive max-height

### Step 5.3: Touch-friendly hero interaction

The hover-to-swap-image interaction on the homepage doesn't work on touch devices. Add a touch/click fallback:
- On mobile, tapping a research topic swaps the image (same as hover on desktop)
- Tapping again or tapping another topic switches to that image
- This can be done by adding `click` event listeners alongside the existing `mouseover`/`mouseout` handlers in `script.js`

### Step 5.4: Fix bio page excess spacing

Remove the three empty `<div class="my-4 py-5"></div>` blocks at the bottom of `bio.html`.

---

## Phase 6: Dynamic footer year

In the layout template, replace the hardcoded year with JavaScript:

```html
<footer class="bg-light text-center py-3">
  <p class="m-0">&copy; <script>document.write(new Date().getFullYear())</script> Powered by Chenmu</p>
</footer>
```

Alternatively, use Jekyll's Liquid: `{{ site.time | date: '%Y' }}` which resolves at build time (updates on each deploy).

---

## Execution Order

The phases have dependencies:

```
Phase 1 (Jekyll migration)  -- must be first, since it creates the layout files
  |
  +-- Phase 2 (CSS fix)     -- trivial, done during layout creation
  |
  +-- Phase 6 (footer year) -- done in the layout template
  |
Phase 3 (compress images)   -- independent, can be done in parallel with Phase 1
  |
Phase 4 (SEO meta tags)     -- requires Phase 1 (needs layout template in place)
  |
Phase 5 (mobile fixes)      -- requires Phase 1 (navbar changes go in layout)
```

**Suggested order:**
1. Phase 1 + Phase 2 + Phase 6 together (all involve the layout/template work)
2. Phase 3 (image compression)
3. Phase 4 (SEO frontmatter)
4. Phase 5 (mobile responsiveness)
5. Test locally with `jekyll serve`
6. Verify visual design is unchanged on desktop
7. Verify mobile experience

---

## What will NOT change

- Overall visual design (dark navbar, white content, light footer, Bootstrap styling)
- Page URLs (all existing URLs stay the same)
- Research card layout and interactive hero concept
- Publication content and numbering
- Bio content and photo
- Custom domain (CNAME stays)
- No contact info added (email remains in CV only)
- No homepage intro added

## What will be different for the author

- Adding a new page: create a file with frontmatter `layout: default`, write only the content
- Adding a publication: add an entry to `_data/publications.yml`
- Changing the navbar: edit `_layouts/default.html` once (applies to all pages)
- Local preview: `bundle exec jekyll serve` (optional -- GitHub builds automatically on push)
