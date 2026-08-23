import Image from "next/image";
import { business } from "@/lib/content";

type FooterProps = {
  hasLogo: boolean;
  logoDimensions: { width: number; height: number } | null;
};

export function Footer({ hasLogo, logoDimensions }: FooterProps) {
  return (
    <footer className="bg-cream px-6 py-12 md:px-10">
      <div className="mx-auto max-w-6xl border-t border-ink/10 pt-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {hasLogo && logoDimensions ? (
            <Image
              src="/images/TheHanLogo.png"
              alt={`${business.name} logo`}
              width={logoDimensions.width}
              height={logoDimensions.height}
              className="h-7 w-auto opacity-90"
            />
          ) : (
            <p className="font-display text-base italic text-ink">{business.name}</p>
          )}

          <p className="text-sm text-ink/60">
            {business.address.line1}, {business.address.line2}
          </p>

          <a
            href="#top"
            className="underline-grow text-sm uppercase tracking-[0.15em] text-ink/60"
          >
            Back to top
          </a>
        </div>

        <p className="mt-8 text-xs text-ink/40">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
