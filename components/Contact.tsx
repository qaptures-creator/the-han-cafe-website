import { Reveal } from "@/components/Reveal";
import { StaggerHeading } from "@/components/StaggerHeading";
import { ContactForm } from "@/components/ContactForm";
import { business } from "@/lib/content";

export function Contact() {
  return (
    <section id="contact" className="relative bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-[1fr_1.25fr] md:gap-24">
        <div>
          <Reveal>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-stone/50" />
              <p className="text-sm uppercase tracking-[0.28em] text-ink/60">Contact</p>
            </div>
          </Reveal>

          <StaggerHeading
            text="Say hello."
            className="font-display text-4xl font-light leading-tight text-ink md:text-5xl"
          />

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-sm text-base leading-[1.8] text-ink/70 md:text-lg">
              Planning a group brunch, a celebration, or just have a question? Send us a note and
              we&apos;ll come back to you.
            </p>

            <dl className="mt-12 space-y-8 border-t border-ink/10 pt-8">
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-ink/60">Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${business.email}`}
                    className="underline-grow break-all font-display text-xl italic text-ink"
                  >
                    {business.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-ink/60">Instagram</dt>
                <dd className="mt-2">
                  <a
                    href={`https://www.instagram.com/${business.social.instagram}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-grow font-display text-xl italic text-ink"
                  >
                    @{business.social.instagram}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="md:pt-24">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
