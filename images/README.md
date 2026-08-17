# Image slots

## Carousel screenshots — `images/slides/`

Drop **any number of images** (`.jpg`, `.png`, `.webp`, `.gif`, `.avif`) into
`images/slides/` and push. Every image in that folder automatically becomes a
hero-carousel slide — no filenames to match, no HTML to edit. Slides are
ordered by filename (numeric-aware, so `2.jpg` comes before `10.jpg`).
Recommended: 1920×1080 gameplay screenshots.

The page discovers the folder's contents at runtime via the GitHub API, so
new slides appear as soon as they're pushed.

## Design-page galleries — `images/style-explorations/`, `images/vector-mockups/`

Same deal for the two lists on `design.html`: drop PNGs (or any of the formats
above) into either folder and push. They're listed top-to-bottom in
filename order, so prefix with `01-`, `02-`, … to control the sequence.

| Folder | Section on `design.html` |
|--------|--------------------------|
| `images/style-explorations/` | "Style explorations" |
| `images/vector-mockups/` | "Vector mockups" |

Until a folder has images, its section shows a dashed placeholder box.

## Fixed-name images (this folder)

| File | Used for | Recommended |
|------|----------|-------------|
| `logo.png` | Game logo over the hero (and, in grayscale, atop `design.html`) | Transparent PNG, ~840×360 (shown at up to 420×180) |
| `dev-logo.png` | Fixed developer logo, bottom-left (also the favicon) | Square transparent PNG, ~112×112 (shown at 56×56) |

Until an image exists, the site shows a dashed placeholder box in its spot —
so you can deploy first and add images whenever.
