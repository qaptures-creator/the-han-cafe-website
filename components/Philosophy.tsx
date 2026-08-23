import { Reveal } from "@/components/Reveal";
import { StaggerHeading } from "@/components/StaggerHeading";
import { Parallax } from "@/components/Parallax";
import { business, philosophy } from "@/lib/content";

export function Philosophy() {
  return (
    <section id="philosophy" className="bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">
        <div>
          <Reveal>
            <p className="mb-5 text-sm uppercase tracking-[0.28em] text-stone">
              {philosophy.eyebrow}
            </p>
          </Reveal>

          <StaggerHeading
            text={philosophy.heading}
            className="font-display text-4xl font-light leading-tight text-ink md:text-5xl"
          />

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink/70 md:text-lg">
              {philosophy.body}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-8 text-sm tracking-[0.05em] text-ink/50">
              {business.rating.toFixed(1)} ★ on Google · {business.reviewCount} reviews
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="order-first md:order-last">
          <Parallax strength={30} className="aspect-[4/5] w-full rounded-sm">
            <div className="group h-full w-full overflow-hidden rounded-sm">
              <img
                src="/images/interior-source.png"
                alt={`Inside ${business.name} — arched limewash wall and brass pendant lights`}
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-cinematic group-hover:scale-[1.04]"
              />
            </div>
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
