import { Reveal } from "@/components/Reveal";
import { StaggerHeading } from "@/components/StaggerHeading";
import { HoursList } from "@/components/HoursList";
import { business } from "@/lib/content";

export function Visit() {
  const mapQuery = encodeURIComponent(
    `${business.name}, ${business.address.line1}, ${business.address.line2}`
  );

  return (
    <section id="visit" className="relative bg-ink px-6 py-28 text-cream md:px-10 md:py-40">
      <div aria-hidden className="texture-grain absolute inset-0" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 flex items-center gap-4 md:mb-20">
          <span className="h-px w-10 bg-cream/30" />
          <p className="text-sm uppercase tracking-[0.28em] text-cream/50">Visit</p>
        </div>

        <StaggerHeading
          text="Find your table."
          className="mb-14 font-display text-4xl font-light leading-tight md:mb-16 md:text-5xl"
        />

        <div className="grid grid-cols-1 border border-cream/15 md:grid-cols-2">
          <Reveal className="border-b border-cream/15 p-8 md:border-b-0 md:border-r md:p-14">
            <div className="space-y-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cream/60">Address</p>
                <p className="mt-3 text-xl font-light">
                  {business.address.line1}
                  <br />
                  {business.address.line2}
                </p>
                <a
                  href={business.address.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-grow mt-4 inline-block text-sm uppercase tracking-[0.15em] text-brass"
                >
                  Get Directions
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cream/60">Hours</p>
                <HoursList />
              </div>

              {business.phone && (
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cream/60">Phone</p>
                  <a
                    href={`tel:${business.phone}`}
                    className="underline-grow mt-2 inline-block text-lg font-light"
                  >
                    {business.phone}
                  </a>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="min-h-[360px] md:min-h-[540px]">
            <div className="h-full w-full grayscale-[0.35] contrast-[1.05]">
              <iframe
                title={`Map to ${business.name}`}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-full w-full min-h-[360px] border-0 md:min-h-[540px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
