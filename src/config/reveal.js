/**
 * Shared look for every ascii-reveal in the app.
 *
 * - `terminal` gives the binary/cursor scramble that matches the brand.
 * - `speed: 0.7` is a 1.43x slowdown on top of `duration="fast"`, so the whole
 *   wave lands in roughly 700-800ms. Raise it towards 1 for a snappier reveal.
 * - `fallback` is on purpose: if the device can't keep up, the animation
 *   finishes immediately instead of leaving content half-scrambled.
 * - `lazy: false` keeps one wave across the whole route instead of revealing
 *   below-the-fold sections on scroll.
 */
export const REVEAL_PROPS = {
  preset: 'terminal',
  origin: 'top-left',
  duration: 'fast',
  speed: 1,
  fallback: true,
  lazy: false,
};
