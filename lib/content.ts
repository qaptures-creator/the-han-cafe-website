// Single source of truth for editable business facts.
// Update this file to change copy, hours, contact details, etc. across the whole site.

export const business = {
  name: "The HAN",
  tagline: "A quiet table on Farnham Road",
  category: "Cafe",
  priceBand: "£10–20",
  rating: 4.8,
  reviewCount: 49,
  address: {
    line1: "167 Farnham Road",
    line2: "Slough, SL1 4XP",
    mapsUrl: "https://share.google/zrKhELXNuiI1lKX7L",
  },
  // TODO: confirm phone number and add here once available.
  phone: "",
  email: "thehanslough@gmail.com",
  hours: [
    { day: "Monday", time: "8am–5pm" },
    { day: "Tuesday", time: "8am–5pm" },
    { day: "Wednesday", time: "8am–5pm" },
    { day: "Thursday", time: "8am–5pm" },
    { day: "Friday", time: "8am–5pm" },
    { day: "Saturday", time: "8am–5pm" },
    { day: "Sunday", time: "9am–4pm" },
  ],
  social: {
    instagram: "thehanslough",
  },
};

// Table booking panel in the Visit section (components/BookingPanel.tsx).
// Dates and time slots are derived from `business.hours` above — change the
// hours there and the booking options follow automatically.
export const booking = {
  // OpenTable restaurant ID ("rid"). LEAVE EMPTY until The HAN is live on
  // OpenTable. While empty, the panel sends a booking REQUEST by email
  // (FormSubmit → business.email) that the café confirms by hand.
  // Once set, the same panel hands guests to OpenTable's booking page
  // (opentable.co.uk), pre-filled with their date, time and party size.
  //
  // Where to find it — digits only (e.g. "123456"), never a URL:
  //   • Log in to OpenTable for Restaurants and open the reservation widget
  //     page (Restaurant Profile / Marketing → "Reservation widget"). The
  //     embed code it gives you contains `rid=123456` — copy those digits.
  //   • The Restaurant ID is also shown next to the restaurant's name in the
  //     OpenTable dashboard, or OpenTable support can tell you.
  opentableRid: "",
  // OpenTable site the hand-off goes to: "co.uk" for UK restaurants.
  opentableDomain: "co.uk",
  // OpenTable page language.
  opentableLang: "en-GB",
  // All "today" / past-slot logic uses UK time, wherever the visitor is.
  timeZone: "Europe/London",
  // Gap between bookable times, in minutes.
  slotMinutes: 30,
  // Latest booking time = closing time minus this many minutes.
  lastBookingBeforeCloseMinutes: 60,
  // Same-day slots must be at least this far in the future.
  minNoticeMinutes: 30,
  // Largest party bookable online; bigger groups are pointed to #contact.
  maxPartySize: 10,
  // How far ahead guests can book, in days (today counts as day 0).
  maxDaysAhead: 60,
};

// Homepage "On the Table" teaser. Each entry points at a real dish in
// lib/menu.ts (section id + exact item name) so names, descriptions and
// prices always come from the menu itself — a stale reference fails the build.
export const menuHighlights = [
  { section: "serpme", item: "Serpme", tag: "Turkish breakfast" },
  { section: "brunch", item: "Turkish Eggs", tag: "Brunch" },
  { section: "brunch", item: "Sucuk Benedict", tag: "Brunch" },
  { section: "lunch", item: "Lamb Chops", tag: "Lunch" },
];

export const philosophy = {
  eyebrow: "Our Goal",
  heading: "To bring good mornings to Slough.",
  body: "The HAN is a Halal Mediterranean brunch and eatery — specialty coffee, traditional Turkish breakfast and fresh pastries, made properly and served every day from 8am (9am on Sundays). We wanted to bring Farnham Road something it didn't have yet: a room worth lingering in and food worth slowing down for.",
  bodySecondary:
    "Nothing on the table is rushed, and neither is the room around it — arched limewash walls, brass light, marble and cane. Good vibes, served daily.",
};
