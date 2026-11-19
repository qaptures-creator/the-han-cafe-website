"use client";

import Image from "next/image";
import { useCoverLayout } from "@/lib/useCoverLayout";

// Native size of the sign photo, and where the cut-out ring of icons sits in
// it. The ring PNG is a 640px square centred on the circle the arcs lie on
// (fitted centre 1233.4, 552.75), so it rotates about the sign's true centre.
const NATIVE_W = 1672;
const NATIVE_H = 941;
const RING = { left: 913, top: 233, size: 640, originX: 50.064, originY: 49.96 };

/**
 * The backlit HAN sign on the arched plaster wall, as two layers: the wall
 * with the words (static) and the ring of tulips, tea glasses, crescents and
 * arcs with its glow (turning very slowly). `useCoverLayout` crops both
 * exactly like `object-fit: cover` so they stay locked together at any size.
 */
export function SignWall({ positionX = 50, positionY = 50, sizes }: { positionX?: number; positionY?: number; sizes: string }) {
  const { containerRef, layout } = useCoverLayout(NATIVE_W, NATIVE_H, positionX, positionY);

  return (
    <div ref={containerRef} aria-hidden className="absolute inset-0 overflow-hidden">
      <div
        style={{
          position: "absolute",
          width: NATIVE_W,
          height: NATIVE_H,
          transform: `translate3d(${layout.x}px, ${layout.y}px, 0) scale(${layout.scale})`,
          transformOrigin: "top left",
          opacity: layout.ready ? 1 : 0,
        }}
      >
        <Image
          src="/images/our-goal-sign-wall.webp"
          alt=""
          width={NATIVE_W}
          height={NATIVE_H}
          sizes={sizes}
          quality={90}
          style={{ width: "100%", height: "100%" }}
        />
        <div
          className="absolute motion-safe:animate-[sign-spin_150s_linear_infinite] motion-reduce:animate-none"
          style={{
            left: RING.left,
            top: RING.top,
            width: RING.size,
            height: RING.size,
            transformOrigin: `${RING.originX}% ${RING.originY}%`,
            willChange: "transform",
          }}
        >
          <Image
            src="/images/our-goal-sign-ring.webp"
            alt=""
            width={RING.size}
            height={RING.size}
            sizes={sizes}
            quality={92}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
