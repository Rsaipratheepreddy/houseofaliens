import type { Product } from './types';

/**
 * Product image conventions:
 *   `/products/<slug>/01.jpg`  — figure front (primary)
 *   `/products/<slug>/02.jpg`  — figure back / detail (used for hover swap)
 *   `/products/<slug>/03.jpg`  — flat-lay studio still
 *
 * If the JPGs aren't dropped in yet, the typography placeholder will render
 * instead — the site still looks intentional. See PROMPTS.md for the full
 * image-generation manifest.
 */
const imgs = (slug: string, baseAlt: string) => [
  { src: `/products/${slug}/01.jpg`, alt: `${baseAlt} — front`  },
  { src: `/products/${slug}/02.jpg`, alt: `${baseAlt} — back`   },
  { src: `/products/${slug}/03.jpg`, alt: `${baseAlt} — detail` },
];

export const products: Product[] = [
  {
    id: 'hoa-001',
    slug: 'orbit-hoodie-void',
    name: 'Orbit Hoodie',
    tagline: 'Heavyweight loopback. Engineered for cosmic drift.',
    description:
      'A 480gsm loopback cotton hoodie with bonded seams, kangaroo pocket, and reflective alien glyph at the chest. Boxy fit. Cut for layering.',
    price: 148,
    currency: 'USD',
    gender: 'unisex',
    collections: ['new-arrivals', 'mens', 'womens'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Void', hex: '#050507' },
      { name: 'Plasma', hex: '#c084fc' },
    ],
    images: imgs('orbit-hoodie-void', 'Orbit Hoodie'),
    badge: 'NEW',
    inStock: true,
    materials: ['100% organic cotton', 'Reflective ink print'],
    drop: 'Drop 004 — Orbit',
  },
  {
    id: 'hoa-002',
    slug: 'aurora-cargo-pant',
    name: 'Aurora Cargo Pant',
    tagline: 'Tactical silhouette. Iridescent finish.',
    description:
      'Wide-leg cargo with bellows pockets, articulated knee, and a ripstop shell that shifts colour under UV. Drawcord cuff.',
    price: 196,
    currency: 'USD',
    gender: 'unisex',
    collections: ['new-arrivals', 'mens'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Aurora', hex: '#67e8f9' },
      { name: 'Carbon', hex: '#22222e' },
    ],
    images: imgs('aurora-cargo-pant', 'Aurora Cargo Pant'),
    badge: 'NEW',
    inStock: true,
    materials: ['Ripstop nylon', 'YKK hardware'],
    drop: 'Drop 003 — Aurora',
  },
  {
    id: 'hoa-003',
    slug: 'beacon-tee',
    name: 'Beacon Tee',
    tagline: 'Boxy crew. Glow-stitched signal logo.',
    description:
      'A heavyweight 240gsm tee with reinforced collar, dropped shoulder, and a glow-stitched House of Aliens signal at the back yoke.',
    price: 68,
    currency: 'USD',
    gender: 'unisex',
    collections: ['new-arrivals', 'mens', 'womens'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Bone', hex: '#f5f5f7' },
      { name: 'Void', hex: '#050507' },
      { name: 'Alien', hex: '#b6ff3c' },
    ],
    images: imgs('beacon-tee', 'Beacon Tee'),
    badge: 'BESTSELLER',
    inStock: true,
    materials: ['100% combed cotton'],
  },
  {
    id: 'hoa-004',
    slug: 'flux-bomber',
    name: 'Flux Bomber',
    tagline: 'Limited edition. 200 units.',
    description:
      'Embroidered alien sigil at chest, ribbed cuffs, satin lining, and a numbered metal plate at the hem. One drop, never restocked.',
    price: 420,
    compareAtPrice: 480,
    currency: 'USD',
    gender: 'mens',
    collections: ['limited-edition', 'mens'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Plasma Black', hex: '#0a0a0f' }],
    images: imgs('flux-bomber', 'Flux Bomber'),
    badge: 'LIMITED',
    inStock: true,
    materials: ['Crinkle nylon shell', 'Satin lining', 'Metal hardware'],
    drop: 'Drop 002 — Flux',
  },
  {
    id: 'hoa-005',
    slug: 'gravity-mini-dress',
    name: 'Gravity Mini Dress',
    tagline: 'Sculpted bodice. Zero-gravity hem.',
    description:
      'Stretch-jersey mini with a sculpted bodice, asymmetric hem, and laser-etched alien lattice down the side seam.',
    price: 184,
    currency: 'USD',
    gender: 'womens',
    collections: ['new-arrivals', 'womens'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Void', hex: '#050507' },
      { name: 'Plasma', hex: '#c084fc' },
    ],
    images: imgs('gravity-mini-dress', 'Gravity Mini Dress'),
    badge: 'NEW',
    inStock: true,
    materials: ['Stretch jersey', 'Laser-etched detail'],
  },
  {
    id: 'hoa-006',
    slug: 'signal-cap',
    name: 'Signal Cap',
    tagline: 'Six panel. Reflective brim.',
    description:
      'A six-panel cap with reflective brim trim, embroidered alien icon, and an adjustable metal strap closure.',
    price: 52,
    currency: 'USD',
    gender: 'unisex',
    collections: ['new-arrivals', 'mens', 'womens'],
    sizes: ['M'],
    colors: [
      { name: 'Void', hex: '#050507' },
      { name: 'Alien', hex: '#b6ff3c' },
    ],
    images: imgs('signal-cap', 'Signal Cap'),
    inStock: true,
  },
  {
    id: 'hoa-007',
    slug: 'protocol-overshirt',
    name: 'Protocol Overshirt',
    tagline: 'Field-utility cut. Heavy twill.',
    description:
      'A relaxed-fit overshirt in 12oz cotton twill with chest flap pockets, snap closures, and an internal storm placket.',
    price: 220,
    compareAtPrice: 260,
    currency: 'USD',
    gender: 'unisex',
    collections: ['mens', 'sale'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Lichen', hex: '#84cc16' },
      { name: 'Carbon', hex: '#22222e' },
    ],
    images: imgs('protocol-overshirt', 'Protocol Overshirt'),
    badge: 'SALE',
    inStock: true,
    materials: ['12oz cotton twill', 'Custom snap hardware'],
  },
  {
    id: 'hoa-008',
    slug: 'nebula-knit',
    name: 'Nebula Knit',
    tagline: 'Jacquard knit. Cosmic gradient.',
    description:
      'A jacquard-knit crew sweater with a cosmic gradient, ribbed hem and cuffs, and a tonal alien icon embroidered at the chest.',
    price: 168,
    currency: 'USD',
    gender: 'unisex',
    collections: ['womens', 'mens'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Nebula', hex: '#67e8f9' },
      { name: 'Plasma', hex: '#c084fc' },
    ],
    images: imgs('nebula-knit', 'Nebula Knit'),
    inStock: true,
    materials: ['Cotton-merino blend'],
  },
];

// ---- Helpers ----------------------------------------------------------------

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCollection = (slug: string) =>
  products.filter((p) => p.collections.includes(slug as Product['collections'][number]));

export const getFeaturedProducts = (limit = 4) =>
  products.filter((p) => p.badge === 'NEW' || p.badge === 'BESTSELLER').slice(0, limit);
