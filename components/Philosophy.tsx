import { Reveal } from "@/components/Reveal";
import { StaggerHeading } from "@/components/StaggerHeading";
import { Parallax } from "@/components/Parallax";
import { Photo } from "@/components/Photo";
import { business, philosophy } from "@/lib/content";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative bg-cream px-6 py-28 md:px-10 md:py-40"
    >
      {/* Overlap the transformed hero by a few pixels to prevent a sub-pixel
          seam appearing between the fade and this matching background. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-1 h-2 bg-cream"
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <div>
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
            className="font-display text-4xl font-light leading-tight text-ink md:text-5xl"
          />

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-lg text-base leading-[1.8] text-ink/70 md:text-lg">
              {philosophy.body}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex items-center gap-4 border-t border-ink/10 pt-6">
              <span className="font-display text-lg italic text-bronze">
                {business.rating.toFixed(1)}
              </span>
              <span className="text-sm tracking-[0.05em] text-ink/70">
                on Google · {business.reviewCount} reviews
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="order-first md:order-last">
          <Parallax strength={30} className="aspect-[4/5] w-full rounded-sm">
            <div className="group relative h-full w-full overflow-hidden rounded-sm">
              <Photo
                src="/images/The-HAN-Hero.png"
                alt={`Inside ${business.name} — arched limewash wall and brass pendant lights`}
                sizes="(max-width: 768px) 100vw, 50vw"
                objectPosition="center 72%"
                className="transition-transform duration-[1400ms] ease-cinematic group-hover:scale-[1.04]"
              />
            </div>
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
