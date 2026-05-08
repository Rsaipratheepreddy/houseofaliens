'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { SmartImage } from '@/components/ui/SmartImage';
import type { Category } from '@/data/types';
import styles from './CategoryShowcase.module.scss';

const list: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden:  { opacity: 0, y: 50, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

/** Categories to feature. Pass server-resolved data so missing hero
 *  images become the placeholder instead of 400-ing on /_next/image. */
export function CategoryShowcase({ categories }: { categories: Category[] }) {
  return (
    <section className={`section ${styles.root}`} aria-labelledby="cat-heading">
      <div className={`container ${styles.inner}`}>
        <motion.header
          className={styles.head}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.eyebrow}>※ Index / 003</span>
          <h2 id="cat-heading" className={styles.title}>
            Shop by <span className={styles.italic}>collection</span>
          </h2>
          <p className={styles.lede}>Choose your transmission frequency.</p>
        </motion.header>

        <motion.ul
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={list}
        >
          {categories.map((c, i) => (
              <motion.li key={c.slug} variants={item}>
                <Link href={`/${c.slug}`} className={styles.card}>
                  <div className={styles.media}>
                    <SmartImage
                      src={c.heroImage}
                      alt={c.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className={styles.mediaImg}
                    />
                    <div className={styles.scrim} />
                  </div>

                  <div className={styles.body}>
                    <span className={styles.kicker}>0{i + 1} / {c.slug.replace('-', ' · ').toUpperCase()}</span>
                    <h3 className={styles.cardTitle}>{c.title}</h3>
                    <p className={styles.cardCopy}>{c.description}</p>
                    <span className={styles.cta}>
                      <span>Enter the drop</span>
                      <span aria-hidden className={styles.ctaArrow}>→</span>
                    </span>
                  </div>
                </Link>
              </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
