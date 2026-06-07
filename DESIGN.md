# DESIGN.md

## Overview

This document defines the design language for this Next.js app.
The aesthetic is warm, friendly, and energetic — built around a coral/pink gradient identity with rounded, card-heavy UI components.

---

## Color Palette

### Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-brand-primary` | `#FF6B81` | Primary CTA buttons, active states, key accents |
| `--color-brand-secondary` | `#FF8C69` | Gradient end, secondary highlights |
| `--color-brand-gradient` | `linear-gradient(135deg, #FF6B81 0%, #FF8C69 100%)` | Hero sections, primary buttons, badges |
| `--color-brand-light` | `#FFF0F2` | Tinted backgrounds, hover states, card tints |
| `--color-brand-muted` | `#FFB3BF` | Disabled states, placeholder accents |

### Neutral Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-page` | `#FFF8F8` | Page background (very warm white) |
| `--color-bg-card` | `#FFFFFF` | Card surfaces |
| `--color-bg-subtle` | `#F5F5F7` | Input fields, secondary surfaces |
| `--color-text-primary` | `#2C2C2C` | Body text, headings |
| `--color-text-secondary` | `#8A8A8A` | Subtext, labels, captions |
| `--color-text-muted` | `#C2C2C2` | Placeholder text, disabled |
| `--color-border` | `#F0E8E8` | Card borders, dividers |
| `--color-border-strong` | `#E0D0D0` | Input borders, emphasized dividers |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#4CAF7D` | Confirmation, positive feedback |
| `--color-warning` | `#FFB347` | Notifications, soft alerts |
| `--color-error` | `#FF4D4D` | Form errors, destructive actions |

### CSS Custom Properties (globals.css or tailwind config)

```css
:root {
  --color-brand-primary: #FF6B81;
  --color-brand-secondary: #FF8C69;
  --color-brand-gradient: linear-gradient(135deg, #FF6B81 0%, #FF8C69 100%);
  --color-brand-light: #FFF0F2;
  --color-brand-muted: #FFB3BF;

  --color-bg-page: #FFF8F8;
  --color-bg-card: #FFFFFF;
  --color-bg-subtle: #F5F5F7;

  --color-text-primary: #2C2C2C;
  --color-text-secondary: #8A8A8A;
  --color-text-muted: #C2C2C2;

  --color-border: #F0E8E8;
  --color-border-strong: #E0D0D0;

  --color-success: #4CAF7D;
  --color-warning: #FFB347;
  --color-error: #FF4D4D;
}
```

---

## Typography

### Font Stack

```css
/* Heading font — rounded, friendly */
font-family: 'Noto Sans JP', 'Hiragino Maru Gothic ProN', 'BIZ UDPGothic', sans-serif;

/* Body font */
font-family: 'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic UI', sans-serif;
```

> **Note**: Always prioritize Japanese-capable fonts. Load Noto Sans JP from Google Fonts with weights 400, 500, 700.

### Type Scale

| Role | Size | Weight | Line Height | Color |
|------|------|--------|-------------|-------|
| `h1` (Hero heading) | 28px / 1.75rem | 700 | 1.3 | `--color-text-primary` |
| `h2` (Section heading) | 22px / 1.375rem | 700 | 1.4 | `--color-text-primary` |
| `h3` (Card title) | 18px / 1.125rem | 600 | 1.4 | `--color-text-primary` |
| `body` (Default) | 15px / 0.9375rem | 400 | 1.7 | `--color-text-primary` |
| `small` (Caption, label) | 13px / 0.8125rem | 400 | 1.5 | `--color-text-secondary` |
| `micro` (Badge, tag) | 11px / 0.6875rem | 500 | 1.4 | varies |

### Rules

- Use **font-weight 700** sparingly — only for critical headings and CTAs.
- Avoid ALL CAPS in Japanese contexts. Use normal case.
- For CTA button text: 15px, weight 600, letter-spacing `0.02em`.

---

## Spacing System

Based on a **4px base unit**.

```
4px  → xs  (tight internal gaps)
8px  → sm  (icon-to-text, tag gaps)
12px → md  (input padding-x, small card padding)
16px → lg  (card padding, section gaps)
24px → xl  (between cards, major section gaps)
32px → 2xl (page section padding)
48px → 3xl (hero section padding)
```

In Tailwind, this maps to the default scale: `p-1` = 4px, `p-2` = 8px, `p-4` = 16px, etc.

---

## Border Radius

