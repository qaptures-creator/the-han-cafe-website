import { Reveal } from "@/components/Reveal";
import { StaggerHeading } from "@/components/StaggerHeading";
import { business } from "@/lib/content";
import { menuPdfPath } from "@/lib/menu";

export function MenuHeader() {
  return (
    <header
      id="top"
      className="relative bg-cream px-6 pb-16 pt-36 text-ink md:px-10 md:pb-24 md:pt-48"
    >
      <div className="relative mx-auto max-w-6xl">
        <Reveal y={12}>
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-stone/50" />
            <p className="text-sm uppercase tracking-[0.28em] text-ink/60">The Menu</p>
          </div>
        </Reveal>

        <StaggerHeading
          as="h1"
          text="Everything on the table."
          className="max-w-3xl font-display text-5xl font-light italic leading-[1.05] md:text-7xl"
        />

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-xl text-base leading-[1.8] text-ink/70 md:text-lg">
            Halal Mediterranean brunch &amp; eatery — Turkish breakfast spreads, brunch
            plates, lunch, burgers and salads, sweet French toast and pancakes, and a long
            list of coffee, matcha and smoothies.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink/10 pt-6 text-sm">
            <span className="uppercase tracking-[0.15em] text-ink/60">
              {business.address.line1}, Slough
            </span>
            <a
              href={menuPdfPath}
              target="_blank"
              rel="noreferrer"
              className="underline-grow uppercase tracking-[0.15em] text-bronze"
            >
              Download menu (PDF)
            </a>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
