# Design System Summary — Frederick Armando

**Short version:** Frederick maintains a token-based design system (color, type, space, radius, motion) with dual-theme support, WCAG accessibility hardened into the architecture, and atomic components for reusability.

## Key files & patterns

- CSS custom properties for all tokens (no hardcoded values) — see `design.md`
- 8pt spacing grid + 2-radius language (pill / large-surface)
- Dyslexia mode, grayscale mode, reduced-motion support
- Atomic components: Button, Chip, Badge, BottomNav, ProjectFilter
- Dual theming: light and dark via `:root` / `[data-theme="dark"]`
- Performance: CLS prevention via `font-face` fallback, optimized motion

## Why this matters

- Shows systems thinking and scalability mindset
- Demonstrates accessibility as architecture, not afterthought
- Proves design-to-code workflow maturity

## Full reference

For the complete technical reference (all tokens, typography scale, components, a11y guardrails), see:

https://frederickarmando.fr/design.md
