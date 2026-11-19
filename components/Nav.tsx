"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { business } from "@/lib/content";

// `hash` links point at homepage sections; `page` links are routes.
const links = [
  { hash: "#philosophy", label: "Our Goal" },
  { page: "/menu", label: "Menu" },
  { hash: "#gallery", label: "Gallery" },
  { hash: "#visit", label: "Visit" },
] as const;

type NavProps = {
  hasLogo: boolean;
  logoDimensions: { width: number; height: number } | null;
};

export function Nav({ hasLogo, logoDimensions }: NavProps) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  // On the homepage, section links stay in-page anchors; from any other
  // route they go back to the homepage section.
  const resolved = links.map((link) =>
    "page" in link
      ? { href: link.page, label: link.label, isPage: true, current: pathname === link.page }
      : { href: onHome ? link.hash : `/${link.hash}`, label: link.label, isPage: false, current: false }
  );
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  // Only the homepage has a full-bleed hero behind a transparent header;
  // every other route starts with the solid (cream) header.
  const solid = scrolled || !onHome;
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 80));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // One fixed-height logo, identical in both header states — no wrapper
  // background, no clipping, no conditional sizing, nothing that resizes
  // or shifts it when `solid` toggles. Only the header around it changes.
  // Height is fixed and width follows the source image's real aspect
  // ratio (object-contain), so the wordmark is never cropped or distorted.
  const brandMark =
    hasLogo && logoDimensions ? (
      <Image
        src="/images/The-han-logo.png"
        alt={`${business.name} logo`}
        width={logoDimensions.width}
        height={logoDimensions.height}
        priority
        className="h-14 w-auto shrink-0 object-contain md:h-16"
      />
    ) : (
      <span className="font-display text-lg tracking-[0.15em] text-ink">
        {business.name.toUpperCase()}
      </span>
    );

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.33, 0.6, 0.35, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid
            ? "border-b border-ink/10 bg-cream/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 md:h-20 md:px-10">
          <a
            href={onHome ? "#top" : "/"}
            aria-label={onHome ? undefined : `${business.name} home`}
            className="shrink-0"
            onClick={() => setOpen(false)}
          >
            {brandMark}
          </a>

          <ul className="hidden shrink-0 items-center gap-7 whitespace-nowrap lg:flex xl:gap-9">
            {resolved.map((link) => {
              const className = `underline-grow text-sm uppercase tracking-[0.15em] transition-colors ${
                solid ? "text-ink/80 hover:text-ink" : "text-cream/85 hover:text-cream"
              }`;
              return (
                <li key={link.href}>
                  {link.isPage ? (
                    <Link
                      href={link.href}
                      aria-current={link.current ? "page" : undefined}
                      className={className}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className={className}>
                      {link.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-5">
            <a
              href={business.address.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className={`underline-grow hidden whitespace-nowrap text-sm uppercase tracking-[0.15em] lg:inline-block ${
                solid ? "text-ink" : "text-cream"
              }`}
            >
              Directions
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative flex h-9 w-9 items-center justify-center lg:hidden"
            >
              <span
                className={`absolute h-px w-5 transition-all duration-300 ease-cinematic ${
                  solid || open ? "bg-ink" : "bg-cream"
                } ${open ? "translate-y-0 rotate-45" : "-translate-y-[5px]"}`}
              />
              <span
                className={`absolute h-px w-5 transition-all duration-300 ease-cinematic ${
                  solid || open ? "bg-ink" : "bg-cream"
                } ${open ? "opacity-0" : "translate-y-[5px]"}`}
              />
              <span
                className={`absolute h-px w-5 transition-all duration-300 ease-cinematic ${
                  solid || open ? "bg-ink" : "bg-cream"
                } ${open ? "translate-y-0 -rotate-45" : "translate-y-[5px]"}`}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.button
            aria-label="Dismiss menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink/50 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 z-40 border-b border-ink/10 bg-cream px-6 pb-10 pt-8 shadow-[0_20px_50px_-20px_rgba(23,20,15,0.25)] md:top-20 lg:hidden"
          >
            <ul>
              {resolved.map((link) => (
                <li key={link.href} className="border-b border-ink/10">
                  {link.isPage ? (
                    <Link
                      href={link.href}
                      aria-current={link.current ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className="block py-4 font-display text-2xl font-light italic text-ink"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 font-display text-2xl font-light italic text-ink"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <a
              href={business.address.mapsUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-8 inline-block text-sm uppercase tracking-[0.2em] text-bronze"
            >
              Get Directions →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
