"use client";

import { motion } from "framer-motion";
import { StaggerHeading } from "@/components/StaggerHeading";
import { Photo } from "@/components/Photo";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { business } from "@/lib/content";

function Tile({
  src,
  alt,
  objectPosition,
  sizes,
  className,
  delay = 0,
}: {
  src: string;
  alt: string;
  objectPosition?: string;
  sizes: string;
  className: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, clipPath: "inset(12% 0 12% 0)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: reduced ? 0 : 1.1, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <div className="group relative h-full w-full overflow-hidden rounded-sm">
        <Photo
          src={src}
          alt={alt}
          sizes={sizes}
          objectPosition={objectPosition}
          className="transition-transform duration-[1400ms] ease-cinematic group-hover:scale-[1.05]"
        />
      </div>
    </motion.div>
  );
}

export function Gallery({ hasStorefront }: { hasStorefront: boolean }) {
  return (
    <section id="gallery" className="bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-center gap-4 md:mb-20">
          <span className="h-px w-10 bg-stone/50" />
          <p className="text-sm uppercase tracking-[0.28em] text-ink/60">A Look Inside</p>
        </div>

        <StaggerHeading
          text="The room, the light, the plate."
          className="mb-16 font-display text-4xl font-light leading-tight text-ink md:mb-20 md:text-5xl"
        />

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <Tile
            src="/images/The-HAN-Hero.png"
            alt={`Detail of the arched limewash wall at ${business.name}`}
            objectPosition="80% 10%"
            sizes="(max-width: 768px) 100vw, 58vw"
            className="col-span-12 aspect-[4/5] md:col-span-7"
          />

          <div className="col-span-12 grid grid-cols-2 gap-4 md:col-span-5 md:grid-cols-1 md:gap-6">
            {hasStorefront && (
              <Tile
                src="/images/The-han-storefront.png"
                alt={`${business.name} storefront with illuminated sign on Farnham Road`}
                objectPosition="center 35%"
                sizes="(max-width: 768px) 50vw, 42vw"
                className="aspect-square"
                delay={0.1}
              />
            )}

            <Tile
              src="/images/The-Han-Product.png"
              alt={`Close detail of ${business.name}'s signature avocado and poached egg`}
              objectPosition="55% 38%"
              sizes="(max-width: 768px) 50vw, 42vw"
              className={hasStorefront ? "aspect-square" : "col-span-2 aspect-[4/5] md:col-span-1"}
              delay={hasStorefront ? 0.2 : 0.1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
