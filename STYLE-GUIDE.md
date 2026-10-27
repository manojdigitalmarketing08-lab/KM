# The Karthik Media — Project & Style Guide

Static marketing site for **The Karthik Media**, a digital marketing agency. Plain HTML, CSS and vanilla JS (no build step, no framework).

## Running locally

The navbar and footer are loaded with `fetch`, so the site must be served over HTTP (opening the files directly won't show them):

```
python -m http.server 8000
```

Then open <http://localhost:8000>. In VS Code you can use Live Server instead.

## Structure

```
KM/
├── index.html  services.html  about.html  contact.html  404.html
├── components/   navbar.html (with Services mega menu), footer.html
├── 15 service pages (seo.html, local-seo.html, google-ads.html ... one per mega menu item)
├── css/
│   ├── variables.css   design tokens (single source of truth for colour, font, shadow)
│   ├── style.css       all component styles
│   └── service.css     service pages only (static, no hover or looping motion)
├── js/main.js          loads components, active nav link, smooth scroll
└── assets/images/      logo.svg, hero-person.svg (placeholders)
```

Rule: never hard-code colours in `style.css` or HTML. Add or change a token in `variables.css` and reference it with `var(--token)`.

## Colour palette

The page is **mostly white and neutral**. Green is a small accent only, the way the lavender works in the original design. Do not use it for large areas.

### Brand accent (use sparingly)

| Token | Value | Use |
|---|---|---|
| `--color-brand` | `#d3ff33` | Nav CTA button, section tag icons, notification bells, hero headline highlight stripe, mega menu hover |
| `--color-brand-ink` | `#1b1b2f` | Text and icons placed on a lime fill |
| `--color-brand-text` | `#5c7500` | Accent words in headings, active nav link (lime itself is too light to read as text on white) |
| `--color-brand-light` | `#eaff99` | Spare light tint |

### Neutrals

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#1b1b2f` | Headings, body text, dark buttons, footer background, mega menu CTA card |
| `--color-muted` | `#9ca3af` | Secondary text, labels |
| `--color-page` | `#ffffff` | Page background |
| `--color-surface` | `#fafafa` | Cards, hero background, row hover |
| `--color-chrome` | `#555555` | Mock window title bars |
| `--color-dot` | `#e6e6ee` | Hero dotted pattern |
| `--color-tag` | `rgba(229,231,235,.8)` | Section tag label background |

### Soft lime card (Audience card)

A near-white gradient with a faint lime tint at the bottom, so the card stays calm.

| Token | Value |
|---|---|
| `--color-lime-50` | `#fcfff0` |
| `--color-lime-100` | `#f8ffdb` |
| `--color-lime-200` | `#f3ffc2` |
| `--color-lime-border` | `#eaf5b8` |
| `--color-lime-glow` | `rgba(211,255,51,.22)` |

### Chart and status

| Token | Value | Use |
|---|---|---|
| `--color-bar-light` / `--color-bar-dark` | `#f1f5d4` / `#e0ec9a` | Laptop mock bars |
| `--color-bar-series-1` | `#a3c900` | Ad Insight bars, analytics series 1 |
| `--color-bar-series-2` | `#38bdf8` | Analytics series 2 |
| `--color-positive` / `--color-positive-bg` | `#16a34a` / `#f0fdf4` | "↑" growth badges |
| `--color-alert` | `#f43f5e` | Notification dots, heart icon |
| `--color-cta` / `--color-cta-shadow` | `#fbab1a` / `rgba(251,171,26,.6)` | Orange hero CTA ("Book Your Consultation") and its glow |

### Colour rules

- Big surfaces are white, `#fafafa` or dark ink. Lime is never a large background, apart from the faint card tint.
- Lime fill always carries dark ink text or icons, never white.
- Lime is not used for text on white. Use `--color-brand-text` instead.
- Orange is reserved for the single hero CTA.

## Typography

- **Font:** [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts), weights 300–600, fallback `sans-serif`. Token: `--font-sans`.
- Weights: 400 body, 500 headings, buttons and labels, 600 active nav link.
- Headings use tight tracking (`letter-spacing: -0.025em`).

| Element | Size |
|---|---|
| Hero title | 48px (52px at ≥768px) |
| Section title | 30px (32px at ≥768px) |
| Page hero title (inner pages) | 40px (48px at ≥768px) |
| Card title | 17px |
| Body / buttons / nav | 12–14px |
| Mock UI micro text | 5–10px |

## Shape, spacing and shadow

- **Radius:** buttons 8–12px, cards 16px, mega menu 20px, mock windows 12px, avatars and bells fully round.
- **Max content width:** 1000px for sections, 1200px for the header and footer.
- **Section rhythm:** about 96px vertical padding between major sections.
- **Shadows:** `--shadow-card` for floating cards (`0 10px 30px -10px rgba(0,0,0,.15)`), `--shadow-cta` for the orange CTA glow.
- **Hero background:** `#fafafa` with a 22px dotted pattern in `--color-dot`.

## Components

- **Header:** logo, links (Home, Services, About, Contact Us) and a lime "Book a Strategy Call" button with a dark arrow chip. The active link is bold with the olive text colour.
- **Services mega menu:** opens on hover or keyboard focus. The "Services" link is `#` and doesn't navigate. Four columns (Search & Local, Paid & Social, Content & Video, Brand & Web) plus a dark CTA card on the right. Hovered items fill with lime.
- **Tag:** icon chip, a thin line, then a grey label. It appears above section headings.
- **Buttons:** `.btn--brand` (lime), `.btn--cta` (orange, hero), `.btn--nav` (compact nav version).
- **Footer:** dark ink background, white headings, link hover in lime.
- **Hero mock cards:** `.float-card` is a white card with a soft shadow. Bells use a gentle 5s float animation.

## Section variations

Every section has its own treatment so the page doesn't read as one repeated box. Shared tokens (`--radius-card`, `--card-border`, `--shadow-hover`) keep corners, borders and hover shadows consistent.

| Section | Treatment |
|---|---|
| Trust bar | Ruled stat strip (no boxes) and a logo marquee |
| Portfolio | Poster cards with a large index numeral and three different covers (grey, pale lime, dark) |
| Services | One ruled grid with hairline dividers, outline icons, pale lime hover |
| Showcase | Floating mock cards on a soft stage panel |
| Process | Horizontal timeline: open steps hanging off a line with nodes |
| Authority | Photo with a dark "13+ yrs" stamp |
| Founder | Arch-shaped portrait on the right, large editorial quote |
| Performance | Dark dashboard with translucent metric tiles |
| Testimonials | One featured quote card plus two open quotes under a rule |
| FAQ | Ruled accordion list with numbers, plus a dark help card |
| Final CTA | Dark banner with soft glows |

Dark surfaces are used for the dashboard, final CTA and small CTA cards only. Lime stays an accent.

## Content

- **Brand name:** "The Karthik Media" (use it in full everywhere).
- **Services:** SEO, Local SEO, Content Marketing, Web Design & Development, Social Media Marketing, GMB Optimization, Google Maps Ranking, Google Ads, Meta Ads, Branding, Email Marketing, YouTube Management, Video Editing, Content Creation, Content Shoot.
- **Primary CTA wording:** "Book Your Consultation" (hero), "Book a Strategy Call" (nav and mega menu).
- **Placeholders to replace:** `hello@karthikmedia.com`, the hero person and logo illustrations, brand logo text in the "Trusted by" strip, and the lorem-style body copy on the history and cards.
