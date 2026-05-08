'use client';

/**
 * UfoCompanion — v2 (3D depth)
 * ─────────────────────────────────────────────────────────────────────────
 * What changed vs v1:
 *  • Saucer now renders with proper depth — top highlight, dome reflection,
 *    underbelly chrome ring, multiple inner-light layers.
 *  • A separate "shadow" element trails behind on a slower spring, giving a
 *    parallax depth read.
 *  • Saucer banks (rotateZ) according to its X-axis velocity — it actually
 *    leans into turns.
 *  • A fading particle trail spawns from the underbelly while it's flying
 *    (state machine: only during intro/grabbing transitions, not while idle).
 *  • Hover-bob upgraded to a subtle Y oscillation + dome glow pulse.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  AnimatePresence,
  type Variants,
} from 'framer-motion';
import { ADD_TO_CART_EVENT, dispatchUfoLanded, type AddToCartDetail } from '@/lib/events';
import styles from './UfoCompanion.module.scss';

type Phase = 'glitching' | 'flying' | 'parked' | 'grabbing';

interface Ghost {
  src: string;
  fromRect: { left: number; top: number; width: number; height: number };
  toRect:   { left: number; top: number; width: number; height: number };
  id: number;
}

interface Particle { id: number; x: number; y: number }

const UFO_W = 140;
const UFO_H = 90;
const PARK_PAD_X = 24;
const PARK_TOP = 100;

function parkedAnchor(): { x: number; y: number } {
  if (typeof window === 'undefined') return { x: 1200, y: 100 };
  return { x: window.innerWidth - UFO_W - PARK_PAD_X, y: PARK_TOP };
}

const beamVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  open:   { scaleY: 1, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const alienVariants: Variants = {
  hidden: { y: -10, opacity: 0, scale: 0.6 },
  drop:   { y: 130, opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } },
};

export function UfoCompanion() {
  const reduced = useReducedMotion();

  const [phase, setPhase] = useState<Phase>('glitching');
  const [ghosts, setGhosts] = useState<Ghost[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const ghostId = useRef(0);
  const partId = useRef(0);

  // Cursor target — UFO follows the mouse with a spring lag once parked.
  const mouseXMV = useMotionValue(typeof window !== 'undefined' ? window.innerWidth - 200 : 1200);
  const mouseYMV = useMotionValue(typeof window !== 'undefined' ? window.innerHeight * 0.4 : 240);

  // Position MotionValues — start off-screen LEFT, mid-height for cinematic entry.
  const xMV = useMotionValue(-360);
  const yMV = useMotionValue(typeof window !== 'undefined' ? window.innerHeight * 0.35 : 240);
  const x = useSpring(xMV, { stiffness: 90, damping: 18, mass: 0.9 });
  const y = useSpring(yMV, { stiffness: 90, damping: 18, mass: 0.9 });

  // Scale: starts at 0 (invisible point in space), glitches up to BIG, then
  // slowly shrinks during flight, and shrinks again on scroll once parked.
  const scaleMV = useMotionValue(0);
  const scale = useSpring(scaleMV, { stiffness: 50, damping: 16, mass: 1.2 });

  // Tracks whether the user has scrolled — used to shrink the cursor-following
  // companion to its smaller "minimap" size.
  const isScrolledRef = useRef(false);

  // Banking: derive lean from x-velocity. We sample x deltas in a rAF loop.
  const bankMV = useMotionValue(0);
  const bank = useSpring(bankMV, { stiffness: 60, damping: 16 });

  // Ground shadow follows on a slower spring — gives parallax depth
  const shadowX = useSpring(xMV, { stiffness: 60, damping: 22, mass: 1.1 });
  const shadowY = useSpring(yMV, { stiffness: 60, damping: 22, mass: 1.1 });
  const shadowScale = useTransform(y, [0, 800], [1, 0.7]);
  const shadowOpacity = useTransform(y, [0, 600], [0.55, 0.18]);

  // ── Intro: scale-0 → glitch-in BIG → fly across → land ────────────────
  useEffect(() => {
    if (reduced) {
      const a = parkedAnchor();
      xMV.set(a.x); yMV.set(a.y); scaleMV.set(1);
      setPhase('parked');
      dispatchUfoLanded();
      return;
    }

    const a = parkedAnchor();
    // Materialization point — somewhere off the left edge, mid-height.
    const startX = -window.innerWidth * 0.35 - 160;
    const startY = window.innerHeight * 0.32;
    const peakScale = 6.5; // dominates the viewport at peak

    xMV.set(startX);
    yMV.set(startY);
    scaleMV.set(0);

    let raf = 0;

    /* ── Phase A — GLITCH IN (0 → peakScale over ~520ms) ──────────── */
    const glitchStart = performance.now();
    const glitchDur = 520;

    const phaseA = (t: number) => {
      const p = Math.min(1, (t - glitchStart) / glitchDur);
      // Easing: bursts to ~80% in first 30%, then settles → reads as a
      // glitchy materialization, not a smooth grow.
      const eased = 1 - Math.pow(1 - p, 4);
      // Add small jitter to the scale so it visibly stutters
      const jitter = p < 0.85 ? (Math.random() - 0.5) * 0.4 : 0;
      scaleMV.set(Math.max(0, peakScale * eased + jitter));

      // Position jitter during glitch: tiny random offsets so it appears
      // to phase in and out of place.
      if (p < 0.85) {
        xMV.set(startX + (Math.random() - 0.5) * 24);
        yMV.set(startY + (Math.random() - 0.5) * 24);
      } else {
        xMV.set(startX);
        yMV.set(startY);
      }

      if (p < 1) {
        raf = requestAnimationFrame(phaseA);
      } else {
        scaleMV.set(peakScale);
        xMV.set(startX);
        yMV.set(startY);
        setPhase('flying');
        startFlight();
      }
    };

    /* ── Phase B — FLIGHT (peakScale → 1, off-left → parked) ──────── */
    const startFlight = () => {
      const flightStart = performance.now();
      const flightDur = 2800;

      const phaseB = (t: number) => {
        const p = Math.min(1, (t - flightStart) / flightDur);

        // Position: ease-out cubic (decelerates into the landing)
        const easePos = 1 - Math.pow(1 - p, 3);
        // Scale: ease-in-out so it stays BIG longer, then shrinks visibly
        const easeScale = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

        const xVal = startX + (a.x - startX) * easePos;
        const yLinear = startY + (a.y - startY) * easePos;
        const arc = Math.sin(p * Math.PI) * 80;
        const yVal = yLinear - arc;
        const scaleVal = peakScale + (1 - peakScale) * easeScale;

        xMV.set(xVal);
        yMV.set(yVal);
        scaleMV.set(scaleVal);

        if (p < 1) {
          raf = requestAnimationFrame(phaseB);
        } else {
          xMV.set(a.x);
          yMV.set(a.y - 6);
          scaleMV.set(1);
          window.setTimeout(() => {
            yMV.set(a.y);
            setPhase('parked');
            dispatchUfoLanded();
          }, 160);
        }
      };

      raf = requestAnimationFrame(phaseB);
    };

    raf = requestAnimationFrame(phaseA);
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Banking (lean into the direction of x-motion) ───────────────────────
  useEffect(() => {
    if (reduced) return;
    let prevX = x.get();
    let raf = 0;
    const loop = () => {
      const cur = x.get();
      const dx = cur - prevX;
      prevX = cur;
      // Map dx (px/frame) to a tilt angle in degrees, clamped
      const angle = Math.max(-18, Math.min(18, -dx * 0.35));
      bankMV.set(angle);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // ── Particle trail (only spawned while flying, not parked) ──────────────
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let prev = { x: x.get(), y: y.get() };

    const loop = () => {
      const cur = { x: x.get(), y: y.get() };
      const dx = cur.x - prev.x;
      const dy = cur.y - prev.y;
      const speed = Math.hypot(dx, dy);
      prev = cur;

      // Only emit when actually moving meaningfully
      if (speed > 1.5) {
        const id = ++partId.current;
        setParticles((prev) => [
          ...prev.slice(-30), // cap to keep DOM small
          { id, x: cur.x + UFO_W / 2 + (Math.random() - 0.5) * 14, y: cur.y + UFO_H * 0.85 },
        ]);
        // Auto-cleanup after lifespan
        window.setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== id));
        }, 1100);
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // ── Mouse tracking (always on so we have a fresh target the moment
  //    the UFO transitions into 'parked' state) ────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined' || reduced) return;
    const onMove = (e: MouseEvent) => {
      mouseXMV.set(e.clientX);
      mouseYMV.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // ── Scroll listener — flips the "is scrolled" flag for shrinking ─────
  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      isScrolledRef.current = window.scrollY > 80;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  // ── Parked → cursor follow + scroll-shrink ──────────────────────────────
  // Once landed, the UFO becomes a companion that follows the cursor with a
  // soft spring lag. As soon as the user scrolls, it shrinks to 0.55× while
  // continuing to track the cursor.
  useEffect(() => {
    if (phase !== 'parked' || reduced) return;

    let raf = 0;
    const loop = () => {
      // Target: 110px right of cursor, 110px above (so it doesn't sit ON
      // top of the cursor or block clicks).
      const tx = mouseXMV.get() + 110;
      const ty = mouseYMV.get() - 110;

      // Idle bob applied on top
      const t = performance.now() / 1000;
      const bobX = Math.sin(t * 0.9) * 4;
      const bobY = Math.sin(t * 1.5) * 6;

      xMV.set(tx + bobX);
      yMV.set(ty + bobY);

      // Scale: 1× at top, 0.55× once scrolled
      scaleMV.set(isScrolledRef.current ? 0.55 : 1);

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, reduced]);

  // ── Add-to-cart event → run grab choreography ───────────────────────────
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<AddToCartDetail>).detail;
      if (!detail) return;
      runGrabSequence(detail);
    };
    window.addEventListener(ADD_TO_CART_EVENT, handler);
    return () => window.removeEventListener(ADD_TO_CART_EVENT, handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  function runGrabSequence(detail: AddToCartDetail) {
    if (reduced) return;

    setPhase('grabbing');

    const target = detail.imageRect ?? detail.sourceRect;
    const targetX = target.left + target.width / 2 - UFO_W / 2;
    const targetY = Math.max(20, target.top - UFO_H - 100);

    xMV.set(targetX);
    yMV.set(targetY);

    window.setTimeout(() => {
      const id = ++ghostId.current;
      const cartCountEl = document.querySelector('[data-cart-count]') as HTMLElement | null;
      const cartRect = cartCountEl?.getBoundingClientRect();
      const toRect = cartRect ?? { left: window.innerWidth - 60, top: 36, width: 24, height: 24 };
      setGhosts((prev) => [
        ...prev,
        { id, src: detail.productImage, fromRect: target, toRect },
      ]);
    }, 800);

    window.setTimeout(() => {
      const a = parkedAnchor();
      xMV.set(a.x);
      yMV.set(a.y);
      setPhase('parked');
    }, 2300);
  }

  function removeGhost(id: number) {
    setGhosts((prev) => prev.filter((g) => g.id !== id));
  }

  // Pre-compose transform. Banking rotation is applied to the body.
  const bodyRotate = useTransform(bank, (v) => `${v}deg`);

  return (
    <>
      {/* ── Drop-shadow on the floor (depth) ─────────────────────────── */}
      <motion.div
        className={styles.shadow}
        style={{
          x: shadowX,
          y: useTransform(shadowY, (v) => v + UFO_H + 18),
          scale: shadowScale,
          opacity: shadowOpacity,
          width: UFO_W,
        }}
        aria-hidden
      />

      {/* ── Particle trail ─────────────────────────────────────────── */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={styles.particle}
          initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
          animate={{
            y: p.y + 60 + Math.random() * 30,
            x: p.x + (Math.random() - 0.5) * 30,
            opacity: 0,
            scale: 0.4,
          }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          aria-hidden
        />
      ))}

      {/* ── UFO ──────────────────────────────────────────────────────── */}
      <motion.div
        className={`${styles.ufo} ${phase === 'glitching' ? styles.glitching : ''}`}
        style={{ x, y, scale, width: UFO_W, height: UFO_H }}
        aria-hidden
      >
        <motion.div
          className={styles.ufoBody}
          style={{ rotate: bodyRotate }}
        >
          <UfoSvg phase={phase} />

          {/* Tractor beam */}
          <motion.div
            className={styles.beam}
            variants={beamVariants}
            initial="hidden"
            animate={phase === 'grabbing' ? 'open' : 'hidden'}
            style={{ originY: 0 }}
          />

          {/* Alien — drops on the beam during grab */}
          <motion.div
            className={styles.alien}
            variants={alienVariants}
            initial="hidden"
            animate={phase === 'grabbing' ? 'drop' : 'hidden'}
          >
            <AlienSvg />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Ghost product clone — flies into the cart icon ─────────── */}
      <AnimatePresence>
        {ghosts.map((g) => (
          <GhostProduct key={g.id} ghost={g} onDone={() => removeGhost(g.id)} />
        ))}
      </AnimatePresence>
    </>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Ghost: clones product image, animates from product → cart icon along an arc
// ───────────────────────────────────────────────────────────────────────────
function GhostProduct({ ghost, onDone }: { ghost: Ghost; onDone: () => void }) {
  const arcKeyframes = {
    left: [
      ghost.fromRect.left,
      (ghost.fromRect.left + ghost.toRect.left) / 2 + 60,
      ghost.toRect.left,
    ],
    top: [
      ghost.fromRect.top,
      (ghost.fromRect.top + ghost.toRect.top) / 2 - 100,
      ghost.toRect.top,
    ],
    width:   [ghost.fromRect.width,  ghost.fromRect.width * 0.4, 24],
    height:  [ghost.fromRect.height, ghost.fromRect.height * 0.4, 24],
    opacity: [0, 1, 1, 0.4],
    rotate:  [0, 12, -8, 0],
  };

  return (
    <motion.div
      className={styles.ghost}
      initial={{
        left: ghost.fromRect.left,
        top: ghost.fromRect.top,
        width: ghost.fromRect.width,
        height: ghost.fromRect.height,
        opacity: 0,
      }}
      animate={arcKeyframes}
      transition={{
        duration: 1.0,
        delay: 0.05,
        ease: [0.65, 0, 0.35, 1],
        times: [0, 0.5, 1, 1],
      }}
      onAnimationComplete={onDone}
      style={{ borderRadius: 4 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ghost.src} alt="" className={styles.ghostImg} />
    </motion.div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// SVGs — depth via gradients + multi-layer shading
// ───────────────────────────────────────────────────────────────────────────
function UfoSvg({ phase }: { phase: Phase }) {
  return (
    <svg viewBox="0 0 140 90" xmlns="http://www.w3.org/2000/svg" className={styles.ufoSvg}>
      <defs>
        <linearGradient id="bodyTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0"   stopColor="#5b5b78" />
          <stop offset="0.5" stopColor="#33334a" />
          <stop offset="1"   stopColor="#0a0a0f" />
        </linearGradient>
        <linearGradient id="bodyRing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0"   stopColor="#1a1a24" />
          <stop offset="0.5" stopColor="#33334a" />
          <stop offset="1"   stopColor="#0a0a0f" />
        </linearGradient>
        <radialGradient id="dome" cx="40%" cy="35%" r="65%">
          <stop offset="0"   stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.4" stopColor="#d8ff84" stopOpacity="0.9"  />
          <stop offset="1"   stopColor="#3a5a10" stopOpacity="0.95" />
        </radialGradient>
        <radialGradient id="domeHi" cx="35%" cy="22%" r="22%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0"    />
        </radialGradient>
        <radialGradient id="underGlow" cx="50%" cy="100%" r="80%">
          <stop offset="0"   stopColor="#b6ff3c" stopOpacity="0.65" />
          <stop offset="0.5" stopColor="#b6ff3c" stopOpacity="0.18" />
          <stop offset="1"   stopColor="#b6ff3c" stopOpacity="0"    />
        </radialGradient>
        <linearGradient id="rimLight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0"   stopColor="#ffffff" stopOpacity="0.0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="1"   stopColor="#ffffff" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Underbelly green wash */}
      <ellipse cx="70" cy="68" rx="68" ry="14" fill="url(#underGlow)" />

      {/* Outer ring (shadow side) */}
      <ellipse cx="70" cy="56" rx="62" ry="10" fill="url(#bodyRing)" />
      {/* Inner ring (lit side) */}
      <ellipse cx="70" cy="52" rx="56" ry="9"  fill="url(#bodyTop)" />
      {/* Top edge highlight */}
      <ellipse cx="70" cy="48" rx="46" ry="4"  fill="url(#rimLight)" />

      {/* Dome */}
      <path d="M30 50 Q 38 12 70 12 Q 102 12 110 50 Z" fill="url(#dome)" />
      {/* Dome interior reflection */}
      <ellipse cx="56" cy="28" rx="14" ry="8" fill="url(#domeHi)" />
      {/* Dome rim */}
      <path d="M30 50 Q 38 12 70 12 Q 102 12 110 50" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.35" />

      {/* Underbelly metallic ridge */}
      <ellipse cx="70" cy="60" rx="46" ry="4" fill="#22222e" />
      <ellipse cx="70" cy="60" rx="42" ry="2" fill="#0a0a0f" />

      {/* Underbelly lights — all alien-green, no purple */}
      <g>
        <Light cx={20}  cy={56} r={3.2} color="#b6ff3c" delay={0}   active={phase === 'grabbing'} />
        <Light cx={42}  cy={62} r={2.8} color="#d8ff84" delay={0.2} active={phase === 'grabbing'} />
        <Light cx={70}  cy={64} r={3.2} color="#b6ff3c" delay={0.4} active={phase === 'grabbing'} />
        <Light cx={98}  cy={62} r={2.8} color="#d8ff84" delay={0.6} active={phase === 'grabbing'} />
        <Light cx={120} cy={56} r={3.2} color="#b6ff3c" delay={0.8} active={phase === 'grabbing'} />
      </g>

      {/* Top antenna */}
      <line x1="70" y1="12" x2="70" y2="4" stroke="#b6ff3c" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="70" cy="3" r="2" fill="#b6ff3c">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function Light({ cx, cy, r, color, delay, active }: { cx: number; cy: number; r: number; color: string; delay: number; active: boolean }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r * (active ? 1.6 : 1)} fill={color} opacity={active ? 0.4 : 0}>
        {/* halo */}
      </circle>
      <circle cx={cx} cy={cy} r={r} fill={color}>
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.4s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
    </g>
  );
}

function AlienSvg() {
  return (
    <svg viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg" className={styles.alienSvg}>
      {/* Tether */}
      <line x1="30" y1="0" x2="30" y2="14" stroke="#b6ff3c" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.7" />
      {/* Head */}
      <ellipse cx="30" cy="30" rx="16" ry="20" fill="#b6ff3c" />
      <ellipse cx="30" cy="30" rx="16" ry="20" fill="url(#alienShade)" opacity="0.45" />
      <defs>
        <radialGradient id="alienShade" cx="35%" cy="35%" r="65%">
          <stop offset="0" stopColor="#d8ff84" stopOpacity="0.9" />
          <stop offset="1" stopColor="#3a7a00" stopOpacity="1"   />
        </radialGradient>
      </defs>
      {/* Eyes */}
      <ellipse cx="24" cy="28" rx="3.2" ry="5.5" fill="#050507" />
      <ellipse cx="36" cy="28" rx="3.2" ry="5.5" fill="#050507" />
      <ellipse cx="23" cy="26" rx="0.8" ry="1.4" fill="#ffffff" />
      <ellipse cx="35" cy="26" rx="0.8" ry="1.4" fill="#ffffff" />
      {/* Mouth */}
      <path d="M22 40 Q30 44 38 40" stroke="#050507" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      {/* Body */}
      <rect x="24" y="48" width="12" height="18" rx="3" fill="#84cc16" />
      <rect x="24" y="48" width="12" height="6"  rx="2" fill="#b6ff3c" opacity="0.6" />
      {/* Arms */}
      <path d="M22 52 Q 8 64 12 86"  stroke="#b6ff3c" strokeWidth="3.8" strokeLinecap="round" fill="none" />
      <path d="M38 52 Q 52 64 48 86" stroke="#b6ff3c" strokeWidth="3.8" strokeLinecap="round" fill="none" />
      {/* Hands */}
      <circle cx="12" cy="86" r="3.2" fill="#b6ff3c" />
      <circle cx="48" cy="86" r="3.2" fill="#b6ff3c" />
    </svg>
  );
}
