import Image from "next/image";

type ImageSlotProps = {
  src?: string;
  alt: string;
  label: string;
  className?: string;
  priority?: boolean;
};

/**
 * A photo slot. Pass `src` once real photography exists for this spot;
 * until then it renders a quiet, on-brand placeholder with a small label
 * naming what belongs here (see README "Adding your own images").
 */
export function ImageSlot({ src, alt, label, className, priority }: ImageSlotProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-sand/60 ${className ?? ""}`}
      style={{
        backgroundImage:
          "radial-gradient(120% 120% at 20% 15%, rgba(23,20,15,0.05), transparent 60%)",
      }}
    >
      <div className="absolute inset-0 opacity-[0.06] mix-blend-multiply [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-ink/50">
        <span className="h-1.5 w-1.5 rounded-full bg-ink/30" />
        <span className="text-[11px] uppercase tracking-[0.2em]">{label}</span>
      </div>
    </div>
  );
}
