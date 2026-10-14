# Jubbir remaining interior pages — phase four

Parent: merged PR #21, commit `23938b17baa3d1dae6a4de5bd2599d8729cc379e`, tree `ded83babe7d456a3d0550006dce9f7a923be2557`.

Parent main validation `38599548153`, branch publishing `38599548151` and Pages deployment `38599620750` succeeded on attempt 1. The live catalogue was checked after deployment: the final CTA opens the existing drawer on the same page, the recipient is Ali Hamza at 0308 899 9988, and a synthetic brief survives reopening from the header. The new Custom Jobs image and improved catalogue label colour are present. No WhatsApp request was sent.

## Scope

- Make the Work register's four rows link to their corresponding existing examples. Preserve the incoming homepage proof links and article focus targets.
- Use the existing shell callback for direct job intake on Work, Artwork and Process pages. The existing drawer, draft and recipient remain shared within each page.
- State that the Work images are illustrative production examples.
- Clarify the four required draft fields on the preparation page and list the optional artwork/reference separately from notes.
- Explain manual WhatsApp attachment on the artwork guide; preserve its six preflight checks and the seven production stages.
- Improve remaining light-section label and numbering readability. Keep the technical diagram schematic, with clearer boundaries and labels.
- Give narrow capability headings the full row and make existing text links touch-safe.

The homepage architecture, hero copy, approved routes, palette, logo, business contacts and ORVIA attribution are preserved. Existing images are reused and given their intrinsic aspect ratio. No files are deleted, and no new dependencies, framework, upload backend or pricing logic are introduced.

## Validation

Require TypeScript, the production build, four brief tests and all existing browser regressions. Extend direct intake and contrast checks to the remaining pages. New browser checks exercise Work register links by keyboard and inspect capabilities, work, artwork, process and job preparation at 320/390/620/768/1024/1440 pixels, including heading bounds, image loading, diagram containment and truthful guidance. Combined with the catalogue suite, this covers all ten interior routes at six widths.

Record the final commit, CI run and screenshot evidence in the PR after validation. WhatsApp tests inspect the generated URL without sending a message.
