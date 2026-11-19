// Pure date/slot logic for the booking panel. Everything is derived from
// `business.hours` and the `booking` config in lib/content.ts.
//
// Dates are handled as plain "YYYY-MM-DD" strings (calendar days in UK time)
// and times as minutes after midnight, so nothing depends on the visitor's
// own timezone or on the (UTC) build server.

import { booking, business } from "@/lib/content";

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export type OpeningWindow = { open: number; close: number };

/** "8am" / "8:30am" / "12pm" → minutes after midnight. */
function parseClock(text: string): number | null {
  const m = text
    .trim()
    .toLowerCase()
    .match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/);
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (m[3] === "pm") h += 12;
  return h * 60 + Number(m[2] ?? 0);
}

/** "8am–5pm" → { open: 480, close: 1020 }; "Closed" or anything unparseable → null. */
export function parseOpeningWindow(time: string): OpeningWindow | null {
  const parts = time.split(/\s*[–—-]\s*/);
  if (parts.length !== 2) return null;
  const open = parseClock(parts[0]);
  const close = parseClock(parts[1]);
  if (open === null || close === null || close <= open) return null;
  return { open, close };
}

/** Opening hours keyed by weekday index (0 = Sunday), parsed once from business.hours. */
const windowsByWeekday: (OpeningWindow | null)[] = WEEKDAYS.map((day) => {
  const entry = business.hours.find((h) => h.day === day);
  return entry ? parseOpeningWindow(entry.time) : null;
});

export type LondonNow = { date: string; minutes: number; weekday: number };

/** The current calendar date and time-of-day in the booking timezone (Europe/London). */
export function londonNow(now: Date = new Date()): LondonNow {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: booking.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  const date = `${get("year")}-${get("month")}-${get("day")}`;
  return {
    date,
    minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")),
    weekday: weekdayOf(date),
  };
}

function toUtcDate(date: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function addDays(date: string, days: number): string {
  const dt = toUtcDate(date);
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}

export function weekdayOf(date: string): number {
  return toUtcDate(date).getUTCDay();
}

/** Bookable times (minutes after midnight) for a calendar date, given "now" in London. */
export function slotsForDate(date: string, now: LondonNow): number[] {
  const hours = windowsByWeekday[weekdayOf(date)];
  if (!hours || date < now.date) return [];
  const last = hours.close - booking.lastBookingBeforeCloseMinutes;
  const earliest = date === now.date ? now.minutes + booking.minNoticeMinutes : -1;
  const slots: number[] = [];
  for (let t = hours.open; t <= last; t += booking.slotMinutes) {
    if (t >= earliest) slots.push(t);
  }
  return slots;
}

export type BookableDate = { date: string; label: string; slots: number[] };

/** Every date from today to today + maxDaysAhead that still has at least one slot. */
export function bookableDates(now: LondonNow): BookableDate[] {
  const out: BookableDate[] = [];
  for (let i = 0; i <= booking.maxDaysAhead; i++) {
    const date = addDays(now.date, i);
    const slots = slotsForDate(date, now);
    if (slots.length === 0) continue;
    const prefix = i === 0 ? "Today, " : i === 1 ? "Tomorrow, " : "";
    out.push({ date, label: prefix + formatDate(date, "short"), slots });
  }
  return out;
}

/** "Sat 22 Nov" (short) or "Saturday 22 November 2026" (long). */
export function formatDate(date: string, style: "short" | "long"): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    weekday: style === "short" ? "short" : "long",
    day: "numeric",
    month: style === "short" ? "short" : "long",
    ...(style === "long" ? { year: "numeric" } : {}),
  })
    .format(toUtcDate(date))
    .replace(",", "");
}

/** 750 → "12:30pm", 540 → "9:00am" — matches the site's lower-case "8am–5pm" style. */
export function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")}${h < 12 ? "am" : "pm"}`;
}

/** 750 → "12:30" (24h, for OpenTable's datetime param). */
export function formatTime24(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

/** True once an OpenTable restaurant ID is configured — the panel then hands off to OpenTable. */
export const opentableEnabled = /^\d+$/.test(booking.opentableRid.trim());

/**
 * OpenTable's own booking page for this restaurant, pre-filled with the guest's
 * choices. Mirrors the URL OpenTable's official reservation widget opens when
 * "Find a table" is pressed: /booking/restref/availability with rid, restref,
 * lang, partysize and datetime (YYYY-MM-DDTHH:mm, restaurant-local time).
 */
export function opentableUrl(date: string, minutes: number, partySize: number): string {
  const rid = booking.opentableRid.trim();
  const params = new URLSearchParams({
    rid,
    restref: rid,
    lang: booking.opentableLang,
    partysize: String(partySize),
    datetime: `${date}T${formatTime24(minutes)}`,
    ot_source: "Restaurant website",
  });
  return `https://www.opentable.${booking.opentableDomain}/booking/restref/availability?${params}`;
}
