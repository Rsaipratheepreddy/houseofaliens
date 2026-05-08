'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SmartImage } from '@/components/ui/SmartImage';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, discountPercent } from '@/lib/format';
import type { Product } from '@/data/types';
import styles from './ProductCard.module.scss';

const TONE = {
  NEW: 'accent',
  LIMITED: 'plasma',
  SALE: 'danger',
  BESTSELLER: 'cyan',
} as const;

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const off = discountPercent(product.price, product.compareAtPrice);
  const [hover, setHover] = useState(false);

  const primary = product.images[0]?.src ?? '/products/placeholder.svg';
  const secondary = product.images[1]?.src ?? primary;

  return (
    <Link
      href={`/product/${product.slug}`}
      className={styles.card}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={() => setHover(true)}
    >
      <div className={styles.media}>
        {/* Index marker — editorial detail */}
        <span className={styles.index}>
          {String(index + 1).padStart(2, '0')} / 0{Math.max(8, index + 1)}
        </span>

        {product.badge && (
          <Badge tone={TONE[product.badge]} className={styles.badge}>
            {product.badge}
          </Badge>
        )}
        {off && <span className={styles.discount}>−{off}%</span>}

        {/* Two layered images for the hover crossfade */}
        <SmartImage
          src={primary}
          alt={product.images[0]?.alt ?? product.name}
          width={800}
          height={1000}
          className={`${styles.img} ${styles.imgPrimary} ${hover ? styles.imgHidden : ''}`}
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 480px) 50vw, 100vw"
        />
        <SmartImage
          src={secondary}
          alt={product.images[1]?.alt ?? product.name}
          width={800}
          height={1000}
          className={`${styles.img} ${styles.imgSecondary} ${hover ? styles.imgVisible : ''}`}
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 480px) 50vw, 100vw"
        />

        {/* Bottom slide-in CTA strip */}
        <motion.div
          className={styles.cta}
          initial={false}
          animate={{ y: hover ? 0 : 80, opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>View piece</span>
          <span aria-hidden>→</span>
        </motion.div>
      </div>

      <div className={styles.body}>
        <span className={styles.drop}>{product.drop ?? 'House of Aliens'}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.tagline}>{product.tagline}</p>
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className={styles.compareAt}>{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
