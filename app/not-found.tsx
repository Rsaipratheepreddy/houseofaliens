import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <section className={styles.root}>
      <Image src="/ufo.svg" alt="" width={120} height={120} />
      <span className="eyebrow">Lost in space</span>
      <h1 className={styles.title}>404 — Signal lost</h1>
      <p className={styles.lede}>
        The page you&apos;re looking for has drifted off into another dimension.
      </p>
      <Button href="/" variant="primary">Return to base</Button>
      <p className={styles.foot}>
        Or browse <Link href="/new-arrivals">new arrivals</Link>.
      </p>
    </section>
  );
}
