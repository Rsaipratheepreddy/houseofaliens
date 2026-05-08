'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, useAnimationControls } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { ScrambleText } from '@/components/effects/ScrambleText';
import { UFO_LANDED_EVENT } from '@/lib/events';
import { formatPrice } from '@/lib/format';
import styles from './Hero.module.scss';

const BANNER = '/hero/banner-bg.png';

export interface HeroSlide { src: string; label: string }

export interface HeroFeatured {
  slug: string;
  name: string;
  drop: string;
  price: number;
  image: string;
  badge?: string;
}

// `slides` is accepted but ignored — kept for backward-compat with the
// previous carousel API. The hero now uses a single static background.
export function Hero(_props: { slides?: HeroSlide[]; featured?: HeroFeatured } = {}) {
  const featured = _props.featured;
  const ref = useRef<HTMLElement | null>(null);

  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY     = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const fgY     = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const fgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* ─── Impact shake — fires when the UFO lands ──────────────────────── */
  const shake = useAnimationControls();
  useEffect(() => {
    const onLanded = () => {
      shake.start({
        x:  [0, -8,  9, -7,  6, -4,  3, -1, 0],
        y:  [0,  3, -2,  3, -2,  1, -1,  1, 0],
        rotateZ: [0, -0.5, 0.6, -0.4, 0.3, -0.2, 0.1, 0],
        transition: { duration: 0.55, ease: 'linear' },
      });
    };
    window.addEventListener(UFO_LANDED_EVENT, onLanded);
    return () => window.removeEventListener(UFO_LANDED_EVENT, onLanded);
  }, [shake]);

  return (
    <section className={styles.root} aria-labelledby="hero-heading" ref={ref}>
      {/* ── Single static background image ──────────────────────────── */}
      {/* Rendered via CSS background-image — most bulletproof path: no JS,
          no React, no Next.js layers. Browser fetches the asset straight
          from /public. Inline style lets us reference the constant. */}
      <motion.div
        className={styles.bg}
        style={{ y: bgY, scale: bgScale, backgroundImage: `url(${BANNER})` }}
      >
        <div className={styles.scrim} />
        <div className={styles.grain} aria-hidden />
      </motion.div>

      {/* ── Side rail ────────────────────────────────────────────────── */}
      <div className={styles.rail} aria-hidden>
        <span className={styles.railNumber}>01</span>
        <span className={styles.railLine} />
        <span className={styles.railLabel}>Drop 004 — Orbit</span>
      </div>

      {/* ── Foreground content ──────────────────────────────────────── */}
      <motion.div
        className={styles.outerFg}
        style={{ y: fgY, opacity: fgOpacity }}
      >
        <motion.div
          className={`container ${styles.inner}`}
          animate={shake}
        >
        <div className={styles.textCol}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            ⏤ House of Aliens · Spring transmission 26
          </motion.span>

          <h1 id="hero-heading" className={styles.heading}>
            <span className={styles.headingLine}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={styles.headingInner}
              >
                <ScrambleText text="FUTURE" delay={250} duration={700} />
              </motion.span>
            </span>
            <span className={styles.headingLine}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={styles.headingInner}
              >
                <span className={styles.italic}>WEAR</span>
                <span className={styles.dim}>FROM</span>
              </motion.span>
            </span>
            <span className={styles.headingLine}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`${styles.headingInner} ${styles.headingAccent}`}
              >
                <ScrambleText text="ANOTHER" delay={550} duration={700} />
              </motion.span>
            </span>
            <span className={styles.headingLine}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`${styles.headingInner} ${styles.headingAccent}`}
              >
                <ScrambleText text="DIMENSION" delay={700} duration={900} />
              </motion.span>
            </span>
          </h1>

          <motion.p
            className={styles.lede}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
          >
            Limited drops. Numbered pieces. Engineered for those who don&apos;t belong here.
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.55 }}
          >
            <Button href="/new-arrivals" variant="primary" size="lg">Enter the drop</Button>
            <Button href="/limited-edition" variant="outline" size="lg">Limited edition →</Button>
          </motion.div>
        </div>

        {/* ── Featured drop card (right column on lg+) ─────────────── */}
        {featured && (
          <motion.aside
            className={styles.featuredCol}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={`/product/${featured.slug}`} className={styles.featuredCard}>
              <div className={styles.featuredMedia}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.image} alt={featured.name} className={styles.featuredImg} />
                {featured.badge && <span className={styles.featuredBadge}>{featured.badge}</span>}
              </div>
              <div className={styles.featuredBody}>
                <span className={styles.featuredDrop}>{featured.drop}</span>
                <div className={styles.featuredRow}>
                  <h3 className={styles.featuredName}>{featured.name}</h3>
                  <span className={styles.featuredPrice}>{formatPrice(featured.price)}</span>
                </div>
                <span className={styles.featuredCta}>
                  View piece <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </motion.aside>
        )}
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 2 }}
      >
        <span>Scroll</span>
        <span className={styles.scrollLine}><span /></span>
      </motion.div>
    </section>
  );
}

