"use client";

import { motion } from "framer-motion";
import { StaggerHeading } from "@/components/StaggerHeading";
import { Parallax } from "@/components/Parallax";
import { ImageSlot } from "@/components/ImageSlot";
import { business } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink">
      <Parallax strength={70} className="absolute inset-0 h-[120%]">
        <ImageSlot
          src="/images/The-HAN-Hero.png"
          alt={`Interior of ${business.name} — arched limewash wall and brass pendant lights`}
          label="hero-room.jpg — wide interior or exterior shot"
          className="h-full w-full"
          priority
        />
      </Parallax>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/40" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-24 md:px-10 md:pb-32">
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
          className="font-display text-[15vw] font-light italic leading-[0.95] text-cream md:text-[8rem]"
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/60"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.28em]">Scroll</span>
          <span
            className="block h-10 w-px bg-cream/50"
            style={
              reduced
                ? undefined
                : {
                    transformOrigin: "top",
                    animation: "scrollcue 2.2s ease-in-out infinite",
                  }
            }
          />
        </div>
      </motion.div>
    </section>
  );
}
