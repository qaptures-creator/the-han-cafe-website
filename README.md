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

| File                                  | Used in                          | Component                       |
| -------------------------------------- | --------------------------------- | -------------------------------- |
| `public/images/The-HAN-Hero.png`       | Full-bleed hero background        | `components/Hero.tsx`            |
| `public/images/The-Han-Product.png`    | Pinned scroll-reveal of the signature dish | `components/ProductReveal.tsx` |
| `public/images/interior-source.png`    | About/Philosophy section          | `components/Philosophy.tsx`      |
| `public/images/coffee-pour.jpg`        | Gallery                           | `components/Gallery.tsx`         |
| `public/images/pastry-counter.jpg`     | Gallery                           | `components/Gallery.tsx`         |
| `public/images/seating-detail.jpg`     | Gallery                           | `components/Gallery.tsx`         |
| `public/images/exterior.jpg`           | Gallery                           | `components/Gallery.tsx`         |
| `public/images/food-detail.jpg`        | Gallery                           | `components/Gallery.tsx`         |

The hero and product shots are real photography already in place. The rest
are placeholder slots — each renders as a plain warm block with a small
label naming what goes there, so nothing looks broken until you add the
real file.

Steps to add a photo to one of the remaining placeholder slots:

1. Export/save the photo at a decent size (1000px+ on the long edge). JPG
   or PNG both work.
2. Drop the file into `public/images/`, named exactly as in the table above
   (e.g. `coffee-pour.jpg`).
3. In `components/Gallery.tsx`, find the matching `<Tile ... />` and change
   `label="..."` to `src="/images/your-file.jpg"`.
4. Commit and push — Railway redeploys automatically.

To replace the hero or product image later, just overwrite the same
filename in `public/images/` (or point the `src` in `Hero.tsx` /
`ProductReveal.tsx` at a new filename) and push.

## Editing text, hours, address

All business facts (name, tagline, address, hours, phone, menu highlights,
philosophy copy) live in `lib/content.ts`. Edit that file — the whole site
reads from it, nothing else needs to change.

One thing is still marked `TODO` there and needs confirming:

- Phone number (not shown on the source listing — the Visit section hides
  the phone row entirely until this is filled in).

## Deploying

Deployed as a Railway service (Node build: `npm run build`, start:
`npm run start`, which binds to Railway's `$PORT`).
