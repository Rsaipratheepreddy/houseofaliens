import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductDetail } from '@/components/product/ProductDetail';
import { ProductGrid } from '@/components/product/ProductGrid';
import { getProduct, products, getProductsByCollection } from '@/data/products';
import { resolveProduct, resolveProducts } from '@/lib/resolve-image';
import styles from './page.module.scss';

interface PageProps { params: { slug: string } }

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const p = getProduct(params.slug);
  if (!p) return { title: 'Product not found' };
  return {
    title: p.name,
    description: p.tagline,
    openGraph: { title: p.name, description: p.tagline },
  };
}

export default function ProductPage({ params }: PageProps) {
  const rawProduct = getProduct(params.slug);
  if (!rawProduct) notFound();
  const product = resolveProduct(rawProduct);

  const related = resolveProducts(
    getProductsByCollection(rawProduct.collections[0])
      .filter((p) => p.slug !== rawProduct.slug)
      .slice(0, 4),
  );

  return (
    <>
      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className={`section ${styles.related}`}>
          <div className={`container ${styles.relatedInner}`}>
            <header>
              <span className="eyebrow">More from this drop</span>
              <h2 className={styles.relatedTitle}>You may also like</h2>
            </header>
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </>
  );
}
