# Website Evaluation Report: www.chenmuzhang.com

## 1. Executive Summary

The site has been migrated from raw hand-coded HTML to Jekyll, a static site generator with native GitHub Pages support. The visual design is preserved. Key improvements include: shared layout templates (navbar/footer defined once), structured publication data, image compression (82% reduction), responsive mobile support, SEO meta tags, and several bug fixes.

The site now needs a content update to reflect Chenmu's research transition from condensed matter physics to AI-driven materials science.

---

## 2. Research Profile: Before and After

### Phase 1: First-Principles Electron Transport (2018--2024)

Chenmu's PhD and early postdoc work focused on computing how electrons scatter in materials using first-principles (ab initio) methods. The research was purely physics -- developing and applying quantum-mechanical methods to calculate transport properties.

**Four research themes (currently on the website):**

**Electron-phonon (R1):**
- Developed a first-principles method incorporating quadrupole scattering for more accurate electron-phonon coupling interpolation in 2D semiconductors (PRB 2022)
- Discovered new 2D semiconductors with mobility 10x higher than existing ones through high-throughput computational screening. Formulated effective descriptors to screen the 2D materials database (PRL 2023)
- Earlier work on flexural phonon effects, high-field transport, and deformation potential theory (2019--2021)

**Electron-boundary (R2):**
- Developed a parameter-free first-principles approach for electron-surface scattering in nanoscale metal films. Found (111) Cu is less conductive than (001), contradicting conventional belief (ACS Nano 2024)
- Studied graphene-copper composites, showing graphene doping actually decreases conductivity contrary to hypothesis. Identified compressive strain as a conductivity enhancer (Adv. Funct. Mater. 2024)

**Electron-environment (R3):**
- Modeled Froehlich scattering in van der Waals heterostructures, showing dielectric screening and remote phonon coupling can enhance mobility 2.5x in InSe/hBN (submitted)
- Studied substrate effects on flexural phonon transport (JPCM 2021)

**Electron-defect (R4):**
- Calculated defect-limited mobility in transition metal dichalcogenides (MoS2, WS2, MoSe2, WSe2) for vacancies, antisites, and oxygen substitutes. Found WX2 always has higher mobility than MoX2 (ACS Nano 2024)

**Methods used:** Density functional theory (DFT), Boltzmann transport equation, electron-phonon coupling interpolation, Wannier functions, high-throughput screening.

**Publications:** 13 papers in PRL, PRB, ACS Nano, JACS, Advanced Functional Materials, etc.

---

### Phase 2: AI Agents for Materials Science (2025--present)

Chenmu has transitioned to building AI-powered tools that automate the very computational workflows he used to do manually. This represents a shift from doing physics by hand to building autonomous systems that do physics.

**MatClaw -- Autonomous Code-First LLM Agent (arXiv:2604.02688, April 2026)**

MatClaw is an open-source LLM agent that takes natural-language task descriptions and autonomously orchestrates end-to-end materials science computations on HPC clusters.

**What makes it novel:**
- **Code-first execution:** The agent writes and runs Python code directly, composing any installed domain library (pymatgen, atomate2, DeePMD-kit, LAMMPS, VASP). No predefined tool functions needed -- unlike prior pipeline-bounded agents.
- **Four-layer memory architecture:** Working memory, episodic conversation history, semantic experience log, and external database. Prevents progressive context loss across multi-day workflows.
- **Structure-aware RAG:** Tree-sitter-based code chunking with BM25 retrieval achieves ~99% per-step API-call accuracy for domain library calls.
- **Guided autonomy model:** The key finding is that code generation is essentially solved (~99% accuracy), but tacit domain knowledge (simulation timescales, equilibration protocols, sampling strategies) remains the bottleneck. Lightweight human guidance (one-sentence constraints or reference papers) bridges this gap.

**Demonstrated on ferroelectric CuInP2S6 (CIPS):**
1. ML force field distillation via active learning (DeePMD-kit)
2. Curie temperature prediction via MD simulations (Tc = 261 +/- 10 K)
3. Heuristic parameter-space search for domain wall propagation regimes

