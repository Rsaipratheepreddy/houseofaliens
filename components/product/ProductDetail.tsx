'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useCart } from '@/store/cart-context';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatPrice, discountPercent } from '@/lib/format';
import { cn } from '@/lib/cn';
import type { Product, ProductSize } from '@/data/types';
import styles from './ProductDetail.module.scss';

const TONE = {
  NEW: 'accent',
  LIMITED: 'plasma',
  SALE: 'danger',
  BESTSELLER: 'cyan',
} as const;

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<ProductSize | null>(product.sizes[0] ?? null);
  const [color, setColor] = useState(product.colors[0]?.name ?? '');
  const off = discountPercent(product.price, product.compareAtPrice);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  return (
    <article className={styles.root}>
      <div className={`container ${styles.grid}`}>
        {/* ---- Gallery ----------------------------------------------- */}
        <div className={styles.gallery}>
          <div className={styles.mainImage} ref={imageRef} data-product-image>
            <Image
              src={product.images[activeImage]?.src ?? '/products/placeholder.svg'}
              alt={product.images[activeImage]?.alt ?? product.name}
              width={1200}
              height={1500}
              priority
            />
            {product.badge && (
              <Badge tone={TONE[product.badge]} className={styles.badge}>
                {product.badge}
              </Badge>
            )}
          </div>
          <ul className={styles.thumbs}>
            {product.images.map((img, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={cn(styles.thumb, i === activeImage && styles.thumbActive)}
                >
                  <Image src={img.src} alt={img.alt} width={200} height={250} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Info -------------------------------------------------- */}
        <div className={styles.info}>
          {product.drop && <span className={styles.drop}>{product.drop}</span>}
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.tagline}>{product.tagline}</p>

          <div className={styles.priceRow}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className={styles.compareAt}>{formatPrice(product.compareAtPrice)}</span>
            )}
            {off && <Badge tone="danger">−{off}%</Badge>}
          </div>

          <fieldset className={styles.option}>
            <legend className="label">Colour · {color}</legend>
            <div className={styles.swatches}>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={c.name}
                  aria-pressed={color === c.name}
                  className={cn(styles.swatch, color === c.name && styles.swatchActive)}
                  style={{ background: c.hex }}
                  onClick={() => setColor(c.name)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.option}>
            <legend className="label">Size</legend>
            <div className={styles.sizes}>
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                  className={cn(styles.size, size === s && styles.sizeActive)}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <div className={styles.actions}>
            <button
              ref={buttonRef}
              type="button"
              className={styles.addBtn}
              disabled={!product.inStock || !size}
              onClick={() => {
                if (!size) return;
                add(product, {
                  size,
                  color,
                  sourceEl: buttonRef.current,
                  imageEl: imageRef.current,
                });
              }}
            >
              <span>{product.inStock ? 'Add to cart' : 'Sold out'}</span>
              <span aria-hidden className={styles.addBtnArrow}>→</span>
            </button>
          </div>

          <div className={styles.description}>
            <h2 className={styles.descTitle}>Transmission</h2>
            <p>{product.description}</p>
            {product.materials && (
              <ul className={styles.materials}>
                {product.materials.map((m) => <li key={m}>{m}</li>)}
              </ul>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
