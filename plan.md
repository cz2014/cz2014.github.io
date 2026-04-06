# Implementation Plan: Variant B Refinement

## Status: Complete (committed on dev)

All phases implemented. Homepage redesigned, layouts unified, bio updated, CV page added.

---

## What Was Done

### Phase 1: Merge explore into dev
Merged `explore` branch into `dev`. Deleted rejected variants (index-a.html, index-c.html).

### Phase 2: Fix Variant B visual design
- Reduced excessive vertical whitespace
- Balanced text/figure columns to 50/50
- Removed MatClaw figure border
- Removed `<hr>` section divider
- Physics cards: 2-column on mobile, 4-column on desktop

### Phase 3: Promote to production, unify layouts
- Merged explore layout into default.html (Inter font, updated CSS)
- Replaced index.html with refined Variant B
- Deleted temporary files (index-b.html, style-explore.css, explore layout)

### Phase 4: Publications
Verified all 14 papers render correctly, including MatClaw [14].

### Phase 5: Bio + CV
- Added AI research sentence to bio text
- Created separate cv.html with embedded PDF viewer + download link
- Bio links to cv.html instead of embedding PDF inline

### Phase 6: Post-plan refinements (user feedback)
- Navbar changed from "Chenmu Zhang" to "Chenmu" (all pages)
- Hero name "Chenmu Zhang" restored on homepage (reduces redundancy while maintaining visual flow)
- CV moved from embedded-in-bio to its own page

---

## Remaining

- [ ] Merge `dev` to `main` and push to deploy
- [ ] Verify live site at www.chenmuzhang.com
