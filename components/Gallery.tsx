import { Reveal } from "@/components/Reveal";
import { StaggerHeading } from "@/components/StaggerHeading";
import { ImageSlot } from "@/components/ImageSlot";
import { business } from "@/lib/content";

function Tile({
  src,
  alt,
  label,
  className,
}: {
  src?: string;
  alt: string;
  label: string;
  className: string;
}) {
  return (
    <div className={className}>
      <div className="group h-full w-full overflow-hidden rounded-sm">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-cinematic group-hover:scale-[1.05]"
          />
        ) : (
          <ImageSlot alt={alt} label={label} className="h-full w-full" />
        )}
      </div>
    </div>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-5 text-sm uppercase tracking-[0.28em] text-stone">
            A Look Inside
          </p>
        </Reveal>

        <StaggerHeading
          text="The room, the light, the plate."
          className="mb-16 font-display text-4xl font-light leading-tight text-ink md:mb-20 md:text-5xl"
        />

        <div className="grid grid-cols-6 gap-4 md:gap-6">
          <Reveal className="col-span-6 md:col-span-3" y={36}>
            <Tile
              alt={`A plated dish at ${business.name}`}
              label="food-detail.jpg — a different plated dish or close-up"
              className="aspect-[4/5]"
            />
          </Reveal>

          <Reveal className="col-span-6 md:col-span-3 md:mt-16" y={36} delay={0.1}>
            <Tile
              alt={`Coffee being poured at ${business.name}`}
              label="coffee-pour.jpg — action shot at the counter"
              className="aspect-[4/5]"
            />
          </Reveal>

          <Reveal className="col-span-3 md:col-span-2" y={36} delay={0.15}>
            <Tile
              alt={`Pastry counter at ${business.name}`}
              label="pastry-counter.jpg"
              className="aspect-square"
            />
          </Reveal>

          <Reveal className="col-span-3 md:col-span-2" y={36} delay={0.2}>
            <Tile
              alt={`Seating detail at ${business.name}`}
              label="seating-detail.jpg"
              className="aspect-square"
            />
          </Reveal>

          <Reveal className="col-span-6 md:col-span-2" y={36} delay={0.25}>
            <Tile
              alt={`Exterior of ${business.name} on Farnham Road`}
              label="exterior.jpg"
              className="aspect-square"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
