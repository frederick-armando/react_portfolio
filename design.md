# Design System — Frederick Armando Portfolio

> **Source of truth** for the visual language of frederickarmando.fr and any
> derived pages, themes or spin-off products. Values below are extracted
> directly from `src/styles/tokens.css` and the live components. Keep this file
> in sync with the code; treat it as the canonical reference, not a copy.

Last synced with: **v1.9.9**

---

## 1. Philosophy

The system is built on a small set of primitives (color, type, space, radius,
motion) composed into atomic components (`Button`, `Badge`/`chip`, `ProjectFilter`,
`BottomNav`). Everything is theme-aware via CSS custom properties on `:root`
(light) and `[data-theme="dark"]`, so a new page or derivative only needs to
consume tokens — never hard-coded values.

**Rules of thumb**
- Always use a token. No raw hex/rgb in component code.
- Respect the 8pt spacing grid (`--space-*`).
- Type scale is the single source for font sizes; never invent a size.
- One radius language: pills for controls, `--radius-lg` for surfaces.

---

## 2. Color tokens

### Light theme (`:root`)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-ink` | `#12131a` | Headings, high-emphasis text |
| `--color-body` | `#3e4250` | Body text |
| `--color-muted` | `#7a8192` | Secondary text |
| `--color-nav-muted` | `#596071` | Nav labels (inactive) |
| `--color-icon-muted` | `#596071` | Icons (inactive) |
| `--color-primary` | `#385AF9` | Primary actions, links |
| `--color-primary-action` | `#385AF9` | Button fill |
| `--color-primary-action-text` | `#ffffff` | Text on primary |
| `--color-primary-100` | `rgba(56,90,249,0.1)` | Primary tint / hover bg |
| `--color-focus` | `#385AF9` | Focus ring |
| `--color-purple-500` | `#6f5cff` | Accent (gradients, highlights) |
| `--color-purple-100` | `#ede9ff` | Accent tint |
| `--color-border` | `#e6e8ef` | Borders, dividers |
| `--color-surface` | `#ffffff` | Card / panel background |
| `--color-shadow` | `rgba(16,24,40,0.08)` | Elevation shadow |
| `--gradient-start` | `#385AF9` | Brand gradient |
| `--gradient-end` | `#8728fe` | Brand gradient |
| `--mesh-bg` | `#ffffff` | Mesh background base |
| `--mesh-blob-1/2/3` | `#9aadff` / `#d9b8ff` / `#b7c4ff` | Decorative mesh blobs |

### Dark theme (`[data-theme="dark"]`)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-ink` | `#e4e5ed` | Headings |
| `--color-body` | `#b0b3c4` | Body text |
| `--color-muted` | `#7c809a` | Secondary text |
| `--color-nav-muted` | `#a1a6c0` | Nav labels |
| `--color-icon-muted` | `#7c809a` | Icons |
| `--color-primary` | `#8DA2FF` | Primary (lightened for dark) |
| `--color-primary-600` | `#A5B4FF` | Primary hover/active |
| `--color-primary-action` | `#385AF9` | Button fill (unchanged) |
| `--color-primary-100` | `rgba(141,162,255,0.14)` | Primary tint |
| `--color-focus` | `#A5B4FF` | Focus ring |
| `--color-purple-500` | `#8a7aff` | Accent |
| `--color-purple-100` | `rgba(111,92,255,0.12)` | Accent tint |
| `--color-border` | `rgba(255,255,255,0.08)` | Borders |
| `--color-surface` | `#14151f` | Card / panel background |
| `--color-shadow` | `rgba(0,0,0,0.32)` | Elevation shadow |
| `--gradient-end` | `#7322d6` | Brand gradient (dark) |

> **Note:** `--color-primary-action` stays `#385AF9` in both themes (the filled
> button color is constant); only the surrounding text/link primary lightens.

### Gradients & decorative

- Brand gradient: `linear-gradient(135deg, var(--gradient-start), var(--gradient-end))`
- Wave palette (decorative): `#6f86ff → #7c89ff → #8278ff → #8765ff → #924dff`
- Mesh blobs use `--mesh-blob-opacity: 0.5`, `--mesh-blob-saturation: 1.14`

---

## 3. Typography

### Font family

