# Website Evaluation Report: www.chenmuzhang.com

## 1. Executive Summary

The current site is a clean, hand-coded static website hosted on GitHub Pages. It successfully communicates your research areas and publications. However, it has several technical issues, missing content sections, and design limitations compared to the standard set by well-known academic personal websites. This report covers architecture, design, content, performance, SEO, accessibility, and provides prioritized recommendations.

---

## 2. Architecture & Technology

### Current Stack

| Layer | Choice |
|---|---|
| Hosting | GitHub Pages (cz2014.github.io) with custom domain via CNAME |
| Framework | None -- raw HTML |
| CSS | Bootstrap 5.3 via CDN + minimal custom CSS |
| JS | Vanilla JS (~25 lines in script.js) |
| Templating | None -- navbar/footer duplicated in all 10 HTML files |
| Build System | None |

### Assessment

**Strengths:**
- Zero build complexity. Just push and deploy.
- Fast load times inherent to static HTML.
- No server-side dependencies or security vulnerabilities.

**Weaknesses:**
- **No templating.** The identical navbar and footer are copy-pasted across 10 files. Any nav change (e.g., adding a "Contact" link) requires editing every file. This is the single biggest maintainability problem -- it makes the site fragile and error-prone.
- **CSS filename bug.** The actual CSS file is named `styple.css` but all HTML files reference `style.css`. This means the custom CSS is not loading on any page. The site relies entirely on Bootstrap defaults, and any custom styles written are silently ignored.
- **No package management.** Bootstrap is loaded from a CDN with no version pinning beyond `@5.3.0`. A CDN outage or breaking change would affect the site.

[cz: this website is actually created by LLM, check the creation date, LLM is not intelligent as today!]

### How Other Academic Sites Handle This

Most modern academic sites use a static site generator (Hugo, Jekyll, Eleventy, or Quarto) that provides:
- Shared layouts/templates (write the navbar once)
- Markdown content files (write papers/bio in plain text, not HTML)
- Automated publication lists (from BibTeX or YAML data files)
- Built-in SEO (sitemaps, meta tags, structured data)

Hugo with the Wowchemy/Academic theme is the most popular choice specifically for academic websites. Jekyll is the simplest option since GitHub Pages has native Jekyll support -- you wouldn't even need a local build step.

