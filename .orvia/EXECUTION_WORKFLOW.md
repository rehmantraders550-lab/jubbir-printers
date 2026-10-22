# ORVIA Execution Workflow

This project follows the ORVIA Cross-Project Execution Workflow adopted on 2026-09-29.

Canonical standard:
`rehmantraders550-lab/Orvia-project-control/standards/ORVIA_CROSS_PROJECT_EXECUTION_WORKFLOW_2026-09-29.md`

Core sequence:

**BASELINE → ISOLATED BRANCH → STRUCTURE → IMPLEMENTATION → STATIC VALIDATION → VISUAL/FUNCTIONAL QA → PR → FINAL DIFF CHECK → MERGE → DEPLOYMENT WAIT → LIVE VERIFICATION → CLOSEOUT**

Standing rules:

- Smallest valid change; maximum verification; no silent scope expansion.
- Work from the authoritative source and current production/default branch.
- Do not confuse enablement with implementation.
- Do not delete source files automatically.
- Keep changes atomic and scoped.
- Diagnose failed checks before modifying working product code.
- Production merge is not completion; verify the live deployment separately.
- Historical failed runs do not override newer successful production evidence.
- When execution is delegated, work silently and interrupt only for a real blocker.
- Project-specific visual/domain rules remain local; ORVIA governance transfers across projects.

## Jubbir production publishing

- The **only automatic** production publisher is `.github/workflows/publish-gh-pages.yml`, triggered by pushes to `main`. It compiles the site and publishes to `gh-pages`, the custom-domain GitHub Pages source.
- `.github/workflows/publish-branch.yml` is retained as a **manual, non-publishing** verification workflow. It must not force-push, replace branches, delete files, or publish.
- `.github/workflows/deploy-pages.yml` remains a manually triggered fallback; it is not an automatic publisher.
- The canonical publisher uses `keep_files: true`. Existing published assets are preserved. Only an administrator may manually clean up obsolete files.
- After merging, confirm one automatic publication run on the new `main` commit, confirm GitHub Pages deployment, and check that the public domain serves the new build. A successful upload alone is not proof of the live page rendering.
