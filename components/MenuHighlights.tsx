import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { StaggerHeading } from "@/components/StaggerHeading";
import { menuHighlights } from "@/lib/content";
import { formatPrice, getMenuItem, menuPdfPath } from "@/lib/menu";

export function MenuHighlights() {
  const items = menuHighlights.map((h) => ({ ...getMenuItem(h.section, h.item), tag: h.tag }));

  return (
    <section id="menu" className="relative bg-ink px-6 py-28 text-cream md:px-10 md:py-40">
      <div aria-hidden className="texture-grain absolute inset-0" />
      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <p className="mb-5 text-sm uppercase tracking-[0.28em] text-cream/50">
            On the Table
          </p>
        </Reveal>

        <StaggerHeading
          text="Turkish mornings, done properly."
          className="mb-16 font-display text-4xl font-light leading-tight md:mb-24 md:text-5xl"
        />

        <div className="border-t border-cream/15">
          {items.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <Link
                href="/menu"
                className="group relative flex flex-col gap-2 border-b border-cream/15 py-8 transition-colors duration-500 md:flex-row md:items-baseline md:gap-8 md:py-10"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-cream/[0.04] transition-[width] duration-700 ease-cinematic group-hover:w-full"
                />
                <span className="relative z-10 font-display text-sm italic text-cream/60 transition-colors duration-500 group-hover:text-brass md:w-12">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative z-10 flex-1 transition-transform duration-700 ease-cinematic md:group-hover:translate-x-2">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-2xl font-light md:text-3xl">
                      {item.name}
                    </h3>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-brass">
                      {item.tag}
                    </span>
                  </div>
                  {item.description && (
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream/60 md:text-base">
                      {item.description}
                    </p>
                  )}
                </div>
                {item.price !== undefined && (
                  <span className="relative z-10 shrink-0 whitespace-nowrap font-display text-xl italic text-brass">
                    {formatPrice(item.price)}
                    {item.priceNote && (
                      <span className="ml-2 font-body text-[11px] not-italic uppercase tracking-[0.15em] text-cream/50">
                        {item.priceNote}
                      </span>
                    )}
                  </span>
                )}
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-5 md:mt-16">
            <Link
              href="/menu"
              className="group inline-flex items-center gap-3 rounded-full border border-cream/30 px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-cream transition-colors duration-500 hover:border-brass hover:text-brass"
            >
              View full menu
              <span
                aria-hidden
                className="transition-transform duration-500 ease-cinematic group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <a
              href={menuPdfPath}
              target="_blank"
              rel="noreferrer"
              className="underline-grow text-sm uppercase tracking-[0.15em] text-cream/60"
            >
              Download menu (PDF)
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
