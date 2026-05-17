---
# Abracadabra Records — Gallery Design System
# Google Stitch design.md format (alpha)
# Source: Bandcamp page screenshot, 93 album covers, live Bandcamp HTML

colors:
  bg:
    value: "#0a0a0a"
    role: "background"
    description: "Near-black — album art glows against it rather than competing with the page"
  surface:
    value: "#111111"
    role: "surface"
    description: "Slightly lifted background for off-state UI elements"
  accent:
    value: "#00FF00"
    role: "accent-primary"
    source: "Fever cover dominant background; neon lime-green at 100% saturation"
    description: "The label's most electric color — used for active timeline tick only"
  accent-warm:
    value: "#FF9933"
    role: "accent-secondary"
    source: "Second most common cover background; BISOUS, Deee-Life, La_Cumbia, Lila covers"
    description: "Carnival orange — warm heat against the dark field"
  accent-magenta:
    value: "#FF00FF"
    role: "accent-tertiary"
    source: "Aye_Aye central rings, Burning_Lies bg detail, ~12% of catalog"
    description: "Hot magenta — the neon-UV rave color"
  accent-purple:
    value: "#7700BB"
    role: "accent-brand"
    source: "Bandcamp outer page gradient, Circus and Cheekon cover backgrounds (~15% of catalog)"
    description: "Electric purple — the Bandcamp identity color; label's website voice"
  accent-cyan:
    value: "#00FFFF"
    role: "accent-cool"
    source: "Burning_Lies background, Garden_Of_3Den (~8% of catalog)"
    description: "Bright cyan — alien cool counterpoint to warm orange"
  accent-pink:
    value: "#DD6699"
    role: "accent-dominant"
    source: "Most common cover background (~25% of catalog): Aye_Aye, Besame, Boy_You_Got_Me, Everything_Will_Be_OK, Immaculate, Jewel_Of_The_Nile, Nyakalo, Spinning_Around, The_Sky_Is_Crying, Together, Troublemakers_Vol1"
    description: "Dusty rose-mauve — the label's single most used cover hue, joyful and warm"
  text-primary:
    value: "#FFFFFF"
    role: "text"
    description: "Pure white — always on dark background"
  text-secondary:
    value: "rgba(255,255,255,0.40)"
    role: "text-dim"
    description: "Artist names, secondary info"
  text-tertiary:
    value: "rgba(255,255,255,0.20)"
    role: "text-ghost"
    description: "Date labels, timeline ghost state"
  tick-active:
    value: "{colors.accent}"
    role: "ui-active"
    description: "Active timeline tick references primary accent"
  tick-idle:
    value: "rgba(255,255,255,0.15)"
    role: "ui-idle"
    description: "Idle timeline ticks — barely visible, step back for the art"
  edge-fade:
    value: "{colors.bg}"
    role: "ui-mask"
    description: "Edge gradient base — must match bg exactly to hide overflow without seam"

  # Reference-only: Bandcamp website palette (not used in gallery UI)
  ref-bandcamp-header:
    value: "#CFC3A8"
    role: "reference"
    source: "Bandcamp header/banner sand-beige (screenshot visual analysis)"
    description: "Reference only — warm sandy neutral for the label wordmark banner"
  ref-bandcamp-nav:
    value: "#BEB0D8"
    role: "reference"
    source: "Bandcamp nav bar pale lavender (screenshot visual analysis)"
    description: "Reference only — light lilac separating banner from content"
  ref-bandcamp-outer:
    value: "#8822BB"
    role: "reference"
    source: "Bandcamp outer page gradient right-edge purple (screenshot visual analysis)"
    description: "Reference only — vivid purple outer page background"

typography:
  display:
    fontFamily: "'Bebas Neue', Impact, sans-serif"
    fontWeight: 400
    fontSize: "1.5rem"
    textTransform: "uppercase"
    letterSpacing: "0.04em"
    lineHeight: 1
    source: "Matches condensed all-caps display style of oval label stamp text; consistent with bold white caps typography across ~95% of catalog covers"
    description: "Caption titles — the Bebas Neue condensed form references the fairground/carnival wordmark energy of the ABRACADABRA RECORDS logo and oval stamp"
  mono:
    fontFamily: "'Geist Mono', 'JetBrains Mono', monospace"
    fontWeight: 400
    fontSize: "0.65rem"
    textTransform: "uppercase"
    letterSpacing: "0.12em"
    lineHeight: 1.4
    description: "Artist names, dates, timeline labels — monospace grounds the psychedelic art in something precise and technical"
  nav:
    fontFamily: "'Geist Sans', system-ui, sans-serif"
    fontWeight: 400
    fontSize: "0.6rem"
    letterSpacing: "0.14em"
    textTransform: "uppercase"
    description: "Back-nav link only — minimal chrome"

