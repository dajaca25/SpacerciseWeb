# Image slots

Drop your images into this folder with these exact filenames:

| File | Used for | Recommended |
|------|----------|-------------|
| `screenshot-1.jpg` | Hero carousel, slide 1 | 1920×1080 gameplay screenshot |
| `screenshot-2.jpg` | Hero carousel, slide 2 | 1920×1080 gameplay screenshot |
| `screenshot-3.jpg` | Hero carousel, slide 3 | 1920×1080 gameplay screenshot |
| `logo.png` | Game logo over the hero | Transparent PNG, ~840×360 (shown at up to 420×180) |
| `dev-logo.png` | Fixed developer logo, bottom-left (also the favicon) | Square transparent PNG, ~112×112 (shown at 56×56) |

Until an image exists, the site shows a dashed placeholder box in its spot —
so you can deploy first and add images whenever.

To add more carousel slides, duplicate a `.slide` div and a dot button in
`index.html` — the carousel picks up the count automatically.
