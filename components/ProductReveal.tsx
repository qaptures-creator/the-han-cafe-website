"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Reveal } from "@/components/Reveal";
import { business, menuHighlights } from "@/lib/content";

const dish = menuHighlights[0];

/**
 * A pinned, scroll-scrubbed reveal: the dish holds in place while the page
 * scrolls past it, growing from a soft, small frame to full size as scroll
 * progress advances. Collapses to a plain static image under reduced motion
 * rather than leaving a long dead scroll with nothing moving.
 */
export function ProductReveal() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <section className="bg-cream px-6 py-28 md:px-10">
        <div className="mx-auto max-w-md text-center">
          <p className="mb-6 text-sm uppercase tracking-[0.28em] text-stone">
            Signature
          </p>
          <div className="aspect-[3/4] w-full overflow-hidden rounded-sm">
            <img
              src="/images/The-Han-Product.png"
              alt={`${dish.title} at ${business.name}`}
              className="h-full w-full object-cover"
            />
          </div>
          <h3 className="mt-8 font-display text-3xl font-light italic text-ink">
            {dish.title}
          </h3>
        </div>
      </section>
    );
  }

  return <PinnedReveal />;
}

function PinnedReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0.12, 0.55], [0.68, 1]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.35], [0.35, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.5, 0.7], [20, 0]);

  return (
    <section ref={ref} className="relative bg-cream" style={{ height: "220vh" }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-6 px-6 py-16">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.28em] text-stone">
            Signature
          </p>
        </Reveal>

        <motion.div
          style={{ scale, opacity }}
          className="relative aspect-[3/4] h-[48vh] max-h-[440px] overflow-hidden rounded-sm shadow-[0_40px_80px_-30px_rgba(23,20,15,0.35)] md:h-[54vh]"
        >
          <img
            src="/images/The-Han-Product.png"
            alt={`${dish.title} at ${business.name}`}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          style={{ opacity: captionOpacity, y: captionY }}
          className="text-center"
        >
          <h3 className="font-display text-2xl font-light italic text-ink md:text-3xl">
            {dish.title}
          </h3>
          <p className="mt-2 max-w-sm text-sm text-ink/60">{dish.description}</p>
        </motion.div>
      </div>
    </section>
  );
}
