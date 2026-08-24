import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { StaggerHeading } from "@/components/StaggerHeading";
import { assetExists } from "@/lib/imageMeta";
import { business } from "@/lib/content";

type GuestPhoto = {
  key: string;
  /** Filename only, under /public/images/customer-gallery/. */
  file: string;
  alt: string;
};

// Photographer names are folded into the alt text (screen-reader
// accessible) rather than overlaid on the image, so busy food/table shots
// stay free of on-image text per the design brief. Each entry only
// renders once its file actually exists on disk (checked below via
// `assetExists`) — approved photos can be dropped into
// /public/images/customer-gallery/ under these exact filenames with no
// code changes needed. To extend past four, add an entry here and give it
// a slot in the lg: grid in CustomerGallery below.
const GUEST_PHOTOS: GuestPhoto[] = [
  {
    key: "turkish-spread",
    file: "guest-turkish-breakfast-spread-mervay.jpg",
    alt: `A full Turkish breakfast spread of cheeses, olives, sujuk, simit and eggs at ${business.name}, shared by guest Mervay Kojack`,
  },
  {
    key: "chocolate-pancakes",
    file: "guest-chocolate-pancake-stack-mervay.jpg",
    alt: `A chocolate pancake stack with fresh berries at ${business.name}, shared by guest Mervay Kojack`,
  },
  {
    key: "chicken-schnitzel",
    file: "guest-chicken-schnitzel-tahmina.jpg",
    alt: `Chicken schnitzel with fries and a side salad at ${business.name}, shared by guest Tahmina`,
  },
  {
    key: "pancake-poached-egg",
    file: "guest-pancake-poached-egg-abubakr.jpg",
    alt: `A pancake stack topped with poached egg and berry compote at ${business.name}, shared by guest Abubakr Bankole`,
  },
];

function Tile({
  photo,
  sizes,
  delay = 0,
  parallax = false,
}: {
  photo: GuestPhoto;
  sizes: string;
  delay?: number;
  parallax?: boolean;
}) {
  const content = (
    <div className="group relative h-full w-full overflow-hidden rounded-sm">
      <Photo
        src={`/images/customer-gallery/${photo.file}`}
        alt={photo.alt}
        sizes={sizes}
        quality={82}
        className="transition-transform duration-[1400ms] ease-cinematic group-hover:scale-[1.04]"
      />
    </div>
  );

  return (
    <Reveal delay={delay} className="h-full w-full">
      {parallax ? (
        <Parallax strength={20} className="h-full w-full rounded-sm">
          {content}
        </Parallax>
      ) : (
        content
      )}
    </Reveal>
  );
}

/**
 * "Through their eyes" — an asymmetrical editorial collage of approved
 * guest photography: one large anchor plus up to three supporting images.
 * Mobile is a snap-scroll strip, tablet a balanced two-column grid, desktop
 * the full magazine-style split. Renders nothing if no approved files are
 * present yet.
 */
export function CustomerGallery() {
  const photos = GUEST_PHOTOS.filter((photo) =>
    assetExists(`images/customer-gallery/${photo.file}`)
  );

  if (photos.length === 0) return null;

  const [anchor, ...supporting] = photos;

  return (
    <section className="bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-4 md:mb-8">
          <span className="h-px w-10 bg-stone/50" />
          <p className="text-sm uppercase tracking-[0.28em] text-ink/60">Shared by guests</p>
        </div>

        <StaggerHeading
          text="Through their eyes."
          className="mb-6 font-display text-4xl font-light leading-tight text-ink md:text-5xl"
        />

        <p className="mb-14 max-w-lg text-sm leading-relaxed text-ink/55 md:mb-20">
          Real moments from real visits — photographed and shared by the guests who took them,
          not staged for us.
        </p>

        <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-6 lg:grid-cols-12">
          <div className="aspect-[4/5] w-[78%] shrink-0 snap-center sm:w-auto lg:col-span-8 lg:aspect-auto lg:row-span-2">
            <Tile
              photo={anchor}
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 66vw"
              parallax
            />
          </div>

          {supporting[0] && (
            <div className="aspect-[4/5] w-[78%] shrink-0 snap-center sm:w-auto lg:col-span-4 lg:aspect-[4/3]">
              <Tile
                photo={supporting[0]}
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 33vw"
                delay={0.08}
              />
            </div>
          )}

          {supporting[1] && (
            <div className="aspect-[4/5] w-[78%] shrink-0 snap-center sm:w-auto lg:col-span-2 lg:aspect-square">
              <Tile
                photo={supporting[1]}
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 17vw"
                delay={0.16}
              />
            </div>
          )}

          {supporting[2] && (
            <div className="aspect-[4/5] w-[78%] shrink-0 snap-center sm:w-auto lg:col-span-2 lg:aspect-square">
              <Tile
                photo={supporting[2]}
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 17vw"
                delay={0.24}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
