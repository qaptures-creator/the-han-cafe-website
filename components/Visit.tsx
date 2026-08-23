import { Reveal } from "@/components/Reveal";
import { StaggerHeading } from "@/components/StaggerHeading";
import { business } from "@/lib/content";

export function Visit() {
  const mapQuery = encodeURIComponent(
    `${business.name}, ${business.address.line1}, ${business.address.line2}`
  );

  return (
    <section id="visit" className="bg-ink px-6 py-28 text-cream md:px-10 md:py-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
        <div>
          <Reveal>
            <p className="mb-5 text-sm uppercase tracking-[0.28em] text-cream/50">
              Visit
            </p>
          </Reveal>

          <StaggerHeading
            text="Find your table."
            className="mb-12 font-display text-4xl font-light leading-tight md:text-5xl"
          />

          <Reveal delay={0.1}>
            <div className="space-y-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cream/40">Address</p>
                <p className="mt-2 text-lg font-light">
                  {business.address.line1}
                  <br />
                  {business.address.line2}
                </p>
                <a
                  href={business.address.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-grow mt-3 inline-block text-sm uppercase tracking-[0.15em] text-brass"
                >
                  Get Directions
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cream/40">Hours</p>
                <ul className="mt-3 space-y-1.5 text-sm text-cream/75">
                  {business.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-8 max-w-xs">
                      <span>{h.day}</span>
                      <span className="text-cream/50">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {business.phone && (
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cream/40">Phone</p>
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
        </div>

        <Reveal delay={0.15}>
          <div className="aspect-square w-full overflow-hidden rounded-sm md:aspect-auto md:h-full grayscale-[0.3] contrast-[1.05]">
            <iframe
              title={`Map to ${business.name}`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-full w-full min-h-[360px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
