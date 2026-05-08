import { CollectionHero } from './CollectionHero';
import { ProductGrid } from './ProductGrid';
import { getCategory } from '@/data/categories';
import { getProductsByCollection } from '@/data/products';
import { resolveProducts, resolvePath } from '@/lib/resolve-image';
import type { CollectionSlug } from '@/data/types';
import styles from './CollectionPage.module.scss';

export function CollectionPage({ slug }: { slug: CollectionSlug }) {
  const rawCategory = getCategory(slug);
  const category = rawCategory ? { ...rawCategory, heroImage: resolvePath(rawCategory.heroImage) } : undefined;
  const products = resolveProducts(getProductsByCollection(slug));

  if (!category) return null;

  return (
    <>
      <CollectionHero
        title={category.title}
        description={category.description}
        count={products.length}
        image={category.heroImage}
      />
      <section className={`section ${styles.gridSection}`}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.toolbar}>
            <span className="label">{products.length} results</span>
            <div className={styles.toolbarRight}>
              <button type="button" className={styles.toolbarBtn}>Sort: Featured</button>
              <button type="button" className={styles.toolbarBtn}>Filters</button>
            </div>
          </div>
          <ProductGrid products={products} />
        </div>
      </section>
    </>
  );
}
