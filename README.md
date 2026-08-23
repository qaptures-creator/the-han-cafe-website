# The HAN — website

Next.js (App Router) + Tailwind + Framer Motion + Lenis. A premium, editorial
cinematic marketing site with scroll-driven reveals and a scroll-linked hero.

## Run locally

```
npm install
npm run dev
```

## Photos in place today

| File                                 | Used in                                    |
| ------------------------------------- | ------------------------------------------- |
| `public/images/The-HAN-Hero.png`      | Hero background + Philosophy + Gallery (three different crops of the same real interior shot) |
| `public/images/The-Han-Product.png`   | Signature-dish pinned reveal + Gallery close-up crop |

## Two assets still pending

These are referenced in code but the files aren't in the repo yet. Everything
degrades gracefully in their absence (checked via `lib/imageMeta.ts` at build
time, no broken images, no console errors) — the moment you add them and
push, the site picks them up automatically on the next deploy:

- **`public/images/The-han-storefront.png`** — once present, the hero
  automatically crossfades from the interior shot into this storefront photo
  as the visitor scrolls (see `components/Hero.tsx`), and the Gallery gains a
  third tile for it. Keep the illuminated "The HAN" sign fully in frame —
  the default crop (`objectPosition="center 30%"`) assumes the sign sits in
  the upper portion of the photo; adjust that value if not.
- **`public/images/TheHanLogo.png`** — once present, it replaces the text
  wordmark in the nav and footer (`components/Nav.tsx`, `components/Footer.tsx`).
  Real width/height are read directly from the PNG at build time
  (`lib/imageMeta.ts`), so the aspect ratio is always preserved automatically
  — no need to tell us its dimensions. Once it's in, also tell us and we'll
  set it as the favicon/app icon too (that needs a manual crop decision
  depending on whether the file is a wide wordmark or a square mark).

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