dimensions:
  card-base: "90px"
  card-expanded: "360px"
  card-gap: "4px"
  widen-range: 2.12
  smooth-k: 0.82
  tick-width: "1px"
  tick-gap: "9px"
  tick-pitch: "10px"
  tick-min-height: "28px"
  tick-intensity: 8
  tick-distance-limit: 6
  caption-bottom: "155px"
  timeline-bottom: "24px"
  rail-max-width: "min(92vw, 720px)"
  img-render-window: 6
---

## Overview

A full-screen horizontal film strip gallery showing the complete Abracadabra Records discography (84–90 releases). Interaction model adapted from Michelle Liu's film diary (liumichelle.com/film): vertical scroll drives horizontal gallery movement, with depth-scaled album cards and a sliding timeline scrubber at the bottom. Chrome is invisible — the album art is the entire visual experience. Abracadabra's own brand language layers on top of Michelle's interaction skeleton via color and typography only; all scroll math and RAF mechanics are inherited unchanged.

**Route**: `/blondish/gallery`
**Data source**: Notion database via `/api/gallery`
**Audience**: Vivie-Ann Bakos, founder of Abracadabra Records

---

## Colors

### Primary Palette

| Token | Hex | Source | Use |
|---|---|---|---|
| `--color-bg` | `#0a0a0a` | Designed | Full-viewport background |
| `--color-surface` | `#111111` | Designed | Off-screen card placeholder |
| `--color-accent` | `#00FF00` | Fever cover (dominant bg) | Active tick; single accent point |
| `--color-text-primary` | `#FFFFFF` | Cover typography (~95%) | Caption title, hover label |
| `--color-text-secondary` | `rgba(255,255,255,0.40)` | Designed | Artist names, date labels |
| `--color-text-tertiary` | `rgba(255,255,255,0.20)` | Designed | Ghost / idle text |
| `--color-tick-active` | `{colors.accent}` | — | Active timeline tick |
| `--color-tick-idle` | `rgba(255,255,255,0.15)` | Designed | Idle timeline ticks |
| `--color-edge-fade` | `{colors.bg}` | — | Viewport edge gradient mask |

### Extended Brand Palette (reference / future use)

| Name | Hex | Source |
|---|---|---|
| Neon green | `#00FF00` | Fever.jpg dominant bg |
| Carnival orange | `#FF9933` | BISOUS, Deee-Life, La_Cumbia, Lila covers (~18%) |
| Dusty rose | `#DD6699` | Most common cover bg (~25%): Aye_Aye, Besame, Together, etc. |
| Electric purple | `#7700BB` | Circus, Cheekon, Bandcamp outer bg (~15%) |
| Hot magenta | `#FF00FF` | Aye_Aye rings, Burning_Lies, Groove_Con_Clase (~12%) |
| Alien cyan | `#00FFFF` | Burning_Lies bg, Garden_Of_3Den (~8%) |
| Royal blue | `#1A2FCC` | Keeper cover; individual use |
| Cyberpunk black | `#000000` | BLONDISH_COCONUT_EDIT (only dark cover) |

### Bandcamp Website Colors (observation, not applied)

| Element | Color |
|---|---|
| Header/banner background | `#CFC3A8` (warm sand-beige) |
| Nav bar background | `#BEB0D8` (pale lavender) |
| Outer page gradient (right) | `#8822BB` (vivid purple) |
| Outer page gradient (left/bottom) | `#5544BB` (blue-purple) |
| Eye iris in logo | `#006644` (deep teal-green) |
| Starburst left of logo | `#9933CC` (bright violet) |
| Bandcamp checkout button | `#33BB44` (standard Bandcamp green) |

