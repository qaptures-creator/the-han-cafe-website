# The HAN — website

Next.js + Tailwind + Framer Motion + Lenis. Cinematic scroll-driven marketing site.

## Run locally

```
npm install
npm run dev
```

## Adding your own photos

Every photo on the site lives in `public/images/` and is referenced from one
of these components:

| File to add                          | Used in              | Component               |
| ------------------------------------ | --------------------- | ------------------------ |
| `public/images/hero-room.jpg`        | Full-bleed hero background | `components/Hero.tsx` |
| `public/images/coffee-pour.jpg`      | Gallery                | `components/Gallery.tsx` |
| `public/images/pastry-counter.jpg`   | Gallery                | `components/Gallery.tsx` |
| `public/images/seating-detail.jpg`   | Gallery                | `components/Gallery.tsx` |
| `public/images/exterior.jpg`         | Gallery                | `components/Gallery.tsx` |

`interior-source.png` and `avocado-toast-source.png` are already in place —
they're cropped from the Google Business listing screenshot as temporary
stand-ins for the About section and gallery. Swap them for real photography
(from a camera, not a screenshot) whenever you have it — they'll be visibly
soft at their current display size since they started as thumbnails.

Steps to add a photo:

1. Export/save the photo at a decent size (at least 1600px on the long edge
   for the hero, 1000px for gallery tiles). JPG or PNG both work.
2. Drop the file into `public/images/`, named exactly as in the table above
   (e.g. `hero-room.jpg`).
3. In `components/Gallery.tsx`, find the matching `<Tile ... />` and change
   `label="..."` to `src="/images/your-file.jpg"` — see how the signature
   dish tile is already wired up as an example.
4. For the hero image, edit `components/Hero.tsx` and update the `src` prop
   on the `<ImageSlot>` if you rename the file.
5. Commit and push — Railway redeploys automatically.

Until a slot has a real photo, it renders as a plain warm placeholder block
with a small label naming what goes there, so nothing looks broken.

## Editing text, hours, address

All business facts (name, tagline, address, hours, phone, menu highlights,
philosophy copy) live in `lib/content.ts`. Edit that file — the whole site
reads from it, nothing else needs to change.

Two things are still marked `TODO` there and need confirming:

- Full weekly opening hours (only "closes 4pm" was visible on the source
  Google listing).
- Phone number (not shown on the listing — the Visit section hides the
  phone row entirely until this is filled in).

## Deploying

Deployed as a Railway service (Node build: `npm run build`, start:
`npm run start`, which binds to Railway's `$PORT`).
