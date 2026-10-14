# Jubbir homepage — phase two

Parent: `34c97c829a7d8aebf4fdf25ed4dba4d3cab3c358`, merged PR #19. The main validation and branch publishing runs succeeded; the live drawer was checked on 14 October 2026 for the Ali Hamza route, quantity edits and reopening retention. No real WhatsApp request was sent.

## Scope

- Give the four mismatched/repeated product cards their own product photographs.
- Tighten the service and capability overview pacing within the existing grid.
- Link capability, artwork and work overviews to existing detail pages; make proof-card destinations specific to their examples.
- Align the seven-stage connector with the marker centres and clarify manual artwork handoff.
- Preserve hero copy, section order, service routes, existing logo, palette and ORVIA attribution.

## Image provenance and mapping

The four new images were generated with the built-in image-generation tool. They are illustrative product mockups, not photographs of completed Jubbir client jobs. Originals are retained; only optimized WebP exports are committed. Existing images are retained.

| Product card | Asset | Export |
| --- | --- | --- |
| Business Cards | `src/assets/images/jubbir-business-cards-v1.webp` | 1200 × 800 WebP |
| Stationery | `src/assets/images/jubbir-stationery-v1.webp` | 1200 × 800 WebP |
| Bulk Printing | `src/assets/images/jubbir-bulk-printing-v1.webp` | 1200 × 800 WebP |
| Custom Jobs | `src/assets/images/jubbir-custom-jobs-v1.webp` | 1200 × 800 WebP |

## Final prompts

### business-cards

Use case: product-mockup. Asset type: one photograph for an existing Jubbir Printers homepage product card. Landscape 3:2 composition. Photorealistic commercial-print product photography, functional Production Desk tone. On a matte charcoal print-finishing bench, warm paper, near-black ink and restrained orange #F36B2B printed accents. Soft neutral directional workshop light, crisp print edges and convincing ordinary paper texture. The finished objects occupy roughly 75% of the frame and stay within the central crop-safe area; enough dark quiet space near the lower edge for a website caption. Restrained, organised, technically credible. No people, machinery as main subject, decorative luxury props, foil, unrealistic thickness, price tags, logos, contact details, readable brand names, watermarks, overlaid text or interface panels. Subject: several small rectangular 90 x 54 mm business cards, two neat short stacks and three individual cards slightly fanned in front. Ordinary white card stock about 350 gsm, clean square corners, one side a simple abstract black grid with a narrow orange block, reverse side a restrained ivory layout with abstract small typographic marks. The small business-card proportions and thin cut edges must be immediately recognisable. Close three-quarter tabletop view; no large brochure or booklet.

### stationery

Use case: product-mockup. Asset type: one photograph for an existing Jubbir Printers homepage product card. Landscape 3:2 composition. Photorealistic commercial-print product photography, functional Production Desk tone. On a matte charcoal print-finishing bench, warm paper, near-black ink and restrained orange #F36B2B printed accents. Soft neutral directional workshop light, crisp print edges and convincing ordinary paper texture. The finished objects occupy roughly 75% of the frame and stay within the central crop-safe area; enough dark quiet space near the lower edge for a website caption. Restrained, organised, technically credible. No people, machinery as main subject, decorative luxury props, foil, unrealistic thickness, price tags, logos, contact details, readable brand names, watermarks, overlaid text or interface panels. Subject: a coordinated practical printed business stationery set: one A4 letterhead with mostly clean white writing space and a restrained black/orange graphic header, two slim white envelopes, and one modest slim writing pad. Slightly overlapping orderly arrangement from high three-quarter view. True A4 and envelope proportions, ordinary thin paper and clean folded envelope edges. The paper set must be the subject; no business-card pile, open brochure, pen, mug, laptop, flowers or leather accessories.

### bulk-printing

Use case: product-mockup. Asset type: one photograph for an existing Jubbir Printers homepage product card. Landscape 3:2 composition. Photorealistic commercial-print product photography, functional Production Desk tone. On a matte charcoal print-finishing bench, warm paper, near-black ink and restrained orange #F36B2B printed accents. Soft neutral directional workshop light, crisp print edges and convincing ordinary paper texture. The finished objects occupy roughly 75% of the frame and stay within the central crop-safe area; enough dark quiet space near the lower edge for a website caption. Restrained, organised, technically credible. No people, machinery as main subject, decorative luxury props, foil, unrealistic thickness, price tags, logos, contact details, readable brand names, watermarks, overlaid text or interface panels. Subject: a repeat commercial print run represented by six orderly substantial stacks of identical A5 leaflets, with a few flat repeated sheets aligned beside them. Identical abstract geometric print in near-black, white and orange, clear repetition and many thin layered cut-paper edges. High three-quarter view down onto the organised finishing bench. Convey quantity and consistent repeated printing through realistic stacks. No open brochures, binding, cartons, business cards, price labels or improbable perfectly fused thick slabs.

### custom-jobs

Use case: product-mockup. Asset type: one photograph for an existing Jubbir Printers homepage product card. Landscape 3:2 composition. Photorealistic commercial-print product photography, functional Production Desk tone. On a matte charcoal print-finishing bench, warm paper, near-black ink and restrained orange #F36B2B printed accents. Soft neutral directional workshop light, crisp print edges and convincing ordinary paper texture. The finished objects occupy roughly 75% of the frame and stay within the central crop-safe area; enough dark quiet space near the lower edge for a website caption. Restrained, organised, technically credible. No people, machinery as main subject, decorative luxury props, foil, unrealistic thickness, price tags, logos, contact details, readable brand names, watermarks, overlaid text or interface panels. Subject: a small specification-led custom print sample set in mixed non-standard formats: a long narrow folded paper sleeve, a carefully die-cut hexagonal printed hang tag with a small clean punched hole, and two irregular angular card samples. Restrained black and orange geometric printed areas on white and kraft paper. Three-quarter close tabletop photograph with the varied silhouettes clearly separated and recognisable. Plausible thin paper/card edges and clean folds. No machinery, standard business-card pile, cliché luxury gift box, brochure stacks, invented logos or contact information.

## Verification

The existing intake regressions remain required. Browser verification must cover product-image loading, distinct image sources, useful detail links, the locked section/stage order, connector geometry, and layouts at 320/390/620/768/1024/1440 px. Record exact final commit and CI run in the PR after checks pass.
