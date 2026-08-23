"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { StaggerHeading } from "@/components/StaggerHeading";
import { Photo } from "@/components/Photo";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { business } from "@/lib/content";

const dishes = [
  {
    src: "/images/plate-3-circle.png",
    title: "Avocado & Poached Egg",
    description: "Sourdough, whipped avocado, poached egg, cherry tomato, toasted seeds.",
    spin: 14,
  },
  {
    src: "/images/plate-2-circle.png",
    title: "Grilled Chicken & Rice",
    description: "Herb-marinated chicken, jasmine rice, garden salad.",
    spin: -14,
  },
  {
    src: "/images/plate-1-circle.png",
    title: "Berry French Toast",
    description: "Brioche, mascarpone, strawberries, blueberries, maple.",
    spin: 14,
  },
];

function Plate({
  src,
  title,
  description,
  spin,
  progress,
  reduced,
  delay,
}: (typeof dishes)[number] & {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
  delay: number;
}) {
  const rotate = useTransform(progress, [0, 1], [0, spin]);

  return (
    <Reveal delay={delay} className="flex flex-col items-center text-center">
      <motion.div
        style={reduced ? undefined : { rotate }}
        className="relative aspect-square w-full max-w-[110px] overflow-hidden rounded-full shadow-[0_20px_45px_-20px_rgba(23,20,15,0.35)] sm:max-w-[160px] md:max-w-[220px]"
      >
        <Photo
          src={src}
          alt={`${title} at ${business.name}`}
          sizes="(max-width: 640px) 110px, (max-width: 768px) 160px, 220px"
        />
      </motion.div>
      <h3 className="mt-5 font-display text-base font-light italic text-ink sm:text-lg md:text-xl">
        {title}
      </h3>
      <p className="mt-2 hidden max-w-[180px] text-xs leading-relaxed text-ink/60 sm:block md:max-w-[220px] md:text-sm">
        {description}
      </p>
    </Reveal>
  );
}

export function SignatureDishes() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section className="bg-cream px-6 py-28 md:px-10 md:py-40">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div className="mb-16 flex items-center gap-4 md:mb-20">
          <span className="h-px w-10 bg-stone/50" />
          <p className="text-sm uppercase tracking-[0.28em] text-ink/60">Signature Plates</p>
        </div>

        <StaggerHeading
          text="A few of our favourites."
          className="mb-16 font-display text-4xl font-light leading-tight text-ink md:mb-20 md:text-5xl"
        />

        <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-12">
          {dishes.map((dish, i) => (
            <Plate
              key={dish.title}
              {...dish}
              progress={scrollYProgress}
              reduced={reduced}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
