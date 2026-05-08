import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/home/Marquee';
import { FeaturedRail } from '@/components/home/FeaturedRail';
import { Signature } from '@/components/home/Signature';
import { Lookbook } from '@/components/home/Lookbook';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { DropStrip } from '@/components/home/DropStrip';
import { categories } from '@/data/categories';
import { getFeaturedProducts } from '@/data/products';
import { resolvePath, resolveProducts } from '@/lib/resolve-image';

export default function HomePage() {
  // Pre-resolve image paths on the server so missing files cleanly fall back
  // to the placeholder before next/image is invoked (no 400s).
  const featuredCategories = categories
    .filter((c) => ['mens', 'womens', 'limited-edition'].includes(c.slug))
    .map((c) => ({ ...c, heroImage: resolvePath(c.heroImage) }));

  // Lookbook frames — try a dedicated /lookbook/ image first (none generated
  // yet), then fall back to vertical 4:5 PRODUCT photography (matches the
  // lookbook container's portrait aspect). Hero shots are 21:9 widescreen
  // so they don't fit the box well; we use them only as last resort.
  const lbFrame = (paths: string[], title: string, loc: string) => {
    const src = paths.map(resolvePath).find((p) => !p.endsWith('placeholder.svg'));
    return { src: src ?? resolvePath(paths[0]), title, loc };
  };

  const lookbookFrames = [
    lbFrame(['/lookbook/01.jpg', '/products/orbit-hoodie-void/01.jpg', '/products/orbit-hoodie-void/02.jpg'], 'Orbit Hoodie',     'STUDIO · 01'),
    lbFrame(['/lookbook/02.jpg', '/products/aurora-cargo-pant/01.jpg', '/products/aurora-cargo-pant/02.jpg'], 'Aurora Cargo',     'STUDIO · 02'),
    lbFrame(['/lookbook/03.jpg', '/products/flux-bomber/01.jpg',       '/products/flux-bomber/02.jpg'      ], 'Flux Bomber',      'STUDIO · 03'),
    lbFrame(['/lookbook/04.jpg', '/products/gravity-mini-dress/01.jpg','/products/beacon-tee/01.jpg'       ], 'Gravity Dress',    'STUDIO · 04'),
  ];

  const heroSlides = [
    { src: resolvePath('/hero/01-orbit.jpg'),  label: 'Drop 004 — Orbit'  },
    { src: resolvePath('/hero/02-aurora.jpg'), label: 'Drop 003 — Aurora' },
    { src: resolvePath('/hero/03-flux.jpg'),   label: 'Drop 002 — Flux'   },
  ];

  // Featured drop card on the right of the hero — first NEW-tagged product
  const [topProduct] = resolveProducts(getFeaturedProducts(1));
  const heroFeatured = topProduct
    ? {
        slug: topProduct.slug,
        name: topProduct.name,
        drop: topProduct.drop ?? 'Latest drop',
        price: topProduct.price,
        image: topProduct.images[0]?.src ?? '/products/placeholder.svg',
        badge: topProduct.badge,
      }
    : undefined;

  return (
    <>
      <Hero slides={heroSlides} featured={heroFeatured} />
      <Marquee />
      <FeaturedRail />
      <Signature />
      <Lookbook frames={lookbookFrames} />
      <CategoryShowcase categories={featuredCategories} />
      <DropStrip />
    </>
  );
}
