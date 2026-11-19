import { Reveal } from "@/components/Reveal";
import { StaggerHeading } from "@/components/StaggerHeading";
import { SignWall } from "@/components/SignWall";
import { business, philosophy } from "@/lib/content";

const pillars = ["Halal", "Specialty coffee", "Turkish breakfast"];

/**
 * The café's backlit sign on its arched plaster wall is the backdrop, with
 * the ring of icons around the name turning very slowly. From xl up the photo
 * sits to the right and the copy on the plain plaster to its left; below xl
 * the sign becomes a band above the copy that fades into the same tone.
 */
export function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden bg-plaster">
      {/* Fixed-width photo pinned right: its left half is plain plaster that
          matches bg-plaster exactly, so the sign sits clear of the copy at any
          height, and the cut-off base of the arch fades out at the bottom. */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 hidden aspect-[1672/941] w-[74vw] -translate-y-1/2 xl:block"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 30%), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, #000 30%), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <SignWall sizes="74vw" />
      </div>

      <div className="relative aspect-square w-full sm:aspect-[4/3] md:aspect-[16/9] xl:hidden">
        <SignWall sizes="100vw" positionX={100} positionY={60} />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[14%] bg-gradient-to-b from-plaster/0 to-plaster"
        />
      </div>

      {/* Blend the hero's cream above and the cream section below into the plaster. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-1 z-10 h-28 bg-gradient-to-b from-cream to-cream/0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-cream/0 to-cream"
      />

      <div className="relative z-20 mx-auto flex max-w-6xl items-center px-6 pb-32 pt-6 md:px-10 xl:min-h-[44vw] xl:py-36">
        <div className="max-w-xl xl:max-w-[44%]">
          <Reveal>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-stone/50" />
              <p className="text-sm uppercase tracking-[0.28em] text-ink/60">
                {philosophy.eyebrow}
              </p>
            </div>
          </Reveal>

          <StaggerHeading
            text={philosophy.heading}
            className="font-display text-4xl font-light italic leading-[1.1] text-ink md:text-5xl xl:text-[3.4rem]"
          />

          <Reveal delay={0.15}>
            <p className="mt-8 text-base leading-[1.85] text-ink/70 md:text-lg">
              {philosophy.body}
            </p>
            <p className="mt-5 text-base leading-[1.85] text-ink/70 md:text-lg">
              {philosophy.bodySecondary}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <ul className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 text-xs uppercase tracking-[0.2em] text-ink/70">
              {pillars.map((p, i) => (
                <li key={p} className="flex items-center gap-4">
                  {i > 0 && (
                    <span aria-hidden className="hidden h-1 w-1 rounded-full bg-brass sm:block" />
                  )}
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-4 border-t border-ink/10 pt-6">
              <span className="font-display text-2xl italic text-bronze">
                {business.rating.toFixed(1)}
              </span>
              <span className="text-sm tracking-[0.05em] text-ink/70">
                on Google · {business.reviewCount} reviews
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