```
--font-family: 'Core Sans C', 'Core Sans C Fallback', system-ui, -apple-system,
               BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

A `Core Sans C Fallback` `@font-face` (with `size-adjust`/`ascent-override`) is
loaded to prevent layout shift before the real font arrives.

### Type scale (`--font-size-*`)

| Token | Value | px | Role |
|-------|-------|-----|------|
| `--font-size-xxs` | `0.6875rem` | 11px | Reserved token (legacy microcopy) |
| `--font-size-xs` | `0.75rem` | 12px | Microcopy, timestamps |
| `--font-size-sm` | `0.8125rem` | 13px | Tags, secondary text |
| `--font-size-md` | `0.875rem` | 14px | Body text (default) |
| `--font-size-lg` | `0.9375rem` | 15px | Body large / intro |
| `--font-size-xl` | `1rem` | 16px | H4 / section labels |
| `--font-size-2xl` | `1.125rem` | 18px | H3 / card titles |
| `--font-size-3xl` | `1.25rem` | 20px | H2 / subtitles |
| `--font-size-4xl` | `1.5rem` | 24px | H1 / title |

> **Hero name exception:** `.hero__name` uses `line-height: 0.95` (compressed)
> by design — do not apply the generic 1.6 body line-height there.

### Font weights

| Weight | Token name | Usage |
|--------|-----------|-------|
| 400 | Regular | Body text |
| 500 | Medium | Nav links, labels |
| 600 | SemiBold | Buttons, chips |
| 700 | Bold | H2, card titles |
| 800 | ExtraBold | H1, hero |

### Line heights

- Body text (`--font-size-md` → `--font-size-lg`): **1.6**
- Titles (`--font-size-3xl` → `--font-size-4xl`): **1.2 – 1.3**

---

## 4. Spacing — 8pt grid

| Token | Value | Typical use |
|-------|-------|-------------|
| `--space-1` | 4px | Tight gaps, icon padding |
| `--space-2` | 8px | Inner chip padding |
| `--space-3` | 12px | Control padding |
| `--space-4` | 16px | Default gap |
| `--space-5` | 20px | Section inner gap |
| `--space-6` | 24px | Block spacing |
| `--space-7` | 32px | Section spacing |
| `--space-8` | 40px | Large section spacing |
| `--space-9` | 56px | Page section break |
| `--space-10` | 72px | Major page break |

> All spacing derives from multiples of 8 (4px half-step allowed).

---

## 5. Radius & shape

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-pill` | `999px` | Buttons, chips, badges, toggles |
| `--radius-lg` | `24px` | Cards, panels, modals, image frames |

No small radii (e.g. 4–8px) are used in the system — keep the two-tier language.

---

## 6. Layout

- `--container: 1120px` — max content width (centered, padded on small screens).
- `--nav-height: 78px` — bottom nav height (mobile).
- `--header-height: 86px` — top bar height.

### Breakpoints

| Viewport | Range | Label |
|----------|-------|-------|
| Mobile | `< 768px` | single column, bottom nav |
| Tablet | `768px – 1023px` | adaptive grid |
| Desktop | `>= 1024px` | full layout, top bar |

Token palette grid uses `minmax(min(100%, 360px), 1fr)` so it lands on a clean
2-column layout at the 1120px container width (3 columns would leave an empty
track).

---

## 7. Motion

| Token | Curve |
|-------|-------|
| `--motion-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--motion-decelerate` | `cubic-bezier(0, 0, 0.2, 1)` |
| `--motion-accelerate` | `cubic-bezier(0.4, 0, 1, 1)` |

Respect `prefers-reduced-motion`: the accessibility panel's "Stop animations"
mode sets `animation: none; transition: none` globally.

---

## 8. Elevation & states

- `--color-shadow: rgba(16,24,40,0.08)` (light) / `rgba(0,0,0,0.32)` (dark).
- Hover/active state tints: `--color-state-dark` (light), `--color-state-light` (dark).
- Focus ring: `outline: 4px solid var(--color-focus)` (accessibility "enhanced focus" mode).

---

## 9. Components (atomic patterns)

### Button
- Variants: `primary` (filled `--color-primary-action`, white text), `secondary`
  (outline/border), `tertiary` (text/link).
- Shape: pill (`--radius-pill`), min-height 48px for touch.
- Supports `iconOnly`, `badge`, ripple. Use the real `<Button>` component — do not
  rebuild a button from scratch.

### Chip / Badge (`.chip`, `.project-tag`)
- Pill shape, `--space-2`/`--space-3` padding, 500–600 weight.
- Used for tags, filters, status, company labels.

### ProjectFilter (`.project-filter`)
- Tab buttons with `aria-pressed="true"` when selected.
- Pill shape, active state uses primary tint.

### BottomNav / TopBar
- Bottom nav on mobile (`--nav-height`), top bar on desktop (`--header-height`).
- Nav labels use `--color-nav-muted` when inactive, primary/ink when active.

### Tooltip (`[data-tooltip]`)
- Pure CSS tooltip via `::before`, triggered on hover and keyboard focus.
- Icon-only buttons also use native `title`.

---

## 10. Accessibility guardrails

- **Contrast:** palette ships WCAG badges (AA/AAA) per token — keep new colors
  within the same contrast bands.
- **Dyslexia font mode** (`body.a11y-readable-font *`) forces `line-height: 1.6`
  globally — the hero name is the only explicit exception (`line-height: 0.95`).
- **Grayscale mode** (`body.a11y-grayscale::before`) overlays at `z-index: 10002`
  so it also covers the settings panel.
- **Reduced motion:** honor `prefers-reduced-motion` and the in-app stop-animations toggle.

---

## 11. Do / Don't

**Do**
- Reference tokens, never literals.
- Reuse atomic components (`Button`, `Badge`, `ProjectFilter`, `BottomNav`).
- Keep the 2-radius and 8pt-grid discipline.
- Test new surfaces in both light and dark themes.

**Don't**
- Introduce new hex values outside `tokens.css`.
- Add a 3rd radius tier or break the pill/large-surface language.
- Bypass the type scale with ad-hoc `font-size`.
- Hard-code spacing instead of `--space-*`.

---

*This document is the canonical design reference. When the code changes, update
this file in the same PR.*
