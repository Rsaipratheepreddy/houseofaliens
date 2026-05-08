'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Signature.module.scss';

/**
 * Signature
 * ──────────────────────────────────────────────────────────────
 * Two rows of mega-type whose horizontal motion is driven by vertical
 * scroll. Top drifts left, bottom drifts right — they scissor across
 * each other as you scroll past the section. Plus a brand-stats strip.
 *
 * Font sizes are kept moderate so multiple words remain readable in frame.
 */

const ROW_TOP = '✦  HOUSE OF ALIENS  ✦  DRESSED FOR ELSEWHERE  ✦  TRANSMISSION 026  ✦  ';
const ROW_BOT = '✶  LIMITED TRANSMISSION  ✶  NUMBERED · UNREPEATABLE  ✶  EARTH OUTPOST  ✶  ';

const STATS = [
  { num: '026',   label: 'Transmissions shipped' },
  { num: '14k',   label: 'Members of the collective' },
  { num: '7',     label: 'Continents reached' },
  { num: '100%',  label: 'Numbered pieces' },
];

export function Signature() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Reduced range so words stay in frame and readable.
  const xTop = useTransform(scrollYProgress, [0, 1], ['4%',  '-22%']);
  const xBot = useTransform(scrollYProgress, [0, 1], ['-18%', '4%']);

  return (
    <section className={styles.root} ref={ref} aria-labelledby="sig-heading">
      <h2 id="sig-heading" className={styles.srOnly}>House of Aliens — Signature</h2>

      {/* ── Mega-type marquee ───────────────────────────────────────── */}
      <div className={styles.marquee} aria-hidden>
        <motion.div className={`${styles.row} ${styles.rowOutline}`} style={{ x: xTop }}>
          <span>{ROW_TOP.repeat(2)}</span>
        </motion.div>

        <motion.div className={`${styles.row} ${styles.rowFilled}`} style={{ x: xBot }}>
          <span>{ROW_BOT.repeat(2)}</span>
        </motion.div>
      </div>

      {/* ── Brand stats strip ───────────────────────────────────────── */}
      <div className={`container ${styles.stats}`}>
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className={styles.stat}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <strong className={styles.statNum}>{s.num}</strong>
            <span className={styles.statLabel}>{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
