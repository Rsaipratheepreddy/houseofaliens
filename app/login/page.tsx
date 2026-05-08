import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from '../auth.module.scss';

export const metadata: Metadata = { title: 'Get in' };

export default function LoginPage() {
  return (
    <section className={`section ${styles.root}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.card}>
          <span className="eyebrow">Members only</span>
          <h1 className={styles.title}>Get in</h1>
          <p className={styles.lede}>
            Authenticate to access exclusive drops, faster checkout, and early-access transmissions.
          </p>

          <form className={styles.form}>
            <Input name="email" type="email" label="Email" required />
            <Input name="password" type="password" label="Password" required />
            <div className={styles.row}>
              <label className={styles.checkbox}>
                <input type="checkbox" /> <span>Stay signed in</span>
              </label>
              <Link href="/forgot-password" className={styles.link}>Forgot password?</Link>
            </div>
            <Button type="submit" variant="primary" size="lg" fullWidth>
              Beam in
            </Button>
          </form>

          <p className={styles.foot}>
            New to the collective? <Link href="/register" className={styles.link}>Create an account →</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
