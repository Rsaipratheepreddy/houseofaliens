'use client';

import { useState } from 'react';
import { useCart } from '@/store/cart-context';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatPrice } from '@/lib/format';
import styles from './page.module.scss';

export default function CheckoutPage() {
  const { lines, subtotal } = useCart();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <section className={`section ${styles.root}`}>
        <div className={`container ${styles.success}`}>
          <span className="eyebrow">Transmission complete</span>
          <h1 className={styles.title}>Order received</h1>
          <p className={styles.lede}>
            Your cargo is being prepared for departure. A confirmation will arrive in your inbox shortly.
          </p>
          <Button href="/" variant="primary">Back to home</Button>
        </div>
      </section>
    );
  }

  return (
    <section className={`section ${styles.root}`}>
      <div className={`container ${styles.inner}`}>
        <header className={styles.head}>
          <span className="eyebrow">Checkout</span>
          <h1 className={styles.title}>Confirm transmission</h1>
        </header>

        <form
          className={styles.layout}
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className={styles.formCol}>
            <fieldset className={styles.section}>
              <legend className={styles.legend}>Contact</legend>
              <Input name="email" type="email" label="Email" required placeholder="you@elsewhere.io" />
            </fieldset>

            <fieldset className={styles.section}>
              <legend className={styles.legend}>Shipping address</legend>
              <div className={styles.row2}>
                <Input name="firstName" label="First name" required />
                <Input name="lastName"  label="Last name"  required />
              </div>
              <Input name="address1" label="Address" required />
              <Input name="address2" label="Apt, suite, etc. (optional)" />
              <div className={styles.row3}>
                <Input name="city" label="City" required />
                <Input name="state" label="State / region" required />
                <Input name="zip"   label="Postal code" required />
              </div>
              <Input name="country" label="Country" defaultValue="United States" required />
            </fieldset>

            <fieldset className={styles.section}>
              <legend className={styles.legend}>Payment</legend>
              <p className={styles.note}>
                This is a UI demo — no real payment is processed.
              </p>
              <Input name="card" label="Card number" placeholder="•••• •••• •••• ••••" required />
              <div className={styles.row2}>
                <Input name="exp" label="Expiry" placeholder="MM / YY" required />
                <Input name="cvc" label="CVC" placeholder="123" required />
              </div>
            </fieldset>

            <Button type="submit" variant="primary" size="lg" fullWidth>
              Place order — {formatPrice(subtotal)}
            </Button>
          </div>

          <aside className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order</h2>
            <ul className={styles.summaryLines}>
              {lines.map((l) => (
                <li key={l.id}>
                  <div>
                    <strong>{l.name}</strong>
                    <span>{l.color} · {l.size} · ×{l.qty}</span>
                  </div>
                  <span className={styles.linePrice}>{formatPrice(l.price * l.qty)}</span>
                </li>
              ))}
              {lines.length === 0 && <li className={styles.emptyNote}>Your cart is empty.</li>}
            </ul>
            <div className={styles.subtotal}>
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}
