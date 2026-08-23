"use client";

import { motion, Variants } from "framer-motion";
import { ElementType } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.04 },
  },
};

const word: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

type StaggerHeadingProps = {
  text: string;
  as?: ElementType;
  className?: string;
};

/** Word-by-word clipped reveal for display type — the staggered-typography effect. */
export function StaggerHeading({ text, as: Tag = "h2", className }: StaggerHeadingProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    const Plain = Tag as ElementType;
    return <Plain className={className}>{text}</Plain>;
  }

  const MotionTag = motion(Tag as ElementType);

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      variants={container}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top pb-[0.08em]"
        >
          <motion.span className="inline-block" variants={word}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
