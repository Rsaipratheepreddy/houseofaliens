import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';

const SHOP = [
  { href: '/new-arrivals', label: 'New Arrivals' },
  { href: '/mens', label: 'Mens' },
  { href: '/womens', label: 'Womens' },
  { href: '/limited-edition', label: 'Limited Edition' },
  { href: '/sale', label: 'Sale' },
];

const HELP = [
  { href: '/track-order', label: 'Track Order' },
  { href: '/returns', label: 'Returns & Exchanges' },
  { href: '/shipping', label: 'Shipping Info' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/contact', label: 'Contact Us' },
];

const COMPANY = [
  { href: '/about', label: 'About Us' },
  { href: '/careers', label: 'Careers' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

export function Footer() {
  return (
    <footer className={styles.root}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link href="/" aria-label="House of Aliens — Home" className={styles.logoLink}>
            <Image src="/icons/logo.svg" alt="House of Aliens" width={120} height={120} className={styles.logoImg} />
          </Link>
          <p className={styles.tagline}>
            Bold, futuristic clothing from another dimension. For those who dare to be different.
          </p>
        </div>

        <FooterColumn title="Shop"   links={SHOP} />
        <FooterColumn title="Help"   links={HELP} />
        <FooterColumn title="Company" links={COMPANY} />
      </div>

      <div className={`container ${styles.bottom}`}>
        <span className={styles.copy}>© {new Date().getFullYear()} House of Aliens. All rights reserved.</span>
        <div className={styles.legal}>
          <Link href="/privacy">Privacy</Link>
          <span aria-hidden>|</span>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className={styles.colTitle}>{title}</h3>
      <ul className={styles.list}>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={styles.link}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