**Tech stack:** Python, smolagents (HuggingFace), LiteLLM, supports OpenAI/Gemini/Claude, pymatgen, ASE, atomate2, jobflow-remote, FAISS, BM25.

**GitHub:** https://github.com/cz2014/MatClaw (MIT license)

**Authors:** Chenmu Zhang and Boris I. Yakobson

---

### The Connection Between Phase 1 and Phase 2

The transition is not a departure but an evolution. Chenmu's deep expertise in computational materials science (DFT, molecular dynamics, transport calculations) is exactly the domain knowledge that MatClaw needs to be effective. The paper explicitly identifies "tacit domain knowledge" -- the kind that researchers accumulate through years of running simulations -- as the key bottleneck for AI agents. Chenmu is uniquely positioned at this intersection: he has the domain expertise AND is building the AI systems.

---

## 3. Current Website vs. Actual Research

The website currently reflects only Phase 1 (electron transport physics). It is missing:

| What's Missing | Priority | Details |
|---|---|---|
| **MatClaw / AI agent research** | Critical | The main current research direction is not represented at all |
| **Updated research narrative** | High | The homepage framing ("electron interactions with phonon/boundary/environment/defect") no longer captures the full picture |
| **New publication** | High | arXiv:2604.02688 is not in the publications list |
| **Software/code showcase** | High | MatClaw is an open-source tool -- should be prominently featured |
| **Updated bio** | Medium | Bio still says "postdoc" with no mention of AI/agent research direction |

---

## 4. Architecture & Technology (Site Status)

### Current Stack

| Layer | Choice |
|---|---|
| Hosting | GitHub Pages (cz2014.github.io) with custom domain via CNAME |
| Framework | Jekyll (static site generator) |
| CSS | Bootstrap 5.3 via CDN + custom `style.css` |
| JS | Vanilla JS (~35 lines in script.js) |
| Templating | Jekyll Liquid templates (`_layouts/default.html`, `_layouts/research-detail.html`) |
| Data | `_data/publications.yml` for structured publication entries |
| Build System | Jekyll (built automatically by GitHub Pages on push) |

### Completed Fixes

- Navbar/footer defined once in layout template (was duplicated in 10 files)
- CSS filename bug fixed (`styple.css` -> `style.css`)
- `tmp.html` removed
- Images compressed (11.5 MB -> 2 MB, 82% reduction)
- Responsive navbar with hamburger menu on mobile
- Responsive research cards (no more fixed 400px overflow)
- Touch-friendly hero interaction
- SEO meta tags on all pages
- Dynamic footer year
- `.gitignore` and Jekyll config added

---

## 5. Options for Next Steps

### Content Updates (reflect the research transition)

**Option A: Add MatClaw as a new research section**
- Add an R5 section ("AI for Materials Science" or "Autonomous Agents") to the homepage with a card linking to a detail page
- Create a new research detail page for MatClaw with figure, description, and links to paper + GitHub
- Add the arXiv paper to `_data/publications.yml`
- Keep the existing physics sections as-is

**Option B: Restructure the homepage around two research eras**
- Reorganize into two main blocks: "Electron Transport" (the existing R1-R4) and "AI Agents for Materials Science" (MatClaw and future work)
- Update the hero section narrative to reflect both directions
- Update the bio page

**Option C: Full homepage redesign with new narrative**
- Redesign the homepage to lead with the current research direction (AI agents)
- Present the physics background as foundational work that informs the AI research
- New hero text, possibly new interactive element

### Other Improvements

**Option D: Add a Software/Projects page**
- Showcase MatClaw with description, features, GitHub link, installation instructions
- Could also highlight any other tools or code from the physics phase

**Option E: Update bio and publications only**
- Minimal change: add the new paper to publications, update bio text to mention AI transition
- No homepage restructuring

**Option F: Visual redesign**
- New color scheme, typography, and layout
- Can be combined with any content option above
