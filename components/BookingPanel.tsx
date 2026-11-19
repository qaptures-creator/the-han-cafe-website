"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { booking, business } from "@/lib/content";
import {
  LondonNow,
  bookableDates,
  formatDate,
  formatTime,
  londonNow,
  opentableEnabled,
  opentableUrl,
  slotsForDate,
} from "@/lib/booking";

// Request mode (no OpenTable rid yet) posts to the same FormSubmit inbox as
// components/ContactForm.tsx — see the note there about form activation.
const ENDPOINT = `https://formsubmit.co/ajax/${business.email}`;

type Status = "idle" | "sending" | "sent" | "error";
type Sent = { date: string; time: number; guests: number; email: string };

const label =
  "text-xs uppercase tracking-[0.2em] text-cream/60 transition-colors duration-300 group-focus-within:text-brass";
const underline =
  "booking-field w-full rounded-none border-0 border-b border-cream/25 bg-transparent px-0 py-3 text-base text-cream [color-scheme:dark] transition-[border-color,box-shadow] duration-300 placeholder:text-cream/35 hover:border-cream/45 focus:border-brass focus:shadow-[0_1px_0_0_#b08d57] focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:text-cream/40";
const select = `${underline} cursor-pointer appearance-none pr-8`;
const button =
  "inline-flex min-h-[3.25rem] shrink-0 items-center whitespace-nowrap justify-center gap-3 bg-cream px-9 py-4 text-sm uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-brass focus-visible:bg-brass disabled:pointer-events-none disabled:opacity-50";

function Chevron() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 8"
      className="pointer-events-none absolute bottom-[1.15rem] right-1 h-2 w-3 text-brass"
    >
      <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

const guestLabel = (n: number) => `${n} ${n === 1 ? "guest" : "guests"}`;
const guestOptions = Array.from({ length: booking.maxPartySize }, (_, i) => i + 1);

