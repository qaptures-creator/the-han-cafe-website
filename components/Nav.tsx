"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { business } from "@/lib/content";

const links = [
  { href: "#philosophy", label: "Philosophy" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#visit", label: "Visit" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setSolid(latest > 80);
  });

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-cream/90 backdrop-blur-md border-b border-ink/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#top"
          className="font-display text-lg tracking-[0.15em] text-ink"
        >
          {business.name.toUpperCase()}
        </a>
        <ul className="hidden gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="underline-grow text-sm uppercase tracking-[0.15em] text-ink/80 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={business.address.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="underline-grow hidden text-sm uppercase tracking-[0.15em] text-ink md:inline-block"
        >
          Directions
        </a>
      </nav>
    </motion.header>
  );
}
