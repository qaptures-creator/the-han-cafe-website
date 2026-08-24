"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { Photo } from "@/components/Photo";
import { business } from "@/lib/content";

type PlateConfig = {
  key: string;
  src: string;
  alt: string;
  leftPct: number;
  topPct: number;
  widthPct: number;
  direction: 1 | -1;
};

// Positions/size reproduce the original flattened hero2 photo's layout:
// three plates in a row on the same marble slab.
const PLATES: PlateConfig[] = [
  {
    key: "avocado",
    src: "/images/plate-3-circle.png",
    alt: `Avocado and poached egg on sourdough at ${business.name}`,
    leftPct: 18.2,
    topPct: 56.9,
    widthPct: 31.7,
    direction: -1, // left plate: counter-clockwise
  },
  {
    key: "chicken",
    src: "/images/plate-2-circle.png",
    alt: `Grilled chicken, rice and salad at ${business.name}`,
    leftPct: 50.2,
    topPct: 56.9,
    widthPct: 31.7,
    direction: 1, // centre plate: clockwise
  },
  {
    key: "french-toast",
    src: "/images/plate-1-circle.png",
    alt: `Berry French toast at ${business.name}`,
    leftPct: 82.8,
    topPct: 56.9,
    widthPct: 31.7,
    direction: -1, // right plate: counter-clockwise
  },
];

function Plate({
  plate,
  rotationProgress,
  maxRotation,
  maxLift,
}: {
  plate: PlateConfig;
  rotationProgress: MotionValue<number>;
  maxRotation: number;
  maxLift: number;
}) {
  const rotate = useTransform(
    rotationProgress,
    [0, 1],
    [0, plate.direction * maxRotation],
  );
  const y = useTransform(rotationProgress, [0, 1], [0, -maxLift]);

  return (
    <div
      className="absolute z-20 aspect-square"
      style={{
        left: `${plate.leftPct}%`,
        top: `${plate.topPct}%`,
        width: `${plate.widthPct}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        style={{ rotate, y }}
        className="h-full w-full origin-center will-change-transform"
      >
        <div className="relative h-full w-full overflow-hidden rounded-full shadow-[0_15px_35px_-15px_rgba(23,20,15,0.4)]">
          <Photo
            src={plate.src}
            alt={plate.alt}
            sizes="(max-width: 768px) 33vw, 25vw"
          />
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Reproduces the flattened hero2 composition (three dishes on marble) as a
 * static background plus three independently positioned plate elements, so
 * the marble stays perfectly still while each plate gets its own subtle
 * scroll-tied rotation — impossible with a single flattened photo.
 */
export function HeroPlates({
  rotationProgress,
  reduced,
  isMobile,
}: {
  rotationProgress: MotionValue<number>;
  reduced: boolean;
  isMobile: boolean;
}) {
  const maxRotation = reduced ? 0 : isMobile ? 6 : 9;
  const maxLift = reduced ? 0 : isMobile ? 4 : 7;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Photo
        src="/images/hero2-marble-bg.png"
        alt=""
        sizes="100vw"
        quality={85}
        objectPosition="center"
      />
      {/* Feather the marble into Philosophy's exact cream background. This
          sits above the background but below the dishes, so no hard section
          edge is visible and the plate photography stays crisp. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-b from-transparent via-cream/75 to-cream md:h-52"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-3 bg-cream"
      />
      {PLATES.map((plate) => (
        <Plate
          key={plate.key}
          plate={plate}
          rotationProgress={rotationProgress}
          maxRotation={maxRotation}
          maxLift={maxLift}
        />
      ))}
    </div>
  );
}
