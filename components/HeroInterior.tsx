"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCoverLayout } from "@/lib/useCoverLayout";
import { business } from "@/lib/content";

// Native dimensions of hero-interior-clean.png (and the lamp layers' source
// coordinate space) — every position below is derived from measuring this
// exact file, not guessed.
const NATIVE_W = 2400;
const NATIVE_H = 1351;

// Matches the previous single-image hero's `objectPosition="center 38%"`
// exactly, so the visible crop is unchanged on every breakpoint.
const POSITION_X = 50;
const POSITION_Y = 38;

type LampConfig = {
  key: string;
  src: string;
  alt: string;
  /** Exact pixel bounding box in the native 2400x1351 space. */
  left: number;
  top: number;
  width: number;
  height: number;
  /** Desired on-screen entrance travel distance (px), before the cover-scale is applied. */
  travelDesktop: number;
  travelMobile: number;
  delay: number;
};

// Bounding boxes measured directly from hero-interior-clean.png / the
// original hero photo — the lamp PNGs are cropped to exactly these boxes,
// so positioning them here reproduces the original composition precisely.
const LAMPS: LampConfig[] = [
  {
    key: "main",
    src: "/images/lamp-main.png",
    alt: "",
    left: 1095,
    top: 0,
    width: 756,
    height: 452,
    travelDesktop: 160,
    travelMobile: 110,
    delay: 0,
  },
  {
    key: "centre",
    src: "/images/lamp-centre.png",
    alt: "",
    left: 1279,
    top: 432,
    width: 401,
    height: 338,
    travelDesktop: 120,
    travelMobile: 85,
    delay: 0.15,
  },
  {
    key: "left",
    src: "/images/lamp-left.png",
    alt: "",
    left: 0,
    top: 570,
    width: 254,
    height: 175,
    travelDesktop: 90,
    travelMobile: 65,
    delay: 0.3,
  },
  {
    key: "right",
    src: "/images/lamp-right.png",
    alt: "",
    left: 2191,
    top: 657,
    width: 209,
    height: 138,
    travelDesktop: 90,
    travelMobile: 65,
    delay: 0.3,
  },
];

const DURATION = 2.2;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Lamp({
  lamp,
  scale,
  reduced,
  isMobile,
}: {
  lamp: LampConfig;
  scale: number;
  reduced: boolean;
  isMobile: boolean;
}) {
  const travelOnScreen = isMobile ? lamp.travelMobile : lamp.travelDesktop;
  // Convert the desired on-screen travel into the wrapper's own (pre-scale)
  // coordinate space, so it reads as `travelOnScreen` real pixels once the
  // ancestor's cover-scale is applied — not `travelOnScreen` native pixels.
  const travelNative = travelOnScreen / scale;

  return (
    <div
      className="absolute"
      style={{ left: lamp.left, top: lamp.top, width: lamp.width, height: lamp.height }}
    >
      <motion.div
        initial={reduced ? { y: 0, opacity: 1 } : { y: -travelNative, opacity: 0.7 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: reduced ? 0 : DURATION,
          delay: reduced ? 0 : lamp.delay,
          ease: EASE,
        }}
        className="h-full w-full"
      >
        <Image
          src={lamp.src}
          alt={lamp.alt}
          width={lamp.width}
          height={lamp.height}
          priority
          sizes={`${lamp.width}px`}
          style={{ width: "100%", height: "100%" }}
        />
      </motion.div>
    </div>
  );
}

/**
 * The hero's interior photo, rebuilt as a static clean background
 * (`hero-interior-clean.png`, the original with all 4 pendant lamps removed
 * and the wall repaired) plus the 4 lamps as independent layers that
 * descend into place on first load. `useCoverLayout` replicates
 * `object-fit: cover` + `object-position: center 38%` for the whole group at
 * once (not just the background), so every lamp stays pixel-locked to the
 * wall behind it at any viewport size — the same crop the single-image
 * hero always had.
 */
export function HeroInterior({ reduced, isMobile }: { reduced: boolean; isMobile: boolean }) {
  const { containerRef, layout } = useCoverLayout(NATIVE_W, NATIVE_H, POSITION_X, POSITION_Y);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div
        style={{
          position: "absolute",
          width: NATIVE_W,
          height: NATIVE_H,
          transform: `translate3d(${layout.x}px, ${layout.y}px, 0) scale(${layout.scale})`,
          transformOrigin: "top left",
          willChange: "transform",
          // Server-rendered HTML has no viewport to measure against, so `layout`
          // starts as an arbitrary, incorrectly-scaled guess. Staying invisible
          // until the first real measurement lands (which happens before the
          // client's first paint) trades that guess for a brief blank instead —
          // never a flash of the wrong crop.
          opacity: layout.ready ? 1 : 0,
        }}
      >
        <Image
          src="/images/hero-interior-clean.png"
          alt={`Interior of ${business.name} — arched limewash wall and brass pendant lights`}
          width={NATIVE_W}
          height={NATIVE_H}
          priority
          sizes={`${NATIVE_W}px`}
          style={{ width: "100%", height: "100%" }}
        />

        {LAMPS.map((lamp) => (
          <Lamp key={lamp.key} lamp={lamp} scale={layout.scale} reduced={reduced} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}
