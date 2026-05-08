export type Gender = 'mens' | 'womens' | 'unisex';

export type CollectionSlug =
  | 'new-arrivals'
  | 'mens'
  | 'womens'
  | 'limited-edition'
  | 'sale';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: 'USD';
  gender: Gender;
  collections: CollectionSlug[];
  sizes: ProductSize[];
  colors: { name: string; hex: string }[];
  images: ProductImage[];
  badge?: 'NEW' | 'LIMITED' | 'SALE' | 'BESTSELLER';
  inStock: boolean;
  materials?: string[];
  drop?: string; // e.g. "Drop 003 — Aurora"
}

export interface Category {
  slug: CollectionSlug;
  title: string;
  description: string;
  heroImage: string;
}
