"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type ParallaxProps = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
};

/** Subtle vertical drift tied to scroll progress. GPU transform only — no layout thrash. */
export function Parallax({ children, strength = 50, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        style={{ y: reduced ? 0 : y, willChange: reduced ? undefined : "transform" }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
