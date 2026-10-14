# Jubbir catalogue and service details — phase three

Parent: merged PR #20, commit `5a749c6cc69eeb0b6fa9fb332cf223df0c23956d`, tree `5f0f0e23563ce162f5d83a6c81ffaa10dc555f3f`.

The parent main validation run `38583889797` and publishing run `38583889609` both succeeded on attempt 1. The live site was checked on 14 October 2026: all eight product-card images loaded from distinct sources, the Packaging switcher displayed its correct panel, and the drawer showed Ali Hamza at 0308 899 9988. The Product Labels proof link opens the correct Work-page example, focuses that article and positions it below the sticky masthead. The supplied historical reference image also opens from its listed scratch path.

## Scope

- Add specification guidance to the existing six applications on each of the four service pages. Preserve all 24 application names and the four approved routes.
- Carry the existing Custom Jobs illustration into the catalogue family and Custom Production hero.
- Use Business Cards, Stationery and Brochures in the commercial gallery; Custom Formats, Bulk Jobs and Custom Cutting in the custom gallery. Keep the DTF gallery focused on the DTF image instead of unrelated press and brochure imagery.
- Describe the galleries as illustrative examples and remove unsupported claims that they are verified Jubbir client output.
- Let the catalogue, service and job-preparation page CTAs open the existing shared drawer directly. The shell provides its existing open callback; there is still one drawer and one draft per page.
- Replace internal Wave labels with public page descriptors.

Existing image files are reused. No new image generation, dependency, framework, pricing logic or backend is introduced. The homepage, approved hero copy, section order, production process, business contacts and ORVIA footer remain unchanged. No files are deleted.

## Validation

Required gates are TypeScript, production build, the four brief helper tests and the existing browser regressions. Added browser checks cover direct page intake, draft retention across header and page buttons, focus restoration, the Ali Hamza WhatsApp destination, catalogue-to-service navigation, meaningful specification guidance, relevant DTF imagery and layouts at 320/390/620/768/1024/1440 pixels. Final commit, CI run and screenshot evidence are recorded in the PR after those checks pass.

WhatsApp validation inspects the generated URL only. No real request is sent and artwork remains a manual attachment in WhatsApp.
