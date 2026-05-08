import type { Category } from './types';

export const categories: Category[] = [
  {
    slug: 'new-arrivals',
    title: 'New Arrivals',
    description: 'Fresh transmissions from orbit. Pieces that just landed.',
    heroImage: '/categories/new-arrivals.jpg',
  },
  {
    slug: 'mens',
    title: 'Mens',
    description: 'Cuts engineered for terrestrial movement and interstellar style.',
    heroImage: '/categories/mens.jpg',
  },
  {
    slug: 'womens',
    title: 'Womens',
    description: 'Silhouettes from another dimension — bold, structured, otherworldly.',
    heroImage: '/categories/womens.jpg',
  },
  {
    slug: 'limited-edition',
    title: 'Limited Edition',
    description: 'One-time drops. Numbered. Never restocked.',
    heroImage: '/categories/limited-edition.jpg',
  },
  {
    slug: 'sale',
    title: 'Sale',
    description: 'Past drops — reduced for departure.',
    heroImage: '/categories/sale.jpg',
  },
];

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
