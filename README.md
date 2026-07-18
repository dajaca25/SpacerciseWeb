# Spacercise — landing page

Static landing page for [Spacercise on Steam](https://store.steampowered.com/app/4974080/Spacercise), built from the Claude Design project ("Nocturne" design system) and hosted on GitHub Pages.

## Structure

- `index.html` — the page
- `css/styles.css` — Nocturne design-system tokens (colors, type, buttons, inputs)
- `css/site.css` — page layout (hero carousel, logo overlay, sections)
- `js/main.js` — carousel auto-advance + dots, signup button state
- `images/slides/` — **drop any screenshots here**; every image in the folder becomes a carousel slide, ordered by filename
- `images/` — `logo.png` and `dev-logo.png` go here, see [images/README.md](images/README.md)

## Deploying

Pushed to `main`, served by GitHub Pages from the repository root. No build step.
