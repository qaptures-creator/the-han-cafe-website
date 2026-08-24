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

// No confirmed reviewer name is attached to these yet, so alt text credits
// "a guest" generically rather than guessing an identity. Each entry only
// renders once its file actually exists on disk (checked below via
// `assetExists`) — approved photos can be dropped into
// /public/images/customer-gallery/ under these exact filenames with no
// code changes needed. To extend past five, add an entry here and give it
// a slot in the lg: grid in CustomerGallery below.
const GUEST_PHOTOS: GuestPhoto[] = [
  {
    key: "breakfast-spread",
    file: "guest-breakfast-spread-experience.webp",
    alt: `A shared breakfast spread of cheeses, charcuterie, eggs and fresh fruit at ${business.name}, shared by a guest`,
  },
  {
    key: "french-toast-berry",
    file: "guest-french-toast-berry-compote.webp",
    alt: `Brioche French toast with mixed berries and berry compote at ${business.name}, shared by a guest`,
  },
  {
    key: "french-toast-custard",
    file: "guest-french-toast-custard-crumble.webp",
    alt: `French toast with custard crumble topping and fresh berries at ${business.name}, shared by a guest`,
  },
  {
    key: "avocado-toast",
    file: "guest-avocado-toast.webp",
    alt: `Avocado and whipped feta on sourdough toast at ${business.name}, shared by a guest`,
  },
  {
    key: "chicken-parmesan",
    file: "guest-chicken-parmesan-fries.webp",
    alt: `Chicken parmesan with fries and a side salad at ${business.name}, shared by a guest`,
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
 * guest photography: one large anchor plus up to four supporting images.
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
          <div className="aspect-[4/5] w-[78%] shrink-0 snap-center sm:aspect-[16/10] sm:w-auto sm:col-span-2 lg:col-span-12 lg:aspect-[21/9]">
            <Tile
              photo={anchor}
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 100vw, 92vw"
              parallax
            />
          </div>

          {supporting.map((photo, i) => (
            <div
              key={photo.key}
              className="aspect-[4/5] w-[78%] shrink-0 snap-center sm:w-auto lg:col-span-3 lg:aspect-square"
            >
              <Tile
                photo={photo}
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 23vw"
                delay={0.08 * (i + 1)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
