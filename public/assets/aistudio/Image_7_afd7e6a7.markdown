---
name: Nordic Clinical Environmental
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002114'
  on-tertiary-container: '#069669'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 3.5rem
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Space Grotesk
    fontSize: 2.5rem
    fontWeight: '600'
    lineHeight: '1.15'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.005em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: '1.45'
    letterSpacing: 0.005em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: '1.15'
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a high-precision medical-environmental aesthetic anchored in Nordic clarity and institutional rigor. Drawing directly from Scandinavian functionalism, the visual balance of Apple Health, and the authority of WHO public health interfaces, the tone is clinical, tranquil, and radically clear.

The emotional signature is calming assurance amidst complex atmospheric and biophysical data. It repudiates speculative tech tropes—avoiding harsh neon glows, aggressive skeuomorphism, and ungrounded gradients. Instead, it pairs hyper-disciplined typographic hierarchies with subtle glacial washes, grounding intricate sensor telemetry and respiratory advice in a serene, human-first presentation.

## Colors

The palette operates on a base of optical white and atmospheric cold tints, paired against deep slate ink tones to guarantee exceptional contrast and immediate readability.

- **Primary Canvas & Atmosphere:** Base surfaces default to pure white (`#ffffff`), supported by stepped glacial undertones (`#f8fafc`, `#f0f7ff`, `#e8f2fc`) to segregate data layers without dense visual weight.
- **Ink & Typography:** Primary text is set in deep slate (`#0f172a`), secondary hierarchy in muted slate (`#334155`), and structural metadata or captions in slate mist (`#64748b`).
- **Clinical Vitality:** Healthy statuses, optimal airflow readings, and verified biological metrics use refined mint-emerald (`#059669` and `#10b981`).
- **Environmental Hazard Scale (AQI):** Muted, clinical-grade alerts diverge from neon palettes into restrained, perceptually calibrated diagnostic steps:
  - Moderate / Acceptable: Ochre Amber (`#d97706`)
  - Sensitive / Unhealthy: Burnt Coral (`#ea580c`)
  - Severe / Hazardous: Deep Mulberry Plum (`#701a75`)
- **Borders & Partitions:** Architectural hairline borders rely strictly on crisp, neutral slates (`#e2e8f0` and `#cbd5e1`).

## Typography

The typographic system pairs the disciplined, structural geometry of **Space Grotesk** for numerical readings, indices, and major section markers with the humanized, highly legible forms of **Plus Jakarta Sans** for medical recommendations, contextual explanations, and dense clinical readouts.

- Numerical metrics and categorical AQI scores leverage tabular numbers within Space Grotesk to guarantee alignment across time-series charts and gauges.
- Letter spacing is dialed tight on large display headers to mimic contemporary Swiss and Nordic editorial spreads, relaxing into positive tracking for miniature metadata and diagnostic labels to prevent letter-collapsing on clinical mobile screens.
- Body text retains generous leading (`1.5` to `1.6`) to maintain effortless scanning during high-stress health alerts.

## Layout & Spacing

The interface employs a disciplined fluid-grid structure optimized for multi-pane medical dashboards and focused mobile triage cards.

- **Desktop (1024px+):** 12-column layout with a 1.5rem gutter and a fixed outer margin cap of 2.5rem, retaining structural order across widescreen sensor tracking centers.
- **Tablet (768px - 1023px):** 8-column layout with a 1.5rem gutter, collapsing supplementary environmental graphs beneath core vital air index indicators.
- **Mobile (< 768px):** 4-column layout utilizing edge-to-edge container logic with a compact 1rem margin and 1rem gutter.
- **Rhythm:** Spacing follows an absolute 4px base unit. Internal component padding favors vertical roominess (`space-md` to `space-lg`) to foster an airy, low-friction clinical ambiance that eliminates cognitive overload.

## Elevation & Depth

Visual separation relies primarily on crisp hairline boundaries coupled with micro-calibrated ambient shadows. Pure structural flatness is avoided in favor of physical paper-like medical index cards.

- **Outlines:** All cards and modules feature a 1px solid border in `#e2e8f0`.
- **Card Shadows:** Flat surfaces achieve soft lift via an ultra-diffused, dual-stop shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 4px 12px 0 rgba(15, 23, 42, 0.02)`.
- **Raised Interactive Modules (Flyouts, Popovers):** Elevated elements utilize `0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.
- **Surface Layering:** Deep spatial depth is produced without heavy drops by alternating the background tint—such as positioning an elevated `#ffffff` card against an `#f0f7ff` environmental health summary section.

## Shapes

The design system embraces an intentional medium curvature (0.5rem base radius, with larger structural containers at 1rem). This curvature reflects Apple Health's friendly biometric accessibility while preserving the crisp, architectural authority required for clinical diagnostic reliability.

- Minor tags, status badges, and pill controls transition toward full radius encapsulation (`9999px`) to visually separate continuous sensor tags from structured analytical cards.
- Cards, modal dialogues, and alert banners consistently use `rounded-lg` (1rem / 16px) to maintain a soft yet disciplined physical footprint.

## Components

### Buttons
- **Primary:** Background `#0f172a`, text `#ffffff`, hairline focus ring with 2px offset. Hover state shifts to `#1e293b`.
- **Clinical Accent:** Background `#059669`, text `#ffffff`. Reserved exclusively for positive health confirmations, device pairing, or emergency action triggers.
- **Secondary / Ghost:** White background, 1px border `#e2e8f0`, text `#1e293b`. Hover transitions to `#f8fafc` with border `#cbd5e1`.

### Data Cards
- Pure white fill with 1px `#e2e8f0` border and light ambient shadow.
- Distinct top header section carrying a `label-md` category identifier alongside a subtle glacial background icon container (`#f0f7ff`).

### Status Badges & Chips
- Fully rounded pills (`roundedness: 3`) with a soft atmospheric background tint and high-contrast text.
  - *Good Air / Healthy:* `#ecfdf5` background, `#047857` text, `#a7f3d0` 1px border.
  - *Moderate Hazard:* `#fffbeb` background, `#b45309` text, `#fde68a` 1px border.
  - *Hazardous:* `#fdf4ff` background, `#701a75` text, `#f5d0fe` 1px border.

### Form Inputs & Controls
- **Inputs:** Crisp `#ffffff` field background, 1px `#cbd5e1` resting border, 0.5rem rounded corners. Focus introduces a 1px border in `#0284c7` and a 3px ambient focus halo tinted at 15% opacity (`rgba(2, 132, 199, 0.15)`).
- **Checkboxes & Radios:** 18px square or circular nodes with 1.5px `#94a3b8` borders, activating with solid `#0f172a` or `#059669` fill and a clean optical white tick.

### Environmental Gauge Modules
- High-precision radial or segmented horizontal meters with hairline segment partitions (1px pure white gaps).
- Metric units (`µg/m³`, `ppm`, `AQI`) rendered in `label-sm` Space Grotesk directly adjacent to numerical readouts to anchor analytical rigor.