Use **heavily rounded** corners for a soft, approachable feel.

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `8px` | Tags, badges, chips |
| `--radius-md` | `12px` | Input fields, small cards |
| `--radius-lg` | `16px` | Cards, modals |
| `--radius-xl` | `24px` | Bottom sheets, feature cards |
| `--radius-full` | `9999px` | Buttons (pill shape), avatars |

```css
:root {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
}
```

---

## Elevation / Shadow

Use **subtle, warm-tinted shadows** — no cold gray shadows.

```css
/* Card default */
box-shadow: 0 2px 12px rgba(255, 107, 129, 0.08);

/* Card hover / active */
box-shadow: 0 4px 20px rgba(255, 107, 129, 0.15);

/* Modal / bottom sheet */
box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.10);

/* Button hover glow */
box-shadow: 0 4px 16px rgba(255, 107, 129, 0.35);
```

---

## Component Patterns

### Primary Button (Gradient Pill)

```tsx
// The signature CTA button — gradient, pill-shaped, with shadow
<button className="
  w-full py-3 px-6
  rounded-full
  text-white font-semibold text-sm tracking-wide
  bg-gradient-to-r from-[#FF6B81] to-[#FF8C69]
  shadow-[0_4px_16px_rgba(255,107,129,0.35)]
  hover:brightness-105 hover:shadow-[0_6px_20px_rgba(255,107,129,0.45)]
  active:scale-[0.98]
  transition-all duration-200
">
  保存
</button>
```

### Secondary Button (Outlined)

```tsx
<button className="
  w-full py-3 px-6
  rounded-full
  text-[#FF6B81] font-semibold text-sm
  border-2 border-[#FF6B81]
  bg-white
  hover:bg-[#FFF0F2]
  active:scale-[0.98]
  transition-all duration-200
">
  あとで見る
</button>
```

### Content Card

```tsx
<div className="
  relative rounded-[20px] overflow-hidden
  bg-white
  shadow-[0_2px_12px_rgba(255,107,129,0.08)]
  border border-[#F0E8E8]
">
  {/* Optional image area */}
  <div className="aspect-video bg-gray-100 relative">
    <img src={image} alt={title} className="w-full h-full object-cover" />
  </div>
  {/* Content */}
  <div className="p-4">
    <p className="font-bold text-base text-[#2C2C2C]">{title}</p>
    <p className="text-sm text-[#8A8A8A] mt-1">{description}</p>
  </div>
</div>
```

### Tag (Chip)

```tsx
<span className="
  inline-flex items-center gap-1
  px-3 py-1 rounded-full
  text-xs font-medium
  bg-[#FFF0F2] text-[#FF6B81]
  border border-[#FFB3BF]
">
  ラベル
</span>
```

### Notification Badge

```tsx
<span className="
  inline-flex items-center justify-center
  min-w-[20px] h-5 px-1.5
  rounded-full
  bg-gradient-to-r from-[#FF6B81] to-[#FF8C69]
  text-white text-xs font-bold
">
  3
</span>
```

### Input Field

```tsx
<input className="
  w-full px-4 py-3
  rounded-xl
  bg-[#F5F5F7]
  border border-transparent
  focus:border-[#FF6B81] focus:bg-white focus:outline-none
  text-[#2C2C2C] placeholder-[#C2C2C2]
  text-sm
  transition-all duration-200
" />
```

---

## Navigation Patterns

### Sidebar Navigation (PC-first)

```tsx
// Fixed left sidebar — the primary navigation pattern for desktop
<aside className="
  fixed top-0 left-0 bottom-0
  w-60
  bg-white border-r border-[#F0E8E8]
  flex flex-col
  z-40
">
  {/* Logo */}
  <div className="px-6 py-5 border-b border-[#F0E8E8]">
    <h1 className="
      text-xl font-bold
      bg-gradient-to-r from-[#FF6B81] to-[#FF8C69]
      bg-clip-text text-transparent
    ">
      MeetLog
    </h1>
  </div>

  {/* Nav items */}
  <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
    {navItems.map(item => (
      <button key={item.id} className={`
        flex items-center gap-3 px-4 py-2.5 rounded-xl
        text-sm font-medium
        transition-all duration-200
        ${isActive(item.id)
          ? 'bg-[#FFF0F2] text-[#FF6B81]'
          : 'text-[#8A8A8A] hover:bg-[#FFF8F8] hover:text-[#2C2C2C]'}
      `}>
        <item.Icon className="w-5 h-5" />
        {item.label}
      </button>
    ))}
  </nav>

  {/* User profile at bottom */}
  <div className="px-4 py-4 border-t border-[#F0E8E8]">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B81] to-[#FF8C69]" />
      <div>
        <p className="text-sm font-semibold text-[#2C2C2C]">田中 太郎</p>
        <p className="text-xs text-[#8A8A8A]">管理者</p>
      </div>
    </div>
  </div>
</aside>
```

