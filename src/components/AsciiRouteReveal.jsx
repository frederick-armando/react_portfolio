import { Suspense, useEffect, useRef } from 'react';
import { AsciiReveal } from 'ascii-reveal';
import { REVEAL_PROPS } from '../config/reveal.js';

// Routes already revealed during this page view. Deliberately in memory (not
// sessionStorage) so a reload always replays the animation, while moving back
// and forth inside the app does not.
const revealedRoutes = new Set();

/**
 * Wraps route content in an ascii-reveal.
 *
 * Two things matter here:
 *
 * 1. The `Suspense` boundary sits *inside* this component and *outside*
 *    `AsciiReveal`. Lazy routes suspend on their first visit; if `AsciiReveal`
 *    lived above the boundary it would mount while the route is still a
 *    fallback, reveal an empty tree, and the real content would then pop in
 *    with no animation.
 *
 * 2. `revealOnMount` is decided during render, once per route. The library
 *    hides the wrapper with `[data-ar-pending]` on that same render, so there
 *    is no flash of un-animated content, and no external visibility juggling.
 */
export default function AsciiRouteReveal({ routeKey, children }) {
  // Pin the decision per route. A ref (rather than state) keeps it stable even
  // if React re-renders, which would otherwise change the reveal key and
  // replay the animation mid-session.
  const decision = useRef({ routeKey: null, animate: true });
  if (decision.current.routeKey !== routeKey) {
    decision.current = {
      routeKey,
      animate: !revealedRoutes.has(routeKey),
    };
  }
  const animate = decision.current.animate;

  useEffect(() => {
    revealedRoutes.add(routeKey);
  }, [routeKey]);

  const isProjetsRoute = routeKey === '/projets';

  return (
    <Suspense fallback={null}>
      <AsciiReveal
        key={`${routeKey}:${animate ? 'decode' : 'static'}`}
        {...REVEAL_PROPS}
        revealOnMount={animate}
        {...(isProjetsRoute
          ? {
              surfaces: "[data-ascii='surface']",
              fades: "[data-ascii='fade'], button, .project-pager__count, .project-showcase__cta",
            }
          : {})}
      >
        {children}
      </AsciiReveal>
    </Suspense>
  );
}
