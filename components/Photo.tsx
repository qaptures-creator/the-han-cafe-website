import Image from "next/image";

type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  quality?: number;
  priority?: boolean;
  className?: string;
  objectPosition?: string;
  /**
   * Use instead of `objectPosition` when the crop needs to differ by
   * breakpoint, e.g. "object-[center_20%] md:object-[center_12%]" — an
   * inline `style` objectPosition always wins over classes, so responsive
   * framing has to go through Tailwind's object-position utilities instead.
   */
  objectPositionClassName?: string;
};

/**
 * Full-bleed cropped photo (fill + object-cover) with an honest `sizes`
 * matching how wide the slot actually renders — the previous hero/gallery
 * blur came from a `sizes` that under-reported the real render width,
 * so the optimizer served a half-resolution source that got stretched.
 */
export function Photo({
  src,
  alt,
  sizes,
  quality = 85,
  priority,
  className,
  objectPosition,
  objectPositionClassName,
}: PhotoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      quality={quality}
      sizes={sizes}
      className={`object-cover ${objectPositionClassName ?? ""} ${className ?? ""}`}
      style={objectPositionClassName ? undefined : objectPosition ? { objectPosition } : undefined}
    />
  );
}
