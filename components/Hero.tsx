"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { StaggerHeading } from "@/components/StaggerHeading";
import { Photo } from "@/components/Photo";
import { HeroPlates } from "@/components/HeroPlates";
import { business } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useIsMobile } from "@/lib/useIsMobile";

/**
 * Opens on the interior hero exactly as before. On scroll, the hero pins
 * briefly (outer container is taller than the viewport, inner frame is
 * sticky) while the second image rises over the interior like a curtain —
 * a clip-path wipe from the bottom, not a crossfade — then holds fully
 * revealed for a beat before releasing into Philosophy. Only runs when
 * `hasHero2` is true; otherwise this collapses back to a plain,
 * non-pinned single-image hero (the outer container is exactly 100svh).
 */
export function Hero({ hasHero2 }: { hasHero2: boolean }) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const outerRef = useRef<HTMLElement>(null);
  const showReveal = hasHero2 && !reduced;

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.22], [0, -28]);
  const legibilityOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Drive a broad, asymmetric curve from below the viewport to just above it.
  // The extra travel at both ends guarantees the second hero is completely
  // hidden/revealed, while the shallower mobile amplitude keeps the transition
  // elegant on narrower screens.
  const revealCurveY = useTransform(scrollYProgress, [0.15, 0.75], [1.08, -0.08]);
  const curveAmplitude = isMobile ? 0.032 : 0.055;
  const revealCurvePath = useTransform(revealCurveY, (y) => {
    const upperSweep = y - curveAmplitude * 0.72;
    const lowerSweep = y + curveAmplitude;
    const rightEdge = y - curveAmplitude * 0.15;

    return [
      `M 0 ${y}`,
      `C 0.18 ${upperSweep} 0.38 ${upperSweep} 0.56 ${y + curveAmplitude * 0.22}`,
      `C 0.72 ${lowerSweep} 0.88 ${y + curveAmplitude * 0.62} 1 ${rightEdge}`,
      "L 1 1",
      "L 0 1",
      "Z",
    ].join(" ");
  });
  const storefrontScale = useTransform(scrollYProgress, [0.15, 0.75], [1.05, 1]);

  // Plate rotation rides the same reveal window as the curtain curve above
  // (roughly 0.15-0.75 of the hero's own pin/reveal progress), so the
  // plates start turning as they appear and settle before the sticky pin
  // releases - never off-screen, never happening after the hero is gone.
  const rotationProgress = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);

  return (
    <section
      id="top"
      ref={outerRef}
      className="relative w-full bg-ink"
      style={{ height: showReveal ? "190vh" : "100svh" }}
    >
      <div className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden">
        {showReveal && (
          <svg
            aria-hidden="true"
            focusable="false"
            className="pointer-events-none absolute h-0 w-0"
          >
            <defs>
              <clipPath id="hero-reveal-curve" clipPathUnits="objectBoundingBox">
                <motion.path d={revealCurvePath} />
              </clipPath>
            </defs>
          </svg>
        )}

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

        {/* Reveal layer — the second image rises over the interior like a curtain. Skipped entirely under reduced motion rather than rendered statically: unclipped, it would permanently cover the interior with no way to reveal it. */}
        {showReveal && (
          <motion.div
            className="absolute inset-0"
            style={{ clipPath: "url(#hero-reveal-curve)", scale: storefrontScale }}
          >
            <HeroPlates rotationProgress={rotationProgress} reduced={reduced} isMobile={isMobile} />
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
