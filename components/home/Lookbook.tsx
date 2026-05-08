'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SmartImage } from '@/components/ui/SmartImage';
import styles from './Lookbook.module.scss';

const DEFAULT_FRAMES = [
  { src: '/lookbook/01.jpg', title: 'Salt Flat',       loc: 'BONNEVILLE · UT' },
  { src: '/lookbook/02.jpg', title: 'Subway 03:00',    loc: 'TOKYO · JP'      },
  { src: '/lookbook/03.jpg', title: 'Brutalist Steps', loc: 'LONDON · UK'     },
  { src: '/lookbook/04.jpg', title: 'Numbered',        loc: 'STUDIO · LA'     },
];

export interface LookbookFrame {
  src: string;
  title: string;
  loc: string;
}

export function Lookbook({ frames = DEFAULT_FRAMES }: { frames?: LookbookFrame[] }) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const FRAMES = frames;

  // Reveal each frame in turn — drives the right-side scrolling stack
  // (we keep the gallery positioned, motion handles the swap)

  return (
    <section className={styles.root} aria-labelledby="lb-heading" ref={ref}>
      <div className={styles.inner}>
        {/* ── Sticky text column ───────────────────────────────────── */}
        <div className={styles.textCol}>
          <div className={styles.sticky}>
            <span className="eyebrow">Lookbook · 04 frames</span>
            <h2 id="lb-heading" className={styles.title}>
              Frames from <span className={styles.italic}>another</span> dimension
            </h2>
            <p className={styles.lede}>
              Six locations. Twelve fits. One transmission. Drop 004 — Orbit
              was shot across three continents over fourteen days. Every piece
              you see is numbered, in stock, and ready to depart.
            </p>

            <ul className={styles.list}>
              {FRAMES.map((f, i) => (
                <FrameTitle
                  key={f.src}
                  frame={f}
                  index={i}
                  total={FRAMES.length}
                  progress={scrollYProgress}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* ── Image stack — animates between frames as you scroll ──── */}
        <div className={styles.imageCol}>
          <div className={styles.stickyImage}>
            {FRAMES.map((f, i) => (
              <FrameImage
                key={f.src}
                frame={f}
                index={i}
                total={FRAMES.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FrameImage({ frame, index, total, progress }: { frame: LookbookFrame; index: number; total: number; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  // Each frame owns a window of scroll progress. Inside its window it's at
  // full opacity; outside the window it fades out and slides slightly.
  const slot = 1 / total;
  const start = index * slot;
  const end   = (index + 1) * slot;
  const fadeIn  = start - slot * 0.2;
  const fadeOut = end   + slot * 0.2;

  const opacity = useTransform(progress, [Math.max(0, fadeIn), start, end, Math.min(1, fadeOut)], [0, 1, 1, 0]);
  const y       = useTransform(progress, [start, end], ['8%', '-8%']);
  const scale   = useTransform(progress, [start, end], [1.05, 1]);

  return (
    <motion.figure className={styles.figure} style={{ opacity, y, scale }}>
      <SmartImage
        src={frame.src}
        alt={frame.title}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={styles.figImg}
      />
      <figcaption className={styles.figCaption}>
        <span>{frame.loc}</span>
        <span>{frame.title}</span>
      </figcaption>
    </motion.figure>
  );
}

function FrameTitle({ frame, index, total, progress }: { frame: LookbookFrame; index: number; total: number; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const slot = 1 / total;
  const start = index * slot;
  const end   = (index + 1) * slot;

  const opacity = useTransform(progress, [start - slot * 0.3, start, end, end + slot * 0.3], [0.25, 1, 1, 0.25]);
  const x       = useTransform(progress, [start, end], ['-8px', '0px']);

  return (
    <motion.li className={styles.frameRow} style={{ opacity, x }}>
      <span className={styles.frameNum}>0{index + 1}</span>
      <span className={styles.frameTitle}>{frame.title}</span>
      <span className={styles.frameLoc}>{frame.loc}</span>
    </motion.li>
  );
}