### Top Bar (PC)

```tsx
// Sticky top bar in the main content area
<header className="
  sticky top-0 z-30
  bg-white/90 backdrop-blur-sm
  border-b border-[#F0E8E8]
  px-8 py-4
  flex items-center justify-between
">
  <h2 className="text-lg font-bold text-[#2C2C2C]">ダッシュボード</h2>
  {/* Right: search, bell, avatar */}
</header>
```

---

## Page Layout

```tsx
// Standard PC page shell — sidebar + main content
<div className="min-h-screen bg-[#FFF8F8] flex">
  <Sidebar />  {/* fixed, w-60 */}
  <div className="flex-1 ml-60 flex flex-col min-h-screen">
    <TopBar />
    <main className="flex-1 px-8 py-6">
      {/* content — use grid for multi-column where appropriate */}
    </main>
  </div>
</div>
```

---

## Motion & Animation

Keep animations **quick and springy** — they should feel alive but never slow.

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Button press | 100ms | `ease-out` |
| Card appear | 200ms | `ease-out` |
| Page transition | 250ms | `ease-in-out` |
| Modal / overlay | 300ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Prominent animation | 400ms | `spring` (use framer-motion) |

```css
/* Standard transition utility */
.transition-base {
  transition: all 200ms ease-out;
}

/* Modal / overlay entrance */
.transition-modal {
  transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

For prominent interactions, use **framer-motion**:
```tsx
// Bounce-in for modals or key UI moments
initial={{ scale: 0.5, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ type: "spring", stiffness: 400, damping: 20 }}
```

---

## Dark Mode

The brand's warm coral identity translates to dark mode with these overrides:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-page: #1A1215;
    --color-bg-card: #241820;
    --color-bg-subtle: #2E1F26;
    --color-text-primary: #F5E8EA;
    --color-text-secondary: #A08085;
    --color-text-muted: #6B4F54;
    --color-border: #3A2530;
    --color-border-strong: #4D3040;
    /* Brand colors stay the same — they glow naturally on dark */
  }
}
```

---

## Tailwind Config Extension

```js
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#FF6B81',
          secondary: '#FF8C69',
          light: '#FFF0F2',
          muted: '#FFB3BF',
        },
        surface: {
          page: '#FFF8F8',
          card: '#FFFFFF',
          subtle: '#F5F5F7',
        },
        border: {
          soft: '#F0E8E8',
          base: '#E0D0D0',
        }
      },
      borderRadius: {
        'card': '16px',
        'sheet': '24px',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #FF6B81 0%, #FF8C69 100%)',
        'brand-gradient-vertical': 'linear-gradient(180deg, #FF6B81 0%, #FF8C69 100%)',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(255, 107, 129, 0.08)',
        'card-hover': '0 4px 20px rgba(255, 107, 129, 0.15)',
        'btn': '0 4px 16px rgba(255, 107, 129, 0.35)',
        'btn-hover': '0 6px 20px rgba(255, 107, 129, 0.45)',
      },
      fontFamily: {
        sans: [
          'Noto Sans JP',
          'Hiragino Maru Gothic ProN',
          'BIZ UDPGothic',
          'sans-serif',
        ],
      },
    },
  },
}

export default config
```

---

## Do / Don't

| ✅ Do | ❌ Don't |
|-------|---------|
| Use the coral/pink gradient for primary CTAs | Use blue or generic grays as primary colors |
| Round all corners aggressively (`rounded-full` for buttons) | Use sharp rectangular buttons |
| Add warm-tinted shadows (`rgba(255,107,129,...)`) | Use cold gray shadows |
| Keep backgrounds off-white with a warm tint (`#FFF8F8`) | Use pure white or cold gray backgrounds |
| Use pill-shaped buttons and tags | Use square or slightly-rounded-only elements |
| Keep cards light with soft borders | Use heavy borders or dark card surfaces |
| Animate with spring physics for key interactions | Use linear or slow easing |
| Japanese-capable font stack (Noto Sans JP) | Use Latin-only fonts |
