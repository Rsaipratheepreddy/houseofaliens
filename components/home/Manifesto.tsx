'use client';

import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ScrambleText } from '@/components/effects/ScrambleText';
import styles from './Manifesto.module.scss';

/**
 * Manifesto v2
 * ─────────────────────────────────────────────────────────────────
 * Sticky-pinned scroll experience: as the user scrolls through the
 * section's runway, the centerpiece statement swaps through a series
 * of brand declarations with a scramble-text glitch on each change.
 *
 * Below the pinned area sits a row of numbered brand pillars that
 * stagger-fade-in on scroll.
 */

const STATEMENTS = [
  { line: "WE DON'T MAKE CLOTHES.",      coord: '34.0522°N · 118.2437°W' },
  { line: 'WE TRANSMIT SIGNALS.',        coord: '35.6764°N · 139.6500°E' },
  { line: 'DRESSED FOR ANOTHER WORLD.',  coord: '51.5074°N · 000.1278°W' },
  { line: '— HOUSE OF ALIENS',           coord: 'EARTH · ORBIT 026'      },
];

const PILLARS = [
  {
    num: '01',
    title: 'Numbered',
    body: 'Every piece is a one-time transmission. Once it lands and sells, it never returns to orbit.',
  },
  {
    num: '02',
    title: 'Engineered',
    body: 'Heavy fabrications. Bonded seams. Hand-finished hardware. Designed for movement on this planet and the next.',
  },
  {
    num: '03',
    title: 'Transmitted',
    body: 'Direct from our outpost to your doorstep. No middlemen, no resellers — just the signal.',
  },
];

export function Manifesto() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const [phase, setPhase] = useState(0);

  // Map scroll progress through the section [0..1] to a discrete statement
  // index. We hold each statement for ~25% of the runway.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(STATEMENTS.length - 1, Math.max(0, Math.floor(v * STATEMENTS.length * 0.95)));
    setPhase((cur) => (cur === idx ? cur : idx));
  });

  // Subtle parallax on the background grid + glow
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.9, 0.4]);

  return (
    <section className={styles.root} ref={ref} aria-labelledby="manifesto-heading">
      {/* ── Pinned screen ─────────────────────────────────────────── */}
      <div className={styles.sticky}>
        {/* Backdrop layers */}
        <motion.div className={styles.grid} style={{ y: gridY }} aria-hidden />
        <motion.div className={styles.glow} style={{ opacity: glowOpacity }} aria-hidden />
        <div className={styles.scanlines} aria-hidden />

        {/* HUD top — transmission tag */}
        <header className={styles.top}>
          <span className={styles.tag}>
            <span className={styles.tagDot} aria-hidden /> Transmission · live
          </span>
          <span className={styles.counter}>
            {String(phase + 1).padStart(2, '0')} / {String(STATEMENTS.length).padStart(2, '0')}
          </span>
        </header>

        {/* Centerpiece statement */}
        <div className={styles.center}>
          <span className={styles.eyebrow}>※ Manifesto / 026</span>
          <motion.h2
            id="manifesto-heading"
            key={phase} // re-mount on phase change so scramble re-runs
            className={styles.statement}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ScrambleText text={STATEMENTS[phase].line} delay={0} duration={620} />
          </motion.h2>

          {/* Indicator dots */}
          <div className={styles.dots} role="tablist" aria-label="Manifesto progress">
            {STATEMENTS.map((_, i) => (
              <span key={i} className={`${styles.dot} ${i === phase ? styles.dotActive : ''}`} />
            ))}
          </div>
        </div>

        {/* HUD bottom — coordinates ticker + scroll cue */}
        <footer className={styles.bottom}>
          <span className={styles.coords}>
            <span className={styles.coordsLabel}>Coord</span>
            <motion.span
              key={`coord-${phase}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={styles.coordsValue}
            >
              {STATEMENTS[phase].coord}
            </motion.span>
          </span>
          <span className={styles.scrollHint}>Scroll · transmit</span>
        </footer>
      </div>

      {/* ── Pillars row — appears after the pinned scroll ─────────── */}
      <div className={styles.pillars}>
        <header className={styles.pillarsHead}>
          <span className="eyebrow">※ Three protocols</span>
          <h3 className={styles.pillarsTitle}>How we operate.</h3>
        </header>

        <ul className={styles.pillarsGrid}>
          {PILLARS.map((p, i) => (
            <motion.li
              key={p.num}
              className={styles.pillar}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.pillarTop}>
                <span className={styles.pillarNum}>{p.num}</span>
                <span className={styles.pillarRule} />
              </div>
              <h4 className={styles.pillarTitle}>{p.title}</h4>
              <p className={styles.pillarBody}>{p.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
