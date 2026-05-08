import type { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { categories } from '@/data/categories';

const BASE = 'https://houseofaliens.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    '/', '/cart', '/checkout', '/login', '/register',
  ].map((path) => ({ url: `${BASE}${path}`, lastModified: now }));

  const collectionRoutes = categories.map((c) => ({
    url: `${BASE}/${c.slug}`,
    lastModified: now,
  }));

  const productRoutes = products.map((p) => ({
    url: `${BASE}/product/${p.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
