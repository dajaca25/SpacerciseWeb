# Spacercise — landing page

Static landing page for [Spacercise on Steam](https://store.steampowered.com/app/4974080/Spacercise), built from the Claude Design project ("Nocturne" design system) and hosted on GitHub Pages.

## Structure

- `index.html` — the page
- `css/styles.css` — Nocturne design-system tokens (colors, type, buttons, inputs)
- `css/site.css` — page layout (hero carousel, logo overlay, sections)
- `js/main.js` — carousel auto-advance + dots, signup button state
- `images/` — **upload your images here**, see [images/README.md](images/README.md) for the exact filenames

## Deploying

Pushed to `main`, served by GitHub Pages from the repository root. No build step.

## Email signup

The "Notify me" form is front-end only (GitHub Pages has no backend). To collect real emails, point the form at a service like [Formspree](https://formspree.io) or [Buttondown](https://buttondown.com): set the form's `action` to your endpoint and `method="POST"` in `index.html`.
