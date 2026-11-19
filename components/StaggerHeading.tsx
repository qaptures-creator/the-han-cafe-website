"use client";

import { motion, Variants } from "framer-motion";
import { ElementType, Fragment } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Ease = [number, number, number, number];

type StaggerHeadingProps = {
  text: string;
  as?: ElementType;
  className?: string;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: Ease;
};

/** Word-by-word clipped reveal for display type — the staggered-typography effect. */
export function StaggerHeading({
  text,
  as: Tag = "h2",
  className,
  duration = 0.85,
  stagger = 0.055,
  delay = 0.04,
  ease = [0.16, 1, 0.3, 1],
}: StaggerHeadingProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    const Plain = Tag as ElementType;
    return <Plain className={className}>{text}</Plain>;
  }

  const MotionTag = motion(Tag as ElementType);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { y: "100%" },
    visible: { y: "0%", transition: { duration, ease } },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      variants={container}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden align-top pb-[0.2em]">
            <motion.span className="inline-block" variants={word}>
              {w}
            </motion.span>
          </span>
          {/* Space lives between the word boxes: a trailing space inside an inline-block can collapse. */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