**Color rule**: All catalog colors are fully saturated (80–100% saturation). Zero muted, pastel, or desaturated hues across 93 covers — the only partial exception is the BLONDISH_COCONUT_EDIT photography piece. The UI palette inverts this: the gallery chrome is nearly colorless so the art can carry all saturation.

---

## Typography

### Logo Treatment (Bandcamp site — observation only)

The "ABRACADABRA RECORDS" wordmark uses a heavy display font with thick black stroke outline on white/cream fill, slight 3D extrusion effect. The "O" in RECORDS is replaced by an illustrated eye with a teal iris, dark pupil, and pink curved wing-lashes extending left and right. Closest font family: a heavy serif display or slab with fairground/circus letterform character (custom or hand-modified).

### Cover Typography Pattern

Observed across 93 covers:
- **Title text**: Bold all-caps, typically white, positioned top-center or center. Font appears to be a condensed grotesque (Bebas Neue or close equivalent). Quotation marks used around many titles (e.g., "KEEPER", "SURFACE NOISE", "TOGETHER").
- **Artist credit**: Smaller, lighter weight, white or near-white. Below title or bottom edge.
- **Oval stamp**: `THIS RECORD WAS BROUGHT TO YOU BY ABRA X` — condensed sans-serif, black, inside a pill/ellipse border. Bottom-center on most covers. This is the label's most distinctive secondary mark.

### Gallery UI Typography

| Role | Font | Size | Weight | Case | Tracking |
|---|---|---|---|---|---|
| Caption title | Bebas Neue | 1.5rem | 400 | uppercase (inherent) | 0.04em |
| Caption artist | Geist Mono | 0.65rem | 400 | uppercase | 0.12em |
| Date label | Geist Mono | 0.6rem | 400 | uppercase | 0.08em |
| Hover month | Geist Mono | 0.75rem | 400 | uppercase | 0 |
| Hover year | Geist Mono | 0.7rem | 400 | uppercase | 0 |
| Back nav | Geist Sans | 0.6rem | 400 | uppercase | 0.14em |

**Typography rule**: All UI text is white or dim-white. Color is reserved exclusively for album art and the single active tick. Bebas Neue's condensed display weight channels the oval label stamp energy — compressed, emphatic, carnival-bold.

---

## Layout

The gallery layout is Michelle Liu's film strip system applied verbatim. No layout changes from the emulation — only color and font tokens change.

| Token | Value |
|---|---|
| Card base width (collapsed) | `90px` |
| Card active width (expanded) | `360px` |
| Card gap | `4px` |
| Card pitch | `94px` |
| Widen range (smoothstep falloff) | `2.12 slots` |
| Smooth lerp factor | `0.82` |
| Tick width | `1px` (hairline) |
| Tick gap | `9px` |
| Tick pitch | `10px` |
| Tick min height | `28px` |
| Tick height intensity | `8px` |
| Tick distance limit | `6 slots` |
| Rail max width | `min(92vw, 720px)` |
| Caption bottom offset | `155px` from viewport bottom |
| Timeline bottom offset | `24px` from viewport bottom |
| Strip vertical position | `top: 50%, translateY(-63%)` |
| Image render window | `±6 cards from active` |

---

## Elevation & Depth

Card scaling creates the only depth system. No box shadows, no z-layering beyond necessary overflow masking.

| Distance from focal slot | Width | Opacity |
|---|---|---|
| 0 (active) | 360px | 1.0 |
| ±1 | ~240px | ~0.85 |
| ±2 | ~140px | ~0.65 |
| ±3+ | 90px | 0.28 |
| >render window | hidden (opacity: 0) | — |

Scale formula: `smoothstep(1 - clamp(dist / 2.12, 0, 1))` mapped to `[90px, 360px]` for width and `[0.28, 1.0]` for opacity.

---

## Shapes

### Recurring Visual Motifs (from catalog)

1. **Concentric circular rings / portal** (>80% of covers)
   - 4–8 rings surrounding a central subject
   - The label's primary graphic form — target, vortex, portal, mandala
   - Rings use gradient or complementary color to the background
   - Always bottom-aligned within a square cover frame

2. **Full-bleed tiled grid background** (>80% of covers)
   - Entire background covered by a repeated small icon (minimum 7×7 grid)
   - Pattern subject changes per release: faces, animals, symbols, emojis, objects, cubes
   - Creates visual "wallpaper" behind the central ring composition

