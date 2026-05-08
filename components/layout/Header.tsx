'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/store/cart-context';
import { cn } from '@/lib/cn';
import styles from './Header.module.scss';

const NAV = [
  { href: '/new-arrivals',    label: 'New Arrivals' },
  { href: '/mens',            label: 'Mens' },
  { href: '/womens',          label: 'Womens' },
  { href: '/limited-edition', label: 'Limited Edition' },
  { href: '/sale',            label: 'Sale' },
];

export function Header() {
  const { itemCount, open } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bumped, setBumped] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastCount = useRef(itemCount);

  // Header floats transparently at the top of the page so the hero photo
  // shows through behind the nav. Once the user scrolls past ~60px we
  // fade in the dark backdrop + blur for legibility on other sections.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bump the cart count badge whenever the count goes up.
  useEffect(() => {
    if (itemCount > lastCount.current) {
      setBumped(true);
      const t = window.setTimeout(() => setBumped(false), 600);
      return () => window.clearTimeout(t);
    }
    lastCount.current = itemCount;
  }, [itemCount]);

  return (
    <header className={cn(styles.root, scrolled && styles.rootScrolled)}>
      <div className={cn('container', styles.inner)}>
        <Link href="/" aria-label="House of Aliens — Home" className={styles.logo}>
          <Image src="/icons/logo.svg" alt="House of Aliens" width={120} height={120} priority className={styles.logoImg} />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/login" className={styles.action}>
            Get in
          </Link>
          <button
            type="button"
            className={styles.cartBtn}
            onClick={open}
            aria-label={`Cart (${itemCount} items)`}
          >
            <span className={styles.cartLabel}>Cart</span>
            <span
              className={cn(styles.cartCount, bumped && styles.cartCountBump)}
              data-cart-count
            >
              {itemCount}
            </span>
          </button>
          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Image src="/ufo.svg" alt="" width={32} height={32} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className={styles.mobile} role="dialog" aria-label="Mobile navigation">
          <nav className={styles.mobileNav}>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.mobileLink}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/login" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
              Get in
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
