# Jubbir Printers | Machine Video Hero Contract

Status: PREPARED / NOT RELEASED / WAITING FOR USER-GENERATED SOURCE-VERIFIED VIDEO
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
- Final file for website: `public/media/jubbir-machine-hero.mp4`, MP4 (H.264, yuv420p, muted/no required audio, web-compatible), suitable for inline muted autoplay; keep a restrained file-size budget (target 4–8 MB where visual quality allows).
- Before acceptance, visually compare first/middle/last frames for distortion, printed-sheet hallucinations, motion reversals and mechanical consistency. Check an actual loop seam separately; do not assume native generated loops are seamless.
- No paid video hosting. Keep the file as a local static website asset unless the user explicitly approves a different storage plan.
- No deletion or overwrite of original machine photo.

## Implementation staged on branch

- `src/ProductionDesk.tsx`: video displays only when `VITE_JUBBIR_HERO_VIDEO_URL` is nonempty and reduced-motion is not requested; poster is always mounted.
- `src/index.css`: media covers the hero under the sticky header; real accessible DOM text, strong CSS contrast zone, staged copy/CTA reveal and responsive cropping.
- `tests/homepage.spec.ts`, `tests/intake.spec.ts`: validate geometry, poster fallback, heading readability, functional job-intake CTA and all existing responsive checks.
- Production Desk step register is retained and placed beneath the hero to keep moving machinery unobstructed.

## Release gate

1. User supplies the output MP4 and explicitly confirms the machine geometry looks correct.
2. Check optimized codec, size, loaded playback, silent autoplay/muted/playsInline/loop, and no 404s.
3. Keep static photo for blocked autoplay, offline/slow networks, missing/broken videos, reduced motion and data-saver cases.
4. Run TS lint, unit tests, Vite build and browser tests; specifically inspect desktop 1440/1024 and mobile 390/320 both autoplay-allowed and autoplay-blocked.
5. Merge only once there is a real reviewed video asset and all tests pass; verify single publisher, Pages deploy and live domain before closeout.
6. Do not use paid tools or spend money without the user's explicit repeated approvals.

## Prompt design rules

Specify an exact first-frame replica, stationary camera, original rollers rotating around their actual axes, printed sheets moving at a mechanically plausible constant rate, original printed artworks unchanged, steady daylight industrial lighting, no text overlays, no invented geometry. Keep website typography out of the generated video so text stays readable, accessible and responsive.
