"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { StaggerHeading } from "@/components/StaggerHeading";
import { Photo } from "@/components/Photo";
import { business } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Hero({ hasStorefront }: { hasStorefront: boolean }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const interiorScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.04]);
  const interiorOpacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    hasStorefront ? [1, 0] : [1, 1]
  );
  const storefrontScale = useTransform(scrollYProgress, [0.15, 0.65], [1.04, 1]);
  const storefrontOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink"
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { scale: interiorScale, opacity: interiorOpacity }}
      >
        <Photo
          src="/images/The-HAN-Hero.png"
          alt={`Interior of ${business.name} — arched limewash wall and brass pendant lights`}
          sizes="100vw"
          quality={90}
          priority
          objectPosition="center 38%"
        />
      </motion.div>

      {hasStorefront && !reduced && (
        <motion.div
          className="absolute inset-0"
          style={{ scale: storefrontScale, opacity: storefrontOpacity }}
        >
          <Photo
            src="/images/The-han-storefront.png"
            alt={`${business.name} storefront with illuminated sign on Farnham Road`}
            sizes="100vw"
            quality={90}
            objectPosition="center 30%"
          />
        </motion.div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-ink/35" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-20 md:px-10 md:pb-28">
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
      </div>

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
    </section>
  );
}
