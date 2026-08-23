import { Reveal } from "@/components/Reveal";
import { StaggerHeading } from "@/components/StaggerHeading";
import { menuHighlights } from "@/lib/content";

export function MenuHighlights() {
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
          text="A short menu, done properly."
          className="mb-16 font-display text-4xl font-light leading-tight md:mb-24 md:text-5xl"
        />

        <div className="border-t border-cream/15">
          {menuHighlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="group relative flex flex-col gap-2 border-b border-cream/15 py-8 transition-colors duration-500 md:flex-row md:items-baseline md:gap-8 md:py-10">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-cream/[0.04] transition-[width] duration-700 ease-cinematic group-hover:w-full"
                />
                <span className="relative z-10 font-display text-sm italic text-cream/60 transition-colors duration-500 group-hover:text-brass md:w-12">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative z-10 flex-1 transition-transform duration-700 ease-cinematic md:group-hover:translate-x-2">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-display text-2xl font-light md:text-3xl">
                      {item.title}
                    </h3>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-brass">
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream/60 md:text-base">
                    {item.description}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="relative z-10 hidden font-display text-xl italic text-brass opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block"
                >
                  →
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
