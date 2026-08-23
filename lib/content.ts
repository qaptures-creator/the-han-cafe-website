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
  // TODO: confirm full weekly hours — only "closes 4pm" was visible on the source listing.
  hours: [
    { day: "Monday", time: "TBC" },
    { day: "Tuesday", time: "TBC" },
    { day: "Wednesday", time: "TBC" },
    { day: "Thursday", time: "TBC" },
    { day: "Friday", time: "TBC" },
    { day: "Saturday", time: "TBC" },
    { day: "Sunday", time: "Closes 4pm" },
  ],
  social: {
    instagram: "",
  },
};

export const menuHighlights = [
  {
    title: "Avocado & Poached Egg",
    description:
      "Sourdough, whipped avocado, soft poached egg, cherry tomato, toasted seeds, microgreens.",
    tag: "Signature",
  },
  {
    title: "Specialty Coffee",
    description:
      "Slow-poured filter and espresso, sourced and brewed with the same care as the room around it.",
    tag: "All day",
  },
  {
    title: "Fresh Pastry",
    description:
      "A short, changing selection made in small batches through the morning.",
    tag: "Morning",
  },
];

export const philosophy = {
  eyebrow: "Our Philosophy",
  heading: "Considered, not crowded.",
  body: "The HAN was built around a single idea: a room quiet enough to think in, food honest enough to need no dressing up. Arched limewash walls, brass light, marble and cane — nothing here is loud, and that is the point.",
};
