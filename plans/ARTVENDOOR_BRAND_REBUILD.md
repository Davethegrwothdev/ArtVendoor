# Artvendoor Brand Rebuild Plan

## Launch Date
**May 15, 2026** (2026-05-15)

## Overview
Transform the current landing page to fully align with the official Artvendoor brand system. The page should feel premium, gallery-clean, emotionally artistic, and culturally modern.

## Current State Analysis
- Existing page has multiple sections (hero, story, features, CTA, social proof, footer)
- Uses generic colors (red #E63946, blue #1D3557) that don't match brand
- Uses Playfair Display + Inter fonts instead of Gilroy
- Has placeholder logo text instead of actual wordmark
- Missing the crowd-face artwork as hero background

## New Brand Requirements

### Color Palette
| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary CTA | Terracotta | #B15A36 | Buttons, accents |
| Secondary | Clay Grey | #D57E40 | Hover states, dividers, icons |
| Background | Gallery White | #FFFFFF | Clean surfaces |
| Text | Charcoal Grey | #2A2A2A | Primary text |
| Hero Overlay | Charcoal 45% | rgba(42,42,42,0.45) | Text readability |

### Typography
- **Primary**: Gilroy (Bold for headlines, Regular for subheadlines, Light for body)
- **Fallbacks**: Inter, Manrope, system sans-serif

### Assets
- **Hero Background**: `assets/images/IMG_1595.JPEG` (crowd-face artwork)
- **Logo**: `assets/images/Asset 17@4x.png` (Artvendoor wordmark)

## Page Architecture

```mermaid
flowchart TB
    A[Hero Section - 100vh] --> B[Minimal Footer]
    
    subgraph Hero
        H1[Artwork Background with Zoom Animation]
        H2[Charcoal Overlay rgba(42,42,42,0.45)]
        H3[Logo - Top Center]
        H4[Headline - Gilroy Bold]
        H5[Subheadline - Gilroy Regular]
        H6[Email Input - Pill Shape Glass]
        H7[CTA Button - Terracotta]
        H8[Countdown - Glass Cards]
    end
```

## Implementation Details

### Hero Section Structure
```
section.hero (100vh, position relative)
  ├── div.hero__background
  │   ├── img (IMG_1595.JPEG, cover, center)
  │   └── div.hero__overlay (rgba(42,42,42,0.45))
  └── div.hero__content (centered, z-index 2)
      ├── img.logo (Asset 17@4x.png)
      ├── h1.headline "A New Kind of Art Marketplace is Coming"
      ├── p.subheadline "Discover unique works..."
      ├── form.email-form
      │   ├── input (pill, glass, white placeholder)
      │   └── button (terracotta, pill, hover lift)
      ├── p.microcopy "No spam. Early collectors..."
      └── div.countdown (glass cards, white text)
```

### Key CSS Changes

#### Color Variables
```css
:root {
  --color-terracotta: #B15A36;
  --color-terracotta-hover: #C46B45;
  --color-clay: #D57E40;
  --color-white: #FFFFFF;
  --color-charcoal: #2A2A2A;
  --color-overlay: rgba(42, 42, 42, 0.45);
  
  --font-heading: 'Gilroy', 'Inter', 'Manrope', sans-serif;
  --font-body: 'Gilroy', 'Inter', 'Manrope', sans-serif;
}
```

#### Hero Background with Zoom
```css
.hero__background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: slowZoom 30s ease-in-out infinite alternate;
}

@keyframes slowZoom {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}
```

#### Glass Input
```css
.email-form__input {
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  padding: 1rem 1.5rem;
}
```

#### Terracotta CTA
```css
.email-form__button {
  background: var(--color-terracotta);
  border-radius: 50px;
  color: white;
  font-weight: 600;
  padding: 1rem 2.5rem;
  transition: all 0.3s ease;
}

.email-form__button:hover {
  background: var(--color-terracotta-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(177, 90, 54, 0.4);
}
```

#### Glass Countdown Cards
```css
.countdown__number {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  padding: 0.5rem 1rem;
  min-width: 70px;
}
```

### Sections to Remove
- Story section
- Features section  
- CTA section (duplicate)
- Social proof section

### Minimal Footer
Keep only:
- Copyright text
- Privacy/Terms links (optional)

## Mobile Considerations
- Stronger overlay on mobile: `rgba(42,42,42,0.6)`
- Logo scales down proportionally
- Countdown stacks in 2x2 grid
- Large tap targets (min 44px)
- Image focal point (face) remains visible

## Files to Modify
1. `index.html` - Simplify structure, update copy, use actual assets
2. `assets/css/styles.css` - Complete brand color/typography overhaul
3. `assets/js/main.js` - Keep countdown and form logic, minor updates

## Success Criteria
- Page feels like entering a digital gallery
- Artwork is the dominant visual element
- Text is readable over the overlay
- CTA stands out with Terracotta
- Countdown feels premium with glass cards
- Mobile experience is polished
- No cluttered sections after hero