[cz: actually I tried academic theme, but I don't like to be identical, and I want fully custom theme. And I prefer the simplest design. recommend what should I do? ]

---

## 3. Design Evaluation

### Layout

**Homepage (index.html):**
- The hero section (interactive figure + research topic list) is a nice concept -- hovering over topics swaps the figure, which is engaging. However, the hover interaction is invisible on mobile/touch devices (no hover state exists on phones).
- Research cards below use fixed `width: 400px; height: 400px` inline styles. This breaks responsiveness -- on screens narrower than 400px, cards overflow. Bootstrap's responsive grid is available but not leveraged for card sizing.
- The overall layout is functional but sparse. There is no introductory text about who you are on the homepage -- a first-time visitor sees "Research" and cards immediately, with no context about the researcher.

**Bio page:**
- Clean two-column layout with photo and text. This works well.
- Excessive empty spacing at the bottom (three `<div class="my-4 py-5"></div>` blocks adding ~500px of whitespace before the footer).

**Publications page:**
- Readable and well-organized. Manual numbering [1]-[13] is clear.
- All entries have DOI links, which is excellent.
- No filtering, grouping by year, or search capability -- acceptable for 13 papers, but will become unwieldy as the list grows.

**Research detail pages (e-ph1, e-s1, etc.):**
- Consistent structure: figure, abstract, references. Clean and effective.
- `tmp.html` has lorem ipsum placeholder text and is accessible on the live site -- this should be removed or hidden.

### Visual Design

**Typography:**
- Relies entirely on Bootstrap defaults (system font stack). Functional but generic -- indistinguishable from thousands of other Bootstrap sites.
- Good font sizing hierarchy (display-2 for section headers, fs-5 for body text).
- Text color is mostly `text-muted` (gray) which reduces contrast. Body text should be darker for readability.

**Color:**
- Dark navbar + white content + light footer. A safe, professional palette.
- No accent color or brand identity. The site has no visual signature.
- Link colors are inconsistent: some links are `text-dark`, some are `text-muted`, some are `text-info`. This makes it unclear what is clickable.

**Spacing:**
- Generally good use of Bootstrap spacing utilities.
- Some inconsistencies: the bio page has excessive bottom padding; index.html has uneven card spacing.

**Overall Design Quality:**
The design is clean and inoffensive but generic. It looks like a Bootstrap starter template rather than a personal academic brand. Compared to well-designed academic sites, it lacks:
- A distinctive visual identity
- A clear hierarchy guiding the eye
- Professional typography choices
- Consistent link/interaction styling

[cz: okay, you dislike it, but for first step, we don't change the visual design, later we will try other visual design]

---

## 4. Content Evaluation

### What's Present

| Section | Status |
|---|---|
| Research overview | Good -- clear categories with visual cards |
| Research details | Good -- 6 pages with abstracts and references |
| Publications | Good -- 13 papers with DOI links |
| Bio | Basic -- 1 paragraph + CV link + GitHub link |
| CV | Present as PDF download |

### What's Missing (Common on Academic Sites)

| Section | Importance | Notes |
|---|---|---|
| **Homepage intro / "About"** | High | No text on homepage explaining who you are. A visitor arriving at index.html has no idea this is a postdoc's site until they click "Bio" |
| **Contact information** | High | No email, office address, or institutional affiliation visible anywhere except within the bio text. Should be prominently displayed |
| **News / Updates** | Medium | Recent publications, talks, awards. Signals the site is actively maintained |
| **Talks / Presentations** | Medium | List of invited talks, conference presentations |
| **Teaching** | Low-Medium | Not critical for a postdoc, but becomes important when applying for faculty positions |
| **Software / Code** | Medium | You link to GitHub but don't highlight specific tools or code. Computational researchers benefit from showcasing software |
| **Google Scholar / ORCID links** | High | Google Scholar is linked from publications page, but ORCID, ResearchGate, or institutional page links are missing |
| **Email** | High | Not found anywhere on the site. This is a significant omission for an academic website |

[cz: good, but we will implement later]

### Content Quality

- Publication abstracts on detail pages are well-written and substantive.
- The bio is too brief for a researcher with 13+ publications and a PhD. It reads more like a LinkedIn summary than an academic bio. Consider adding research interests, a brief description of your research vision, and where you see your work heading.
- The footer says "2025 Powered by Chenmu" -- should be updated to 2026, or better, dynamically generated.

---

## 5. Performance

### Image Sizes

Several images are very large for web use:

| File | Size | Issue |
|---|---|---|
| e-s2-si.png | 2.4 MB | Far too large. Should be < 200 KB |
| e-s1-si.png | 1.9 MB | Far too large |
| e-eps-si.png | 1.8 MB | Far too large |
| e-ph2-si.png | 1.3 MB | Too large |
| e-eps.png | 694 KB | Should be compressed |
| e-ph1-si.png | 657 KB | Should be compressed |
| **Total images** | **~11.5 MB** | A full page load could require several MB |

**Impact:** A visitor on a mobile connection loading a research detail page with a 2.4 MB image will experience noticeable delay. The thumbnail cards on the homepage load ~6 images simultaneously.

**Fix:** Convert PNGs to WebP (with PNG fallback), compress them, and resize to the maximum display dimension (the detail images display at max-width: 1000px, so there's no need for images wider than 2000px for retina). This could reduce total image payload by 80-90%.

[cz: okay, fix it]

### Page Weight

The HTML files themselves are tiny (3-9 KB each). Bootstrap CSS (CDN) is ~23 KB gzipped. Total page weight is dominated by images.

### No Caching Headers

GitHub Pages provides basic caching, but there are no explicit cache-control or content optimization strategies.

---

## 6. SEO (Search Engine Optimization)

### Current State

| Factor | Status |
|---|---|
| `<title>` tag | "Chenmu Zhang" on every page -- not descriptive |
| `<meta description>` | Missing on all pages |
| Open Graph tags | Missing (affects social media link previews) |
| Semantic HTML | Partial -- uses `<header>`, `<main>`, `<footer>`, `<nav>`, but `<section>` usage is inconsistent |
| Heading hierarchy | Inconsistent -- H1 in nav, H2 for page title, some pages skip levels |
| Schema.org structured data | Missing |
| sitemap.xml | Missing |
| robots.txt | Missing |
| Canonical URLs | Missing |
| HTTPS | Yes (via GitHub Pages) |
| Alt text on images | Generic ("Figure 1", "Figure 2", "Main Figure") -- not descriptive |

### Impact

Without meta descriptions, page-specific titles, or structured data, the site will rank poorly in search results. A search for "Chenmu Zhang electron phonon" may not surface the relevant research page. Google Scholar and academic search engines rely on metadata to index content.

### Recommendations

- Each page should have a unique, descriptive `<title>` (e.g., "Chenmu Zhang - Publications - Condensed Matter Physics")
- Add `<meta name="description">` to each page
- Add Open Graph tags for social sharing
- Add a `sitemap.xml` (or use a generator)
- Use descriptive alt text on images (e.g., "Band structure diagram showing electron-phonon coupling in MoS2")

---

## 7. Accessibility

| Factor | Status |
|---|---|
| Keyboard navigation | Basic -- works via browser defaults, but no focus indicators or skip links |
| Screen reader support | Poor -- generic alt text, no ARIA labels, no skip-to-content link |
| Color contrast | `text-muted` on white fails WCAG AA for body text (contrast ratio ~4.0:1, needs 4.5:1) |
| Mobile responsiveness | Partial -- Bootstrap grid helps, but fixed card sizes and hover-only interactions break on mobile |
| Font sizing | Good -- uses relative units via Bootstrap |

---

## 8. Mobile Experience

The site uses Bootstrap's responsive grid, which provides basic mobile support. However:

- **Fixed card dimensions** (`width: 400px; height: 400px`) overflow on small screens
- **Navbar does not collapse** to a hamburger menu on mobile -- the three nav links may wrap awkwardly on narrow screens
- **Hover interactions** on the homepage hero do nothing on touch devices -- the interactive figure-swapping is desktop-only
- **No viewport-specific adjustments** in custom CSS

[cz: okay, help me fix it]

---

## 9. Comparison with Academic Website Standards

| Criterion | Your Site | Typical Good Academic Site |
|---|---|---|
| First impression (who is this?) | Unclear until clicking Bio | Immediately clear from homepage |
| Contact info visible | No | Yes -- email prominent on every page |
| Publications with links | Yes (DOI) | Yes (DOI + preprint + PDF) |
| Research descriptions | Good (cards + detail pages) | Similar, sometimes with plain-language summaries |
| Mobile friendly | Partial | Fully responsive |
| SEO / discoverability | Poor | Good (meta tags, structured data) |
| Maintenance effort | High (manual HTML editing) | Low (Markdown + static site generator) |
| Visual identity | Generic Bootstrap | Distinctive, often institution-branded |
| Content completeness | Missing contact, talks, teaching | All standard sections present |
| Performance | Large uncompressed images | Optimized images, lazy loading |

---

## 10. Prioritized Recommendations

### Critical (Fix Now)

1. **Fix the CSS filename mismatch.** Rename `styple.css` to `style.css` (or update all HTML `<link>` tags). Custom CSS is currently not loading.
2. **Remove `tmp.html` from the live site** or add meaningful content. It contains lorem ipsum and is publicly accessible.
3. **Add contact information.** At minimum, put your email on the bio page and/or in the footer.

[cz: agree, but I don't want my contact exposed. actually my email is in my CV. I am afraid my email address will be auto detected and send me scam]

### High Priority (Significant Impact)

4. **Add a homepage introduction.** A 2-3 sentence summary above the research section: who you are, where you work, what you study. Include your photo. Visitors should understand the site within 5 seconds.
5. **Compress images.** Convert large PNGs to WebP or compressed PNG. Target < 200 KB per image. This will dramatically improve load times.
6. **Fix mobile responsiveness.** Remove fixed card dimensions, add a Bootstrap hamburger menu for mobile nav, provide a touch-friendly alternative for the hover interaction.
7. **Add page-specific `<title>` and `<meta description>` tags** for basic SEO.

[cz: we do 5,6,7, but not 4 for now]

### Medium Priority (Polish)

8. **Add a News/Updates section** on the homepage to signal activity.
9. **Link to ORCID, Google Scholar, and institutional profile** prominently (footer or bio page).
10. **Improve link styling consistency.** Pick one style for clickable text and use it everywhere.
11. **Consider a static site generator** (Jekyll is the easiest since GitHub Pages supports it natively) to eliminate the duplicated navbar/footer problem and enable Markdown content editing.
12. **Update footer year** to 2026 or make it dynamic with JavaScript.
[cz: we do 12, but keep will try 11 later, okay, after rethinking, we should use Jekyll]

### Low Priority (Nice to Have)

13. **Add a Talks/Presentations section.**
14. **Add structured data** (Schema.org Person/ScholarlyArticle markup).
15. **Add a favicon.**
16. **Add preprint/arXiv PDF links** alongside DOI links in publications.
17. **Add a sitemap.xml.**
18. **Consider a custom color scheme** or typography to create a distinctive visual identity.

[cz: not now]

---

## 11. Conclusion

The site serves its basic purpose -- it presents your research and publications in a readable format. The research card layout on the homepage and the detail pages with abstracts are good content design. However, the site falls short of the standard set by peer academic websites in several areas: missing essential content (no contact info, no homepage intro), technical bugs (CSS not loading, placeholder page live), poor mobile experience, no SEO, and a maintenance model (duplicated HTML) that will accumulate errors over time.

The most impactful change would be migrating to a static site generator like Jekyll (zero new tooling needed with GitHub Pages) or Hugo with an academic theme. This would solve the duplication problem, add SEO features, enable Markdown editing, and provide a professional design out of the box. However, if you prefer to keep the hand-coded approach, the critical and high-priority items above can be addressed quickly to bring the site up to a more competitive standard.
