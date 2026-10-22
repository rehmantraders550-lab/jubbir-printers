# Jubbir Printers | Machine Video Hero Contract

Status: RELEASED / MAIN MERGED / AUTOMATED CI AND GITHUB PAGES DEPLOY SUCCESSFUL / INDEPENDENT LIVE-PLAYBACK AND CLIENT ACCEPTANCE OPEN
Approved concept: one exact offset press as full-viewport background, existing website text over the moving footage, quiet entry sequence.
Date: 2026-10-22

## Source of truth

- Existing photo: `src/assets/images/jubbir-hero-v2.webp` (used as an immediate low-bandwidth poster and on any video failure).
- Use **this asset** in Google Flow **Frames to Video → First frame**, not the screenshot containing navigation and HTML captions.
- The press must remain recognizable. Verify the same roller/cylinder count, positions, print sheet direction, colors, materials, printed sheet imagery and camera perspective before release.
- Generative video may alter mechanical identity. A prompt alone never establishes source fidelity.

## Output contract

- First generation: **one 8-second, 16:9 clip** using an affordable model available in the user's Flow account. Check credit cost before pressing Generate.
- Stable camera; gentle continuous realistic rotational mechanics and paper motion; no scene cuts or generated text, no new equipment, no synthetic sparks, no fast reframing.
- Website binary installed: `public/media/jubbir-machine-hero.mp4`, 1280 × 720, H.264, audio removed, 1.38 MB; source export 1920 × 1080 is retained in the ChatGPT Library and connected Google Drive, not discarded. Still poster: `public/media/jubbir-machine-hero-poster.jpg`.
- Before acceptance, visually compare first/middle/last frames for distortion, printed-sheet hallucinations, motion reversals and mechanical consistency. Check an actual loop seam separately; do not assume native generated loops are seamless.
- No paid video hosting. Keep the file as a local static website asset unless the user explicitly approves a different storage plan.
- No deletion or overwrite of original machine photo.

## Implementation in production source

- `src/ProductionDesk.tsx`: approved local video is enabled by default, except when reduced-motion or data-saver preferences are active; original photo poster is always mounted.
- `src/index.css`: media covers the hero under the sticky header; real accessible DOM text, strong CSS contrast zone, staged copy/CTA reveal and responsive cropping.
- `tests/homepage.spec.ts`, `tests/intake.spec.ts`: validate geometry, poster fallback, heading readability, functional job-intake CTA and all existing responsive checks.
- Production Desk step register is retained and placed beneath the hero to keep moving machinery unobstructed.

## Release gate (retained contract)

1. User supplied the original Veo output. Initial inspection found usable industrial motion; not a technically certified demonstration. Source retained, 720p deployment encoding created for economical delivery.
2. Check optimized codec, size, loaded playback, silent autoplay/muted/playsInline/loop, and no 404s.
3. Keep static photo for blocked autoplay, offline/slow networks, missing/broken videos, reduced motion and data-saver cases.
4. Run TS lint, unit tests, Vite build and browser tests; specifically inspect desktop 1440/1024 and mobile 390/320 both autoplay-allowed and autoplay-blocked.
5. Merge only once there is a real reviewed video asset and all tests pass; verify single publisher, Pages deploy and live domain before closeout.
6. Do not use paid tools or spend money without the user's explicit repeated approvals.

## Prompt design rules

Specify an exact first-frame replica, stationary camera, original rollers rotating around their actual axes, printed sheets moving at a mechanically plausible constant rate, original printed artworks unchanged, steady daylight industrial lighting, no text overlays, no invented geometry. Keep website typography out of the generated video so text stays readable, accessible and responsive.

## Release closeout 2026-10-22

- PR #37 merged into `main`: `ccc549b05451d1cc485f47337965ee694119299e`.
- Final branch CI: `https://github.com/rehmantraders550-lab/jubbir-printers/actions/runs/39819623585` (20 browser tests passed).
- Post-merge CI: `https://github.com/rehmantraders550-lab/jubbir-printers/actions/runs/39819984251` (success).
- Production publisher: `https://github.com/rehmantraders550-lab/jubbir-printers/actions/runs/39819984194` (success).
- Pages: `https://github.com/rehmantraders550-lab/jubbir-printers/actions/runs/39820040424` (success).
- Direct external domain verification was not possible in the audit environment; client visual acceptance is open. These are distinct gates.
- `jubbir-machine-hero-poster.jpg` is archived in `public/media/`; browser `<video poster>` currently references `heroImage` (the preserved original `src/assets/images/jubbir-hero-v2.webp`). Do not claim that new poster file is actively referenced.
- User's Flow generation consumed 100 existing credits; no *additional* paid hosting was activated. Exact equivalent PKR cost and model tier of the run are not independently verified. Credit spend must be preflighted, not inferred.
- Reusable facts, file SHA-256s, boundaries and client handover are in `.orvia/JUBBIR_CINEMATIC_HERO_CLOSEOUT_2026-10-22.md`.
- Documentation-only change: do not imply a change to the deployed video or to website design.
