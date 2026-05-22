---
name: Warmth & Whimsy
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#56423e'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0ef'
  outline: '#89726d'
  outline-variant: '#ddc0ba'
  surface-tint: '#9f402d'
  primary: '#9f402d'
  on-primary: '#ffffff'
  primary-container: '#e2725b'
  on-primary-container: '#5a0d02'
  inverse-primary: '#ffb4a5'
  secondary: '#8e4e14'
  on-secondary: '#ffffff'
  secondary-container: '#ffab69'
  on-secondary-container: '#783d01'
  tertiary: '#605e59'
  on-tertiary: '#ffffff'
  tertiary-container: '#95928c'
  on-tertiary-container: '#2d2b27'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad3'
  primary-fixed-dim: '#ffb4a5'
  on-primary-fixed: '#3e0500'
  on-primary-fixed-variant: '#802918'
  secondary-fixed: '#ffdcc4'
  secondary-fixed-dim: '#ffb780'
  on-secondary-fixed: '#2f1400'
  on-secondary-fixed-variant: '#6f3800'
  tertiary-fixed: '#e6e2db'
  tertiary-fixed-dim: '#cac6bf'
  on-tertiary-fixed: '#1d1c18'
  on-tertiary-fixed-variant: '#484742'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display:
    fontFamily: Quicksand
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Quicksand
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Quicksand
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Quicksand
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.01em
  caption:
    fontFamily: Nunito Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding-mobile: 1.25rem
  container-padding-desktop: 5rem
  gutter: 1.5rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

The design system is centered on the concept of "Guided Companionship." It targets empathetic individuals looking to expand their families, evoking feelings of safety, joy, and emotional connection. 

The aesthetic style is a refined mix of **Modern Minimalist** and **Tactile Softness**. It avoids the sterility of typical SaaS platforms by using organic shapes and a warm color palette, while maintaining a high degree of professional reliability through structured layouts and clear information hierarchy. The interface should feel like a physical, high-quality stationery set: approachable, substantial, and premium.

## Colors

This design system utilizes a palette rooted in earth tones to establish immediate trust and warmth.

- **Primary (Terracotta):** Used for primary actions, critical navigation states, and brand-heavy elements. It provides a grounded, mature warmth.
- **Secondary (Friendly Orange):** Used for secondary call-to-actions, highlights, and interactive icons to inject energy and playfulness.
- **Tertiary (Cream):** The foundational surface color. It replaces pure white to reduce eye strain and create a "homely" environment.
- **Neutral (Charcoal):** Reserved for typography and high-contrast borders. It ensures WCAG AAA readability and adds a layer of professional authority.

## Typography

The typography strategy balances the playful, rounded geometry of **Quicksand** for display and headings with the highly legible, humanist qualities of **Nunito Sans** for functional text. 

Headings should use a tight letter-spacing to feel cohesive and "chunky." Body text scales are generous to ensure accessibility for all age groups. Labels and buttons use a slightly heavier weight to maintain visibility against the soft background colors.

## Layout & Spacing

The design system employs a **Fixed-Fluid Hybrid** grid. Content is contained within a max-width of 1280px on desktop to prevent long line lengths, while margins and gutters remain fluid on smaller breakpoints.

- **Desktop (1200px+):** 12-column grid, 24px gutters, 80px side margins.
- **Tablet (768px - 1199px):** 8-column grid, 20px gutters, 40px side margins.
- **Mobile (0px - 767px):** 4-column grid, 16px gutters, 20px side margins.

Vertical rhythm follows an 8px baseline. Use "Stack" spacing for internal component layout (e.g., 8px between a title and its description) and "Section" spacing (48px - 80px) to separate distinct content blocks.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layering** rather than harsh lines. 

- **Surface Level (Base):** The Cream background (#FDF8F1).
- **Level 1 (Cards):** Pure white background with a very soft, large-radius shadow: `0px 4px 20px rgba(38, 38, 38, 0.04)`. This creates a sense of the cards "floating" slightly above the warm base.
- **Level 2 (Modals/Popovers):** Deeper shadows with a slight tint of the primary color: `0px 12px 32px rgba(226, 114, 91, 0.08)`.

Avoid using borders for containment; use subtle shifts in background color or the aforementioned shadows to define boundaries.

## Shapes

The shape language is dominated by high-radius curves to mimic the "cuddly" nature of pets. 

- **Cards & Containers:** Use a minimum of 16px (1rem) corner radius. For large featured sections, this can increase to 24px (1.5rem).
- **Buttons:** Use fully rounded (pill-shaped) ends to maximize the friendly feel.
- **Inputs:** Use an 8px (0.5rem) radius to maintain a sense of structure and data-entry discipline.

## Components

### Buttons
- **Primary:** Terracotta background, white text, pill-shaped. On hover, darken by 10%.
- **Secondary:** Transparent background, Friendly Orange border (2px), Orange text.
- **Icon Buttons:** Circular with a subtle Cream hover state.

### Cards
Cards are the primary vehicle for pet profiles. They must include a "soft-crop" image at the top with a 16px radius, a padding of 24px for content, and a secondary-colored "Tag" for pet status (e.g., "New Arrival").

### Inputs & Form Fields
Fields use a white background with a 1px Charcoal border at 10% opacity. When focused, the border becomes the Primary Terracotta at 100% opacity with a 3px soft outer glow.

### Pet Status Chips
Small, high-contrast pills used to denote age, breed, or energy level. Use light tints of the primary/secondary colors (e.g., a 10% opacity Terracotta background with 100% opacity text).

### Illustrations
Incorporate organic, "blob-like" shapes behind pet photography to add depth. Use hand-drawn style iconography with rounded terminals to match the Quicksand typeface.