3. **Oval label stamp** (most covers)
   - `THIS RECORD WAS BROUGHT TO YOU BY ABRA X` in condensed sans, black
   - Pill/ellipse border around the text
   - Bottom-center position — the label's most distinctive secondary mark
   - Not a decorative choice — this is brand law

4. **Central illustrated subject in rings** (100% of covers)
   - Single subject centered inside the innermost ring
   - Typically illustrated/vector style with hand-drawn outline quality
   - Subjects: animals (toucan, rooster, cheetah, lion, elephant), faces (clown, emoji), symbols (eye, heart, mouth), figures
   - Thick organic stroke outlines separate subject from rings

5. **Bold display caps title text** (~95% of text-bearing covers)
   - White, all-caps, condensed grotesque
   - Quotation marks frequently used around the title
   - Large, centered or top-positioned

### Bandcamp Header Motifs (reference)

- **Eye in "RECORDS"**: Teal iris (`#006644`), dark pupil, pink curved wing-lashes. The label's premium identity mark.
- **Purple spiky starburst** (left of logo): ~14 sharp points, violet (`#9933CC`). Psychedelic energy symbol.
- **Floating illustrated objects** in outer page gradient: pink concentric rings (left), cyan bubbles (right), purple lightning shape (right), blue-purple mountain silhouette (bottom).

### Gallery UI Shapes

- Album cards: `border-radius: 2px` — nearly square, minimal rounding
- Tick marks: `border-radius: 1px` — hairline bars
- Edge gradients: linear gradient over `8vw` width

---

## Components

### GalleryPage

Full-viewport sticky layout. Outer container creates scroll height; inner container is sticky to viewport.

```
background: #0a0a0a
cursor: url('/cursors/cursor-default.svg') 20 20, auto
```

Scroll height: `releases.length × 94px × 1.6`

---

### StickyViewport

```
position: sticky
top: 0
height: 100vh
overflow: hidden
background: #0a0a0a
```

---

### FilmStrip

Horizontal flex container. Driven by RAF loop via `transform: translateX(displayX)`.

```
display: flex
align-items: flex-end
gap: 4px
will-change: transform
```

Position: `top: 50%; transform: translateY(-63%)` — strip sits slightly above center, leaving room for caption + timeline below.

---

### AlbumCard

```
width: [90–360]px          — animated per RAF frame
height: [90–360]px         — animated per RAF frame
opacity: [0.28–1.0]        — animated per RAF frame
overflow: hidden
border-radius: 2px
cursor: url('/cursors/cursor-hover.svg') 23 23, pointer
```

Click: scrolls to that release's position in SCROLL_RANGE.

---

### Caption

```
position: absolute
bottom: 155px
left: 0; right: 0
text-align: center
pointer-events: none
z-index: 20
```

**Title**: Bebas Neue, 1.5rem, `#FFFFFF`
**Artist**: Geist Mono, 0.65rem, uppercase, tracking 0.12em, `rgba(255,255,255,0.40)`

---

### TimelineRail

Outer container (overflow: hidden, `min(92vw, 720px)` wide) holds the inner rail. Rail translates left/right each frame to keep active tick centered. Total rail width (93 × 10px – 9px gap = ~921px) naturally overflows the container — this creates the sliding window effect.

```
outer: overflow: hidden, width: min(92vw, 720px), position: relative
inner: display: flex, align-items: flex-end, gap: 9px, will-change: transform
```

**Active tick**: `#00FF00`, `height: tickHeight(i, focalSlot) × 2`
**Idle tick**: `rgba(255,255,255,0.15)`, `height: tickHeight(i, focalSlot)`
Tick width: `1px` (hairline)

---

### DateLabel

```
font: Geist Mono, 0.6rem, uppercase
color: rgba(255,255,255,0.35)
margin-top: 10px
text-align: center
white-space: pre-line
```

Displays month + year of active release (two lines via `\n`).

---

### HoverLabel

Floats above hovered tick. Shows month + year of hovered release.

```
position: absolute
bottom: calc(100% + 10px)
transform: translateX(-50%)
opacity: 0|1 — animated via RAF
transition: opacity 0.18s ease
pointer-events: none
```

