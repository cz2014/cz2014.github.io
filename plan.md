# Homepage Redesign Plan

## Goal

Redesign the homepage to reflect Chenmu's research transition from first-principles electron transport to AI agents for materials science. Produce 3 concrete, renderable homepage variants for comparison.

## Design Principles

Inspired by early Apple and intentional minimalism:
- **Content is the design.** No decorative elements, gradients, or visual noise.
- **Deliberate typography.** One clean sans-serif font (Inter or system font stack), carefully chosen sizes and weights to create hierarchy without clutter.
- **Generous whitespace.** Let elements breathe. Spacing communicates structure.
- **Restrained color.** Near-black text on white. One subtle accent color at most. No colored backgrounds except the navbar.
- **Nothing unnecessary.** Every element earns its place. If removing something doesn't hurt, remove it.

The difference from the current site: the current site is simple by omission (Bootstrap defaults). The new design will be simple by intention (every choice is deliberate).

---

## Shared Elements (All 3 Variants)

### Navbar
Keep the current dark navbar with hamburger menu. It works, it's clean, and consistency across pages matters more than novelty here. The existing research detail pages, publications, and bio pages remain unchanged.

### Typography
- Headings: Inter (loaded from Google Fonts CDN) or system sans-serif, varying weights
- Body: same font, regular weight, ~18px for comfortable reading
- No bold colors, no decorative fonts

### Color Palette
- Background: `#ffffff`
- Primary text: `#1a1a1a` (near-black, softer than pure black)
- Secondary text: `#6b7280` (muted gray for descriptions)
- Accent: `#2563eb` (a restrained blue, used sparingly for links or one highlight)
- Cards/sections: `#f9fafb` (barely-there gray for subtle section separation)

### Footer
Same as current (light background, dynamic year).

### Content Needed for All Variants

**AI section content:**
- Headline: something like "AI Agents for Materials Science"
- One-paragraph description of MatClaw and the research vision
- A figure/image representing MatClaw (we may need a placeholder or schematic -- will use a clean text-based card if no image is available yet)
- Links: arXiv paper, GitHub repo

**Physics section content:**
- Brief framing text (1-2 sentences positioning this as foundational work)
- The existing 4 research themes (R1-R4) condensed into cards or a compact list
- Links to existing detail pages

**New publication:**
- arXiv:2604.02688 added to `_data/publications.yml`

---

## Variant A: "Two Pillars"

### Concept
Two parallel research directions presented as equal pillars. The message: "I work at the intersection of AI and materials physics."

### Layout (top to bottom)

```
[Navbar]

[Hero]
  Chenmu Zhang                          (large, left-aligned)
  Postdoctoral Researcher, Rice University   (smaller, muted)
  
  A one-sentence research identity spanning both fields, e.g.:
  "I build AI systems for materials science, grounded in
   first-principles physics."

[Two-column section]
  Left column:                    Right column:
  "AI for Materials Science"      "Electron Transport"
  (heading)                       (heading)
  
  MatClaw card/description        Compact cards for R1-R4
  with paper + GitHub links       linking to existing detail pages

[Footer]
```

### Character
- Balanced, academic
- Says "I am equally serious about both directions"
- Clean two-column grid with clear visual parity

### File
`index-a.html`

---

## Variant B: "Lead with AI, Physics Below"

### Concept
AI research is the headline act. Physics is presented as "the foundation" -- substantial and important, but clearly positioned as what gave rise to the current direction. A narrative arc.

### Layout (top to bottom)

```
[Navbar]

[Hero]
  Chenmu Zhang                          (large, left-aligned)
  Postdoctoral Researcher, Rice University

[AI Section -- full width, prominent]
  "Building autonomous agents for
   computational materials science"      (large statement)
  
  2-column:
    Left: description paragraph          Right: MatClaw figure/schematic
    explaining the vision, what              or a clean placeholder
    MatClaw does, why it matters
  
  Links: arXiv paper | GitHub | ...

[Divider or spacing]

[Physics Section -- "Grounded in first-principles physics"]
  Brief framing: "This work builds on years of first-principles
  research in electron transport..."
  
  Row of 4 compact cards (R1-R4), same images as current site,
  linking to existing detail pages

[Footer]
```

### Character
- Forward-looking, narrative-driven
- Clear signal: "AI is where I'm headed"
- Physics section feels like a strong foundation, not an afterthought

### File
`index-b.html`

---

## Variant C: "Minimal Portfolio"

### Concept
Ultra-minimal. No sections, no headings for categories. Just a clean grid of project cards, ordered by importance (AI first, physics after). The design does the talking -- larger or more prominent cards for primary work.

### Layout (top to bottom)

```
[Navbar]

[Hero -- very minimal]
  Chenmu Zhang                          (large)
  Computational materials science       (one line, muted)
  through AI and first-principles physics

[Project Grid -- 2 or 3 columns]
  [MatClaw card]        [e-ph card]        [e-boundary card]
  (larger or            (standard)         (standard)
   featured)
  
  [e-environment card]  [e-defect card]
  (standard)            (standard)

  Each card: image thumbnail + one-line title + one-line subtitle
  Click goes to detail page

[Footer]
```

### Character
- Most Apple-like: minimal text, visual grid, trust the reader to click
- No narrative framing -- the ordering and visual weight communicate priority
- Feels like a portfolio or product page rather than an academic site
- Risk: may feel too sparse for an academic audience expecting descriptions

### File
`index-c.html`

---

## Implementation Steps

### Step 1: Prepare shared assets -- COMPLETED
- Created `style-explore.css` with Inter font, new color palette (#1a1a1a/#6b7280/#2563eb), card styles, pill links, responsive breakpoints
- Created `_layouts/explore.html` loading Inter from Google Fonts CDN
- Added MatClaw paper [14] to `_data/publications.yml`
- Compressed `images/matclaw.png` (486 KB -> 84 KB)

### Step 2: Build Variant A (`index-a.html`) -- COMPLETED
- Hero with name, subtitle, one-line identity statement
- Two-column layout: AI pillar (MatClaw card + links) and Physics pillar (4 compact cards)

### Step 3: Build Variant B (`index-b.html`) -- COMPLETED
- Hero with name and subtitle
- Full-width AI section: large statement, two-column description + figure, pill links
- Physics section below with framing text ("Grounded in first-principles physics") and 4 cards in a row

### Step 4: Build Variant C (`index-c.html`) -- COMPLETED
- Minimal hero: name + one-line statement
- Featured full-width MatClaw card with pill links
- 4 physics cards in a 2x2 / 4-column responsive grid

### Step 5: Preview -- COMPLETED
- Jekyll server running at localhost:4000
- All 3 variants verified serving (HTTP 200)
- Opened in browser for side-by-side comparison

### Step 6: Decision -- PENDING
- Pick one variant (or mix elements from multiple)
- Refine on the `explore` branch
- When satisfied, merge back to `dev`

---

## What Did NOT Change

- Research detail pages (e-ph1, e-s1, etc.) -- unchanged
- Publications page -- unchanged (new paper added to data only)
- Bio page -- unchanged
- Navbar structure (links to Research, Publications, Bio)
- The existing `index.html` remains untouched -- variants are separate files
