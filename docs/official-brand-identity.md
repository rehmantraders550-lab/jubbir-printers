# Official Jubbir Printers logo

## Approved source

The official logo is the large primary lockup on the left side of the supplied business-card artwork, `ali card.pdf` (CorelDRAW export titled “JUBBIR NEW LOGOS.cdr”, dated October 18, 2026). The small separate graphic near the card’s upper right is not the primary logo.

The lockup combines the orange and charcoal J emblem with “JUBBIR”, “PRINTERS”, and “IDEAS TO IMPACT”. Preserve the artwork and its proportions; do not rebuild the lettering as live text.

## Website files

- `public/jubbir-official-logo.png`: transparent 1700 × 1840 master raster extracted from the vector PDF.
- `public/jubbir-official-logo-on-dark.png`: approved light-surface adaptation for dark backgrounds (white lettering/mark with the orange accent).
- `public/favicon.png`: 512 × 512 favicon canvas using the original emblem.
- `src/BrandLogo.tsx`: canonical shared component. It selects the regular or dark-background logo.
- `src/InteriorShell.tsx` and `src/ProductionDesk.tsx`: shared header/footer consumers.
- Root route HTML files reference the favicon.

Source colors are orange `#F5811F` and charcoal `#231F20`. Use the original orange/charcoal artwork on light backgrounds and the supplied light variant on dark backgrounds. Keep the full lockup legible and uncropped.
