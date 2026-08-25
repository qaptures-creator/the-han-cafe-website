"use client";

import { useLayoutEffect, useRef, useState } from "react";

type CoverLayout = {
  /** Uniform scale factor to apply to a `nativeWidth x nativeHeight` layer so it covers the container. */
  scale: number;
  /** Pixel offset (in container space) for the layer's top-left corner, in the layer's own pre-scale units. */
  x: number;
  y: number;
  /** False until the container has been measured at least once. Server-rendered HTML has no viewport to
   * measure against, so `scale` starts at an arbitrary 1 — callers should stay hidden until this flips to
   * true, rather than briefly painting that un-scaled, incorrectly-cropped guess. */
  ready: boolean;
};

/**
 * Replicates `object-fit: cover` + `object-position` math for a *group* of
 * absolutely-positioned children (a background image plus independently
 * animated overlays) rather than a single `<img>`. Measures the container
 * via ResizeObserver and returns a scale + translate to apply to a wrapper
 * sized at the image's native `nativeWidth x nativeHeight` — since every
 * child (background and overlays alike) lives inside that same wrapper and
 * is positioned in native-pixel space, they all crop and scale in perfect
 * sync with each other at any viewport size, the same way a single `cover`
 * image would, but the overlays can move independently on top of it.
 *
 * `positionX`/`positionY` are 0-100, matching CSS `object-position`
 * percentages (50/50 = center, 50/38 = "center 38%", etc).
 */
export function useCoverLayout(
  nativeWidth: number,
  nativeHeight: number,
  positionX = 50,
  positionY = 50
): { containerRef: React.RefObject<HTMLDivElement | null>; layout: CoverLayout } {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<CoverLayout>({ scale: 1, x: 0, y: 0, ready: false });

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function measure() {
      const { width: cw, height: ch } = el!.getBoundingClientRect();
      if (cw === 0 || ch === 0) return;

      const containerRatio = cw / ch;
      const imageRatio = nativeWidth / nativeHeight;
      const scale = containerRatio > imageRatio ? cw / nativeWidth : ch / nativeHeight;

      const scaledWidth = nativeWidth * scale;
      const scaledHeight = nativeHeight * scale;
      const x = -(scaledWidth - cw) * (positionX / 100);
      const y = -(scaledHeight - ch) * (positionY / 100);

      setLayout({ scale, x, y, ready: true });
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [nativeWidth, nativeHeight, positionX, positionY]);

  return { containerRef, layout };
}
