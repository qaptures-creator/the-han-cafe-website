import { Reveal } from "@/components/Reveal";
import { business } from "@/lib/content";
import { menuPdfPath } from "@/lib/menu";

export function MenuClosing() {
  return (
    <section className="relative bg-ink px-6 py-24 text-cream md:px-10 md:py-32">
      <div aria-hidden className="texture-grain absolute inset-0" />
      <Reveal className="relative mx-auto flex max-w-6xl flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-5 text-sm uppercase tracking-[0.28em] text-cream/50">
            Come hungry
          </p>
          <p className="max-w-xl font-display text-3xl font-light italic leading-tight md:text-4xl">
            Find us at {business.address.line1}, {business.address.line2}.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm uppercase tracking-[0.15em]">
          <a href="/#visit" className="underline-grow text-cream">
            Hours &amp; directions →
          </a>
          <a
            href={menuPdfPath}
            target="_blank"
            rel="noreferrer"
            className="underline-grow text-brass"
          >
            Download menu (PDF)
          </a>
        </div>
      </Reveal>
    </section>
  );
}
