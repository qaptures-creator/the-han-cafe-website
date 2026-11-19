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
  body: "The HAN is a Halal Mediterranean brunch and eatery — specialty coffee, traditional Turkish breakfast and fresh pastries, made properly and served daily from 8am. We wanted to bring Farnham Road something it didn't have yet: a room worth lingering in and food worth slowing down for.",
  bodySecondary:
    "Nothing on the table is rushed, and neither is the room around it — arched limewash walls, brass light, marble and cane. Good vibes, served daily.",
};
