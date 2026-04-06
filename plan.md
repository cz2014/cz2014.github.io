# Implementation Plan: Variant B Refinement

## Goal

Refine Variant B ("Lead with AI, Physics Below") into the production homepage. Fix the visual design issues identified during evaluation. Update related pages (publications, bio) to reflect the research transition. Add embedded CV viewer. Deploy to main.

All work on the `dev` branch. Merge `explore` -> `dev` first to bring in the variant files, then refine.

---

## Phase 1: Merge explore into dev

### Step 1.1: Merge the explore branch
Merge `explore` into `dev` to bring in:
- `_layouts/explore.html`
- `style-explore.css`
- `index-a.html`, `index-b.html`, `index-c.html`
- `images/matclaw.png`
- Updated `_data/publications.yml` (paper [14] added)

### Step 1.2: Clean up unused variants
Delete `index-a.html` and `index-c.html` (rejected variants). Keep `index-b.html` as the working file for now.

---

## Phase 2: Fix Variant B visual design issues

### Step 2.1: Reduce vertical whitespace
Tighten the three excessive gaps in `index-b.html`:
- Hero to AI heading: reduce from ~100px to ~40px
- AI section (pill links) to physics section: reduce from ~300px to ~80px
- AI heading to text+figure row: reduce spacing

Adjust `.section-gap` and `.section-gap-sm` values in `style-explore.css`, or use specific spacing on the page. Target: the physics section should be visible without a full viewport of scrolling past white space.

### Step 2.2: Rebalance text/figure columns
Change the AI section from `col-md-5` (text) / `col-md-7` (figure) to `col-md-6` / `col-md-6` for equal width. This gives the text more breathing room for long technical terms.

### Step 2.3: Remove MatClaw figure border
Remove the `border: 1px solid #e5e7eb; border-radius: 8px;` from the MatClaw figure. Let the diagram sit naturally on the white page background.

### Step 2.4: Remove the hero name (decided)
Remove the hero name entirely. Both options were prototyped and compared visually:
- **Option A (no hero name):** The navbar says "Chenmu Zhang", then the subtitle "Postdoctoral Researcher, Rice University" flows directly below, followed by the bold AI heading. Clean, no redundancy. The gap between navbar and subtitle is small and reads naturally -- the subtitle bridges the name to the statement.
- **Option B (smaller hero name):** "Chenmu Zhang" at 2.5rem below the navbar's "Chenmu Zhang" is clearly redundant -- same words twice in close proximity, even at different sizes.

**Decision: Option A.** The hero becomes just the subtitle + the bold AI heading. The navbar handles the name.

### Step 2.5: Remove the `<hr>` section divider
Delete the `<hr class="section-divider">` between the AI and physics sections. The spacing alone (after Step 2.1 tightens it) will provide sufficient visual separation. The heading "Grounded in first-principles physics" is a strong enough section marker.

### Step 2.6: Mobile physics cards in 2 columns
Change the physics cards from single-column stacking on mobile to a 2-column grid. Currently `col-md-6 col-lg-3` -- change to `col-6 col-lg-3` so they are always 2-column on small screens, 4-column on large.

### Step 2.7: Visual verification
Take full-page screenshots at desktop (1440px) and mobile (390px) widths. Compare with the pre-fix screenshots. Verify:
- No excessive whitespace gaps
- Text and figure feel balanced
- Name redundancy resolved
- Physics cards in 2 columns on mobile
- Overall feel: clean, intentional, content-first

---

## Phase 3: Promote index-b to index.html and unify layouts (Option A)

### Step 3.1: Merge explore layout into default layout
Merge the `explore.html` layout improvements into `default.html` so ALL pages use the new typography and styles. This means:
- Add Inter font (Google Fonts CDN) to `default.html` `<head>`
- Replace `style.css` with the contents of `style-explore.css` (merge any needed rules from the old `style.css`)
- All pages (publications, bio, research detail) will get Inter font and refined CSS automatically

### Step 3.2: Replace index.html
Replace the current `index.html` (old research-cards design) with the refined `index-b.html` content. Change its layout from `explore` to `default`.