export function BookingPanel() {
  // "Now" in UK time is only knowable in the browser — the page is statically
  // prerendered — so the pickers fill in after mount and refresh each minute
  // so today's slots drop off as they pass.
  const [now, setNow] = useState<LondonNow | null>(null);
  useEffect(() => {
    const tick = () => setNow(londonNow());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const dates = useMemo(() => (now ? bookableDates(now) : []), [now]);
  const [chosenDate, setChosenDate] = useState("");
  const [chosenTime, setChosenTime] = useState<number | null>(null);
  const [guests, setGuests] = useState(2);
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState("");
  const [sent, setSent] = useState<Sent | null>(null);
  const sentRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (status === "sent") sentRef.current?.focus();
  }, [status]);

  // Effective selection: fall back to the first open day / first free slot
  // whenever the chosen one isn't (or is no longer) available.
  const day = dates.find((d) => d.date === chosenDate) ?? dates[0];
  const time =
    day && chosenTime !== null && day.slots.includes(chosenTime) ? chosenTime : day?.slots[0];
  const ready = Boolean(day && time !== undefined);

  async function onRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!day || time === undefined) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_honey")) return;

    // Re-check against the clock at the moment of sending.
    const fresh = londonNow();
    if (!slotsForDate(day.date, fresh).includes(time)) {
      setNow(fresh);
      setNotice("That time has just passed — please choose another.");
      return;
    }

    setNotice("");
    setStatus("sending");
    const when = `${formatDate(day.date, "short")}, ${formatTime(time)}`;
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          request: "Table booking request — not yet confirmed. Please reply to confirm.",
          date: formatDate(day.date, "long"),
          time: formatTime(time),
          guests,
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone") || "—",
          notes: data.get("notes") || "—",
          _subject: `Table request — ${when} · ${guestLabel(guests)} — ${business.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const json = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
      if (res.ok && (json?.success === true || json?.success === "true")) {
        setSent({ date: day.date, time, guests, email: String(data.get("email") ?? "") });
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const pickers = (
    <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-[1.35fr_1fr_1fr] sm:gap-x-8">
      <label className="group col-span-2 block sm:col-span-1">
        <span className={label}>Date</span>
        <span className="relative block">
          <select
            name="date"
            value={day?.date ?? ""}
            onChange={(e) => setChosenDate(e.target.value)}
            disabled={!ready}
            className={select}
          >
            {day ? (
              dates.map((d) => (
                <option key={d.date} value={d.date} className="bg-ink text-cream">
                  {d.label}
                </option>
              ))
            ) : (
              <option value="">Loading dates…</option>
            )}
          </select>
          <Chevron />
        </span>
      </label>

      <label className="group block">
        <span className={label}>Time</span>
        <span className="relative block">
          <select
            name="time"
            value={time ?? ""}
            onChange={(e) => setChosenTime(Number(e.target.value))}
            disabled={!ready}
            className={select}
          >
            {day ? (
              day.slots.map((t) => (
                <option key={t} value={t} className="bg-ink text-cream">
                  {formatTime(t)}
                </option>
              ))
            ) : (
              <option value="">—</option>
            )}
          </select>
          <Chevron />
        </span>
      </label>

      <label className="group block">
        <span className={label}>Guests</span>
        <span className="relative block">
          <select
            name="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className={select}
          >
            {guestOptions.map((n) => (
              <option key={n} value={n} className="bg-ink text-cream">
                {guestLabel(n)}
              </option>
            ))}
          </select>
          <Chevron />
        </span>
      </label>
    </div>
  );

  const largerGroup = (
    <p className="text-sm leading-relaxed text-cream/60">
      More than {booking.maxPartySize} of you?{" "}
      <a href="#contact" className="underline-grow text-brass">
        Get in touch
      </a>{" "}
      and we&apos;ll set something up.
    </p>
  );

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-brass">Reservations</p>
        <h3 className="mt-4 font-display text-3xl font-light leading-tight md:text-4xl">
          Book a table
        </h3>
        <p className="mt-5 max-w-sm text-base leading-[1.8] text-cream/70">
          {opentableEnabled
            ? "Choose a day, time and party size, then confirm your booking with OpenTable."
            : "Choose a day, time and party size and send us a request. We'll email you to confirm — your table isn't booked until you hear back from us."}
        </p>
        <div className="mt-6 hidden lg:block">{largerGroup}</div>
      </div>

      <div>
        {opentableEnabled ? (
          <div className="space-y-10">
            {pickers}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              {ready && day && time !== undefined ? (
                <a
                  href={opentableUrl(day.date, time, guests)}
                  target="_blank"
                  rel="noopener"
                  className={button}
                  data-testid="opentable-link"
                >
                  Find a table
                  <span className="sr-only"> on OpenTable (opens in a new tab)</span>
                  <span aria-hidden>↗</span>
                </a>
              ) : (
                <span aria-disabled="true" className={`${button} pointer-events-none opacity-50`}>
                  Find a table
                </span>
              )}
              <p className="text-xs leading-relaxed text-cream/50">
                Opens OpenTable in a new tab to confirm.
              </p>
            </div>
            <div className="lg:hidden">{largerGroup}</div>
          </div>
        ) : status === "sent" && sent ? (
          <div ref={sentRef} tabIndex={-1} className="focus:outline-none lg:pt-6">
            <p className="font-display text-3xl font-light italic">Request sent.</p>
            <p className="mt-4 max-w-lg text-base leading-[1.8] text-cream/70">
              We&apos;ve got your request for{" "}
              <span className="text-cream">{guestLabel(sent.guests)}</span> on{" "}
              <span className="text-cream">
                {formatDate(sent.date, "long")} at {formatTime(sent.time)}
              </span>
              . We&apos;ll email <span className="break-words text-cream">{sent.email}</span> to
              confirm — your table isn&apos;t booked until you hear back from us.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setSent(null);
              }}
              className="underline-grow mt-8 text-sm uppercase tracking-[0.15em] text-brass"
            >
              Make another request
            </button>
          </div>
        ) : (
          <form onSubmit={onRequest} className="space-y-10" aria-label="Table booking request">
            {pickers}

            <fieldset>
              <legend className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-brass">
                <span aria-hidden className="h-px w-8 bg-brass/60" />
                Your details
              </legend>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <label className="group block">
                  <span className={label}>Name</span>
                  <input
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    autoComplete="name"
                    className={underline}
                  />
                </label>
                <label className="group block">
                  <span className={label}>Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    className={underline}
                  />
                </label>
                <label className="group block">
                  <span className={label}>
                    Phone{" "}
                    <span className="normal-case tracking-normal text-cream/40">(optional)</span>
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    maxLength={30}
                    autoComplete="tel"
                    className={underline}
                  />
                </label>
                <label className="group block">
                  <span className={label}>
                    Notes{" "}
                    <span className="normal-case tracking-normal text-cream/40">(optional)</span>
                  </span>
                  <input
                    name="notes"
                    type="text"
                    maxLength={500}
                    placeholder="Occasion, high chair…"
                    className={underline}
                  />
                </label>
              </div>
            </fieldset>

            {/* Honeypot for bots — hidden from people and assistive tech. */}
            <input
              type="text"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="space-y-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" disabled={!ready || status === "sending"} className={button}>
                  {status === "sending" ? "Sending…" : "Request a table"}
                </button>
                <p className="max-w-xs text-xs leading-relaxed text-cream/50">
                  This is a request, not an instant booking — we&apos;ll confirm by email.
                </p>
              </div>

              <p aria-live="polite" className="text-sm leading-relaxed text-cream/70">
                {notice}
                {status === "error" && day && time !== undefined && (
                  <>
                    Sorry — that didn&apos;t send. Please email us directly at{" "}
                    <a
                      href={`mailto:${business.email}?subject=${encodeURIComponent(
                        `Table request — ${formatDate(day.date, "short")}, ${formatTime(time)} · ${guestLabel(guests)}`,
                      )}`}
                      className="text-brass underline"
                    >
                      {business.email}
                    </a>
                    .
                  </>
                )}
              </p>
            </div>

            <div className="lg:hidden">{largerGroup}</div>
          </form>
        )}
      </div>
    </div>
  );
}
