# Jubbir Printers | Cinematic Website Delivery Closeout

**Date:** 2026-10-22  
**State:** Source merged, CI validated, publisher and Pages deploy successful. Independent external domain visual check was not possible in this session; client acceptance remains open.  
**Canonical source:** `rehmantraders550-lab/jubbir-printers`, GitHub `main`  
**Full release merge SHA:** `ccc549b05451d1cc485f47337965ee694119299e`  
**Domain:** https://jubbirprinters.com

## Delivered implementation

- **PR #35**: https://github.com/rehmantraders550-lab/jubbir-printers/pull/35 | merged `e84eac3bc05227953b5b6160d7575136fccb5315` | editorial service-route text on the left, sticky photography on desktop, inline mobile imagery, all 4 routes retained.
- **PR #36**: https://github.com/rehmantraders550-lab/jubbir-printers/pull/36 | merged `dd2c217781918845be5106d51cfa23bbeb34e48f` | official-logo header, responsive navigation, sculpted headline/photo hero.
- **PR #37**: https://github.com/rehmantraders550-lab/jubbir-printers/pull/37 | merged `ccc549b05451d1cc485f47337965ee694119299e` | full-viewport machine-motion hero, DOM text/staggered reveal, maintained enquiry CTAs, dark contrast treatment, production-stage register relocated below hero, reduced-motion / save-data guards, poster fallback.

## Verified final CI / deployment

| Gate | Evidence | State |
|---|---|---|
| PR #37 final-branch validation | https://github.com/rehmantraders550-lab/jubbir-printers/actions/runs/39819623585 | success; 20 browser checks passed |
| `main` post-merge validation | https://github.com/rehmantraders550-lab/jubbir-printers/actions/runs/39819984251 | success |
| Production publishing | https://github.com/rehmantraders550-lab/jubbir-printers/actions/runs/39819984194 | success |
| GitHub Pages deployment | https://github.com/rehmantraders550-lab/jubbir-printers/actions/runs/39820040424 | success |
| Published `gh-pages` branch | `media/jubbir-machine-hero.mp4` and `media/jubbir-machine-hero-poster.jpg` both observed in tree | present |
| Direct independent public-domain fetch | attempted from web/runtime; inaccessible from this environment | **NOT VERIFIED** |
| Human visual/content review on actual public domain | client acceptance not recorded | **OPEN** |

**No unsupported claims:** Github CI/deployment success is not the same as an independent video playback test on the public domain. The 20-browser-test suite did not guarantee autoplay on all phones, perfect loop seam, source-fidelity certification, WCAG certification or production-machine engineering accuracy.

## Video source and derivative lineage

| Role | File | Resolution / size | SHA-256 |
|---|---|---|---|
| AI-generated original as supplied by user | `Printing_press_rollers_rotating_1080p_20261022084401.mp4` | 1920x1080, 8sec, 9,070,703 bytes | `6a55715f8ec20c0fb3277cb8c95bd3c0c1d453d19dfc86b0bacd56d93f40ef8e` |
| optimized higher-resolution archive | `jubbir-machine-hero-optimized.mp4` | 1920x1080, 8sec, 5,149,186 bytes, silent | `859c898d0a9551d8592565ae548c18b150418231d5d5b851280100ee2d6f45d3` |
| deployed bandwidth-conscious derivative | `jubbir-machine-hero-720p.mp4` in archive; `public/media/jubbir-machine-hero.mp4` in GitHub | 1280x720, 8sec, 1,379,928 bytes, silent | `32f7ea30c1437677550fe306a9ca4f207ee20b80ff9c61cc182ccd4d58ad601f` |
| exported fallback frame | `jubbir-machine-hero-poster.jpg` | 1920x1080, 447,491 bytes | `ec52e6e305755da41c899c7d74618b2822cf83d97e25a417deb4fa2450f87471` |
| old original still image, still retained by code | `src/assets/images/jubbir-hero-v2.webp` | 160,742 bytes as seen in GitHub tree | Git blob SHA `f255570294675d56d7f7b540ac0c4d8677cf4ec6` (not a SHA-256) |