### Step 3.3: Clean up
- Delete `index-b.html` (now merged into `index.html`)
- Delete `style-explore.css` (merged into `style.css`)
- Delete `_layouts/explore.html` (merged into `default.html`)

---

## Phase 4: Update publications

### Step 4.1: Add MatClaw paper
Paper [14] (arXiv:2604.02688) is already in `_data/publications.yml` from the explore branch merge. Verify the numbering is correct and all 14 entries render properly.

### Step 4.2: Verify publication page rendering
Build the site and check that `publications.html` correctly shows all 14 papers with proper formatting, DOI links, and numbering.

---

## Phase 5: Update bio page

### Step 5.1: Update bio text
The bio currently only mentions physics research. Add a sentence about the AI/agent research direction. Keep it brief -- the homepage now tells the full story. Something like:

"My current research focuses on building AI agents for autonomous computational materials science, building on years of first-principles electron transport research."

### Step 5.2: Embedded CV viewer
Add an embedded PDF viewer to the bio page so visitors can read the CV inline without downloading.

**How it works:** Use a simple `<iframe>` or `<embed>` tag pointing to the existing `Chenmu_CV.pdf`. Browsers have built-in PDF rendering -- no JavaScript library or external service needed.

```html
<embed src="Chenmu_CV.pdf" type="application/pdf" width="100%" height="800px" />
```

**Implementation details:**
- Add the embed below the existing bio text, with a heading like "Curriculum Vitae"
- Keep the existing download link as a fallback ("Download PDF" link above or below the viewer)
- Add a `style="border: 1px solid #e5e7eb; border-radius: 4px;"` for a clean frame
- On mobile, the embedded viewer may be too small to read comfortably -- add a note or make the download link more prominent on small screens
- **Difficulty: trivial.** It's a single HTML tag. No libraries, no build steps, no external services. Browser-native PDF rendering works on all modern browsers (Chrome, Firefox, Safari, Edge).

**Alternative approaches (not needed, but for reference):**
- `pdf.js` (Mozilla's library): renders PDFs to a canvas element, more control over appearance, but heavy (~500KB) and unnecessary when `<embed>` works
- Google Docs Viewer (`docs.google.com/viewer?url=...`): external dependency, slower, privacy concerns
- `<object>` tag: similar to `<embed>`, slightly different fallback behavior

### Step 5.3: Verify bio page
Verify the bio page looks good with:
- Updated text mentioning AI research
- Embedded CV viewer rendering correctly
- Download link still working
- New Inter font applied (from unified layout)

---

## Phase 6: Final testing and deployment

### Step 6.1: Local testing
- Run `jekyll serve` and verify all pages:
  - Homepage (new Variant B design)
  - Publications (14 papers)
  - Bio (updated text + embedded CV viewer)
  - All 6 research detail pages (unchanged content, new Inter font)
- Test at desktop, tablet, and mobile widths
- Verify all links work (nav, research cards, paper DOIs, GitHub links, CV viewer)

### Step 6.2: Commit to dev
Stage and commit all changes on `dev`.

### Step 6.3: Merge to main and deploy
- Merge `dev` into `main` (dev-only files like `CLAUDE.md`, `research.md`, `plan.md` are in `_config.yml` exclude list, so they won't appear on the live site even if merged)
- Push `main` to origin
- Verify the live site at www.chenmuzhang.com updates correctly

---

## Execution Order

```
Phase 1 (merge explore -> dev)
  |
Phase 2 (fix visual issues)
  |
Phase 3 (promote to index.html, unify layouts)
  |
Phase 4 (verify publications) -- can parallel with Phase 5
Phase 5 (update bio + embedded CV viewer)
  |
Phase 6 (test and deploy)
```

---

## What Will Change

| Page | Change |
|---|---|
| Homepage (index.html) | Complete redesign: Variant B with AI lead + physics foundation |
| Publications | +1 paper (MatClaw, [14]) |
| Bio | +1 sentence about AI direction, embedded CV viewer |
| All pages | Inter font, unified typography and styling |

## What Will NOT Change

- Research detail pages content (e-ph1, e-s1, etc.)
- CV PDF file itself
- Custom domain / CNAME
- Navbar links (Research, Publications, Bio)
