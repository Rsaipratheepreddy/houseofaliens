import Link from 'next/link';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Reveal } from '@/components/effects/ScrollReveal';
import { getFeaturedProducts } from '@/data/products';
import { resolveProducts } from '@/lib/resolve-image';
import styles from './FeaturedRail.module.scss';

export function FeaturedRail() {
  const products = resolveProducts(getFeaturedProducts(8));

  return (
    <section className={`section ${styles.root}`} aria-labelledby="feat-heading">
      <div className={`container ${styles.inner}`}>
        <Reveal>
          <header className={styles.head}>
            <div>
              <span className="eyebrow">Latest transmission</span>
              <h2 id="feat-heading" className={styles.title}>New arrivals</h2>
            </div>
            <Link href="/new-arrivals" className={styles.viewAll}>View all →</Link>
          </header>
        </Reveal>

        <ProductGrid products={products} stagger />
      </div>
    </section>
  );
}
