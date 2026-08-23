import Image from "next/image";

type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  quality?: number;
  priority?: boolean;
  className?: string;
  objectPosition?: string;
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
}: PhotoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      quality={quality}
      sizes={sizes}
      className={`object-cover ${className ?? ""}`}
      style={objectPosition ? { objectPosition } : undefined}
    />
  );
}
