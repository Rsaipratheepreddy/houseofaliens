'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/store/cart-context';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';
import styles from './page.module.scss';

export default function CartPage() {
  const { lines, remove, setQty, subtotal, itemCount, clear } = useCart();

  return (
    <section className={`section ${styles.root}`}>
      <div className={`container ${styles.inner}`}>
        <header className={styles.head}>
          <span className="eyebrow">Cargo Bay</span>
          <h1 className={styles.title}>Your Cart</h1>
          <p className={styles.subtitle}>{itemCount} item{itemCount === 1 ? '' : 's'} ready for transmission.</p>
        </header>

        {lines.length === 0 ? (
          <div className={styles.empty}>
            <p>Your cargo hold is empty. Begin your transmission with new arrivals.</p>
            <Button href="/new-arrivals" variant="primary">Browse new arrivals</Button>
          </div>
        ) : (
          <div className={styles.layout}>
            <ul className={styles.lines}>
              {lines.map((l) => (
                <li key={l.id} className={styles.line}>
                  <Link href={`/product/${l.slug}`} className={styles.lineImg}>
                    <Image src={l.image} alt={l.name} width={160} height={200} />
                  </Link>
                  <div className={styles.lineBody}>
                    <Link href={`/product/${l.slug}`} className={styles.lineName}>{l.name}</Link>
                    <span className={styles.lineMeta}>{l.color} · Size {l.size}</span>
                    <div className={styles.lineRow}>
                      <div className={styles.qty}>
                        <button type="button" onClick={() => setQty(l.id, l.qty - 1)} aria-label="Decrease">−</button>
                        <span>{l.qty}</span>
                        <button type="button" onClick={() => setQty(l.id, l.qty + 1)} aria-label="Increase">+</button>
                      </div>
                      <span className={styles.linePrice}>{formatPrice(l.price * l.qty)}</span>
                    </div>
                    <button type="button" className={styles.lineRemove} onClick={() => remove(l.id)}>Remove</button>
                  </div>
                </li>
              ))}
              <li className={styles.clearRow}>
                <button type="button" onClick={clear} className={styles.clearBtn}>Clear cart</button>
              </li>
            </ul>

            <aside className={styles.summary}>
              <h2 className={styles.summaryTitle}>Order summary</h2>
              <dl className={styles.totals}>
                <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
                <div><dt>Shipping</dt><dd>Calculated at checkout</dd></div>
                <div className={styles.totalRow}>
                  <dt>Total</dt><dd>{formatPrice(subtotal)}</dd>
                </div>
              </dl>
              <Button href="/checkout" variant="primary" fullWidth>Proceed to checkout</Button>
              <p className={styles.fineprint}>Taxes and shipping calculated at checkout.</p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
