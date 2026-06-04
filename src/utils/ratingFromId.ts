/**
 * Deterministic, realistic-looking rating + review-count generator.
 * Same id → same values across renders, so cards don't flicker or repeat.
 */
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export interface RatingInfo {
  rating: number;       // 4.2 – 5.0, one decimal
  reviews: number;      // 12 – 500
}

export function getRatingInfo(id: string | number | undefined | null): RatingInfo {
  const seed = hash(String(id ?? Math.random()));
  // rating bucket 0..8 → 4.2 .. 5.0
  const rating = 4.2 + ((seed % 9) * 0.1);
  // reviews 12..500
  const reviews = 12 + ((seed >>> 4) % 489);
  return { rating: Math.round(rating * 10) / 10, reviews };
}
