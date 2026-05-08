'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useCart } from '@/store/cart-context';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';
import styles from './CartDrawer.module.scss';

export function CartDrawer() {
  const { isOpen, close, lines, remove, setQty, subtotal, itemCount } = useCart();

  // Lock body scroll when drawer is open.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  return (
    <>
      <div
        className={`${styles.scrim} ${isOpen ? styles.show : ''}`}
        onClick={close}
        aria-hidden={!isOpen}
      />
      <aside
        className={`${styles.drawer} ${isOpen ? styles.show : ''}`}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        <header className={styles.head}>
          <div>
            <span className="eyebrow">Cargo Bay</span>
            <h2 className={styles.title}>Your Cart <span>· {itemCount}</span></h2>
          </div>
          <button type="button" className={styles.close} onClick={close} aria-label="Close cart">×</button>
        </header>

        {lines.length === 0 ? (
          <div className={styles.empty}>
            <p>Your cargo hold is empty.</p>
            <Button href="/new-arrivals" variant="primary" onClick={close}>
              Browse new arrivals
            </Button>
          </div>
        ) : (
          <ul className={styles.lines}>
            {lines.map((l) => (
              <li key={l.id} className={styles.line}>
                <Link href={`/product/${l.slug}`} onClick={close} className={styles.lineImg}>
                  <Image src={l.image} alt={l.name} width={120} height={150} />
                </Link>
                <div className={styles.lineBody}>
                  <Link href={`/product/${l.slug}`} onClick={close} className={styles.lineName}>
                    {l.name}
                  </Link>
                  <span className={styles.lineMeta}>
                    {l.color} · Size {l.size}
                  </span>
                  <div className={styles.lineRow}>
                    <div className={styles.qty}>
                      <button type="button" onClick={() => setQty(l.id, l.qty - 1)} aria-label="Decrease">−</button>
                      <span>{l.qty}</span>
                      <button type="button" onClick={() => setQty(l.id, l.qty + 1)} aria-label="Increase">+</button>
                    </div>
                    <span className={styles.linePrice}>{formatPrice(l.price * l.qty)}</span>
                  </div>
                  <button type="button" className={styles.lineRemove} onClick={() => remove(l.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {lines.length > 0 && (
          <footer className={styles.foot}>
            <div className={styles.subtotal}>
              <span className="eyebrow">Subtotal</span>
              <span className={styles.subtotalAmount}>{formatPrice(subtotal)}</span>
            </div>
            <Button href="/checkout" variant="primary" fullWidth>
              Proceed to checkout
            </Button>
            <Button href="/cart" variant="outline" fullWidth>
              View full cart
            </Button>
          </footer>
        )}
      </aside>
    </>
  );
}
