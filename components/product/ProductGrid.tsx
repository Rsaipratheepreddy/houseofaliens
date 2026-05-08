'use client';

import { motion, type Variants } from 'framer-motion';
import type { Product } from '@/data/types';
import { ProductCard } from './ProductCard';
import styles from './ProductGrid.module.scss';

const list: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function ProductGrid({
  products,
  stagger = false,
}: {
  products: Product[];
  stagger?: boolean;
}) {
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Nothing in this orbit yet. Check back soon for the next drop.</p>
      </div>
    );
  }

  if (!stagger) {
    return (
      <ul className={styles.grid}>
        {products.map((p, i) => (
          <li key={p.id}>
            <ProductCard product={p} index={i} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <motion.ul
      className={styles.grid}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={list}
    >
      {products.map((p, i) => (
        <motion.li key={p.id} variants={item}>
          <ProductCard product={p} index={i} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
