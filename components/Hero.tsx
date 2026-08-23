"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { StaggerHeading } from "@/components/StaggerHeading";
import { Photo } from "@/components/Photo";
import { business } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Opens on the interior hero exactly as before. On scroll, the hero pins
 * briefly (outer container is taller than the viewport, inner frame is
 * sticky) while the storefront rises over the interior like a curtain —
 * a clip-path wipe from the bottom, not a crossfade — then holds fully
 * revealed for a beat before releasing into Philosophy. Only runs when
 * `hasStorefront` is true; otherwise this collapses back to a plain,
 * non-pinned single-image hero (the outer container is exactly 100svh).
 */
export function Hero({ hasStorefront }: { hasStorefront: boolean }) {
  const reduced = useReducedMotion();
  const outerRef = useRef<HTMLElement>(null);
  const showReveal = hasStorefront && !reduced;

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.22], [0, -28]);
  const legibilityOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const clipInset = useTransform(scrollYProgress, [0.15, 0.75], [100, 0]);
  const storefrontClipPath = useTransform(clipInset, (v) => `inset(${v}% 0 0 0)`);
  const storefrontScale = useTransform(scrollYProgress, [0.15, 0.75], [1.05, 1]);

  return (
    <section
      id="top"
      ref={outerRef}
      className="relative w-full bg-ink"
      style={{ height: showReveal ? "190vh" : "100svh" }}
    >
      <div className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden">
        {/* Base layer — the interior hero, unchanged */}
        <div className="absolute inset-0">
          <Photo
            src="/images/The-HAN-Hero.png"
            alt={`Interior of ${business.name} — arched limewash wall and brass pendant lights`}
            sizes="100vw"
            quality={90}
            priority
            objectPosition="center 38%"
          />
        </div>

        {/* Reveal layer — storefront rises over the interior like a curtain. Skipped entirely under reduced motion rather than rendered statically: unclipped, it would permanently cover the interior with no way to reveal it. */}
        {showReveal && (
          <motion.div
            className="absolute inset-0"
            style={{ clipPath: storefrontClipPath, scale: storefrontScale }}
          >
            {/* The source photo is landscape (4:3-ish) — on a tall narrow
                mobile viewport, object-fit:cover to fill 100svh forces a
                scale that crops the sign's edges off, no matter the
                object-position. A separate, tighter portrait crop of the
                same photo (full sign, tiny margin) fixes it properly. */}
            <div className="absolute inset-0 hidden md:block">
              <Photo
                src="/images/The-han-storefront.png"
                alt={`${business.name} storefront with illuminated sign on Farnham Road`}
                sizes="100vw"
                quality={90}
                priority
                objectPositionClassName="object-[center_12%]"
              />
            </div>
            {/* This source is landscape-ish (4:3) at every crop the sign's
                width allows, and no mobile viewport is wide enough for
                cover to show the full sign without cutting it off — a
                hard limit of the source's proportions, not a positioning
                problem. contain + a matching backdrop keeps the whole
                sign intact with a small, intentional-looking margin
                instead of clipping it. */}
            <div className="absolute inset-0 bg-cream md:hidden">
              <Photo
                src="/images/The-han-storefront-mobile.png"
                alt={`${business.name} storefront with illuminated sign on Farnham Road`}
                sizes="100vw"
                quality={90}
                priority
                fit="contain"
              />
            </div>
          </motion.div>
        )}

        {/* Legibility overlay — only present while the hero copy is on screen; gone by the time the storefront is the focus, so the payoff frame isn't darkened */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-ink/35"
          style={showReveal ? { opacity: legibilityOpacity } : undefined}
        />

        <motion.div
          style={showReveal ? { opacity: contentOpacity, y: contentY } : undefined}
          className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-20 md:px-10 md:pb-28"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 text-sm uppercase tracking-[0.28em] text-cream/70"
          >
            {business.category} · Farnham Road, Slough
          </motion.p>

          <StaggerHeading
            as="h1"
            text={business.name}
            className="font-display text-[clamp(3.25rem,9vw,7rem)] font-light italic leading-[0.95] text-cream"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-md text-lg font-light text-cream/85"
          >
            {business.tagline}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex items-center gap-6 text-cream/80"
          >
            <span className="text-sm tracking-[0.1em]">
              {business.rating.toFixed(1)} ★ &nbsp;({business.reviewCount} Google reviews)
            </span>
            <span className="h-1 w-1 rounded-full bg-cream/40" />
            <span className="text-sm tracking-[0.1em]">{business.priceBand}</span>
          </motion.div>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { opacity: cueOpacity }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/60"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.28em]">Scroll</span>
            <span
              className="block h-9 w-px bg-cream/50"
              style={
                reduced
                  ? undefined
                  : { transformOrigin: "top", animation: "scrollcue 2.2s ease-in-out infinite" }
              }
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
