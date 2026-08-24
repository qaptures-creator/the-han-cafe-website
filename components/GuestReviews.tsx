import { Reveal } from "@/components/Reveal";
import { StaggerHeading } from "@/components/StaggerHeading";
import { googleReviews, googleReviewsUrl, type GoogleReview } from "@/lib/googleReviews";
import { business } from "@/lib/content";

/** Two overlaid star rows (a muted track + a bronze fill clipped to the rating's percentage) — no icon dependency, supports fractional ratings like 4.8. */
function StarRow({ rating, className }: { rating: number; className?: string }) {
  const pct = Math.max(0, Math.min(1, rating / 5)) * 100;
  return (
    <span className={`relative inline-block leading-none tracking-[0.15em] ${className ?? ""}`}>
      <span aria-hidden className="text-ink/15">
        ★★★★★
      </span>
      <span
        aria-hidden
        className="absolute inset-0 overflow-hidden text-bronze"
        style={{ width: `${pct}%` }}
      >
        ★★★★★
      </span>
    </span>
  );
}

function ReviewCard({ review, delay }: { review: GoogleReview; delay: number }) {
  return (
    <Reveal delay={delay} className="w-[82%] shrink-0 snap-center sm:w-auto">
      <blockquote className="flex h-full flex-col justify-between rounded-sm border border-stone/25 bg-cream p-7 shadow-[0_18px_40px_-28px_rgba(23,20,15,0.35)] md:p-8">
        <div>
          <StarRow rating={review.rating} className="text-xs" />
          <p className="mt-4 text-[15px] leading-relaxed text-ink/80 md:text-base">
            {review.text}
          </p>
        </div>
        <footer className="mt-6 flex items-baseline justify-between gap-3 border-t border-stone/15 pt-4">
          <cite className="font-display text-base font-light not-italic text-ink">
            {review.name}
          </cite>
          <span className="whitespace-nowrap text-xs uppercase tracking-[0.1em] text-ink/50">
            {review.date}
          </span>
        </footer>
      </blockquote>
    </Reveal>
  );
}

/**
 * Editorial Google reviews section — six verified, unedited excerpts in
 * semantic blockquote/cite cards. Three columns on desktop, two on tablet;
 * on mobile the grid becomes a snap-scroll strip (native touch scrolling,
 * no carousel JS, no auto-advance) so nothing moves on its own.
 */
export function GuestReviews() {
  return (
    <section id="reviews" className="bg-sand/40 px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-stone/50" />
              <p className="text-sm uppercase tracking-[0.28em] text-ink/60">Loved locally</p>
            </div>
            <StaggerHeading
              text="From our guests"
              className="font-display text-4xl font-light leading-tight text-ink md:text-5xl"
            />
          </div>

          <Reveal delay={0.15} className="flex flex-col gap-3 md:items-end">
            <div className="flex items-center gap-3">
              <StarRow rating={business.rating} className="text-lg" />
              <span className="font-display text-2xl font-light text-ink">
                {business.rating.toFixed(1)}
              </span>
              <span className="text-sm text-ink/60">({business.reviewCount} Google reviews)</span>
            </div>
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="underline-grow text-sm uppercase tracking-[0.15em] text-bronze"
            >
              Read all Google reviews
            </a>
          </Reveal>
        </div>

        <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {googleReviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} delay={(i % 3) * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
