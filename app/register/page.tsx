import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from '../auth.module.scss';

export const metadata: Metadata = { title: 'Create an account' };

export default function RegisterPage() {
  return (
    <section className={`section ${styles.root}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.card}>
          <span className="eyebrow">Join the collective</span>
          <h1 className={styles.title}>Create an account</h1>
          <p className={styles.lede}>
            Get early access to limited drops, member-only rewards, and exclusive transmissions.
          </p>

          <form className={styles.form}>
            <div className={styles.row2}>
              <Input name="firstName" label="First name" required />
              <Input name="lastName"  label="Last name"  required />
            </div>
            <Input name="email" type="email" label="Email" required />
            <Input name="password" type="password" label="Password" required hint="8+ chars" />
            <label className={styles.checkbox}>
              <input type="checkbox" required /> <span>I agree to the <Link href="/terms" className={styles.link}>terms</Link> and <Link href="/privacy" className={styles.link}>privacy policy</Link>.</span>
            </label>
            <Button type="submit" variant="primary" size="lg" fullWidth>
              Create account
            </Button>
          </form>

          <p className={styles.foot}>
            Already have an account? <Link href="/login" className={styles.link}>Get in →</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
