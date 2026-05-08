# House of Aliens

Futuristic streetwear ecommerce — Next.js 14 (App Router) · TypeScript · SCSS modules.

> Bold, futuristic clothing from another dimension. For those who dare to be different.

## Quickstart

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

Node 18+ required.

## Project structure

```
houseofaliens/
├── app/                          # App Router routes
│   ├── layout.tsx                # Root layout — fonts, providers, header/footer/cart drawer
│   ├── page.tsx                  # Home
│   ├── globals.scss → ../styles/globals.scss
│   ├── (collections)
│   │   ├── new-arrivals/page.tsx
│   │   ├── mens/page.tsx
│   │   ├── womens/page.tsx
│   │   ├── limited-edition/page.tsx
│   │   └── sale/page.tsx
│   ├── product/[slug]/page.tsx   # PDP w/ generateStaticParams
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── auth.module.scss          # Shared auth-page styles
│   ├── not-found.tsx
│   ├── robots.ts                 # MetadataRoute robots
│   └── sitemap.ts                # MetadataRoute sitemap
│
├── components/
│   ├── layout/                   # Header, Footer
│   ├── home/                     # Hero, Marquee, FeaturedRail, CategoryShowcase
│   ├── product/                  # ProductCard, ProductGrid, CollectionPage, CollectionHero, ProductDetail
│   ├── cart/                     # CartDrawer
│   └── ui/                       # Button, Badge, Input
│
├── data/                         # Mock JSON-style data
│   ├── types.ts
│   ├── products.ts
│   └── categories.ts
│
├── lib/                          # Utilities
│   ├── cn.ts                     # className joiner
│   └── format.ts                 # price formatter, discount %
│
├── store/
│   └── cart-context.tsx          # React Context cart, persisted to localStorage
│
├── public/
│   ├── logo.svg                  # Brand wordmark + alien glyph
│   ├── ufo.svg                   # UFO icon (mobile menu trigger)
│   ├── header-bg.svg             # Cosmic backdrop for hero / collection heroes
│   ├── icons/                    # cart, search, user (currentColor)
│   └── products/placeholder.svg
│
├── styles/                       # Global SCSS
│   ├── globals.scss              # Imported once in app/layout.tsx
│   ├── abstracts/                # Re-exported as a single module via _index.scss
│   │   ├── _variables.scss       # Colors, fonts, spacing, motion, breakpoints
│   │   ├── _mixins.scss          # responsive (`up`/`down`), container, glow, grid-bg, etc.
│   │   └── _index.scss           # @forward variables + mixins
│   └── base/
│       ├── _reset.scss           # Modern CSS reset
│       ├── _tokens.scss          # CSS custom properties (runtime theming hook)
│       └── _typography.scss      # Body / heading defaults
│
├── next.config.mjs               # sass loadPaths → `@use 'abstracts' as *;`
├── tsconfig.json                 # `@/*` path alias
└── package.json
```

## Theme

The brand is a **futuristic streetwear** aesthetic — deep void blacks with an alien-neon palette and sharp geometric typography.

| Token              | Value      | Use                                    |
|--------------------|------------|----------------------------------------|
| `$color-void`      | `#050507`  | Page background                        |
| `$color-deep`      | `#0a0a0f`  | Section / card surface                 |
| `$color-surface`   | `#111118`  | Raised surface                         |
| `$color-ink`       | `#f5f5f7`  | Primary text                           |
| `$color-accent`    | `#b6ff3c`  | **Signature alien green** — CTAs       |
| `$color-plasma`    | `#c084fc`  | Ultraviolet plasma — secondary accent  |
| `$color-cyan`      | `#67e8f9`  | Signal cyan — informational            |
| `$color-danger`    | `#ff4d6d`  | Sale / error                           |

Gradients (`$gradient-aurora`, `$gradient-headline`) are pre-baked for hero accents.

### Fonts

Loaded via `next/font/google` in `app/layout.tsx`:

- **Display / Body** — [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (400/500/600/700)
- **Mono / labels / prices** — [Space Mono](https://fonts.google.com/specimen/Space+Mono)

These are also exposed as CSS variables (`--font-display-loaded`, `--font-mono-loaded`) and Sass variables (`$font-display`, `$font-body`, `$font-mono`). Swap them in `_variables.scss` to retheme.

## Pages

| Path                  | Purpose                                                     |
|-----------------------|-------------------------------------------------------------|
| `/`                   | Hero, ticker marquee, featured products, category showcase  |
| `/new-arrivals`       | Latest drop                                                 |
| `/mens`               | Men's collection                                            |
| `/womens`             | Women's collection                                          |
| `/limited-edition`    | Numbered drops, never restocked                             |
| `/sale`               | Reduced past drops                                          |
| `/product/[slug]`     | PDP — gallery, color/size pickers, add-to-cart, related     |
| `/cart`               | Full cart page                                              |
| `/checkout`           | Checkout shell (UI only — no real payment)                  |
| `/login`, `/register` | Auth shells                                                 |

A slide-in `CartDrawer` is mounted globally and opens whenever a product is added.

## Data layer

All product / category data lives in `data/*.ts` as typed in-memory mocks. Replace these with API calls (e.g. Shopify, Medusa, custom backend) without changing the consumers — they only import the helpers:

```ts
import { products, getProduct, getProductsByCollection, getFeaturedProducts } from '@/data/products';
import { categories, getCategory } from '@/data/categories';
```

## State

Cart state is held in `store/cart-context.tsx` (React Context, no extra deps). It's persisted to `localStorage` so reloads keep the cart. Replace with Zustand/Redux/server state when wiring a real backend.

## SCSS conventions

- Every `*.module.scss` starts with `@use 'abstracts' as *;` — that pulls in tokens + mixins via the `styles/` `loadPaths` configured in `next.config.mjs`.
- `globals.scss` is the **only** global stylesheet — imported once in `app/layout.tsx`.
- Use the responsive mixin: `@include up(md) { ... }` (breakpoints `sm | md | lg | xl | 2xl`).

## Path aliases

```ts
import { Button } from '@/components/ui/Button';
import { products } from '@/data/products';
import { useCart } from '@/store/cart-context';
```

Configured in `tsconfig.json` (`paths`).

## What's left for production

- Replace mock data with a real product API (Shopify Storefront, Medusa, Saleor, etc.).
- Wire up real auth (NextAuth / Clerk / custom).
- Hook checkout to a payment provider (Stripe Elements / Stripe Checkout).
- Add real product photography in `public/products/` and remove the SVG placeholder.
- Add OG / Twitter image routes (currently using `header-bg.svg`).
- Set up CI (lint + type-check + Lighthouse budget).