Month: Geist Mono, 0.75rem, `#FFFFFF`
Year: Geist Mono, 0.7rem, `rgba(255,255,255,0.45)`

---

### EdgeGradient (×2)

```css
/* Left */
background: linear-gradient(to right, #0a0a0a 20%, transparent 100%)
width: 8vw; height: 100%
position: absolute; left: 0; top: 0
pointer-events: none; z-index: 10

/* Right */
background: linear-gradient(to left, #0a0a0a 20%, transparent 100%)
position: absolute; right: 0; top: 0
```

---

### BackLink

```
position: absolute; top: 24px; left: 28px
font: Geist Sans, 0.6rem, uppercase, tracking 0.14em
color: rgba(255,255,255,0.30)
cursor: url('/cursors/cursor-hover.svg') 23 23, pointer
z-index: 30
```

Text: `← ABRACADABRA`

---

### Cursors

Two SVG circle cursors (already neutral-gray — work on any background):

- **Default** (`cursor-default.svg`): 40×40px circle, `#EEEEEE` fill at 40% opacity, `#E3E3E9` stroke. Hotspot: `20 20`.
- **Hover** (`cursor-hover.svg`): 46×46px circle, `#F5F5F7` fill at 60% opacity, `#D9D9E2` stroke. Hotspot: `23 23`. Applied to: album cards, timeline ticks, back link.

No cursor changes needed — the neutral gray circles read clearly against both light and dark backgrounds.

---

## Do's and Don'ts

**Do:**
- Use `#00FF00` for the active tick only — one point of neon, maximum impact
- Keep all typography white or white-alpha — never tint text with brand colors
- Let the album art provide all saturation and color energy
- Use Bebas Neue condensed caps for the title — it directly echoes the oval label stamp
- Keep all scroll math, RAF constants, and flex correction from the Michelle emulation unchanged
- Maintain the 1px hairline tick width — thicker ticks read as UI, hairline ticks read as music

**Don't:**
- Add multiple accent colors to the UI simultaneously — pick one active state
- Change `BASE_W`, `EXPANDED_W`, `GAP`, `WIDEN_RANGE`, `SMOOTH_K`, or scroll math
- Apply `#00FF00` to text, backgrounds, borders, or anything other than the active tick
- Use pastel, muted, or desaturated colors anywhere in the UI chrome
- Add shadows, gradients, or glow effects to UI elements — the covers do all of that
- Round card corners beyond `2px` — square is more record-cover accurate

---

## "Differs from Michelle" Reference Table

Every value that changes from the baseline Michelle Liu emulation:

| Element | Michelle (baseline) | Abracadabra |
|---|---|---|
| Page background | `#f5f5f5` | `#0a0a0a` |
| Edge gradient color | `#f5f5f5` | `#0a0a0a` |
| Back link color | `rgba(39,39,42,0.45)` | `rgba(255,255,255,0.30)` |
| Active tick color | `#27272a` | `#00FF00` |
| Active tick bg (RAF) | `"#27272a"` | `"#00FF00"` |
| Idle tick color | `rgba(39,39,42,0.18)` | `rgba(255,255,255,0.15)` |
| Idle tick bg (JSX static) | `rgba(39,39,42,0.18)` | `rgba(255,255,255,0.15)` |
| Caption title font | Geist Sans | Bebas Neue |
| Caption title size | `0.875rem` | `1.5rem` |
| Caption title color | `#27272a` | `#ffffff` |
| Caption artist font | Geist Sans | Geist Mono |
| Caption artist size | `0.75rem` | `0.65rem` |
| Caption artist color | `#71717a` | `rgba(255,255,255,0.40)` |
| Caption artist case | normal | uppercase |
| Caption artist tracking | none | `0.12em` |
| Date text font | Geist Sans | Geist Mono |
| Date text size | `0.8rem` | `0.6rem` |
| Date text color | `#71717a` | `rgba(255,255,255,0.35)` |
| Date text case | normal | uppercase |
| Hover label month font | Geist Sans | Geist Mono |
| Hover label month color | `#27272a` | `#ffffff` |
| Hover label year font | Geist Sans | Geist Mono |
| Hover label year color | `#71717a` | `rgba(255,255,255,0.45)` |
| Cursor SVGs | light gray circles | same (no change needed) |
