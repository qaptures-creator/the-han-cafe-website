// Verified, genuine Google reviews for The HAN — verbatim excerpts, not
// rewritten or invented. Update this file (not the component) when new
// reviews are confirmed against the live listing.

export type GoogleReview = {
  id: string;
  /** Reviewer's displayed Google name, exactly as shown on the listing. */
  name: string;
  /** 1-5 */
  rating: number;
  /** Relative date as shown by Google (e.g. "2 weeks ago") — not an invented calendar date. */
  date: string;
  /** Concise excerpt, trimmed for card balance but never reworded. */
  text: string;
};

/** Link to the full Google reviews listing — distinct from business.address.mapsUrl, which points at directions. */
export const googleReviewsUrl = "https://share.google/m8UzYjorgjeFpurO3";

export const googleReviews: GoogleReview[] = [
  {
    id: "amie-louise",
    name: "Amie-Louise",
    rating: 5,
    date: "2 weeks ago",
    text: "Absolutely loved this place! I try to visit a new brunch spot almost every week, and honestly, this one has topped them all! The place is absolutely beautiful — so spacious, bright and welcoming, with gorgeous decor and such a lovely atmosphere.",
  },
  {
    id: "a-b",
    name: "A B",
    rating: 5,
    date: "2 weeks ago",
    text: "This has been one of the best Turkish brunch places I have been to in a while! Amazing smooth and quick service, very tidy and aesthetic, the staff are so friendly and the food was very yummy! Great coffee too, highly recommended!!!",
  },
  {
    id: "nana-osei",
    name: "Nana Osei",
    rating: 5,
    date: "2 hours ago",
    text: "Been here a few times and I've never been disappointed. My go to breakfast spot in Slough.",
  },
  {
    id: "h",
    name: "H",
    rating: 5,
    date: "Edited 11 hours ago",
    text: "First time here and I'm really impressed, they really outdid themselves. My favorite was the banana bread matcha. Their homemade banana puree is delish!!",
  },
  {
    id: "samina-khan",
    name: "Samina Khan",
    rating: 5,
    date: "13 hours ago",
    text: "Amazing food. Great portion size. Great aesthetics. Friendly staff, keen to know your opinion. Would definitely come again. So different from anything on Farnham rd.",
  },
  {
    id: "areeba-iqbal",
    name: "Areeba Iqbal",
    rating: 5,
    date: "a day ago",
    text: "The staff are so welcoming it's almost like u have been invited around a friends house to eat!",
  },
];
