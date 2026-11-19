"use client";

import { useEffect, useRef, useState } from "react";

type Category = { id: string; label: string };

/**
 * Sticky, horizontally scrollable category bar for the /menu page.
 * Plain anchor links (work without JS, respect the browser's own scroll
 * handling); a rAF-throttled scroll listener highlights the section in view
 * and keeps its pill visible inside the bar.
 */
export function CategoryNav({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(categories[0]?.id);
  const barRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // The active section is the last one whose top has passed a line just
    // below the fixed header + this bar (sections use a matching scroll-margin).
    const LINE = 200;
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = sections[0].id;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= LINE) current = s.id;
        else break;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [categories]);

  // Keep the active pill in view inside the bar without moving the page.
  useEffect(() => {
    const bar = barRef.current;
    const pill = active ? pillRefs.current[active] : null;
    if (!bar || !pill) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = pill.offsetLeft - (bar.clientWidth - pill.offsetWidth) / 2;
    bar.scrollTo({ left: Math.max(0, target), behavior: reduced ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-16 z-30 border-y border-ink/10 bg-cream/95 backdrop-blur-md md:top-20"
    >
      <div className="relative mx-auto max-w-6xl">
        <div
          ref={barRef}
          className="no-scrollbar flex gap-2 overflow-x-auto px-6 py-3 md:px-10"
        >
          {categories.map((c) => {
            const isActive = c.id === active;
            return (
              <a
                key={c.id}
                ref={(el) => {
                  pillRefs.current[c.id] = el;
                }}
                href={`#${c.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors duration-300 ${
                  isActive
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink"
                }`}
              >
                {c.label}
              </a>
            );
          })}
        </div>
        {/* Edge fades hint that the bar scrolls sideways. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-cream to-transparent md:hidden"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cream to-transparent"
        />
      </div>
    </nav>
  );
}
