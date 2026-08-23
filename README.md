# The HAN — website

Next.js (App Router) + Tailwind + Framer Motion + Lenis. A premium, editorial
cinematic marketing site with scroll-driven reveals and a scroll-linked hero.

## Run locally

```
npm install
npm run dev
```

## Photos in place today

| File                                    | Used in                                                    |
| ----------------------------------------- | ------------------------------------------------------------- |
| `public/images/The-HAN-Hero.png`         | Hero background + Philosophy + Gallery (three different crops of the same real interior shot) |
| `public/images/The-han-hero2.png`        | Second hero layer — curtain-reveals over the interior on scroll (`components/Hero.tsx`) |
| `public/images/The-han-storefront.png`   | Gallery tile (real shopfront photo, independent of the hero) |
| `public/images/The-han-logo.png`         | Nav + footer brand mark — flat wordmark, transparent background, shown via `object-fit: contain` at a fixed height (no cropping, no background chip) |
| `public/images/plate-1/2/3.png`          | Source photos for the Signature Plates section              |
| `public/images/plate-1/2/3-circle.png`   | Pre-cropped square derivatives of the above, tightly bounding just the plate (no marble) for the circular display — see `components/SignatureDishes.tsx` |
| `public/images/The-Han-Product.png`      | Gallery close-up crop                                        |

`lib/imageMeta.ts` checks at build time whether the hero2/logo files exist and
degrades gracefully if not (plain single-image hero, text wordmark) — nothing
breaks if either is ever removed.

## Editing text, hours, address

All business facts (name, tagline, address, hours, phone, menu highlights,
philosophy copy) live in `lib/content.ts`. Edit that file — the whole site
reads from it, nothing else needs to change.

One thing is still marked `TODO` there and needs confirming:

- Phone number (not shown on the source listing — the Visit section hides
  the phone row entirely until this is filled in).

## Image quality notes

- All photos render through `components/Photo.tsx`, a thin `next/image`
  wrapper — `sizes` on every usage matches the slot's real rendered width
  (the previous blur was a hero `sizes` that under-reported the render width
  as 50vw when it's actually 100vw, so Next served a half-resolution file
  and stretched it).
- `next.config.mjs` explicitly serves AVIF/WebP and allows quality 90 for
  hero-tier photography, 85 elsewhere.
- `The-HAN-Hero.png`'s source was only 1672×941 — upscaled to 2400×1351 with
  Lanczos resampling to give the optimizer more headroom on large/Retina
  screens. This smooths the render pipeline but isn't a substitute for a
  genuinely higher-resolution export; replace it with the original
  camera/phone export if you have one for the sharpest possible result on
  large monitors.

## Deploying

Deployed as a Railway service (Node build: `npm run build`, start:
`npm run start`, which binds to Railway's `$PORT`). Auto-deploy-on-push
needs the Railway GitHub App installed on this repo
(https://github.com/apps/railway) — until then, pushes need a manual
redeploy trigger from Railway's side.