**Storage locations checked:** GitHub repository `main` holds compressed derivative and generated poster; ChatGPT Library `/JUBBIR PRINTERS/Cinematic Hero/` has the provided original and derivative files; Google Drive root has original and archive copies. The image `jubbir-machine-hero-poster.jpg` is in the repository, but the running React component uses `heroImage` (the preserved original `jubbir-hero-v2.webp`) as its `poster` attribute. Avoid suggesting otherwise until changed/tested.

**Disclosure:** The 8-sec clip is an AI-assisted production illustration based on the press image; apparent moving sheets/rollers are not certified mechanically correct documentary footage.

## Distilled observations

1. Full-width media and accessible DOM typography should be separate layers; do not bake text, labels or CTAs into generated media.
2. Prefer built-in Motion for React (already installed), not an added paid animation service; page-entry reveals for first-screen copy, subtle scroll-linked effects only thereafter.
3. Always render the original asset first and use it as a poster/fallback; avoid missing video URLs, autoplay dependence, low-data surprises and motion-sensitive animation.
4. AI image-to-video prompts cannot enforce exact mechanical geometry. Verify the generated first/middle/last frames, loop seam, printed-sheet consistency, and label the result an illustration when necessary.
5. 100 Google Flow credits were consumed by the user for this clip. Exact billing-equivalent value and model configuration were not independently verified; do not claim the prompt length caused the charge or assume the product tier from cost alone. Preflight model/mode/outputs/duration/credit total **before user approval**.
6. Legacy contrast assertion assumed the previous ivory hero and caused 1 of 20 browser tests to fail; it was updated to the new dark-composition baseline, after which 20/20 passed. Pixel-real contrast on moving footage remains a separate visual QA task.
7. GitHub binary upload attempted through connector failed for ~5.15 MB (h2 protocol error), whereas ~1.38 MB 720p uploaded successfully. This is case evidence, **not** a documented universal connector hard-limit.
8. GitHub/CI/publisher/Pages completion does not prove real client conversion or customer acceptance; next verification should center on enquiries, reliable contact path, and client sign-off.

## Course-of-conduct policy recommendation

**Revenue first, development second:** classify requests as DIRECT-REVENUE, CUSTOMER-CONVERSION, OPERATIONAL-RELIABILITY, or EXPERIMENTAL. Default next work to the first two categories until the business has validated paying demand; do not invent traffic, enquiry, order, margin or customer data. Report enquiries/quotes/deposits/profit when actually captured. Keep R&D time-bounded and reversible. Existing subscriptions, credits and computation are scarce resources even when no new PKR charge is triggered.

**Zero-extra-cost gate:** no surprise credit-consuming generation, API use, metered service, paid plan, storage tier, or subscription. Before any generation present current credits displayed by vendor, projected cost, number of outputs, free alternative, estimated incremental PKR cost (if determinable), and require approval. If incremental paid spend is proposed, defer to `standards/ORVIA_ZERO_COST_GOVERNANCE_PROTOCOL_v1.0.md` and its separate red warning/approval/email rules when adopted by that project.

## Reuse / release and caveats

- ORVIA runbook proposal: `standards/ORVIA_CINEMATIC_HERO_VIDEO_COST_AND_FIDELITY_v1.0.md` and reusable skill draft `skills/cinematic-hero-cost-fidelity/SKILL.md`. **Not a live installed agent/plugin**.
- Canonical technical truth: GitHub `main` source and pinned commit; Library and Drive versions are snapshots, not automatic live synchronization.
- Closeout client PDFs/DOCXs are communications, not release sources or documentary certification.
- No original assets deleted, no new paid hosting, no paid API integrations added during implementation. One earlier AI generation did consume 100 existing Flow credits.