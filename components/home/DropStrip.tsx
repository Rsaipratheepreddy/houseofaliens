'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './DropStrip.module.scss';

// 7 days from now — purely decorative until you wire a real drop schedule.
function nextDropDate(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  d.setHours(20, 0, 0, 0);
  return d;
}

interface TimeLeft { d: number; h: number; m: number; s: number }

function timeLeft(target: Date): TimeLeft {
  const ms = Math.max(0, target.getTime() - Date.now());
  const d = Math.floor(ms / (1000 * 60 * 60 * 24));
  const h = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const m = Math.floor((ms / (1000 * 60)) % 60);
  const s = Math.floor((ms / 1000) % 60);
  return { d, h, m, s };
}

export function DropStrip() {
  const [target] = useState(nextDropDate);
  const [t, setT] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setT(timeLeft(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <section className={styles.root} aria-labelledby="drop-heading">
      <div className={`container ${styles.inner}`}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.eyebrow}>※ Incoming transmission</span>
          <h2 id="drop-heading" className={styles.title}>
            Drop 005 <span className={styles.italic}>—</span> <span className={styles.accent}>Stargazer</span>
          </h2>
          <p className={styles.lede}>
            Twelve numbered pieces. Six hand-finished outerwear silhouettes.
            One transmission. Stays in orbit for 48 hours, or until sold out.
          </p>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.countdown} role="timer" aria-live="polite">
            <Slot label="Days"     value={t?.d} />
            <Slot label="Hours"    value={t?.h} />
            <Slot label="Minutes"  value={t?.m} />
            <Slot label="Seconds"  value={t?.s} pulse />
          </div>

          <Link href="/limited-edition" className={styles.cta}>
            <span>Set transmission alert</span>
            <span aria-hidden className={styles.arrow}>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Slot({ label, value, pulse }: { label: string; value?: number; pulse?: boolean }) {
  const v = value === undefined ? '--' : String(value).padStart(2, '0');
  return (
    <div className={`${styles.slot} ${pulse ? styles.slotPulse : ''}`}>
      <span className={styles.slotValue}>{v}</span>
      <span className={styles.slotLabel}>{label}</span>
    </div>
  );
}
