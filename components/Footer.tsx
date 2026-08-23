import { business } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-cream px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 border-t border-ink/10 pt-10 text-sm text-ink/60 md:flex-row md:items-center">
        <p className="font-display text-base italic text-ink">{business.name}</p>
        <p>
          {business.address.line1}, {business.address.line2}
        </p>
        <p className="text-ink/40">
          © {new Date().getFullYear()} {business.name}
        </p>
      </div>
    </footer>
  );
}
